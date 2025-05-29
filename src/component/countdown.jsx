import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

const Countdown = () => {
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
        eventMonth = 2,  // Month(0-based,  2 = March)
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
        <div className="countdown" id="countdown">
            <ul>
                <li><span id="days">{days}</span> {t('countdown.days', {count: days})}</li>
                <li><span id="hours">{hours}</span> {t('countdown.hours', {count: hours})}</li>
                <li><span id="minutes">{minutes}</span> {t('countdown.minutes', {count: minutes})}</li>
                <li><span id="seconds">{seconds}</span> {t('countdown.seconds', {count: seconds})}</li>
            </ul>
        </div>
            );
            };

            export default Countdown;