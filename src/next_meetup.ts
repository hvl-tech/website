import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const nextMeetupDate = dayjs.tz('2025-07-07T18:00:00', 'Europe/Berlin');
export const nextMeetupLocation: string = "Kulturhaus J. R. Becher, Falkensee";
