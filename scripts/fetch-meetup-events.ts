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

function cleanDescription(desc: string): string {
  // iCal descriptions often start with the group name on the first line - strip it
  const lines = desc.split('\n');
  if (lines.length > 1 && lines[0].includes('Havelland Technology')) {
    return lines.slice(1).join('\n').trim();
  }
  return desc.trim();
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

      // url can be a string or an object with { params, val }
      const rawUrl = value.url;
      const eventUrl = typeof rawUrl === 'string'
        ? rawUrl
        : (rawUrl && typeof rawUrl === 'object' && 'val' in rawUrl)
          ? String((rawUrl as { val: string }).val)
          : '';

      events.push({
        title: String(value.summary || ''),
        dateTime: formatLocalISO(start),
        endTime: end && !isNaN(end.getTime()) ? formatLocalISO(end) : '',
        location: String(value.location || ''),
        description: cleanDescription(String(value.description || '')),
        eventUrl,
      });
    }

    events.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    const result: MeetupEventsData = {
      fetchedAt: new Date().toISOString(),
      upcomingEvents: events,
    };

    writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2) + '\n');
    console.log(`Wrote ${events.length} events to ${OUTPUT_PATH}`);
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
