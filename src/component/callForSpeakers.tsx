import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { buildMailto } from "../utils/buildMailto";

function CallForSpeakers() {
    const { t } = useTranslation();

    const mailto = buildMailto({
        to: 'meetup@hvltech.de',
        subject: t('callForSpeakers.mailtoSubject'),
        body: t('callForSpeakers.mailtoBody'),
    });

    return (
        <div className="bg-white gap-4 text-center w-full px-8 py-8 flex flex-col items-center justify-around max-w-[1120px] mx-auto">
            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">
                {t('callForSpeakers.headline')}
            </h2>
            <p className="max-w-2xl leading-relaxed text-[#0d1b21]">
                {t('callForSpeakers.teaser')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mt-2">
                <a
                    href={mailto}
                    className="inline-flex font-['Press_Start_2P'] text-xs md:text-sm bg-[#27945c] text-white border-4 border-[#0d1b21] px-6 py-3 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline items-center gap-2"
                >
                    <MailOutlineIcon fontSize="small" /> {t('callForSpeakers.buttonSubmit')}
                </a>
                <Link
                    to="/speakers"
                    className="inline-flex font-['Press_Start_2P'] text-xs md:text-sm bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-6 py-3 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline items-center"
                >
                    {t('callForSpeakers.buttonLearnMore')} →
                </Link>
            </div>
        </div>
    );
}

export default CallForSpeakers;
