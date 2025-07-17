import martin from "../assets/martinH.jpeg";

type CardProps = {
    datum:string;
    startTime: string;
    name: string;
    role: string;
    topic: string;
};
const Card=({datum,startTime,name,role,topic}: CardProps)=>{

    return (
        <div className=" border-4 border-black  shadow-[4px_4px_0px_#000] p-4 w-full flex flex-row items-center justify-between ">
            <div
                     className="  w-40 h-40  mb-4 border-4 image-pixelated text-white bg-green-700 text-5xl text-wrap flex items-center text-center font-['Press_Start_2P']">
                {datum}
            </div>
            <div className='flex items-start flex-col lg:w-2/3 w-full'>
                <h3 className="md:text-xl text-green-700 font-['Press_Start_2P'] ">{startTime}</h3>
                <p className="font-bold mt-2">{name}</p>
                <p className='text-sm'> {role}</p>
                <p className="italic">{topic}</p>
            </div>
        </div>

    )
}
const Event = () => {
    return (
        <div className="bg-white gap-2.5 text-justify w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">


            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">Next Event</h2>
<Card datum={'SEP\n17'} startTime={'Talk evening'} name={"Chinesische restaurant in Falkense at 6pm "} role={'Max-Liebermann-Straße 33, 14612 Falkensee'} topic={'Bring yourself (and maybe a friend) and join us!'}></Card>
        </div>
    );
};

export default Event;