import {useTranslation} from "react-i18next";
import pixelHavel from "./assets/pixel_havel.png";
import AboutUs from "./component/aboutUs";
import Countdown from "./component/countdown";
import Footer from "./component/footer";
import TranslateBtn from "./component/translateBtn";
import Event from "./component/event";


function App() {
    const {t} = useTranslation();

    return (
        <div className="">
            <main className="flex-1">
                <section
                    id="head-event"
                    className="bg-cover bg-center bg-no-repeat h-[598px] w-full max-w-[1120px] mx-auto"
                    style={{backgroundImage: `url(${pixelHavel})`}}
                >
                    <TranslateBtn/>
                    <div className="px-8 py-8 flex flex-col items-center justify-around h-[92%] w-full">
                        <h1 className="font-['Press_Start_2P'] font-normal text-[1.8rem] text-center text-[#00274a] drop-shadow-[0_0_10px_white]">
                            HVLtech
                        </h1>
                        <div className="flex flex-col items-center justify-center gap-5 w-full">
                            <Countdown/>
                            <a id="btn-joinUs"
                               href="https://www.meetup.com/de-DE/havelland-technology-falkensee/?eventOrigin=your_groups"
                               className="no-underline text-[#00274a] uppercase font-['Press_Start_2P'] bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-6 py-3 text-sm cursor-pointer shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 focus:outline-none focus:ring-0"
                            >
                                {t('buttonJoinUs')}
                            </a>
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
                        className="bg-white gap-2.5 text-justify w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
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

            </main>
            <Footer/>
        </div>
    )
}

function ListItem({children}: { children: React.ReactNode }) {
    return (
        <li className="pb-1.5 before:content-['■'] before:text-[#008000] before:inline-block before:w-[1.3em] before:ml-[-0.5em]">
            {children}
        </li>
    )
}

export default App
