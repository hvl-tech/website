import {useTranslation} from "react-i18next";
import pixelHavel from "../assets/pixel_havel.png";
import pearLogo from "../assets/logo/logo_no_text.svg";
import AboutUs from "../component/aboutUs";
import Event from "../component/event";
import Gallery from "../component/gallery";
import Countdown from "../component/countdown";
import AnimatedPixelBackground from "../component/AnimatedPixelBackground";
import { useSeo } from "../utils/useSeo";


function HomePage() {
    const {t} = useTranslation();
    useSeo({
        title: 'Havelland Tech Community — Meetup for Developers in Falkensee',
        description: 'A friendly monthly meetup for developers, makers and tech enthusiasts in Falkensee and the Havelland region. Free talks, workshops and Kids Labs.',
        path: '/',
    });

    return (
        <>
            <section
                id="head-event"
                className="relative h-[598px] w-full overflow-hidden bg-white"
            >
                <AnimatedPixelBackground
                    imageSrc={pixelHavel}
                    logoSrc={pearLogo}
                    pixelSize={8}
                    className="absolute inset-0 w-full h-full"
                    height={598}
                />
                <div className="relative z-10 max-w-[1120px] mx-auto">
                    <div className="px-8 flex flex-col items-center h-[598px] w-full">
                        <div className="h-[280px]" />
                        <h1 className="font-['Press_Start_2P'] font-normal text-[2.2rem] text-center text-[#27945c] [text-shadow:_3px_3px_0_#000,_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_0_3px_0_#000,_3px_0_0_#000,_0_-2px_0_#000,_-2px_0_0_#000,_0_0_25px_rgba(0,0,0,0.8)]">
                            HVLtech
                        </h1>
                        <div className="flex flex-col items-center gap-5 mt-5">
                            <Countdown />
                            <a
                                id="btn-joinUs"
                                href="https://www.meetup.com/de-DE/havelland-technology-falkensee/?eventOrigin=your_groups"
                                className="no-underline uppercase font-['Press_Start_2P'] bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-6 py-3 text-sm cursor-pointer shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 focus:outline-none focus:ring-0"
                            >
                                {t('buttonJoinUs')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="nextEvent">
                <Event/>
            </section>

            <section id="uberUns">
                <div
                    className="bg-white gap-2.5 text-center w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
                    <AboutUs/>
                </div>
                <div
                    className="bg-white gap-2.5 w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
                    <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">{t('whyTakePart.highline')}</h2>
                    <ul className="list-none pl-8 [-webkit-text-indent:-0.8em] text-indent-[-0.8em]">
                        <ListItem>{t('whyTakePart.benefits1')}</ListItem>
                        <ListItem>{t('whyTakePart.benefits2')}</ListItem>
                        <ListItem>{t('whyTakePart.benefits3')}</ListItem>
                        <ListItem>{t('whyTakePart.benefits4')}</ListItem>
                        <ListItem>{t('whyTakePart.benefits5')}</ListItem>
                    </ul>
                </div>
            </section>

            <section>
                <div
                    className="bg-white gap-2.5 text-center w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
                    <Gallery/>
                </div>
            </section>
        </>
    )
}

function ListItem({children}: { children: React.ReactNode }) {
    return (
        <li className="pb-1.5 before:content-['■'] before:text-[#008000] before:inline-block before:w-[1.3em] before:ml-[-0.5em]">
            {children}
        </li>
    )
}

export default HomePage
