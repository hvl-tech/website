import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const Countdown = () => {
    const{t} = useTranslation();

    const [days, setDays] = useState([])
    const [hours, setHours] = useState([])
    const [minutes, setMinutes] = useState([])
    const [seconds, setSeconds] = useState([])

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const today = new Date();
    const yyyy = today.getFullYear();

    const eventDay = 30;   // Event's Day(30. March)
    const eventMonth = 2;  // Month(0-based,  2 = March)
    const eventHour = 18;  // time (18:00)
    const eventMinute = 0; // mini

    const eventDate = new Date(yyyy, eventMonth, eventDay, eventHour, eventMinute, 0);

    const countDown = eventDate.getTime();

    const seconds_with_leading_zeros = (dt) => {
        return (dt < 10 ? '0' : '')+dt;
    }

    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDown - now;

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
        <div className="drop-shadow-[0_0_10px_black] text-white py-2.5 rounded-[5px] flex justify-center items-center w-[280px] font-['Press_Start_2P'] font-normal" id="countdown">
            <ul className="list-none flex justify-center items-center flex-row">
                <li className="flex justify-center items-center flex-col p-[7px] text-[0.5em]">
                    <span className="text-[3.8em] min-w-[1.3em] text-center" id="days">{days}</span>
                    {t('countdown.days', {count: days})}
                </li>
                <li className="flex justify-center items-center flex-col p-[7px] text-[0.5em]">
                    <span className="text-[3.8em] min-w-[1.3em] text-center" id="hours">{hours}</span>
                    {t('countdown.hours', {count: hours})}
                </li>
                <li className="flex justify-center items-center flex-col p-[7px] text-[0.5em]">
                    <span className="text-[3.8em] min-w-[1.3em] text-center" id="minutes">{minutes}</span>
                    {t('countdown.minutes', {count: minutes})}
                </li>
                <li className="flex justify-center items-center flex-col p-[7px] text-[0.5em]">
                    <span className="text-[3.8em] min-w-[1.3em] text-center" id="seconds">{seconds}</span>
                    {t('countdown.seconds', {count: seconds})}
                </li>
            </ul>
        </div>
    );
};

export default Countdown;
