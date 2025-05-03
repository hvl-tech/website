import './App.css'
import {useState} from "react";
import{useTranslation,Trans} from "react-i18next";
import i18n from './i18n'


function App() {

    const{t} = useTranslation();
    const lngs={
    en:{nativeName: 'English'},
    de:{nativeName: 'Deutsch'}
    }

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
        <main>
            <div>
                {Object.keys(lngs).map((lng) => (
                    <button
                        type="button"
                        key={lng}
                        onClick={() => i18n.changeLanguage(lng)}
                        disabled={i18n.resolvedLanguage === lng}
                    >
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
            <section id="head-event">
                <div className="container">
                    <h1>Havelland Technology <br/> Meetup</h1>

                    <div className="content-header">

                        <div className="countdown" id="countdown">
                            <ul>
                                <ul>
                                    <li><span id="days">{days}</span> {t('days', {count:days})}</li>
                                    <li><span id="hours">{hours}</span> {t('hours', {count: hours})}</li>
                                    <li><span id="minutes">{minutes}</span> {t('minutes', {count: minutes})}</li>
                                    <li><span id="seconds">{seconds}</span> {t('seconds', {count: seconds})}</li>
                                </ul>
                            </ul>
                        </div>
                        <p>{t('date')}</p>
                        <button id="btn-joinUs">
                            <a href="https://www.meetup.com/de-DE/havelland-technology-falkensee/events/307163232/?eventOrigin=group_upcoming_events">
                                JOIN US!
                            </a>
                        </button>
                    </div>
                </div>
            </section>
            <section id="uberUns">
                <div className="container main">

                    <h2>{t('AboutAs.highline')}</h2>{t('AboutAs.description')}
                    <Trans i18nKey="userMessagesUnread">
                        Hello <strong>Artur</strong>, you have unread message(s) <strong>Artur</strong>.

                    </Trans>
                    <p>Welcome to <i> Havelland Technology Meetup</i> the premier meetup group for software developers
                        in
                        Falkensee &
                        the surrounding area! We believe that Falkensee is home to some of the best developers, and we
                        invite all tech enthusiasts to join us. No matter what language or platform you work with,
                        everyone is welcome here.</p>

                </div>

                <div className="container main">

                    <h2>Why take part?</h2>

                    <ul className="benefits">

                        <li>Free to attend, open to all tech stacks and experience levels</li>
                        <li>Build your local network – friendly and relaxed atmosphere</li>
                        <li>Discover new technologies</li>
                        <li>Get inspired by talks, demos, and conversations</li>
                        <li>Connect with developers from the region</li>

                    </ul>

                </div>

            </section>
            <section id="event-ort">
                <div className="container main">
                    <h2>Next meetup</h2>
                    <div id="meetup-data">
                        <p>April 30th, 6 PM</p>
                        <p>China Restaurant Falkensee Garten</p>
                        <p> Max-Liebermann-Str. 33, 14612 Falkensee</p>
                    </div>
                    <div></div>
                    <button id="btn-map"><a
                        href="https://www.google.com/maps/place/Max-Liebermann-Stra%C3%9Fe+33,+14612+Falkensee/@52.5648628,13.0392382,14.94z/data=!4m6!3m5!1s0x47a8fbe6c1a6942d:0x78ae1bbf6376e307!8m2!3d52.5656303!4d13.0484793!16s%2Fg%2F11bw3_l8vz?entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoJLDEwMjExNjM5SAFQAw%3D%3D">
                        <div id="map"></div>
                    </a></button>

                </div>
            </section>
        </main>
    )
}

export default App
