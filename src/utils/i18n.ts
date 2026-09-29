import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import de from "../translate/de";
import en from "../translate/en";

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'de',
        supportedLngs: ['de', 'en'],
        nonExplicitSupportedLngs: true,
        load: 'languageOnly',
        detection: {
            // ?lng=en overrides, a manual switch is remembered, otherwise follow the browser.
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lng',
            caches: ['localStorage'],
        },
        resources: {
            en,
            de
        }
    });

export default i18next;
