import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo/logo_no_text.svg";
import heroImg from "../assets/kids-hero.jpg";

interface GalleryItem {
    src: string;
    alt: string;
    caption?: string;
}

const electronicsPhotos: GalleryItem[] = [
    { src: '/photos/kids-labs/electronics/IMG_2124.jpg', alt: 'Paper circuit with LED', caption: 'Ein fertiger Papier-Schaltkreis: Kupferband verbindet die Knopfbatterie mit der LED – und sie leuchtet!' },
    { src: '/photos/kids-labs/electronics/lamp.jpeg', alt: 'Glowing lamp card', caption: 'Eine leuchtende Lampen-Karte – so könnte dein fertiges Projekt aussehen!' },
];

const minecraftPhotos: GalleryItem[] = [
    { src: '/photos/kids-labs/minecraft/custom-blocks.png', alt: 'Custom blocks in Minecraft', caption: 'Eigene Blöcke mit dem HVLtech-Birnen-Design – live in Minecraft!' },
    { src: '/photos/kids-labs/minecraft/birnen-schwert.png', alt: 'Birnen-Schwert presentation', caption: 'Das Birnen-Schwert mit Spezialeffekten – wähle deine eigene Fähigkeit!' },
    { src: '/photos/kids-labs/minecraft/intellij.png', alt: 'Code in IntelliJ', caption: 'So sieht der Java-Code für deinen Block aus – mit KI-Unterstützung ganz einfach!' },
];

