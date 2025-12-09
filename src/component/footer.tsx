import { Link } from 'react-router-dom';
import text from '../assets/text.svg';
import logo from '../assets/logo/logo_no_text.svg';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Footer() {
    return (
        <footer className="h-12 w-full bg-[#00274a]">
            <div className='flex justify-center items-center gap-6 h-full w-full'>
                <div className='flex items-center'>
                    <MailOutlineIcon style={{ color: 'white', height: '15px' }} />
                    <img src={text} alt='email' style={{ height: '15px' }} />
                </div>
                <Link
                    to="/kids"
                    className="text-white text-xs font-['Press_Start_2P'] hover:text-green-400 transition-colors no-underline flex items-center gap-1"
                >
                    <img src={logo} alt="" className="h-4 brightness-0 invert" /> Kids
                </Link>
            </div>
        </footer>
    );
}
