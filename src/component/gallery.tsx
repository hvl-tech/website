import { useState } from 'react';
import {useTranslation} from "react-i18next";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

//import slides
import kuchen from '@asset/galerie/firstSpeakersMeetup/kuchen.jpg'
import martinSpeaker from '@asset/galerie/firstSpeakersMeetup/martinSpeaker.jpg'
import vladislav2 from '@asset/galerie/firstSpeakersMeetup/vladislav2.jpg'
import ButtonPixel from "./ui/buttonPixel.tsx";

const Gallery = () => {
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const {t} = useTranslation();

    const images = [
        { src: martinSpeaker, alt: "Martin Speaker" },
        { src: vladislav2, alt: "Vladislav Speaker" },
        { src: kuchen, alt: "Kuchen" },
    ];

    const goPrev = () => {
        if (swiperRef) swiperRef.slidePrev();
    };

    const goNext = () => {
        if (swiperRef) swiperRef.slideNext();
    };

    const goToSlide = (index: number) => {
        if (swiperRef) swiperRef.slideTo(index);
    };

    return (
        <>
            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">{t('gallery.highline')}</h2>
        <div className="w-full max-w-[800px] mx-auto">
            <Swiper
                onSwiper={setSwiperRef}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                    type: 'fraction',
                }}
                navigation={false}
                modules={[Pagination, Navigation]}
                className="border-4 border-[#00274a] shadow-[8px_8px_0_#0d1b21]"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.src} alt={image.alt} className="w-full h-auto object-cover max-h-[500px] aspect-square" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Gallery */}
            <div className="overflow-hidden mt-6">
                <div
                    className="grid grid-cols-4 md:grid-cols-6 gap-4 transition-transform duration-300 ease-in-out"
                >
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`flex-shrink-0 border-4 transition-all duration-200 ${
                                activeIndex === index
                                    ? 'border-[#00274a] shadow-[4px_4px_0_#0d1b21]'
                                    : 'border-gray-400 opacity-70 hover:opacity-100'
                            }`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full object-cover cursor-pointer md:h-24 aspect-square"
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex md:gap-8 gap-3 justify-center mt-8">

                <ButtonPixel
                    onClick={goPrev}>
                    <ArrowBackIosIcon fontSize="medium" className='pb-1' />  Prev
                </ButtonPixel>

                <ButtonPixel
                    onClick={goNext}>
                    Next <ArrowForwardIosIcon fontSize="medium" className='pb-1' />
                </ButtonPixel>
            </div>
        </div>
        </>
    );
};

export default Gallery;
