import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SiteLayout, { EMAIL } from "../component/site/SiteLayout";
import { useSeo } from "../utils/useSeo";
import "./datenschutz.css";

const LAST_UPDATED = "2026-03-29";

function DatenschutzPage() {
    const { t } = useTranslation();
    useSeo({
        title: 'Datenschutz · HVLtech Kids Labs',
        description: 'Datenschutzerklärung für die HVLtech Kids Labs Workshops: welche Daten wir erheben, warum und wie lange wir sie speichern.',
        path: '/labs/datenschutz',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const list = (keys: string[]) => (
        <ul>
            {keys.map((key) => (
                <li key={key}>{t(key)}</li>
            ))}
        </ul>
    );

    const sections: { id: string; body: ReactNode }[] = [
        {
            id: "responsible",
            body: (
                <p>
                    Dana Hlavacova &amp; Martin Hlavac
                    <br />
                    E-Mail: <a className="text-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
            ),
        },
        {
            id: "whatData",
            body: (
                <>
                    <p>{t("datenschutz.whatData.intro")}</p>
                    {list(["datenschutz.whatData.childName", "datenschutz.whatData.parentName", "datenschutz.whatData.phone"])}
                </>
            ),
        },
        { id: "purpose", body: <p>{t("datenschutz.purpose.text")}</p> },
        { id: "legalBasis", body: <p>{t("datenschutz.legalBasis.text")}</p> },
        { id: "recipients", body: <p>{t("datenschutz.recipients.text")}</p> },
        { id: "retention", body: <p>{t("datenschutz.retention.text")}</p> },
        {
            id: "rights",
            body: (
                <>
                    <p>{t("datenschutz.rights.intro")}</p>
                    {list([
                        "datenschutz.rights.access",
                        "datenschutz.rights.correction",
                        "datenschutz.rights.deletion",
                        "datenschutz.rights.restriction",
                        "datenschutz.rights.complaint",
                    ])}
                </>
            ),
        },
        { id: "revocation", body: <p>{t("datenschutz.revocation.text")}</p> },
        { id: "authority", body: <p>{t("datenschutz.authority.text")}</p> },
    ];

    return (
        <SiteLayout className="privacy-page">
            <section className="page-hero" aria-labelledby="privacy-title">
                <p className="eyebrow">{t("datenschutz.eyebrow")}</p>
                <h1 id="privacy-title">{t("datenschutz.title")}</h1>
                <p className="privacy-updated">
                    {t("datenschutz.lastUpdated")}: <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>
                </p>
            </section>

            <div className="page-section privacy-body">
                <nav className="privacy-toc" aria-labelledby="privacy-toc-title">
                    <p className="eyebrow" id="privacy-toc-title">{t("datenschutz.contents")}</p>
                    <ol>
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a href={`#${section.id}`}>{t(`datenschutz.${section.id}.title`)}</a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="privacy-sections">
                    {sections.map((section, index) => (
                        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                            <span className="privacy-number" aria-hidden="true">{index + 1}</span>
                            <div>
                                <h2 id={`${section.id}-title`}>{t(`datenschutz.${section.id}.title`)}</h2>
                                {section.body}
                            </div>
                        </section>
                    ))}
                    <Link className="text-link privacy-back" to="/labs">
                        ← {t("datenschutz.back")}
                    </Link>
                </div>
            </div>
        </SiteLayout>
    );
}

export default DatenschutzPage;
