import {initReactI18next}  from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";
import de from "../translate/de.js";
import en from "../translate/en.js";



i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
   resources: {
            en,
            de
        }
    })

export default i18next