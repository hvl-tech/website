import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/logo/logo_with_text.svg";
import pearLogo from "../../assets/logo/logo_no_text.svg";
import { upcomingEvents } from "../../utils/eventLinks";
import { setTheme, useTheme } from "../../utils/theme";
import "../../styles/site.css";

export const MEETUP_URL = "https://www.meetup.com/havelland-technology-falkensee/";
export const EMAIL = "meetup@hvltech.de";

export function BrandLogo() {
  return (
    <>
      <img className="brand-pear" src={pearLogo} alt="" />
      <svg className="brand-wordmark" viewBox="0 176 176.46046 35.77211" aria-hidden="true">
        <image href={brandLogo} width="176.46046" height="211.77211" />
      </svg>
    </>
  );
}

const ICONS = {
  pin: "M8 1h8v2h4v4h2v7h-3v4h-3v3h-2v3h-4v-3H8v-3H5v-4H2V7h2V3h4zm2 6v5h4V7z",
  clock: "M8 1h8v2h3v3h2v12h-2v3h-3v2H8v-2H5v-3H3V6h2V3h3zm3 5v7h6v-3h-3V6z",
  dinner: "M4 2h2v6h1V2h2v6h1V2h2v9h-2v2H9v9H7v-9H6v-2H4zM15 2h4v20h-3v-8h-3V5h2z",
  talk: "M3 3h18v2h1v11h-1v2H11l-4 3H5v-3H3v-2H2V5h1zm4 5v2h10V8zm0 4v2h6v-2z",
  kids: "M11 0h2v3h6v2h2v4h2v5h-2v4h-2v2H5v-2H3v-4H1V9h2V5h2V3h6zM7 8v3h3V8zm7 0v3h3V8zm-5 6v2h6v-2z",
  arrow: "M12 3h3v3h3v3h3v6h-3v3h-3v3h-3v-4h3v-3H2v-4h13V7h-3z",
  check: "M19 4h3v4h-3v3h-3v3h-3v3h-3v3H7v-3H4v-3H1v-4h4v3h3v3h2v-3h3v-3h3V7h3z",
  mail: "M1 4h22v16H1zm3 3v2h2v2h2v2h2v2h4v-2h2v-2h2V9h2V7h-2v2h-2v2h-2v2h-4v-2H8V9H6V7z",
  sun: "M11 0h2v4h-2zM11 20h2v4h-2zM0 11h4v2H0zM20 11h4v2h-4zM3 3h3v3H3zM18 3h3v3h-3zM3 18h3v3H3zM18 18h3v3h-3zM9 6h6v2h2v2h1v4h-1v2h-2v2H9v-2H7v-2H6v-4h1V8h2z",
  moon: "M9 2h5v2h-3v2H9v3H8v6h1v3h2v2h3v2H9v-2H6v-2H4v-3H3V9h1V6h2V4h3z",
};

export type IconName = keyof typeof ICONS;

export function PixelIcon({ kind }: { kind: IconName }) {
  return (
    <svg className="pixel-icon" viewBox="0 0 24 24" aria-hidden="true" shapeRendering="crispEdges">
      <path fill="currentColor" fillRule="evenodd" d={ICONS[kind]} />
    </svg>
  );
}

/** RSS, Atom and iCal feeds, generated at build time by scripts/generate-feeds.ts. */
export function FeedLinks() {
  const { t } = useTranslation();
  return (
    <p className="feed-links">
      <span>{t("site.feeds.label")}</span>
      <a href="/rss.xml" type="application/rss+xml">RSS</a>
      <a href="/atom.xml" type="application/atom+xml">Atom</a>
      <a href="/events.ics" type="text/calendar">iCal</a>
    </p>
  );
}

function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      className="theme-toggle"
      onClick={(event) => {
        // Keep the mobile menu open while switching.
        event.stopPropagation();
        setTheme(next);
      }}
      aria-label={t(`site.nav.${next}Mode`)}
      title={t(`site.nav.${next}Mode`)}
    >
      <PixelIcon kind={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}

function SiteHeader() {
  const { t, i18n } = useTranslation();
  const isGerman = i18n.resolvedLanguage === "de";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [next] = upcomingEvents();

  // The header sticks to the top and turns into a compact bar once you scroll.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={`header-bar ${scrolled ? "is-scrolled" : ""}`}>
      <header className="havel-header">
        <Link to="/" className="havel-brand" aria-label={t("site.nav.home")}>
          <BrandLogo />
        </Link>
        <button
          className="menu-toggle"
          ref={menuButton}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t("site.nav.close") : t("site.nav.open")}
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <nav
          id="site-nav"
          className={menuOpen ? "is-open" : ""}
          aria-label={t("site.nav.label")}
          onClick={() => setMenuOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          <Link to={{ pathname: "/", hash: "#tour" }}>{t("site.nav.tour")}</Link>
          <Link to={{ pathname: "/", hash: "#community" }}>{t("site.nav.community")}</Link>
          <Link to="/speakers">{t("site.nav.talks")}</Link>
          <Link to="/labs">{t("site.nav.kids")}</Link>
          <Link to={{ pathname: "/", hash: "#faq" }}>{t("site.nav.faq")}</Link>
          <ThemeToggle />
          <button
            className="language-switch"
            onClick={() => i18n.changeLanguage(isGerman ? "en" : "de")}
            aria-label={t("site.nav.switchLanguage")}
          >
            <span className={isGerman ? "is-active" : ""}>DE</span>/
            <span className={isGerman ? "" : "is-active"}>EN</span>
          </button>
          <a className="pixel-button nav-cta" href={next?.eventUrl || MEETUP_URL}>
            {t("site.nav.rsvp")} <PixelIcon kind="arrow" />
          </a>
        </nav>
      </header>
    </div>
  );
}

function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="havel-footer">
      <Link className="havel-brand" to="/" aria-label={t("site.nav.home")}>
        <BrandLogo />
      </Link>
      <div className="footer-middle">
        <p>{t("site.footer.tagline")}</p>
        <FeedLinks />
      </div>
      <div className="footer-links">
        <a href={`mailto:${EMAIL}`}>{t("site.footer.contact")}</a>
        <Link to="/speakers">{t("site.footer.speakers")}</Link>
        <Link to="/labs">{t("site.footer.kids")}</Link>
        <Link to="/labs/datenschutz">{t("site.footer.privacy")}</Link>
      </div>
    </footer>
  );
}

type SiteLayoutProps = {
  children: ReactNode;
  className?: string;
  skip?: { href: string; label: string };
};

/** Header, footer and base styles shared by the redesigned pages. */
export default function SiteLayout({ children, className = "", skip }: SiteLayoutProps) {
  return (
    <div className={`havel-site ${className}`}>
      {skip && (
        <a className="skip-link" href={skip.href}>
          {skip.label}
        </a>
      )}
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
