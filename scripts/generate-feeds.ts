import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Event times in meetup-events.json are Europe/Berlin wall-clock times without an offset.
process.env.TZ = 'Europe/Berlin';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_PATH = resolve(__dirname, '../src/data/meetup-events.json');
const RSS_OUTPUT = resolve(__dirname, '../public/rss.xml');
const ICS_OUTPUT = resolve(__dirname, '../public/events.ics');
const ATOM_OUTPUT = resolve(__dirname, '../public/atom.xml');

const SITE_URL = 'https://hvltech.de';
const SITE_TITLE = 'HVLtech · Havelland Tech Community';
const SITE_DESCRIPTION = 'Upcoming meetups of the Havelland Tech Community in Falkensee.';
const SITE_LANGUAGE = 'en-de';

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

function pad(n: number): string {
    return String(n).padStart(2, '0');
}

function toIcsStamp(date: Date): string {
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function toLocalIcsStamp(date: Date): string {
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function escapeIcs(text: string): string {
    return text
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
}

function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function eventId(event: MeetupEvent): string {
    const idMatch = event.eventUrl.match(/\/events\/([^/?]+)/);
    if (idMatch) return idMatch[1];
    const slug = (event.title + '-' + event.dateTime).replace(/[^A-Za-z0-9]+/g, '-').toLowerCase();
    return slug.replace(/^-+|-+$/g, '');
}

// Meetup can reuse one event ID across occurrences, so the date keeps GUIDs/UIDs unique.
function eventGuid(event: MeetupEvent): string {
    const date = event.dateTime.slice(0, 10).replace(/-/g, '');
    return `hvltech-evt-${eventId(event)}-${date}`;
}

// RFC 5545 limits lines to 75 octets (continuation space included). Iterating by
// code point keeps multi-byte characters like emoji from being split.
function foldIcsLine(line: string): string {
    const out: string[] = [];
    let current = '';
    let currentBytes = 0;
    for (const char of line) {
        const bytes = Buffer.byteLength(char);
        if (currentBytes + bytes > 75) {
            out.push(current);
            current = ' ';
            currentBytes = 1;
        }
        current += char;
        currentBytes += bytes;
    }
    out.push(current);
    return out.join('\r\n');
}

function buildIcs(events: MeetupEvent[]): string {
    const lines: string[] = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//HVLtech//Events//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        `X-WR-CALNAME:${escapeIcs(SITE_TITLE)}`,
        'X-WR-TIMEZONE:Europe/Berlin',
    ];

    const nowStamp = toIcsStamp(new Date());

    for (const event of events) {
        const start = new Date(event.dateTime);
        if (isNaN(start.getTime())) continue;
        const end = event.endTime ? new Date(event.endTime) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
        const uid = `${eventGuid(event)}@hvltech.de`;
        lines.push('BEGIN:VEVENT');
        lines.push(foldIcsLine(`UID:${uid}`));
        lines.push(`DTSTAMP:${nowStamp}`);
        lines.push(`DTSTART;TZID=Europe/Berlin:${toLocalIcsStamp(start)}`);
        lines.push(`DTEND;TZID=Europe/Berlin:${toLocalIcsStamp(end)}`);
        lines.push(foldIcsLine(`SUMMARY:${escapeIcs(event.title)}`));
        if (event.location) lines.push(foldIcsLine(`LOCATION:${escapeIcs(event.location)}`));
        if (event.description) lines.push(foldIcsLine(`DESCRIPTION:${escapeIcs(event.description)}`));
        if (event.eventUrl) lines.push(foldIcsLine(`URL:${event.eventUrl}`));
        lines.push('END:VEVENT');
    }

    lines.push('END:VCALENDAR');
    return lines.join('\r\n') + '\r\n';
}

function buildRss(events: MeetupEvent[], generatedAt: Date): string {
    const items = events.map((event) => {
        const start = new Date(event.dateTime);
        if (isNaN(start.getTime())) return '';
        const guid = eventGuid(event);
        const pubDate = start.toUTCString();
        const link = event.eventUrl || `${SITE_URL}/`;
        const descParts: string[] = [];
        if (event.location) descParts.push(`📍 ${event.location}`);
        if (event.description) descParts.push(event.description);
        const description = descParts.join('\n\n');
        return `    <item>
      <title>${escapeXml(event.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(guid)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    }).filter(Boolean).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>${SITE_LANGUAGE}</language>
    <lastBuildDate>${generatedAt.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function buildAtom(events: MeetupEvent[], generatedAt: Date): string {
    const entries = events.map((event) => {
        const start = new Date(event.dateTime);
        if (isNaN(start.getTime())) return '';
        const link = event.eventUrl || `${SITE_URL}/`;
        const summary = [event.location && `📍 ${event.location}`, event.description].filter(Boolean).join('\n\n');
        return `  <entry>
    <title>${escapeXml(event.title)}</title>
    <link href="${escapeXml(link)}" />
    <id>urn:hvltech:${escapeXml(eventGuid(event))}</id>
    <updated>${generatedAt.toISOString()}</updated>
    <published>${start.toISOString()}</published>
    <summary>${escapeXml(summary)}</summary>
  </entry>`;
    }).filter(Boolean).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)}</title>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/" />
  <link href="${SITE_URL}/atom.xml" rel="self" type="application/atom+xml" />
  <id>${SITE_URL}/</id>
  <updated>${generatedAt.toISOString()}</updated>
  <author><name>HVLtech</name></author>
${entries}
</feed>
`;
}

function main(): void {
    const raw = readFileSync(INPUT_PATH, 'utf-8');
    const data: MeetupEventsData = JSON.parse(raw);
    const events = data.upcomingEvents
        .slice()
        .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    writeFileSync(RSS_OUTPUT, buildRss(events, new Date()));
    writeFileSync(ATOM_OUTPUT, buildAtom(events, new Date()));
    writeFileSync(ICS_OUTPUT, buildIcs(events));
    console.log(`Wrote ${events.length} events to ${RSS_OUTPUT}, ${ATOM_OUTPUT} and ${ICS_OUTPUT}`);
}

main();
