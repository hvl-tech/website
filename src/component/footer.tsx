import text from '../assets/text.svg';
import hvltechLogo from '../assets/hvltech_logo.svg';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Footer() {
    return (
        <footer className="w-full bg-[#00274a] py-8 px-4">
            <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo Section */}
                <a
                    href="#head-event"
                    className="group flex items-center justify-center transition-transform hover:-translate-y-1"
                    aria-label="Back to top"
                >
                    <div className="border-4 border-white shadow-[4px_4px_0px_rgba(255,255,255,0.5)] bg-white p-3 transition-all group-hover:shadow-[6px_6px_0px_rgba(255,255,255,0.7)]">
                        <img
                            src={hvltechLogo}
                            alt="HVLtech Logo"
                            className="h-12 w-auto"
                        />
                    </div>
                </a>

                {/* Links Section */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Meetup Link */}
                    <a
                        href="https://www.meetup.com/de-DE/havelland-technology-falkensee/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline uppercase font-['Press_Start_2P'] bg-white text-[#00274a] border-4 border-white px-4 py-2 text-xs cursor-pointer shadow-[4px_4px_0_rgba(255,255,255,0.5)] transition-all duration-100 ease-in-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(255,255,255,0.7)]"
                    >
                        Join Meetup
                    </a>

                    {/* Email Section */}
                    <div className='flex items-center gap-2 bg-white/10 border-2 border-white/30 px-4 py-2 rounded'>
                        <MailOutlineIcon style={{ color: 'white', height: '15px' }} />
                        <img src={text} alt='email' style={{ height: '15px' }} />
                    </div>
                </div>
            </div>
        </footer>
    );
}
