import {useTranslation} from "react-i18next";

type CardProps = {
    datum: string;
    header: string;
    place: string;
    address: string;
    contain: string;
};

const Card = ({datum, header, place, address, contain}: CardProps) => {

    return (
        <div
            className=" border-4 border-black shadow-[4px_4px_0px_#000] p-4 w-full flex md:flex-row flex-col  items-center justify-between md:gap-6 gap-3 max-w-[1120px] ">
            <div
                className="  md:w-35 md:h-35 w-40 h-40 mb-4 md:mb-0 border-4 image-pixelated text-white bg-green-700 lg:text-4xl md:text-3xl text-4xl text-wrap flex items-center text-center font-['Press_Start_2P'] m">
                {datum}
            </div>
            <div className='flex md:items-start items-center flex-col lg:w-2/3 w-full '>
                <h3 className="md:text-xl text-green-700 font-['Press_Start_2P'] self-center md:self-auto">{header}</h3>
                <p className="font-bold mt-2 ">{place}</p>
                <p className='text-sm text-pretty'> {address}</p>
                <p className="italic">{contain}</p>
            </div>
        </div>

    )
}

const Event = () => {
    const {t} = useTranslation();

    const cardData = t('newEvent', {returnObjects: true}) as CardProps;
    return (
        <div
            className="bg-white gap-2.5 text-justify w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">Next Event</h2>
            <Card {...cardData} />
        </div>
    );
};

export default Event;