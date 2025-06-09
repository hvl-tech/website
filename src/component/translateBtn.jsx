import React from 'react';
import de_svg from '../assets/de_flag.svg';
import en_svg from '../assets/en_flag.svg';
import i18n from "../utils/i18n.js";

const TranslateBtn = () => {

    const lngs={
        en:{nativeName: 'En',svg: <img src={en_svg} alt="English" width="24" />,
        },
        de:{nativeName: 'De',svg: <img src={de_svg} alt="Deutsch" width="24" />,
        }}



    return (
        <div className='flex gap-2.5 justify-end pt-2.5 pr-2.5 w-full h-12'>
            {Object.keys(lngs).map((lng) => (
                <button
                    className="cursor-pointer bg-transparent shadow-none border-none disabled:cursor-default disabled:p-1.5 disabled:bg-white disabled:text-[rgba(16,16,16,0.3)] disabled:border-2 disabled:border-[#00274a] disabled:shadow-[2px_2px_0_#0d1b21] disabled:transition-all disabled:duration-100 disabled:ease-in-out"
                    type="button"
                    key={lng}
                    onClick={() => i18n.changeLanguage(lng)}
                    disabled={i18n.resolvedLanguage === lng}
                >
                    {lngs[lng].svg}
                </button>
            ))}
        </div>
    );
};

export default TranslateBtn;
