type DateProps = {
    day: number,
    month: number,
    year: number,
    time: number
}
const DateMeetup = ({day, month, year, time}:DateProps) => {
    return (
        <div className='font-["Press_Start_2P"] drop-shadow-[0_0_5px_black] text-white py-2.5 rounded-[5px] text-[0.8em] sm:text-[1em] md:text-[1em]'>
            <p>{day}. {month} {year} um {time} Uhr </p>
        </div>
    );
};

export default DateMeetup;