import { useTranslation } from "react-i18next";
import BorderedBox from './borderedBox';



type BlockProps = {
    nameBlock: string;
    time: string;
}
type CardProps = {
    photo?: string;
    startTime: string;
    name: string;
    role?: string;
    heading: string;
    topic: string;
};

const Block = ({ nameBlock, time }: BlockProps) => {
    return (
        <div className="flex flex-col md:flex-row w-full md:items-center gap-2 md:gap-4">
            <div className="md:w-20 shrink-0 md:text-right font-bold text-lg">{time}</div>
            <div className="border-4 border-black shadow-[4px_4px_0px_#000] p-2 md:p-4 flex-1">
                <p>{nameBlock}</p>
            </div>
        </div>
    )
}

const Card = ({ photo, startTime, name, role, heading, topic }: CardProps) => {

    const initial = name.split(' ').map((name) => name[0].toUpperCase())

    return (
        <div className="flex flex-col md:flex-row w-full md:items-start gap-2 md:gap-4">
            <div className="md:w-20 shrink-0 md:text-right font-bold text-lg md:pt-4">{startTime}</div>
            <BorderedBox className="p-2 md:p-4 flex-1">
                <div className="w-full flex md:flex-row items-center gap-2 md:gap-4 flex-col">
                    <BorderedBox>
                    {photo ? (<div>
                        <img src={photo} alt={name}
                            className="w-auto h-auto md:w-24 md:h-auto image-pixelated " />
                    </div>
                    ) : (
                        <div
                            className={`
                                          w-16 h-16 md:w-24 md:h-24
                                          image-pixelated
                                          text-white bg-green-700
                                          text-xl md:text-2xl
                                          flex items-center justify-center text-center whitespace-pre-line
                                          font-['Press_Start_2P']
                                        `}>
                            {initial}
                        </div>
                    )}
                    </BorderedBox>

                    <div className='flex flex-col lg:w-2/3 w-full justify-start items-start'>
                        <p className="text-base md:text-lg font-bold m-1 md:m-2">{name}</p>
                        {role && <p className="text-xs text-gray-500 mx-1 md:mx-2 -mt-1">{role}</p>}
                        <p className="text-lg md:text-xl font-semibold m-1 md:m-2">{heading}</p>
                        <p className="italic text-sm m-1 md:m-2">{topic}</p>
                    </div>
                </div>
            </BorderedBox>
        </div>
    )
}

const Program = () => {
    const { t } = useTranslation();
    return (
        <>
            <div
                className="bg-white gap-2.5 w-full px-2 md:px-8 py-4 md:py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
                <h2 className="font-['Press_Start_2P'] font-normal text-sm text-[#00274a]">Program</h2>
                <div
                    className="flex flex-col gap-3 md:gap-6 justify-center items-center font-mono mt-4 md:mt-8 w-full max-w-[1120px]">

                    <Block nameBlock={t('program.start')} time={'18:00'} />

                    <Card name={'Libor Tomsik'} role={'SW Engineer at DEUTA-WERKE'} startTime={'18:30'} heading={'Industry panel with Qt, C++, Linux'} />

                    <Block nameBlock={t('program.disscusion')} time={'18:45'} />

                    <Card name={'Christian Ermel'} startTime={'19:15'} heading={'Bluesky: Architecture & ActivityPub Comparison'} />

                    <Block nameBlock={t('program.disscusion')} time={'19:30'} />

                    <Block nameBlock={t('program.end')} time={'20:00'} />

                </div>
            </div>
        </>
    );
};

export default Program;
