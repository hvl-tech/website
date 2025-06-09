import React from "react";
import { useTranslation } from "react-i18next";
import AboutUs from "./component/aboutUs.jsx";
import Countdown from "./component/countdown.jsx";
import Footer from "./component/footer.jsx";
import TranslateBtn from "./component/translateBtn.jsx";


function App() {

    const{t} = useTranslation();


    return (
        <div className="">
            <main className="flex-1">
                <section
                    id="head-event"
                    className="bg-cover bg-center bg-no-repeat h-[598px] w-full max-w-[1120px] mx-auto"
                    style={{backgroundImage: "url('../public/pixel_havel.png')"}}
                >
                    <TranslateBtn/>
                    <div className="px-8 py-8 flex flex-col items-center justify-around h-[92%] w-full">
                        <h1 className="font-['Press_Start_2P'] font-normal text-[1.8rem] text-center text-[#00274a] drop-shadow-[0_0_10px_white]">
                            Havelland Technology <br/> Meetup
                        </h1>
                        <div className="flex flex-col items-center justify-center gap-5 w-full">
                            <Countdown/>
                            <button
                                id="btn-joinUs"
                                className="font-['Press_Start_2P'] bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-6 py-3 text-sm cursor-pointer shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#0d1b21]"
                            >
                                <a
                                    href="https://www.meetup.com/de-DE/havelland-technology-falkensee/?eventOrigin=your_groups"
                                    className="no-underline text-[#00274a] uppercase"
                                >
                                    {t('buttonJoinUs')}
                                </a>
                            </button>
                        </div>
                    </div>
                </section>
                <section id="uberUns">
                    <div className="bg-white gap-2.5 text-justify w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
                        <AboutUs/>
                    </div>
                    <div className="bg-white gap-2.5 text-justify w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
                        <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">{t('whyTakePart.highline')}</h2>
                        <ul className="list-none pl-8 [-webkit-text-indent:-0.8em] text-indent-[-0.8em] w-full">
                            <li className="pb-1.5 before:content-['■'] before:text-green-500 before:inline-block before:w-[1.3em] before:ml-[-0.5em]">{t('whyTakePart.benefits1')}</li>
                            <li className="pb-1.5 before:content-['■'] before:text-green-500 before:inline-block before:w-[1.3em] before:ml-[-0.5em]">{t('whyTakePart.benefits2')}</li>
                            <li className="pb-1.5 before:content-['■'] before:text-green-500 before:inline-block before:w-[1.3em] before:ml-[-0.5em]">{t('whyTakePart.benefits3')}</li>
                            <li className="pb-1.5 before:content-['■'] before:text-green-500 before:inline-block before:w-[1.3em] before:ml-[-0.5em]">{t('whyTakePart.benefits4')}</li>
                            <li className="pb-1.5 before:content-['■'] before:text-green-500 before:inline-block before:w-[1.3em] before:ml-[-0.5em]">{t('whyTakePart.benefits5')}</li>
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default App
