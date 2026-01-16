import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DownloadIcon from "@mui/icons-material/Download";
import logo from "../assets/logo/logo_no_text.svg";

function KidsPage() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const agenda = t('kids.agenda', { returnObjects: true }) as Array<{
        time: string;
        title: string;
        description: string;
        icon: string;
    }>;

    const supervisors = t('kids.supervisors', { returnObjects: true }) as Array<{
        name: string;
        role: string;
    }>;

    const tools = t('kids.tools', { returnObjects: true }) as Array<{
        name: string;
        description: string;
    }>;

    const forParents = t('kids.forParents', { returnObjects: true }) as {
        supervisionTitle: string;
        supervisionText: string;
        safetyTitle: string;
        safetyText: string;
        pickupTitle: string;
        pickupText: string;
        bringTitle: string;
        bringText: string;
        emergencyTitle: string;
        emergencyText: string;
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white flex flex-col items-center justify-center px-4 py-12 relative">
                {/* Decorative pixels */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-8 h-8 bg-white"></div>
                    <div className="absolute top-20 right-20 w-4 h-4 bg-white"></div>
                    <div className="absolute bottom-32 left-1/4 w-6 h-6 bg-white"></div>
                    <div className="absolute top-1/3 right-10 w-3 h-3 bg-white"></div>
                    <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-white"></div>
                </div>

                <img src={logo} alt="HVLtech Logo" className="h-16 md:h-20 mb-4 brightness-0 invert" />

                <h1 className="font-['Press_Start_2P'] text-xl md:text-2xl lg:text-3xl text-center mb-3 leading-relaxed drop-shadow-lg">
                    {t('kids.title')}
                </h1>

                <p className="text-lg md:text-xl font-semibold mb-1 text-center text-green-100">
                    {t('kids.tagline')}
                </p>


                {/* Description */}
                <div className="max-w-2xl mx-auto mb-6 space-y-4 text-center">
                    <p className="text-base md:text-lg text-white/95 leading-relaxed">
                        {t('kids.description')}
                    </p>
                    <p className="text-base text-green-100 font-medium">
                        {t('kids.descriptionCta')}
                    </p>
                </div>

                {/* Event Info */}
                <div className="text-center mb-6 space-y-1">
                    <p className="text-xl md:text-2xl font-bold">
                        {t('kids.date')}
                    </p>
                    <p className="text-lg opacity-90">
                        {t('kids.time')} · {t('kids.location')}
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <a
                        href="mailto:meetup@hvltech.de?subject=Kids%20Workshop%20Anmeldung"
                        className="font-['Press_Start_2P'] text-sm md:text-base bg-white text-green-700 border-4 border-white px-8 py-4 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline flex items-center gap-3"
                    >
                        <MailOutlineIcon /> {t('kids.cta')}
                    </a>
                    <a
                        href="/anmeldung.pdf"
                        className="font-['Press_Start_2P'] text-sm md:text-base bg-green-900 text-white border-4 border-white px-8 py-4 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline flex items-center gap-3"
                    >
                        <DownloadIcon /> {t('kids.ctaPdf')}
                    </a>
                </div>

                <p className="text-sm opacity-90 text-center mb-4">
                    {t('kids.deadline')} · {t('kids.language')}
                </p>

                {/* Why free */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 max-w-lg">
                    <p className="text-sm text-green-100 text-center">
                        <span className="font-['Press_Start_2P'] text-xs text-green-300">{t('kids.free')}</span>
                        <br />
                       {/*<span className="text-xs opacity-90 mt-1 block">{t('kids.whyFree')}</span>*/}
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 animate-bounce">
                    <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Supervisors Section */}
            <section className="bg-gray-50 py-12">
                <div className="max-w-[900px] mx-auto px-4">
                    <h2 className="font-['Press_Start_2P'] text-lg md:text-xl text-green-700 mb-6 text-center">
                        {t('kids.supervisorsTitle')}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {supervisors.map((supervisor, i) => (
                            <div key={i} className="bg-white rounded-lg p-6 shadow-md border-2 border-green-100 text-center min-w-[200px]">
                                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-1">{supervisor.name}</h3>
                                <p className="text-sm text-gray-600">{supervisor.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Agenda Section */}
            <section className="max-w-[900px] mx-auto px-4 py-16">
                <h2 className="font-['Press_Start_2P'] text-lg md:text-xl text-green-700 mb-8 text-center">
                    {t('kids.agendaTitle')}
                </h2>

                <div className="space-y-6">
                    {agenda.map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-16 text-right">
                                <span className="font-['Press_Start_2P'] text-xs text-green-600">{item.time}</span>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
                                {item.icon}
                            </div>
                            <div className="flex-1 pb-6 border-b border-gray-100 last:border-0">
                                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tools explanation */}
                <div className="mt-12">
                    <h3 className="font-['Press_Start_2P'] text-base text-green-700 mb-6 text-center">
                        {t('kids.toolsTitle')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {tools.map((tool, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-5 border-2 border-gray-100">
                                <h4 className="font-semibold text-gray-800 mb-2">{tool.name}</h4>
                                <p className="text-sm text-gray-600">{tool.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements */}
                <div className="mt-10 bg-gray-50 rounded-lg p-4 text-sm text-center">
                    <span className="font-semibold text-gray-700">{t('kids.requirementsTitle')}:</span>{' '}
                    <span className="text-gray-600">{t('kids.requirementsText')}</span>
                </div>

                {/* Parent footnote */}
                <p className="mt-6 text-xs text-gray-500 text-center italic">
                    {t('kids.parentNote')}
                </p>
            </section>

            {/* What you'll create Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-[900px] mx-auto px-4">
                    <h2 className="font-['Press_Start_2P'] text-lg md:text-xl text-green-700 mb-6 text-center">
                        {t('kids.whatYoullCreateTitle')}
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        {t('kids.whatYoullCreateDescription')}
                    </p>

                    {/* Placeholder images grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center border-2 border-gray-300">
                                <div className="text-center px-4">
                                    <div className="text-4xl mb-2">🎮</div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {t('kids.examplePlaceholder')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Your result */}
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg p-6 border-2 border-green-100">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center shadow-[4px_4px_0_#1f4e3d] p-4">
                            <img src={logo} alt="Block" className="h-full w-full object-contain brightness-0 invert" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-['Press_Start_2P'] text-base text-green-700 mb-3">
                                {t('kids.result.title')}
                            </h3>
                            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t('kids.result.description') }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* For Parents Section */}
            <section className="py-16 bg-white">
                <div className="max-w-[900px] mx-auto px-4">
                    <h2 className="font-['Press_Start_2P'] text-lg md:text-xl text-green-700 mb-8 text-center">
                        {t('kids.forParentsTitle')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-100">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <span>👥</span> {forParents.supervisionTitle}
                            </h3>
                            <p className="text-sm text-gray-700">{forParents.supervisionText}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-100">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <span>🛡️</span> {forParents.safetyTitle}
                            </h3>
                            <p className="text-sm text-gray-700">{forParents.safetyText}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-100">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <span>🚗</span> {forParents.pickupTitle}
                            </h3>
                            <p className="text-sm text-gray-700">{forParents.pickupText}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-100">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <span>🎒</span> {forParents.bringTitle}
                            </h3>
                            <p className="text-sm text-gray-700">{forParents.bringText}</p>
                        </div>
                    </div>
                    <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 text-center">
                        <h3 className="font-semibold text-yellow-900 mb-2 flex items-center justify-center gap-2">
                            <span>📞</span> {forParents.emergencyTitle}
                        </h3>
                        <p className="text-sm text-yellow-800">{forParents.emergencyText}</p>
                    </div>
                </div>
            </section>

            {/* Why Havelland Tech Section */}
            <section className="bg-green-700 text-white py-16">
                <div className="max-w-[900px] mx-auto px-4 text-center">
                    <h3 className="font-semibold text-lg mb-4 opacity-90">
                        {t('kids.mission.title')}
                    </h3>
                    <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                        {t('kids.mission.description')}
                    </p>
                    <p className="font-['Press_Start_2P'] text-lg md:text-xl">
                        {t('kids.mission.slogan')}
                    </p>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-8 text-center">
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        {t('kids.footerContact')}:{' '}
                        <a href="mailto:meetup@hvltech.de" className="text-green-700 hover:text-green-800 font-semibold">
                            meetup@hvltech.de
                        </a>
                    </p>
                    <Link
                        to="/"
                        className="inline-block font-['Press_Start_2P'] text-xs bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-4 py-2 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline"
                    >
                        ← {t('kids.backToMain')}
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default KidsPage;
