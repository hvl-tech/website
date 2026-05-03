import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo_no_text.svg";
import BorderedBox from "../component/borderedBox";
import MailtoCtaButton from "../component/ui/mailtoCtaButton";
import { useSeo } from "../utils/useSeo";
import { buildMailto } from "../utils/buildMailto";

type Format = { icon: string; label: string; description: string };

function SpeakersPage() {
    const { t } = useTranslation();
    useSeo({
        title: 'Call for Speakers — HVLtech: Share a talk in Falkensee',
        description: 'Submit a talk for the HVLtech meetup in Falkensee. Lightning, standard or workshop, in German or English — first-time speakers welcome.',
        path: '/speakers',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formats = t('callForSpeakers.formats', { returnObjects: true }) as Format[];
    const offer = t('callForSpeakers.offer', { returnObjects: true }) as string[];
    const emailContents = t('callForSpeakers.emailContents', { returnObjects: true }) as string[];

    const mailto = buildMailto({
        to: 'meetup@hvltech.de',
        subject: t('callForSpeakers.mailtoSubject'),
        body: t('callForSpeakers.mailtoBody'),
    });

    const submitLabel = t('callForSpeakers.buttonSubmit');

    return (
        <>
            <Link
                to="/"
                className="fixed top-[34px] left-4 sm:left-8 md:left-12 lg:left-16 xl:left-1/2 xl:-translate-x-[560px] z-[60] bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 px-3 py-1.5 rounded-full text-xs font-semibold no-underline flex items-center gap-1.5 transition-colors"
            >
                ← <img src={logo} alt="" className="h-3.5 brightness-0 invert" /> HVLtech
            </Link>

            <section className="bg-[#00274a] text-white">
                <div className="max-w-[1120px] mx-auto px-8 py-20 text-center">
                    <h1 className="font-['Press_Start_2P'] text-xl md:text-2xl lg:text-3xl leading-relaxed mb-6 [text-shadow:_2px_2px_0_#0d1b21,_4px_4px_0_#0d1b21]">
                        {t('callForSpeakers.headline')}
                    </h1>
                    <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 text-white/90">
                        {t('callForSpeakers.intro')}
                    </p>
                    <MailtoCtaButton href={mailto} label={submitLabel} />
                </div>
            </section>

            <section className="bg-white">
                <div className="max-w-[1120px] mx-auto px-8 py-12 text-center">
                    <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a] mb-4">
                        {t('callForSpeakers.audienceTitle')}
                    </h2>
                    <p className="max-w-2xl mx-auto leading-relaxed text-[#0d1b21]">
                        {t('callForSpeakers.audience')}
                    </p>
                </div>
            </section>

            <section className="bg-[#fefefe]">
                <div className="max-w-[1120px] mx-auto px-8 py-12">
                    <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a] mb-8 text-center">
                        {t('callForSpeakers.formatsTitle')}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-2">
                        {formats.map((format) => (
                            <BorderedBox key={format.label} className="bg-white p-6 flex flex-col">
                                <div className="text-3xl mb-3" aria-hidden="true">{format.icon}</div>
                                <h3 className="font-['Press_Start_2P'] text-xs text-[#00274a] mb-3 leading-relaxed">
                                    {format.label}
                                </h3>
                                <p className="text-sm text-[#0d1b21] leading-relaxed">
                                    {format.description}
                                </p>
                            </BorderedBox>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="max-w-[1120px] mx-auto px-8 py-12">
                    <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a] mb-6 text-center">
                        {t('callForSpeakers.offerTitle')}
                    </h2>
                    <ul className="list-none pl-8 max-w-2xl mx-auto [text-indent:-0.8em]">
                        {offer.map((item) => (
                            <li key={item} className="pb-1.5 before:content-['■'] before:text-[#008000] before:inline-block before:w-[1.3em] before:ml-[-0.5em]">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="bg-[#fefefe]">
                <div className="max-w-[1120px] mx-auto px-8 py-12">
                    <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a] mb-6 text-center">
                        {t('callForSpeakers.emailContentsTitle')}
                    </h2>
                    <BorderedBox className="bg-white p-6 max-w-2xl mx-auto">
                        <ol className="list-decimal pl-6 space-y-2 text-[#0d1b21]">
                            {emailContents.map((item) => (
                                <li key={item} className="leading-relaxed">{item}</li>
                            ))}
                        </ol>
                    </BorderedBox>
                    <p className="text-center text-sm italic text-[#0d1b21] mt-6 max-w-2xl mx-auto">
                        {t('callForSpeakers.selection')}
                    </p>
                </div>
            </section>

            <section className="bg-white">
                <div className="max-w-[1120px] mx-auto px-8 py-16 text-center">
                    <MailtoCtaButton href={mailto} label={submitLabel} />
                    <div className="mt-8">
                        <Link
                            to="/"
                            className="inline-block font-['Press_Start_2P'] text-xs bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-4 py-2 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline"
                        >
                            ← {t('callForSpeakers.backToMain')}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SpeakersPage;
