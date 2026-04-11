import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Program from "./program";
import BorderedBox from "./borderedBox";
import meetupData from "../data/meetup-events.json";

type CardProps = {
    datum: string;
    header: string;
    place: string;
    address: string;
    contain: string;
    link?: string;
    internalLink?: string;
    isLast?: boolean;
    showProgram?: boolean;
};

interface MeetupEvent {
    title: string;
    dateTime: string;
    endTime: string;
    location: string;
    description: string;
    eventUrl: string;
}

function useEventCards(events: MeetupEvent[]): CardProps[] {
    const { t, i18n } = useTranslation();
    const months = t('months', { returnObjects: true }) as string[];
    const lang = i18n.language;

    return events.map((event) => {
        const start = new Date(event.dateTime);
        const end = event.endTime ? new Date(event.endTime) : null;

        const day = start.getDate();
        const month = months[start.getMonth()] || '';

        const datum = lang === 'de'
            ? `${day}\n${month}`
            : `${month}\n${day}`;

        const locationParts = event.location.match(/^([^(]+)\(([^)]+)\)/);
        const venueName = locationParts ? locationParts[1].trim() : event.location;
        const address = locationParts ? locationParts[2].trim() : '';

        let timeStr: string;
        if (end && end.getTime() !== start.getTime()) {
            const fromStr = formatTime(start, lang);
            const toStr = formatTime(end, lang);
            timeStr = t('event.fromTo', { from: fromStr, to: toStr });
        } else {
            const timeFormatted = formatTime(start, lang);
            const oclock = t('event.oclock');
            timeStr = `${t('event.at')} ${timeFormatted}${oclock ? ' ' + oclock : ''}`;
        }

        const place = venueName ? `${venueName} ${timeStr}` : timeStr;

        const isKidsLabs = /kids\s*labs/i.test(event.title);

        return {
            datum,
            header: event.title,
            place,
            address,
            contain: event.description,
            link: isKidsLabs ? undefined : (event.eventUrl || undefined),
            internalLink: isKidsLabs ? '/labs' : undefined,
        };
    });
}

function formatTime(date: Date, lang: string): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (lang === 'de') {
        return minutes === 0 ? `${hours}` : `${hours}:${String(minutes).padStart(2, '0')}`;
    }

    const period = hours >= 12 ? 'pm' : 'am';
    const h12 = hours % 12 || 12;
    return minutes === 0 ? `${h12}${period}` : `${h12}:${String(minutes).padStart(2, '0')}${period}`;
}

const Card = ({ datum, header, place, address, contain, link, internalLink, showProgram }: CardProps) => {
    const isCafe = header.toLowerCase().includes('programmiercaf');
    const hasLink = Boolean(link || internalLink);
    const cardContent = (
        <div className="border-4 border-black shadow-[4px_4px_0px_#000] p-2 md:p-4 w-full flex flex-col items-center justify-center">
            <div
                key={`contentCard-${datum}`}
                className={` w-full flex md:flex-row flex-col items-center justify-between md:gap-6 gap-3 max-w-[1120px] bg-white ${hasLink ? 'hover:shadow-[6px_6px_0px_#000] cursor-pointer hover:bg-green-50' : ''}`}>
                <BorderedBox>
                    <div
                        className={`
  md:w-35 md:h-35 w-40 h-40 image-pixelated
  text-white ${isCafe ? "bg-cyan-700" : "bg-green-700"}
  lg:text-4xl md:text-3xl text-4xl
  flex items-center justify-center text-center whitespace-pre-line
  font-['Press_Start_2P']
`}>
                        {datum}
                    </div>
                </BorderedBox>
                <div className='flex md:items-start items-center flex-col w-full px-10'>
                    <h3 className={`md:text-xl ${isCafe ? "text-cyan-700" : "text-green-700"} font-['Press_Start_2P'] self-center md:self-auto`}>{header}</h3>
                    <p className="font-bold py-2 ">{place}</p>
                    <p className='text-sm text-pretty py-2'> {address}</p>
                    <p className="italic">{contain}</p>
                </div>
            </div>
            {showProgram && <Program />}
        </div>
    );

    if (internalLink) {
        return (
            <Link to={internalLink} className="w-full flex justify-center no-underline text-inherit">
                {cardContent}
            </Link>
        );
    }

    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer" className="w-full flex justify-center no-underline text-inherit">
                {cardContent}
            </a>
        );
    }

    return cardContent;
}

const Event = () => {
    const { t } = useTranslation();
    const cardData = useEventCards(meetupData.upcomingEvents);

    return (
        <div
            className="bg-white gap-2.5 w-full px-2 md:px-8 py-4 md:py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">{t('event.nextEvent')}</h2>
            {cardData.map((event: CardProps, index: number) => (
                <Card key={index} {...event} />
            ))}
        </div>
    );
};

export default Event;
