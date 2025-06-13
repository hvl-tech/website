import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import de from "../translate/de";
import en from "../translate/en";

i18next
    .use(initReactI18next)
    .init({
        lng: 'en',
        resources: {
            en,
            de
        }
    });

export default i18next;
