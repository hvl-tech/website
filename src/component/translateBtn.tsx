import React from 'react';
import de_svg from '../assets/de_flag.svg';
import en_svg from '../assets/en_flag.svg';
import i18n from "../utils/i18n";

type Language = {
    nativeName: string;
    svg: React.JSX.Element;
};

type Languages = {
    [key: string]: Language;
};

export default function TranslateBtn() {
    const lngs: Languages = {
        en: {
            nativeName: 'En',
            svg: <img src={en_svg} alt="English" width="24" />,
        },
        de: {
            nativeName: 'De',
            svg: <img src={de_svg} alt="Deutsch" width="24" />,
        }
    };

    const handleLanguageChange = (lng: string): void => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='flex gap-2.5 justify-end pt-2.5 pr-2.5 w-full h-12'>
            {Object.keys(lngs).map((lng: string) => (
                <button
                    className="cursor-pointer bg-transparent shadow-none border-none disabled:cursor-default p-1.5 disabled:bg-white disabled:text-[rgba(16,16,16,0.3)] disabled:border-2 disabled:border-[#00274a] disabled:shadow-[2px_2px_0_#0d1b21] disabled:transition-all disabled:duration-100 disabled:ease-in-out hover:bg-white hover:text-[#00274a] hover:border-2 hover:border-[#00274a] hover:shadow-[2px_2px_0_#0d1b21] hover:transition-all hover:duration-100 hover:ease-in-out hover:scale-105"
                    type="button"
                    key={lng}
                    onClick={() => handleLanguageChange(lng)}
                    disabled={i18n.resolvedLanguage === lng}
                >
                    {lngs[lng].svg}
                </button>
            ))}
        </div>
    );
}
