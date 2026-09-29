import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PearMascot from "../component/PearMascot";
import PixelArt, { type SpriteName } from "../component/PixelArt";
import SiteLayout, { EMAIL, PixelIcon } from "../component/site/SiteLayout";
import { buildMailto } from "../utils/buildMailto";
import { useSeo } from "../utils/useSeo";
import "./speakers.css";

type Format = { icon: SpriteName; label: string; description: string };

// The email checklist, dressed up as the file a speaker would fill in.
const TALK_FIELDS = ["name", "title", "abstract", "format", "language", "bio"];

function SpeakersPage() {
    const { t } = useTranslation();
    useSeo({
        title: 'Call for Speakers · HVLtech: Share a talk in Falkensee',
        description: 'Submit a talk for the HVLtech meetup in Falkensee. Lightning, standard or workshop, in German or English. First-time speakers welcome.',
        path: '/speakers',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formats = t('callForSpeakers.formats', { returnObjects: true }) as Format[];
    const offer = t('callForSpeakers.offer', { returnObjects: true }) as string[];
    const emailContents = t('callForSpeakers.emailContents', { returnObjects: true }) as string[];
    const audienceFacts = t('callForSpeakers.audienceFacts', { returnObjects: true }) as string[];
    const mailto = buildMailto({
        to: EMAIL,
        subject: t('callForSpeakers.mailtoSubject'),
        body: t('callForSpeakers.mailtoBody'),
    });
    const submit = (
        <a className="pixel-button" href={mailto}>
            {t('callForSpeakers.buttonSubmit')} <PixelIcon kind="mail" />
        </a>
    );

    return (
        <SiteLayout className="speakers-page">
            <section className="page-hero speakers-hero" aria-labelledby="speakers-title">
                <div>
                    <p className="eyebrow">{t('callForSpeakers.eyebrow')}</p>
                    <h1 id="speakers-title">{t('callForSpeakers.headline')}</h1>
                    <p className="lede">{t('callForSpeakers.intro')}</p>
                    <div className="speakers-actions">
                        {submit}
                        <a className="text-link" href="#include">
                            {t('callForSpeakers.emailContentsTitle')} ↓
                        </a>
                    </div>
                </div>

                <figure className="talk-file" id="include" aria-labelledby="talk-file-caption">
                    <div className="talk-file-bar" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <strong>talk.yml</strong>
                    </div>
                    <ol>
                        {TALK_FIELDS.map((field, index) => (
                            <li key={field}>
                                <span className="key">
                                    {field}:
                                    {index === 0 && <span className="cursor" aria-hidden="true" />}
                                </span>
                                <span className="comment"># {emailContents[index]}</span>
                            </li>
                        ))}
                    </ol>
                    <figcaption id="talk-file-caption">{t('callForSpeakers.fileHint')}</figcaption>
                </figure>
            </section>

            <section className="page-section" aria-labelledby="audience-title">
                <p className="eyebrow">{t('callForSpeakers.audienceTitle')}</p>
                <p className="audience-text" id="audience-title">{t('callForSpeakers.audience')}</p>
                <ul className="chip-list">
                    {audienceFacts.map((fact) => (
                        <li key={fact}>{fact}</li>
                    ))}
                </ul>
            </section>

            <section className="page-section" aria-labelledby="formats-title">
                <h2 id="formats-title">{t('callForSpeakers.formatsTitle')}</h2>
                <div className="format-cards">
                    {formats.map((format) => (
                        <article key={format.label} className="pixel-card">
                            <PixelArt name={format.icon} className="format-art" />
                            <h3>{format.label}</h3>
                            <p>{format.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="page-section offer-section" aria-labelledby="offer-title">
                <div>
                    <h2 id="offer-title">{t('callForSpeakers.offerTitle')}</h2>
                    <ul className="offer-list">
                        {offer.map((item) => (
                            <li key={item}>
                                <PixelIcon kind="check" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="offer-mascot" aria-hidden="true">
                    <p className="speech">{t('callForSpeakers.cheer')}</p>
                    <PearMascot />
                </div>
            </section>

            <section className="page-section">
                <div className="speakers-cta">
                    <div>
                        <h2>{t('callForSpeakers.ready')}</h2>
                        <p>{t('callForSpeakers.selection')}</p>
                    </div>
                    <div className="speakers-actions">
                        {submit}
                        <Link className="text-link" to="/">
                            ← {t('callForSpeakers.backToMain')}
                        </Link>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}

export default SpeakersPage;
