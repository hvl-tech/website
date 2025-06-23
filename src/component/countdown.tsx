import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { nextMeetupDate } from '../next_meetup';

interface TimeLeft {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export default function Countdown() {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const formatNumber = (time: number): string => {
            const timeString = time.toString();
            return timeString.padStart(2, '0');
        };

        const updateCountdown = () => {
            const now = dayjs();
            const secondsUntilMeetup = nextMeetupDate.diff(now, 'seconds');
            console.log(secondsUntilMeetup);

            if (secondsUntilMeetup < 0) {
                setIsExpired(true);
                return;
            }

            const days = nextMeetupDate.diff(now, 'days');
            const hours = nextMeetupDate.diff(now, 'hours') % 24;
            const minutes = nextMeetupDate.diff(now, 'minutes') % 60;
            const seconds = nextMeetupDate.diff(now, 'seconds') % 60;

            setTimeLeft({
                days: formatNumber(days),
                hours: formatNumber(hours),
                minutes: formatNumber(minutes),
                seconds: formatNumber(seconds)
            });
        };

        // Update immediately
        updateCountdown();

        // Set up interval
        const interval = setInterval(updateCountdown, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    if (isExpired) {
        return null;
    }

    return (
        <div className="text-center">
            <div className="drop-shadow-[0_0_10px_black] text-white py-2.5 rounded-[5px] flex justify-center items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] mx-auto font-['Press_Start_2P'] font-normal">
                <div className="flex flex-col md:flex-row justify-center items-center w-full gap-2 md:gap-0">
                    {/* Days section */}
                    <div className="flex justify-center items-center md:pr-10">
                        <TextWithCaption
                            value={timeLeft.days}
                            label={t('countdown.days')}
                        />
                    </div>

                    {/* Time section (Hours:Minutes:Seconds) */}
                    <div className="flex justify-center items-center">
                        <ul className="list-none flex justify-center items-center flex-row">
                            <li>
                                <TextWithCaption
                                    value={timeLeft.hours}
                                    label={t('countdown.hours')}
                                />
                            </li>
                            <li>
                                <TextWithCaption
                                    value={":"}
                                    label={""}
                                />
                            </li>
                            <li>
                                <TextWithCaption
                                    value={timeLeft.minutes}
                                    label={t('countdown.minutes')}
                                />
                            </li>
                            <li>
                                <TextWithCaption
                                    value={":"}
                                    label={""}
                                />
                            </li>
                            <li>
                                <TextWithCaption
                                    value={timeLeft.seconds}
                                    label={t('countdown.seconds')}
                                    className="p-[4px] sm:p-[5px] md:p-[7px]"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TextWithCaption({ value, label, className = "" }: { value: string, label: string, className?: string }) {
    return (
        <div className={`flex justify-center items-center flex-col text-[0.4em] sm:text-[0.45em] md:text-[0.5em] ${className}`}>
            <span className="text-[3em] sm:text-[3.4em] md:text-[3.8em] min-w-[1.3em] text-center">{value}</span>
            {label}
        </div>
    );
}
