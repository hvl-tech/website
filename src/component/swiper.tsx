
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../assets/galerie/IMG20250707184816.jpg';
import slide2 from '../assets/galerie/IMG20250707191955.jpg';
import slide3 from '../assets/galerie/IMG20250707182059.jpg';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import '../index.css';
// import required modules
import { Keyboard,EffectCoverflow, Pagination } from 'swiper/modules';


const MySwiper = () => {
    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                slideToClickedSlide={true}
                coverflowEffect={{
                    rotate: 10,
                    stretch: 0,
                    depth: 50,
                    modifier: 0,
                    slideShadows: false,
                }}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Keyboard]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slide1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2}  />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3}  />
                </SwiperSlide>
                <SwiperSlide>
                    Galierie
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default MySwiper;