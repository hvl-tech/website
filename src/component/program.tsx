import jonas from '../assets/speakers/jonas_benn.jpeg'
import {useTranslation} from "react-i18next";



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

const Block = ({nameBlock, time}: BlockProps) => {
    return (
        <div className="border-4 border-black  shadow-[4px_4px_0px_#000] p-4 lg:w-2/3 w-full  ">
            <p>{nameBlock} {time}</p>
        </div>
    )
}

const Card = ({photo, startTime, name, role, heading, topic}: CardProps) => {

    const initial = name.split(' ').map((name)=>name[0].toUpperCase())

    return (
        <div
            className=" border-4 border-black  shadow-[4px_4px_0px_#000] p-4 lg:w-2/3 w-full flex lg:flex-row items-center justify-between flex-col">

            {photo ? ( <div>
                        <img src={photo} alt={name}
                                 className="w-auto h-auto md:w-40 md:h-auto border-4 border-black  shadow-[4px_4px_0px_#000] image-pixelated "/>
              </div>
                ):(
                    <div
                        className={`
                                      md:w-40 md:h-40 w-full h-60  mb-4 md:mb-0 border-4 image-pixelated
                                      text-white bg-green-700 border-black  shadow-[4px_4px_0px_#000]
                                      lg:text-4xl md:text-3xl text-6xl 
                                      flex items-center justify-center text-center whitespace-pre-line
                                      font-['Press_Start_2P']
                                    `}>
                        {initial}
                    </div>
                ) }

            <div className='flex items-start flex-col lg:w-2/3 w-full'>
                <h3 className="md:text-xl">{startTime}</h3>
                <p className="font-bold mt-2">{name} <span className='text-xs'> {role}</span></p>
                <p className=" text-xl"> {heading} </p>
                <p className="italic">{topic}</p>
            </div>
        </div>
    )
}

const Program = () => {
    const {t} = useTranslation();
    return (
        <>
            <div
                className="bg-white gap-2.5 text-justify w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
                <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">Program</h2>
                <div
                    className="flex flex-col gap-6 justify-center items-center font-mono mt-8 w-full gap-3 max-w-[1120px] ">

                    <Block nameBlock={t('program.start')} time={'18:00'}/>

                    <Card name={'Martin Pompéry'} startTime={'18:30'} heading={'Introduction to  Garble'}
                          topic={'Garble is a simple programming language for Multi-Party Computation and is statically typed, low-level, purely functional and uses a Rust-like syntax.'}
                    />

                    <Block nameBlock={t('program.disscusion')} time={'18:45-19:15'}/>

                    <Card name={'Jonas Benn'} photo={jonas} startTime={'19:15'}
                          heading={'The Fediverse'} topic={'Beyond Centralized Social Networks\n' +
                        'Description: A short introduction to the Fediverse and its underlying protocol ActivityPub'}/>

                    <Block nameBlock={t('program.disscusion')} time={'19:30-20:00'}/>

                    <Block nameBlock={t('program.end')} time={'20:00'}/>

                </div>
            </div>
        </>
    );
};

export default Program;