function PhotoGallery({ photos, placeholderIcon }: { photos: GalleryItem[]; placeholderIcon: string }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        if (selectedIndex === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedIndex(null);
            if (e.key === 'ArrowRight') setSelectedIndex(i => i !== null ? Math.min(i + 1, photos.length - 1) : null);
            if (e.key === 'ArrowLeft') setSelectedIndex(i => i !== null ? Math.max(i - 1, 0) : null);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [selectedIndex, photos.length]);

    return (
        <>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
                {photos.map((photo, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedIndex(i)}
                        className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 hover:border-green-400 transition-colors cursor-pointer"
                    >
                        {photo.src ? (
                            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-2xl opacity-25">{placeholderIcon}</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
                    onClick={() => setSelectedIndex(null)}
                >
                    <div
                        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            {photos[selectedIndex].src ? (
                                <img
                                    src={photos[selectedIndex].src}
                                    alt={photos[selectedIndex].alt}
                                    className="w-full max-h-[60vh] object-contain bg-gray-50"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                                    <span className="text-5xl opacity-20">{placeholderIcon}</span>
                                </div>
                            )}
                            <button
                                onClick={() => setSelectedIndex(null)}
                                className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                <CloseIcon fontSize="small" />
                            </button>
                        </div>
                        {photos[selectedIndex].caption && (
                            <div className="p-4 border-t border-gray-100">
                                <p className="text-sm text-gray-700 leading-relaxed">{photos[selectedIndex].caption}</p>
                            </div>
                        )}
                        <div className="flex justify-between px-4 pb-4">
                            <button
                                onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                                disabled={selectedIndex === 0}
                                className="text-sm text-green-700 font-semibold disabled:opacity-30 disabled:cursor-default hover:text-green-800"
                            >
                                ← Prev
                            </button>
                            <span className="text-xs text-gray-400">{selectedIndex + 1} / {photos.length}</span>
                            <button
                                onClick={() => setSelectedIndex(Math.min(photos.length - 1, selectedIndex + 1))}
                                disabled={selectedIndex === photos.length - 1}
                                className="text-sm text-green-700 font-semibold disabled:opacity-30 disabled:cursor-default hover:text-green-800"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function KidsPage() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const track1Highlights = t('kids.track1.highlights', { returnObjects: true }) as string[];

    const track2Steps = t('kids.track2.steps', { returnObjects: true }) as Array<{
        icon: string;
        label: string;
    }>;

    const track2Prep = t('kids.track2.prep', { returnObjects: true }) as Array<{
        name: string;
        detail: string;
        link: string;
    }>;

    const registrationSteps = t('kids.registrationSteps', { returnObjects: true }) as string[];
    const registrationRef = useRef<HTMLHeadingElement>(null);
    const [flash, setFlash] = useState(false);

    const scrollToRegistration = () => {
        registrationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            setFlash(true);
            setTimeout(() => setFlash(false), 1500);
        }, 600);
    };

    const forParents = t('kids.forParents', { returnObjects: true }) as {
        stayTitle: string;
        stayText: string;
        supervisionTitle: string;
        supervisionText: string;
        safetyTitle: string;
        safetyText: string;
        pickupTitle: string;
        pickupText: string;
        emergencyTitle: string;
        emergencyText: string;
        photosTitle: string;
        photosText: string;
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Back to homepage */}
            <Link
                to="/"
                className="fixed top-[34px] left-4 sm:left-8 md:left-12 lg:left-16 xl:left-1/2 xl:-translate-x-[560px] z-[60] bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 px-3 py-1.5 rounded-full text-xs font-semibold no-underline flex items-center gap-1.5 transition-colors"
            >
                ← <img src={logo} alt="" className="h-3.5 brightness-0 invert" /> HVLtech
            </Link>

            {/* Hero Section */}
            <section className="min-h-[70vh] text-white flex items-center px-4 py-12 relative overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0">
                    <img src={heroImg} alt="" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/75 to-green-900/40"></div>
                </div>

                {/* Content – left-aligned */}
                <div className="relative z-10 max-w-[1000px] mx-auto w-full">
                    <div className="max-w-lg">
                        <img src={logo} alt="HVLtech Logo" className="h-14 md:h-18 mb-4 brightness-0 invert drop-shadow-lg" />

                        <h1 className="font-['Press_Start_2P'] text-2xl md:text-3xl lg:text-4xl mb-3 leading-relaxed [text-shadow:_2px_2px_0_#0d1b21,_4px_4px_0_#0d1b21]">
                            {t('kids.title')}
                        </h1>

                        <p className="text-lg md:text-xl font-semibold mb-1 text-green-100 [text-shadow:_1px_1px_0_#0d1b21]">
                            {t('kids.tagline')}
                        </p>

                        <p className="text-base md:text-lg text-white/95 leading-relaxed mb-6 [text-shadow:_1px_1px_0_rgba(0,0,0,0.5)]">
                            {t('kids.description')}
                        </p>

                        {/* Event Info */}
                        <div className="mb-6 space-y-1">
                            <p className="text-xl md:text-2xl font-bold [text-shadow:_1px_1px_0_#0d1b21]">
                                {t('kids.date')}
                            </p>
                            <p className="text-lg opacity-90">
                                {t('kids.time')}
                            </p>
                            <p className="text-base opacity-80">
                                {t('kids.location')} · {t('kids.locationDetail')}
                            </p>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={scrollToRegistration}
                            className="inline-flex font-['Press_Start_2P'] text-sm md:text-base bg-white text-green-700 border-4 border-white px-8 py-4 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 cursor-pointer items-center gap-3 mb-4"
                        >
                            <MailOutlineIcon /> {t('kids.cta')}
                        </button>

                        <p className="text-sm opacity-90 mb-4">
                            {t('kids.language')}
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 inline-block">
                            <span className="font-['Press_Start_2P'] text-xs text-green-300">{t('kids.free')}</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Tracks Section */}
            <section className="py-16">
                <div className="max-w-[1100px] mx-auto px-4">
                    <h2 className="font-['Press_Start_2P'] text-lg md:text-xl text-green-700 mb-10 text-center">
                        {t('kids.tracksTitle')}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Track 1: Electronics */}
                        <div className="border-3 border-green-200 rounded-xl overflow-hidden">
                            <div className="bg-green-50 px-6 py-4 border-b-2 border-green-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-['Press_Start_2P'] text-sm md:text-base text-green-700 flex items-center gap-2">
                                        <span className="text-xl">{t('kids.track1.icon')}</span> {t('kids.track1.title')}
                                    </h3>
                                    <span className="text-sm text-gray-500 font-medium">{t('kids.track1.age')}</span>
                                </div>
                                <span className="text-xs text-green-600 font-semibold">{t('kids.track1.spots')}</span>
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="text-gray-700 leading-relaxed">
                                    {t('kids.track1.description')}
                                </p>

                                <PhotoGallery photos={electronicsPhotos} placeholderIcon="💡" />

                                <ul className="space-y-2">
                                    {track1Highlights.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="text-green-500">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800 font-medium">
                                    {t('kids.track1.bring')}
                                </div>
                            </div>
                        </div>

                        {/* Track 2: Minecraft */}
                        <div className="border-3 border-green-200 rounded-xl overflow-hidden">
                            <div className="bg-green-50 px-6 py-4 border-b-2 border-green-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-['Press_Start_2P'] text-sm md:text-base text-green-700 flex items-center gap-2">
                                        <span className="text-xl">{t('kids.track2.icon')}</span> {t('kids.track2.title')}
                                    </h3>
                                    <span className="text-sm text-gray-500 font-medium">{t('kids.track2.age')}</span>
                                </div>
                                <span className="text-xs text-green-600 font-semibold">{t('kids.track2.spots')}</span>
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="text-gray-700 leading-relaxed">
                                    {t('kids.track2.description')}
                                </p>

                                <PhotoGallery photos={minecraftPhotos} placeholderIcon="⛏" />

                                <div className="flex items-center justify-center gap-3 py-2">
                                    {track2Steps.map((step, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="text-center">
                                                <div className="w-14 h-14 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-center text-2xl mb-1">
                                                    {step.icon}
                                                </div>
                                                <span className="text-xs text-gray-600 font-medium">{step.label}</span>
                                            </div>
                                            {i < track2Steps.length - 1 && (
                                                <span className="text-green-400 font-bold text-lg mt-[-1rem]">→</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 font-medium">
                                    {t('kids.track2.bring')}
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm font-semibold text-blue-800 mb-2">{t('kids.track2.prepTitle')}</p>
                                    <ul className="space-y-2">
                                        {track2Prep.map((item, i) => (
                                            <li key={i} className="text-sm text-blue-700">
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-900">{item.name}</a>
                                                <br />
                                                <span className="text-xs text-blue-600">{item.detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section className="py-16 bg-white relative overflow-hidden">
                {flash && (
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 rounded-full bg-green-100/60 animate-[ripple_1.5s_ease-out_forwards]" />
                    </div>
                )}
                <style>{`
                    @keyframes ripple {
                        0% { width: 0; height: 0; opacity: 0.7; top: 30%; }
                        100% { width: 200vw; height: 200vw; opacity: 0; top: -60vw; }
                    }
                `}</style>
                <div className="max-w-[900px] mx-auto px-4 relative">
                    <h2
                        ref={registrationRef}
                        className={`font-['Press_Start_2P'] text-lg md:text-xl text-green-700 mb-8 text-center transition-all duration-500 ${flash ? 'scale-110 text-green-500' : ''}`}
                    >
                        {t('kids.registrationTitle')}
                    </h2>
                    <div className="max-w-xl mx-auto space-y-4 mb-8">
                        {registrationSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-['Press_Start_2P'] text-xs flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div className="text-gray-700 pt-1">
                                    <p>{step}</p>
                                    {i === 0 && (
                                        <p className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{
                                            __html: t('kids.registrationMinecraftFormHint').replace(
                                                '<a>',
                                                '<a href="/labs/anmeldung-minecraft.pdf" download class="text-green-700 font-semibold underline hover:text-green-900">'
                                            )
                                        }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <a
                            href="mailto:meetup@hvltech.de?subject=Kids%20Labs%20Anmeldung"
                            className="inline-flex font-['Press_Start_2P'] text-xs bg-green-600 text-white border-4 border-green-700 px-6 py-3 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline items-center gap-2"
                        >
                            <MailOutlineIcon fontSize="small" /> {t('kids.cta')}
                        </a>
                    </div>
                </div>
            </section>

            {/* For Parents Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-[1100px] mx-auto px-4">
                    <h2 className="font-['Press_Start_2P'] text-lg md:text-xl text-green-700 mb-8 text-center">
                        {t('kids.forParentsTitle')}
                    </h2>

                    {/* Parents stay - highlighted */}
                    <div className="mb-8 bg-green-100 border-3 border-green-300 rounded-xl p-6">
                        <h3 className="font-['Press_Start_2P'] text-sm text-green-800 mb-3 flex items-center gap-2">
                            <span>☕</span> {forParents.stayTitle}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{forParents.stayText}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg p-6 border-2 border-green-100">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <span>👥</span> {forParents.supervisionTitle}
                            </h3>
                            <p className="text-sm text-gray-700">{forParents.supervisionText}</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 border-2 border-green-100">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <span>🛡️</span> {forParents.safetyTitle}
                            </h3>
                            <p className="text-sm text-gray-700">{forParents.safetyText}</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 border-2 border-green-100">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <span>🕐</span> {forParents.pickupTitle}
                            </h3>
                            <p className="text-sm text-gray-700">{forParents.pickupText}</p>
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

            {/* Cooperation with Kulturhaus */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-[900px] mx-auto px-4 text-center">
                    <h2 className="font-['Press_Start_2P'] text-lg md:text-xl text-green-700 mb-6">
                        {t('kids.cooperation.title')}
                    </h2>
                    <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
                        {t('kids.cooperation.description')}
                    </p>
                    <a
                        href="http://www.fv-kulturhaus-jrbecher.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-['Press_Start_2P'] text-xs bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-6 py-3 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline"
                    >
                        {t('kids.cooperation.link')} →
                    </a>
                </div>
            </section>

            {/* Mission Section */}
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

            {/* Footer */}
            <footer className="py-8 text-center">
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        {t('kids.footerContact')}:{' '}
                        <a href="mailto:meetup@hvltech.de" className="text-green-700 hover:text-green-800 font-semibold">
                            meetup@hvltech.de
                        </a>
                    </p>
                    <div className="flex gap-4 justify-center items-center">
                        <Link
                            to="/"
                            className="inline-block font-['Press_Start_2P'] text-xs bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-4 py-2 shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 no-underline"
                        >
                            ← {t('kids.backToMain')}
                        </Link>
                        <Link
                            to="/labs/datenschutz"
                            className="text-sm text-gray-500 hover:text-green-700 underline"
                        >
                            {t('datenschutz.title')}
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default KidsPage;
