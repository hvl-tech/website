import BorderedBox from "./borderedBox";
import { useTranslation } from "react-i18next";

type TalkProps = {
    date: string;
    speaker: string;
    title: string;
    slidesLink: string;
};

const talks: TalkProps[] = [
    {
        date: 'October 9, 2024',
        speaker: 'Martin Pompéry',
        title: 'Introduction to Garble',
        slidesLink: 'TODO_MARTIN_SLIDES_URL',
    },
    {
        date: 'October 9, 2024',
        speaker: 'Jonas Benn',
        title: 'The Fediverse',
        slidesLink: 'TODO_JONAS_SLIDES_URL',
    },
];

const TalkCard = ({ date, speaker, title, slidesLink }: TalkProps) => {
    return (
        <a
            href={slidesLink}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-inherit w-full"
        >
            <BorderedBox className="p-4 hover:shadow-[6px_6px_0px_#000] hover:bg-green-50 cursor-pointer transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">{date}</span>
                        <span className="font-bold">{speaker}</span>
                        <span className="italic">{title}</span>
                    </div>
                    <span className="text-green-700 font-semibold hover:transform hover:-translate-x-1 focus:outline-none focus:ring-0">Slides &rarr;</span>
                </div>
            </BorderedBox>
        </a>
    );
};

const PastTalks = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-white gap-4 w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">
                {t('pastTalks.pastTalks')}
            </h2>
            <div className="flex flex-col gap-3 w-full max-w-[800px]">
                {talks.map((talk, index) => (
                    <TalkCard key={index} {...talk} />
                ))}
            </div>
        </div>
    );
};

export default PastTalks;
