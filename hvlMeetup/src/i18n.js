import {initReactI18next}  from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";

const resources= {
    en:{
        translation: {
            date:'30.April um 18 Uhr',
            userMessagesUnread:'    Hello <1>Artur</1>, how are you <1>Artur</1?',
            AboutAs:{
                highline:'About us',
                description:'<p>Welcome to <i> Havelland Technology Meetup</i> the premier meetup group for software developers\n' +
                    '                        in\n' +
                    '                        Falkensee &\n' +
                    '                        the surrounding area! We believe that Falkensee is home to some of the best developers, and we\n' +
                    '                        invite all tech enthusiasts to join us. No matter what language or platform you work with,\n' +
                    '                        everyone is welcome here.</p>'
            }
        }
    },
    de:{
        translation: {

            date:'30.April um 18 Uhr',
            userMessagesUnread:'    Hallo <1>Artur</1>, wie gehts dir <1>Artur</1>?. ',
            AboutAs:{
                highline:'Über uns',
                description:' hallo :)'
            },

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