import {initReactI18next}  from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";


const resources= {
    en: {
        translation: {
            buttonJoinUs:'join us!',
            aboutAs: {
                highline: 'About us',
                description: '<0>Welcome to <1> Havelland Technology Meetup</1> the premier meetup group for software developers\n' +
                    '                        in\n' +
                    '                        Falkensee &\n' +
                    '                        the surrounding area! We believe that Falkensee is home to some of the best developers, and we\n' +
                    '                        invite all tech enthusiasts to join us. No matter what language or platform you work with,\n' +
                    '                        everyone is welcome here.</0>'
            },
            whyTakePart: {
                highline:'Why take part?',
                benefits1:'Free to attend, open to all tech stacks and experience levels',
                benefits2:'Build your local network – friendly and relaxed atmosphere',
                benefits3:'Discover new technologies',
                benefits4:'Get inspired by talks, demos, and conversations',
                benefits5:'Connect with developers from the region',

                        }
        }
    },
    de: {
        translation: {
            buttonJoinUs:'sei dabei!',
            aboutAs: {
                highline: 'Über uns',
                description: '<0>Willkommen bei <1> Havelland Technology Meetup</1> der führenden Meetup-Gruppe für Softwareentwickler*innen in Falkensee und Umgebung!\n'
                    +
                    '  Wir sind überzeugt, dass in Falkensee einige der besten Entwicklerinnen zu Hause sind, und laden alle Technikbegeisterten herzlich ein, mitzumachen.\n'
                    +
                    ' Egal, mit welcher Sprache oder Plattform du arbeitest – bei uns ist jeder willkommen.</0>'
            },
            whyTakePart:{
                highline:'Warum mitmachen?',
                benefits1:'Kostenlose Teilnahme, offen für alle Technologien und Erfahrungsstufen',
                benefits2:'Bau dein lokales Netzwerk auf – freundliche und entspannte Atmosphäre',
                benefits3:'Entdecke neue Technologien',
                benefits4:'Lass dich von Vorträgen, Demos und Gesprächen inspirieren',
                benefits5:'Vernetze dich mit Entwickler*innen aus der Region',

            }
        }
    }
}
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        resources,
    })

export default i18next