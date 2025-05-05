import './App.css'
import React, {useState} from "react";
import{useTranslation,Trans} from "react-i18next";
import i18n from './i18n'
import Footer from "./component/footer.jsx";
import TranslateSelected from "./component/translateSelected.jsx";


function App() {

    const{t} = useTranslation();

    const [days, setDays] = useState([])
    const [hours, setHours] = useState([])
    const [minutes, setMinutes] = useState([])
    const [seconds, setSeconds] = useState([])

    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth()+1).padStart(2, "0"),
        yyyy = today.getFullYear()

    const eventDay = 30,   // Event's Day(9. March)
        eventMonth = 3,  // Month(0-based,  2 = March)
        eventHour = 18,  // time (18:00)
        eventMinute = 0; // mini

    let eventDate = new Date(yyyy, eventMonth, eventDay, eventHour, eventMinute, 0);

    const countDown = eventDate.getTime();
    function seconds_with_leading_zeros(dt)
    {
        return (dt < 10 ? '0' : '')+dt;
    }
    const x = setInterval(function() {
        const now = new Date().getTime(),
            distance = countDown - now;

        setDays( seconds_with_leading_zeros(Math.floor(distance / day)));
       setHours(seconds_with_leading_zeros(Math.floor((distance % day) / hour)));
       setMinutes(seconds_with_leading_zeros(Math.floor((distance % hour) / minute)));
       setSeconds(seconds_with_leading_zeros(Math.floor((distance % minute) / second)));

        if (distance < 0) {
            document.getElementById("countdown").style.display = "none";
            clearInterval(x);
        }

    }, 1000);

    return (
        <>
            <main>

                <section id="head-event">
                    <TranslateSelected/>
                    <div className="container">
                        <h1>Havelland Technology <br/> Meetup</h1>

                        <div className="content-header">

                            <div className="countdown" id="countdown">
                                <ul>
                                    <ul>
                                    <li><span id="days">{days}</span> {t('days', {count: days})}</li>
                                        <li><span id="hours">{hours}</span> {t('hours', {count: hours})}</li>
                                        <li><span id="minutes">{minutes}</span> {t('minutes', {count: minutes})}</li>
                                        <li><span id="seconds">{seconds}</span> {t('seconds', {count: seconds})}</li>
                                    </ul>
                                </ul>
                            </div>

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

                        <h2>{t('aboutAs.highline')}</h2>
                        <Trans i18nKey='aboutAs.description'>
                            <p>Welcome to <i> Havelland Technology Meetup</i> the premier meetup group for software
                                developers
                                in
                                Falkensee &
                                the surrounding area! We believe that Falkensee is home to some of the best developers,
                                and we
                                invite all tech enthusiasts to join us. No matter what language or platform you work
                                with,
                                everyone is welcome here.</p>
                        </Trans>
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
