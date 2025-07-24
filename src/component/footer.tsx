import text from '../assets/text.svg';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
export default function Footer() {
    return (
        <footer className="h-10 w-full bg-[#00274a]">
<div className='flex justify-center items-center h-full w-full'>
    <MailOutlineIcon style={{ color: 'white', height: '15px' }} />
    <img src={text} alt='email' style={{ height: '15px' }} />
</div>
        </footer>
    );
}
