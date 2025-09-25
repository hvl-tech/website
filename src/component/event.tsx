import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "./ui/carousel";

type CardProps = {
    datum: string;
    header: string;
    place: string;
    address: string;
    contain: string;
    link?: string;
    isLast?: boolean;
};

const Card = ({datum, header, place, address, contain, link, isLast}: CardProps) => {
    const cardContent = (
        <div
            className={`border-4 border-black shadow-[4px_4px_0px_#000] p-4 w-full h-full flex md:flex-row flex-col items-center justify-between md:gap-6 gap-3 max-w-[1120px] bg-white ${link ? 'hover:shadow-[6px_6px_0px_#000] cursor-pointer hover:bg-green-50' : ''}`}>
            <div
                className={`
  md:w-35 md:h-35 w-40 h-40 mb-4 md:mb-0 border-4 image-pixelated
  text-white ${isLast ? "bg-cyan-700" : "bg-green-700"}
  lg:text-4xl md:text-3xl text-4xl
  flex items-center justify-center text-center whitespace-pre-line
  font-['Press_Start_2P']
`}>
                {datum}
            </div>
            <div className='flex md:items-start items-center flex-col lg:w-2/3 w-full'>
                <h3 className={`md:text-xl ${isLast ? "text-cyan-700":"text-green-700"} font-['Press_Start_2P'] self-center md:self-auto`}>{header}</h3>
                <p className="font-bold mt-2 ">{place}</p>
                <p className='text-sm text-pretty'> {address}</p>
                <p className="italic">{contain}</p>
            </div>
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
    const {t} = useTranslation();

    const cardData = t('newEvent', {returnObjects: true}) as CardProps[];
    const [api, setApi] = useState<CarouselApi | undefined>(undefined);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => setCurrent(api.selectedScrollSnap()));
    }, [api]);
    return (
        <div
            className="bg-white gap-2.5 text-justify w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">Next Event</h2>
            <Carousel
                className="w-full"
                viewportClassName="px-6 md:px-10 min-h-[320px] md:min-h-[360px] lg:min-h-[380px]"
                setApi={setApi}
                opts={{ align: "center", containScroll: "trimSnaps" }}
            >
                <CarouselContent className="-ml-4 items-stretch">
                    {cardData.map((event: CardProps, index: number) => (
                        <CarouselItem
                            key={index}
                            className="pl-4 basis-[88%] sm:basis-[80%] md:basis-[75%] lg:basis-[70%]"
                        >
                            <div className="flex h-full justify-center">
                                <Card {...event} isLast={index === 1} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="mt-4 flex w-full items-center justify-between">
                    <CarouselPrevious className="border-4 border-black bg-white px-3 py-1 shadow-[4px_4px_0px_#000]" />
                    <CarouselNext className="border-4 border-black bg-white px-3 py-1 shadow-[4px_4px_0px_#000]" />
                </div>
                {count > 1 && (
                    <div className="mt-2 flex items-center justify-center gap-2">
                        {Array.from({ length: count }).map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`${i === current ? "bg-[#00274a]" : "bg-white"} border-2 border-[#00274a] w-2.5 h-2.5 rounded-full`}
                                onClick={() => api?.scrollTo(i)}
                            />
                        ))}
                    </div>
                )}
            </Carousel>
        </div>
    );
};

export default Event;
