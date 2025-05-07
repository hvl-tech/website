import './App.css'
import React, {useState} from "react";
import{useTranslation,Trans} from "react-i18next";
import i18n from './utils/i18n.js'
import Footer from "./component/footer.jsx";
import TranslateBtn from "./component/translateBtn.jsx";
import Countdown from "./component/countdown.jsx";
import AboutUs from "./component/aboutUs.jsx";


function App() {

    const{t} = useTranslation();


    return (
        <>
            <main>
                <section id="head-event">
                    <TranslateBtn/>
                    <div className="container">
                            <h1>Havelland Technology <br/> Meetup</h1>
                        <div className="content-header">
                            <Countdown/>
                            <button id="btn-joinUs">
                                <a href="https://www.meetup.com/de-DE/havelland-technology-falkensee/?eventOrigin=your_groups">
                                    {t('buttonJoinUs')}
                                </a>
                            </button>
                        </div>
                    </div>
                </section>
                <section id="uberUns">
                    <div className="container main">
                        <AboutUs/>
                    </div>
                        <div className="container main">

                            <h2>{t('whyTakePart.highline')}</h2>
                            <ul className="benefits">
                                <li>{t('whyTakePart.benefits1')}</li>
                                <li>{t('whyTakePart.benefits2')}</li>
                                <li>{t('whyTakePart.benefits3')}</li>
                                <li>{t('whyTakePart.benefits4')}</li>
                                <li>{t('whyTakePart.benefits5')}</li>
                            </ul>
                        </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default App
