import ical from 'node-ical';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICAL_URL = 'https://www.meetup.com/havelland-technology-falkensee/events/ical/';
const OUTPUT_PATH = resolve(__dirname, '../src/data/meetup-events.json');

interface MeetupEvent {
  title: string;
  dateTime: string;
  endTime: string;
  location: string;
  description: string;
  eventUrl: string;
}

interface MeetupEventsData {
  fetchedAt: string;
  upcomingEvents: MeetupEvent[];
}

function formatLocalISO(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const MAX_DESCRIPTION_LENGTH = 180;

function stripMarkdown(text: string): string {
  return text
    .replace(/\\([-_*`[\](){}#+!])/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*>+\s?/gm, '')
    .replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

function cleanDescription(desc: string): string {
  const lines = desc.split('\n');
  const body = lines.length > 1 && lines[0].includes('Havelland Technology')
    ? lines.slice(1).join('\n')
    : desc;
  return truncate(stripMarkdown(body), MAX_DESCRIPTION_LENGTH);
}

const DEFAULT_VENUE_BY_TITLE: Record<string, string> = {
  'Programmiercafé': 'Kulturhaus „Johannes R. Becher" (Havelländer Weg 67, 14612 Falkensee)',
};

function resolveLocation(rawLocation: string, title: string): string {
  if (rawLocation.trim().length > 0) return rawLocation;
  return DEFAULT_VENUE_BY_TITLE[title] || '';
}

// Meetup's iCal feed keeps cancelled events as STATUS:CONFIRMED, so the event page's
// embedded Next.js data is the only public place the real status shows up. Any failure
// here keeps the event rather than hiding a real one.
async function isCancelledOnMeetup(eventUrl: string): Promise<boolean> {
  const id = eventUrl.match(/\/events\/([^/?]+)/)?.[1];
  if (!id) return false;

  try {
    const res = await fetch(eventUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; hvltech-site-build)' },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;
    const html = await res.text();
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (!match) return false;
    const event = JSON.parse(match[1])?.props?.pageProps?.event;
    return event?.id === id && typeof event.status === 'string' && event.status.startsWith('CANCELLED');
  } catch (error) {
    console.warn(`Could not check status of ${eventUrl}:`, error);
    return false;
  }
}

async function fetchEvents(): Promise<void> {
  console.log(`Fetching iCal feed from ${ICAL_URL}...`);

  try {
    const data = await ical.async.fromURL(ICAL_URL);

    const events: MeetupEvent[] = [];

    for (const [, value] of Object.entries(data)) {
      if (value.type !== 'VEVENT') continue;

      const start = value.start ? new Date(value.start as unknown as string) : null;
      const end = value.end ? new Date(value.end as unknown as string) : null;

      if (!start || isNaN(start.getTime())) continue;
      if (String(value.status || '').toUpperCase() === 'CANCELLED') continue;

      // url can be a string or an object with { params, val }
      const rawUrl = value.url;
      const eventUrl = typeof rawUrl === 'string'
        ? rawUrl
        : (rawUrl && typeof rawUrl === 'object' && 'val' in rawUrl)
          ? String((rawUrl as { val: string }).val)
          : '';

      const title = String(value.summary || '');
      events.push({
        title,
        dateTime: formatLocalISO(start),
        endTime: end && !isNaN(end.getTime()) ? formatLocalISO(end) : '',
        location: resolveLocation(String(value.location || ''), title),
        description: cleanDescription(String(value.description || '')),
        eventUrl,
      });
    }

    const cancelled = await Promise.all(events.map((event) => isCancelledOnMeetup(event.eventUrl)));
    const activeEvents = events.filter((event, i) => {
      if (cancelled[i]) console.log(`Skipping cancelled event: ${event.title} (${event.dateTime})`);
      return !cancelled[i];
    });

    activeEvents.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    const result: MeetupEventsData = {
      fetchedAt: new Date().toISOString(),
      upcomingEvents: activeEvents,
    };

    writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2) + '\n');
    console.log(`Wrote ${activeEvents.length} events to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Failed to fetch Meetup events:', error);

    if (existsSync(OUTPUT_PATH)) {
      const existing = readFileSync(OUTPUT_PATH, 'utf-8');
      console.log('Keeping existing meetup-events.json as fallback.');
      console.log(`Existing file fetched at: ${JSON.parse(existing).fetchedAt}`);
    } else {
      console.error('No existing meetup-events.json found. Build may fail.');
      process.exit(1);
    }
  }
}

fetchEvents();
