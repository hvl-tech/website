import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const nextMeetupDate = dayjs.tz('2026-01-29T18:00:00', 'Europe/Berlin');
export const nextMeetupLocation: string = "altes Gemeindeamt, Dallgow-Döberitz";
