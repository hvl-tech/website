import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navigation() {
    const { t } = useTranslation();

    return (
        <nav className="fixed top-4 left-4 z-50 flex gap-4">
            <Link
                to="/"
                className="no-underline uppercase font-['Press_Start_2P'] bg-[#fefefe] text-[#00274a] border-2 border-[#00274a] px-4 py-2 text-xs cursor-pointer shadow-[2px_2px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 focus:outline-none focus:ring-0"
            >
                {t('navigation.home')}
            </Link>
            <Link
                to="/kids-labs"
                className="no-underline uppercase font-['Press_Start_2P'] bg-[#fefefe] text-[#00274a] border-2 border-[#00274a] px-4 py-2 text-xs cursor-pointer shadow-[2px_2px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 focus:outline-none focus:ring-0"
            >
                {t('navigation.kidsLabs')}
            </Link>
        </nav>
    );
}

export default Navigation;
