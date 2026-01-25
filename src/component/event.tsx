import { useTranslation } from "react-i18next";
import Program from "./program";
import BorderedBox from "./borderedBox";

type CardProps = {
    datum: string;
    header: string;
    place: string;
    address: string;
    contain: string;
    link?: string;
    isLast?: boolean;
    showProgram?: boolean;
};

const Card = ({ datum, header, place, address, contain, link, isLast, showProgram }: CardProps) => {
    const cardContent = (
        <div className="border-4 border-black shadow-[4px_4px_0px_#000] p-2 md:p-4 w-full flex flex-col items-center justify-center">
            <div
                key={`contentCard-${datum}`}
                className={` w-full flex md:flex-row flex-col items-center justify-between md:gap-6 gap-3 max-w-[1120px] bg-white ${link ? 'hover:shadow-[6px_6px_0px_#000] cursor-pointer hover:bg-green-50' : ''}`}>
                <BorderedBox>
                    <div
                        className={`
  md:w-35 md:h-35 w-40 h-40 image-pixelated
  text-white ${isLast ? "bg-cyan-700" : "bg-green-700"}
  lg:text-4xl md:text-3xl text-4xl
  flex items-center justify-center text-center whitespace-pre-line
  font-['Press_Start_2P']
`}>
                        {datum}
                    </div>
                </BorderedBox>
                <div className='flex md:items-start items-center flex-col w-full px-2 md:px-10'>
                    <h3 className={`md:text-xl ${isLast ? "text-cyan-700" : "text-green-700"} font-['Press_Start_2P'] self-center md:self-auto`}>{header}</h3>
                    <p className="font-bold py-2 ">{place}</p>
                    <p className='text-sm text-pretty py-2'> {address}</p>
                    <p className="italic">{contain}</p>
                </div>
            </div>
            {showProgram && <Program />}
        </div>
    );

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

    const cardData = t('newEvents', { returnObjects: true }) as CardProps[];
    return (
        <div
            className="bg-white gap-2.5 w-full px-2 md:px-8 py-4 md:py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">Next Event</h2>
            {cardData.map((event: CardProps, index: number) => (
                <Card key={index} {...event} isLast={index === 1} />
            ))}
        </div>
    );
};

export default Event;
