import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo_no_text.svg";

function DatenschutzPage() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <Link
                to="/labs"
                className="fixed top-[34px] left-4 sm:left-8 md:left-12 lg:left-16 xl:left-1/2 xl:-translate-x-[560px] z-[60] bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 px-3 py-1.5 rounded-full text-xs font-semibold no-underline flex items-center gap-1.5 transition-colors"
            >
                ← <img src={logo} alt="" className="h-3.5 brightness-0 invert" /> Kids Labs
            </Link>

            <header className="bg-green-700 text-white py-16 px-4">
                <div className="max-w-[800px] mx-auto">
                    <h1 className="font-['Press_Start_2P'] text-xl md:text-2xl mb-3">
                        {t("datenschutz.title")}
                    </h1>
                    <p className="text-green-100 text-sm">
                        HVLtech Kids Labs
                    </p>
                </div>
            </header>

            <main className="max-w-[800px] mx-auto px-4 py-12 space-y-8 text-gray-800 leading-relaxed">
                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.responsible.title")}</h2>
                    <p>
                        Dana Hlavacova &amp; Martin Hlavac<br />
                        E-Mail: <a href="mailto:meetup@hvltech.de" className="text-green-700 underline">meetup@hvltech.de</a>
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.whatData.title")}</h2>
                    <p className="mb-2">{t("datenschutz.whatData.intro")}</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t("datenschutz.whatData.childName")}</li>
                        <li>{t("datenschutz.whatData.parentName")}</li>
                        <li>{t("datenschutz.whatData.phone")}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.purpose.title")}</h2>
                    <p>{t("datenschutz.purpose.text")}</p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.legalBasis.title")}</h2>
                    <p>{t("datenschutz.legalBasis.text")}</p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.recipients.title")}</h2>
                    <p>{t("datenschutz.recipients.text")}</p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.retention.title")}</h2>
                    <p>{t("datenschutz.retention.text")}</p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.rights.title")}</h2>
                    <p className="mb-2">{t("datenschutz.rights.intro")}</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t("datenschutz.rights.access")}</li>
                        <li>{t("datenschutz.rights.correction")}</li>
                        <li>{t("datenschutz.rights.deletion")}</li>
                        <li>{t("datenschutz.rights.restriction")}</li>
                        <li>{t("datenschutz.rights.complaint")}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.revocation.title")}</h2>
                    <p>{t("datenschutz.revocation.text")}</p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg text-green-800 mb-2">{t("datenschutz.authority.title")}</h2>
                    <p>{t("datenschutz.authority.text")}</p>
                </section>

                <section className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-500">{t("datenschutz.lastUpdated")}: 2026-03-29</p>
                </section>
            </main>

            <footer className="py-8 text-center">
                <Link
                    to="/labs"
                    className="inline-block font-['Press_Start_2P'] text-xs bg-[#fefefe] text-green-700 border-4 border-green-700 px-4 py-2 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline"
                >
                    ← Kids Labs
                </Link>
            </footer>
        </div>
    );
}

export default DatenschutzPage;
