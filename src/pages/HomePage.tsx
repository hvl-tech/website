import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import HavellandMap from "../component/HavellandMap";
import HavellandScene from "../component/HavellandScene";
import PhotoWall from "../component/PhotoWall";
import PixelArt, { type SpriteName } from "../component/PixelArt";
import brandLogo from "../assets/logo/logo_with_text.svg";
import pearLogo from "../assets/logo/logo_no_text.svg";
import meetupData from "../data/meetup-events.json";
import { HQ, findTown, tour, towns } from "../data/havelland";
import { buildMailto } from "../utils/buildMailto";
import {
  buildCalendarUrl,
  buildIcsUrl,
  parseLocation,
  type MeetupEvent,
} from "../utils/eventLinks";
import { useSeo } from "../utils/useSeo";
import "./home.css";

const MEETUP_URL = "https://www.meetup.com/havelland-technology-falkensee/";
const EMAIL = "meetup@hvltech.de";


function BrandLogo() {
  return (
    <>
      <img className="brand-pear" src={pearLogo} alt="" />
      <svg className="brand-wordmark" viewBox="0 176 176.46046 35.77211" aria-hidden="true">
        <image href={brandLogo} width="176.46046" height="211.77211" />
      </svg>
    </>
  );
}

function PixelIcon({ kind }: { kind: "pin" | "clock" | "dinner" | "talk" | "kids" | "arrow" }) {
  const paths = {
    pin: "M8 1h8v2h4v4h2v7h-3v4h-3v3h-2v3h-4v-3H8v-3H5v-4H2V7h2V3h4zm2 6v5h4V7z",
    clock: "M8 1h8v2h3v3h2v12h-2v3h-3v2H8v-2H5v-3H3V6h2V3h3zm3 5v7h6v-3h-3V6z",
    dinner: "M4 2h2v6h1V2h2v6h1V2h2v9h-2v2H9v9H7v-9H6v-2H4zM15 2h4v20h-3v-8h-3V5h2z",
    talk: "M3 3h18v2h1v11h-1v2H11l-4 3H5v-3H3v-2H2V5h1zm4 5v2h10V8zm0 4v2h6v-2z",
    kids: "M11 0h2v3h6v2h2v4h2v5h-2v4h-2v2H5v-2H3v-4H1V9h2V5h2V3h6zM7 8v3h3V8zm7 0v3h3V8zm-5 6v2h6v-2z",
    arrow: "M12 3h3v3h3v3h3v6h-3v3h-3v3h-3v-4h3v-3H2v-4h13V7h-3z",
  };
  return (
    <svg className="pixel-icon" viewBox="0 0 24 24" aria-hidden="true" shapeRendering="crispEdges">
      <path fill="currentColor" fillRule="evenodd" d={paths[kind]} />
    </svg>
  );
}

function eventTown(event?: MeetupEvent) {
  if (!event) return undefined;
  return findTown(event.location) ?? findTown(event.title) ?? findTown(event.description);
}

