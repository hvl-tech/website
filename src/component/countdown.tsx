import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function Countdown() {
    const { t } = useTranslation();

    const [days, setDays] = useState<string>('')
    const [hours, setHours] = useState<string>('')
    const [minutes, setMinutes] = useState<string>('')
    const [seconds, setSeconds] = useState<string>('')

    const second: number = 1000;
    const minute: number = second * 60;
    const hour: number = minute * 60;
    const day: number = hour * 24;

    const today: Date = new Date();
    const yyyy: number = today.getFullYear();

    const eventDay: number = 7;   // Event's Day(30. March)
    const eventMonth: number = 6;  // Month(0-based,  2 = March)
    const eventHour: number = 18;  // time (18:00)
    const eventMinute: number = 0; // mini

    const eventDate: Date = new Date(yyyy, eventMonth, eventDay, eventHour, eventMinute, 0);

    const countDown: number = eventDate.getTime();

    const seconds_with_leading_zeros = (dt: number): string => {
        return (dt < 10 ? '0' : '') + dt;
    }

    const x = setInterval(() => {
        const now: number = new Date().getTime();
        const distance: number = countDown - now;

        setDays(seconds_with_leading_zeros(Math.floor(distance / day)));
        setHours(seconds_with_leading_zeros(Math.floor((distance % day) / hour)));
        setMinutes(seconds_with_leading_zeros(Math.floor((distance % hour) / minute)));
        setSeconds(seconds_with_leading_zeros(Math.floor((distance % minute) / second)));

        if (distance < 0) {
            const countdownElement = document.getElementById("countdown");
            if (countdownElement) {
                countdownElement.style.display = "none";
            }
            clearInterval(x);
        }

    }, 1000);

    return (
        <div className="drop-shadow-[0_0_10px_black] text-white py-2.5 rounded-[5px] flex justify-center items-center w-[280px] font-['Press_Start_2P'] font-normal" id="countdown">
            <ul className="list-none flex justify-center items-center flex-row">
                <li className="flex justify-center items-center flex-col p-[7px] text-[0.5em]">
                    <span className="text-[3.8em] min-w-[1.3em] text-center" id="days">{days}</span>
                    {t('countdown.days')}
                </li>
                <li className="flex justify-center items-center flex-col p-[7px] text-[0.5em]">
                    <span className="text-[3.8em] min-w-[1.3em] text-center" id="hours">{hours}</span>
                    {t('countdown.hours')}
                </li>
                <li className="flex justify-center items-center flex-col p-[7px] text-[0.5em]">
                    <span className="text-[3.8em] min-w-[1.3em] text-center" id="minutes">{minutes}</span>
                    {t('countdown.minutes')}
                </li>
                <li className="flex justify-center items-center flex-col p-[7px] text-[0.5em]">
                    <span className="text-[3.8em] min-w-[1.3em] text-center" id="seconds">{seconds}</span>
                    {t('countdown.seconds')}
                </li>
            </ul>
        </div>
    );
}
