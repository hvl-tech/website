import React from 'react';
import i18n from "../utils/i18n.js";
import de_svg from '../assets/de_flag.svg';
import en_svg from '../assets/en_flag.svg';

const TranslateBtn = () => {

    const lngs={
        en:{nativeName: 'En',svg: <img src={en_svg} alt="English" width="24" />,
        },
        de:{nativeName: 'De',svg: <img src={de_svg} alt="Deutsch" width="24" />,
        }}



    return (
        <div className='nav'>
            {Object.keys(lngs).map((lng) => (
                <button
                    className="translate-btn"
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