/** "> Next up▌" typed out like a terminal prompt when the page opens. */
function TypedLabel({ text, motion }: { text: string; motion: boolean }) {
  const [typed, setTyped] = useState(motion ? 0 : text.length);

  useEffect(() => {
    if (!motion) {
      setTyped(text.length);
      return;
    }
    setTyped(0);
    let count = 0;
    let timer: number;
    const tick = () => {
      count += 1;
      setTyped(count);
      // Slightly uneven keystrokes read as a person typing, not a machine.
      if (count < text.length) timer = window.setTimeout(tick, 70 + ((count * 37) % 60));
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, [text, motion]);

  return (
    <p className="next-label" aria-label={text}>
      <span aria-hidden="true">{text.slice(0, typed)}</span>
      <span className={`cursor ${typed < text.length ? "is-typing" : ""}`} aria-hidden="true" />
    </p>
  );
}

/** "Add to calendar" dropdown. A plain <details>, plus closing on outside click and Escape. */
function CalendarMenu({ event, venueName, address, place }: { event: MeetupEvent; venueName: string; address: string; place: string }) {
  const { t } = useTranslation();
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = (e: Event) => {
      const el = menu.current;
      if (!el?.open) return;
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !el.contains(e.target as Node)) {
        el.open = false;
        if (e instanceof KeyboardEvent) el.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <details className="calendar-menu" ref={menu}>
      <summary>{t("home.next.addToCalendar")}</summary>
      <div>
        <a href={buildCalendarUrl(event, venueName, address)} target="_blank" rel="noopener noreferrer">
          {t("home.next.google")}
        </a>
        <a href={buildIcsUrl(event, place)} download="hvltech-event.ics">
          {t("home.next.ics")}
        </a>
        <a href="/events.ics">{t("home.next.subscribe")}</a>
      </div>
    </details>
  );
}

/** RSS, Atom and iCal feeds, generated at build time by scripts/generate-feeds.ts. */
function FeedLinks() {
  const { t } = useTranslation();
  return (
    <p className="feed-links">
      <span>{t("home.feeds.label")}</span>
      <a href="/rss.xml" type="application/rss+xml">RSS</a>
      <a href="/atom.xml" type="application/atom+xml">Atom</a>
      <a href="/events.ics" type="text/calendar">iCal</a>
    </p>
  );
}

function NextEventCard({ event, lang, motion }: { event?: MeetupEvent; lang: string; motion: boolean }) {
  const { t } = useTranslation();
  if (!event) {
    return (
      <article className="next-card is-empty">
        <TypedLabel text={t("home.next.label")} motion={motion} />
        <p>{t("home.next.none")}</p>
        <a className="pixel-button" href={MEETUP_URL}>
          {t("home.next.follow")} <PixelIcon kind="arrow" />
        </a>
      </article>
    );
  }

  const start = new Date(event.dateTime);
  const end = event.endTime ? new Date(event.endTime) : undefined;
  const { venueName, address } = parseLocation(event.location, event.title);
  const town = eventTown(event);
  const place = [venueName, address].filter(Boolean).join(", ") || town?.name || "";
  const time = (date: Date) =>
    new Intl.DateTimeFormat(lang === "de" ? "de" : "en-GB", { hour: "2-digit", minute: "2-digit" }).format(date);

  return (
    <article className="next-card" aria-labelledby="next-title">
      <TypedLabel text={t("home.next.label")} motion={motion} />
      <div className="next-body">
        <div className="next-date" aria-hidden="true">
          <span>{new Intl.DateTimeFormat(lang, { weekday: "short" }).format(start)}</span>
          <strong>{start.getDate()}</strong>
          <span>{new Intl.DateTimeFormat(lang, { month: "short" }).format(start)}</span>
        </div>
        <div>
          <h2 id="next-title">{event.title}</h2>
          <p className="next-meta">
            <span>
              <PixelIcon kind="clock" />
              <time dateTime={event.dateTime}>
                {new Intl.DateTimeFormat(lang, { day: "numeric", month: "long" }).format(start)},{" "}
                {time(start)}
                {end ? `–${time(end)}` : ""}
              </time>
            </span>
            {place && (
              <span>
                <PixelIcon kind="pin" />
                {place}
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="next-actions">
        <a className="pixel-button" href={event.eventUrl || MEETUP_URL}>
          {t("home.next.rsvp")} <PixelIcon kind="arrow" />
        </a>
        <CalendarMenu event={event} venueName={venueName} address={address} place={place} />
      </div>
    </article>
  );
}

type AboutItem = { tag: string; title: string; text: string; cta?: string; secondary?: string };
type FaqItem = { icon: SpriteName; q: string; a: string; link?: string };

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === "de" ? "de" : "en";
  const isGerman = lang === "de";
  const [motion, setMotion] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sceneScroller = useRef<HTMLDivElement>(null);

  const upcoming = meetupData.upcomingEvents.filter(
    (event) => new Date(event.endTime || event.dateTime).getTime() > Date.now(),
  );
  const [next, ...later] = upcoming;
  const nextTown = eventTown(next);
  const shortDate = (value: string) =>
    new Intl.DateTimeFormat(lang, { day: "numeric", month: "short" }).format(new Date(value));
  const monthLabel = (month: string) =>
    new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }).format(new Date(`${month}-01T12:00:00`));
  const about = t("home.hero.about", { returnObjects: true }) as AboutItem[];
  const faqs = t("home.faq.items", { returnObjects: true }) as FaqItem[];
  const facts = t("home.community.facts", { returnObjects: true }) as string[];
  const kidsMail = buildMailto({
    to: EMAIL,
    subject: t("home.hero.kidsMailSubject"),
    body: t("home.hero.kidsMailBody"),
  });
  const inviteMail = buildMailto({
    to: EMAIL,
    subject: t("home.tour.inviteSubject"),
    body: t("home.tour.inviteBody"),
  });

  useSeo({ title: t("home.seoTitle"), description: t("home.seoDescription"), path: "/" });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // The header sticks to the top and turns into a compact bar once you scroll.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // On narrow screens the panorama scrolls sideways; start with HQ in view.
  useEffect(() => {
    const scroller = sceneScroller.current;
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollLeft = scroller.scrollWidth * (845 / 1200) - scroller.clientWidth / 2;
    }
  }, []);

  return (
    <div className={`havel-home ${motion ? "" : "motion-paused"}`}>
      <a className="skip-link" href="#next">
        {t("home.skip")}
      </a>

      <div className={`header-bar ${scrolled ? "is-scrolled" : ""}`}>
      <header className="havel-header">
        <a href="#" className="havel-brand" aria-label="HVLtech">
          <BrandLogo />
        </a>
        <button
          className="menu-toggle"
          ref={menuButton}
          aria-expanded={menuOpen}
          aria-controls="home-nav"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t("home.nav.close") : t("home.nav.open")}
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <nav
          id="home-nav"
          className={menuOpen ? "is-open" : ""}
          aria-label={t("home.nav.label")}
          onClick={() => setMenuOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          <a href="#tour">{t("home.nav.tour")}</a>
          <a href="#community">{t("home.nav.community")}</a>
          <a href="#faq">{t("home.nav.faq")}</a>
          <button
            className="language-switch"
            onClick={() => i18n.changeLanguage(isGerman ? "en" : "de")}
            aria-label={t("home.nav.switchLanguage")}
          >
            <span className={isGerman ? "is-active" : ""}>DE</span>/
            <span className={isGerman ? "" : "is-active"}>EN</span>
          </button>
          <a className="pixel-button nav-cta" href={next?.eventUrl || MEETUP_URL}>
            {t("home.nav.rsvp")} <PixelIcon kind="arrow" />
          </a>
        </nav>
      </header>
      </div>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-intro">
          <p className="eyebrow">{t("home.hero.eyebrow")}</p>
          <h1 id="hero-title">{t("home.hero.title")}</h1>
          <p className="hero-lede">{t("home.hero.lede")}</p>
        </div>

        <div className="hero-events" id="next" tabIndex={-1}>
          <NextEventCard event={next} lang={lang} motion={motion} />
          {later.length > 0 && (
            <ul className="later-events">
              {later.map((event) => (
                <li key={event.eventUrl}>
                  <span>{shortDate(event.dateTime)}</span>
                  <a href={event.eventUrl}>{event.title}</a>
                </li>
              ))}
            </ul>
          )}
          <a className="text-link subtle all-events" href={MEETUP_URL}>
            {t("home.next.allEvents")} ↗
          </a>
          <FeedLinks />
        </div>

        <ul className="hero-about">
          {about.map((item, index) => {
            const kind = (["dinner", "talk", "kids"] as const)[index];
            return (
              <li key={item.title}>
                <PixelIcon kind={kind} />
                <div>
                  <p className="about-title">
                    <strong>{item.title}</strong>
                    <span className={`about-tag ${kind === "kids" ? "is-new" : ""}`}>{item.tag}</span>
                  </p>
                  <p>{item.text}</p>
                  {kind === "talk" && (
                    <Link className="text-link" to="/speakers">
                      {item.cta} →
                    </Link>
                  )}
                  {kind === "kids" && (
                    <span className="about-links">
                      <a className="text-link" href={kidsMail}>
                        {item.cta} ✉
                      </a>
                      <Link className="text-link subtle" to="/labs">
                        {item.secondary} →
                      </Link>
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="scene-section" aria-label={t("home.scene.motto")}>
        <div className="scene-scroller" ref={sceneScroller}>
          <div className="scene-stage">
            <HavellandScene motion={motion} mascotLabel={t("home.hero.mascot")} />
          </div>
        </div>
        <p className="scene-hint" aria-hidden="true">
          ↔ {t("home.scene.hint")}
        </p>
        <div className="scene-footer">
          <p className="motto">{t("home.scene.motto")}</p>
          <button
            className="motion-toggle"
            onClick={() => setMotion(!motion)}
            aria-pressed={!motion}
            aria-label={motion ? t("home.scene.pause") : t("home.scene.play")}
            title={motion ? t("home.scene.pause") : t("home.scene.play")}
          >
            {motion ? "❚❚" : "▶"}
          </button>
        </div>
      </section>

      <section className="home-section tour-section" id="tour" aria-labelledby="tour-title">
        <div className="tour-head">
          <p className="eyebrow">{t("home.tour.eyebrow")}</p>
          <h2 id="tour-title">{t("home.tour.title")}</h2>
          <p>{t("home.tour.text")}</p>
        </div>
        <div className="tour-body">
          <div className="tour-map">
            <HavellandMap
              label={t("home.tour.mapLabel")}
              nextStop={nextTown?.id}
              legend={nextTown && next ? `${t("home.tour.legend")}: ${nextTown.name} · ${shortDate(next.dateTime)}` : undefined}
              hqLabel={t("home.tour.hq")}
              motion={motion}
            />
          </div>
          <ol className="tour-stops">
            {tour.map((stop, index) => {
              const town = towns.find((candidate) => candidate.id === stop.town)!;
              const isNext = stop.town === nextTown?.id;
              const isHq = stop.town === HQ;
              return (
                <li key={stop.town} className={`${isNext ? "is-next" : ""} ${isHq ? "is-hq" : ""}`}>
                  <span className="stop-number" aria-hidden="true">
                    {isHq ? <img src={pearLogo} alt="" /> : index + 1}
                  </span>
                  <span className="stop-month">
                    {isNext && next ? shortDate(next.dateTime) : monthLabel(stop.month)}
                  </span>
                  <strong>{town.name}</strong>
                  <span className="stop-fact">{t(`home.tour.facts.${stop.town}`)}</span>
                  <span className="stop-tag">
                    {isNext ? t("home.tour.next") : isHq ? t("home.tour.home") : t("home.tour.planned")}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <a className="text-link tour-invite" href={inviteMail}>
          {t("home.tour.invite")} ✉
        </a>
      </section>

      <section className="home-section community-section" id="community" aria-labelledby="community-title">
        <div className="community-head">
          <p className="eyebrow">{t("home.community.eyebrow")}</p>
          <h2 id="community-title">{t("home.community.title")}</h2>
          <p>{t("home.community.text")}</p>
          <ul className="fact-list">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <PhotoWall alt={t("home.community.photoAlt")} closeLabel={t("home.community.close")} />
      </section>

      <section className="home-section faq-section" id="faq" aria-labelledby="faq-title">
        <p className="eyebrow">{t("home.faq.eyebrow")}</p>
        <h2 id="faq-title">{t("home.faq.title")}</h2>
        <div className="faq-grid">
          {faqs.map((item) => (
            <article key={item.q} className="faq-card">
              <PixelArt name={item.icon} className="faq-art" />
              <h3>{item.q}</h3>
              <p>{item.a}</p>
              {item.link && (
                <Link className="text-link" to={item.icon === "kids" ? "/labs" : "/speakers"}>
                  {item.link} →
                </Link>
              )}
            </article>
          ))}
        </div>
        <p className="faq-more">
          <a className="text-link" href={`mailto:${EMAIL}`}>
            {EMAIL} ↗
          </a>
        </p>
      </section>

      <footer className="havel-footer">
        <a className="havel-brand" href="#" aria-label="HVLtech">
          <BrandLogo />
        </a>
        <div className="footer-middle">
          <p>{t("home.footer.tagline")}</p>
          <FeedLinks />
        </div>
        <div className="footer-links">
          <a href={`mailto:${EMAIL}`}>{t("home.footer.contact")}</a>
          <Link to="/speakers">{t("home.footer.speakers")}</Link>
          <Link to="/labs">{t("home.footer.kids")}</Link>
          <Link to="/labs/datenschutz">{t("home.footer.privacy")}</Link>
        </div>
      </footer>
    </div>
  );
}
