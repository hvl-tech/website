
import slide1 from '../assets/galerie/IMG20250707184816.jpg';
import slide2 from '../assets/galerie/IMG20250707191955.jpg';
import slide3 from '../assets/galerie/IMG20250707182059.jpg';
const slideData = [
    {
        src: slide1,
        alt: 'Slide 1',
    },
    {
        src: slide2,
        alt: 'Slide 2',
    },
    {
        src: slide3,
        alt: 'Slide 2',
    }
]

const Galerie = () => {

    return (
        <div>

            {slideData.map((slide) => (
                <img src={slide.src} alt={slide.alt}/>
            ))}

            </div>
    );
};

export default Galerie;