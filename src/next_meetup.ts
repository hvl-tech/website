import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import meetupData from "./data/meetup-events.json";

dayjs.extend(utc);
dayjs.extend(timezone);

const firstUpcoming = meetupData.upcomingEvents[0];

export const nextMeetupDate = firstUpcoming
    ? dayjs.tz(firstUpcoming.dateTime, 'Europe/Berlin')
    : dayjs.tz('2025-11-12T18:00:00', 'Europe/Berlin');

export const nextMeetupLocation: string = firstUpcoming
    ? firstUpcoming.location
    : "Falkensee-Garten, Falkensee";
