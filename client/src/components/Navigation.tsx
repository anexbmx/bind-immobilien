/* Navigation - Clean Authority Design + Language Switcher */

import { useState, useEffect } from "react";
import { Check, Menu, Settings, X } from "lucide-react";
import { useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const LANGS: { code: Lang; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
];

const LOGO_SRC = "/brand/bind-logo-header.svg";
const LOGO_ICON_SRC = "/brand/bind-logo-icon.svg";
type LogoMode = "full" | "icon";
type SiteTheme = "classic" | "graphite" | "rhein" | "burgundy";

const SITE_THEMES: { id: SiteTheme; label: string; swatch: string }[] = [
  { id: "classic", label: "Classic", swatch: "#B8962E" },
  { id: "graphite", label: "Graphite", swatch: "#8A8176" },
  { id: "rhein", label: "Rhein", swatch: "#2F7D8C" },
  { id: "burgundy", label: "Burgundy", swatch: "#8E3D45" },
];

export default function Navigation() {
  const { t, lang, setLang } = useLang();
  const [location, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoMode, setLogoMode] = useState<LogoMode>(() => {
    if (typeof window === "undefined") return "full";
    return window.localStorage.getItem("bind-logo-mode") === "icon" ? "icon" : "full";
  });
  const [siteTheme, setSiteTheme] = useState<SiteTheme>(() => {
    if (typeof window === "undefined") return "classic";
    const stored = window.localStorage.getItem("bind-site-theme");
    return SITE_THEMES.some(theme => theme.id === stored) ? (stored as SiteTheme) : "classic";
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("bind-logo-mode", logoMode);
  }, [logoMode]);

  useEffect(() => {
    document.documentElement.dataset.siteTheme = siteTheme;
    window.localStorage.setItem("bind-site-theme", siteTheme);
  }, [siteTheme]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setLangOpen(false);
    setSettingsOpen(false);

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (location !== "/") {
      navigate(`/${href}`);
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    setMenuOpen(false);
    setLangOpen(false);
    setSettingsOpen(false);
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  const navLinks = [
    { label: t.nav.about, href: "#ueber-uns" },
    { label: t.nav.focus, href: "#investitionsfokus" },
    { label: t.nav.offer, href: "#angebot" },
    { label: t.nav.contact, href: "#kontakt" },
  ];

  const chooseLogoMode = (mode: LogoMode) => {
    setLogoMode(mode);
    setSettingsOpen(false);
  };

  const chooseSiteTheme = (theme: SiteTheme) => {
    setSiteTheme(theme);
    setSettingsOpen(false);
  };

  const settingsMenu = (
    <div
      className="settings-menu"
      style={{
        position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
        backgroundColor: '#FFFFFF', border: '1px solid #E0DDD8',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        minWidth: '190px', zIndex: 210,
      }}
    >
      <div style={{ padding: '10px 12px 6px', fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999999' }}>
        Logo
      </div>
      {[
        { mode: 'full' as const, label: 'Full logo' },
        { mode: 'icon' as const, label: 'House only' },
      ].map(item => (
        <button
          key={item.mode}
          onClick={() => chooseLogoMode(item.mode)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            width: '100%', padding: '10px 12px', background: 'none', border: 'none',
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
            fontWeight: logoMode === item.mode ? 600 : 400,
            color: logoMode === item.mode ? '#B8962E' : '#111111',
            cursor: 'pointer', borderBottom: '1px solid #F0EDE8', textAlign: 'left',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F8F7F4'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <span>{item.label}</span>
          {logoMode === item.mode && <Check size={13} style={{ marginLeft: 'auto' }} />}
        </button>
      ))}
      <div style={{ padding: '12px 12px 6px', fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999999' }}>
        Website theme
      </div>
      {SITE_THEMES.map(item => (
        <button
          key={item.id}
          onClick={() => chooseSiteTheme(item.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            width: '100%', padding: '10px 12px', background: 'none', border: 'none',
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
            fontWeight: siteTheme === item.id ? 600 : 400,
            color: siteTheme === item.id ? '#B8962E' : '#111111',
            cursor: 'pointer', borderTop: '1px solid #F0EDE8', textAlign: 'left',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F8F7F4'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <span style={{ width: 12, height: 12, backgroundColor: item.swatch, border: '1px solid rgba(0,0,0,0.12)' }} />
          <span>{item.label}</span>
          {siteTheme === item.id && <Check size={13} style={{ marginLeft: 'auto' }} />}
        </button>
      ))}
    </div>
  );

  return (
    <>
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(248,247,244,0.97)' : 'rgba(248,247,244,0.0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #E0DDD8' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div className="nav-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem' }}>
        <style>{`
          .nav-container { padding-left: 2.5rem; padding-right: 2.5rem; }
          .nav-desktop { display: flex; }
          .nav-mobile { display: none; }
          .nav-logo-img { height: 62px; width: auto; object-fit: contain; }
          .nav-logo-img.logo-icon { width: 54px; height: 54px; }
          .nav-link { white-space: nowrap; }
          .nav-menu-panel {
            max-height: 0;
            opacity: 0;
            transform: translateY(-10px);
            overflow: hidden;
            pointer-events: none;
            border-top: 0 solid transparent;
            padding: 0 2rem;
            transition: max-height 0.32s ease, opacity 0.24s ease, transform 0.32s ease;
          }
          .nav-menu-panel.open {
            max-height: 420px;
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
            border-top: 1px solid #E0DDD8;
            padding: 1.5rem 2rem 2rem;
          }
          .nav-menu-item {
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 0.24s ease, transform 0.24s ease;
          }
          .nav-menu-panel.open .nav-menu-item {
            opacity: 1;
            transform: translateY(0);
          }
          .nav-menu-panel.open .nav-menu-item:nth-child(1) { transition-delay: 0.04s; }
          .nav-menu-panel.open .nav-menu-item:nth-child(2) { transition-delay: 0.08s; }
          .nav-menu-panel.open .nav-menu-item:nth-child(3) { transition-delay: 0.12s; }
          .nav-menu-panel.open .nav-menu-item:nth-child(4) { transition-delay: 0.16s; }
          .nav-menu-panel.open .nav-menu-item:nth-child(5) { transition-delay: 0.2s; }
          .lang-menu {
            animation: langMenuIn 0.18s ease both;
            transform-origin: top right;
          }
          .settings-menu {
            animation: langMenuIn 0.18s ease both;
            transform-origin: top right;
          }
          .nav-icon-button {
            width: 42px;
            height: 42px;
            display: grid;
            place-items: center;
            background: rgba(248,247,244,0.94);
            border: 1px solid #E0DDD8;
            color: #111111;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            transition: border-color 0.2s ease, background-color 0.2s ease;
          }
          .nav-lang-button {
            min-width: 58px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: rgba(248,247,244,0.72);
            border: 1px solid #E0DDD8;
            font-family: 'DM Sans', sans-serif;
            font-size: 12px;
            font-weight: 600;
            color: #111111;
            cursor: pointer;
            padding: 0 12px;
            letter-spacing: 0.08em;
            transition: border-color 0.2s ease, background-color 0.2s ease;
          }
          @keyframes langMenuIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @media (max-width: 1080px) {
            .nav-desktop { display: none !important; }
            .nav-mobile { display: flex !important; }
          }
          @media (max-width: 767px) {
            .nav-container { padding-left: 0.875rem !important; padding-right: 0.875rem !important; }
            .nav-shell { height: 64px !important; gap: 0.75rem; }
            .nav-logo-img { width: min(178px, 46vw); height: auto; max-height: 46px; }
            .nav-logo-img.logo-icon { width: 50px; height: 50px; max-height: 50px; }
            .nav-mobile { gap: 8px !important; flex-shrink: 0; }
            .nav-lang-button { min-width: 48px; height: 38px; padding: 0 10px; }
            .nav-menu-button { padding: 6px !important; }
          }
          @media (max-width: 380px) {
            .nav-logo-img { width: min(158px, 44vw); max-height: 42px; }
            .nav-logo-img.logo-icon { width: 46px; height: 46px; max-height: 46px; }
            .nav-lang-button { min-width: 44px; height: 36px; padding: 0 8px; }
          }
        `}</style>
        <div className="nav-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? '68px' : '76px', transition: 'height 0.3s ease' }}>

          {/* Logo */}
          <button
            onClick={goHome}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img
              className={`nav-logo-img ${logoMode === 'icon' ? 'logo-icon' : ''}`}
              src={logoMode === 'icon' ? LOGO_ICON_SRC : LOGO_SRC}
              alt="BIND Immobilien GmbH"
            />
          </button>

          {/* Desktop Nav */}
          <div className="nav-desktop" style={{ alignItems: 'center', gap: 'clamp(1.3rem, 2.5vw, 2.3rem)' }}>
            {navLinks.map((link) => (
              <button
                className="nav-link"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500,
                  color: '#111111', cursor: 'pointer', padding: '4px 0',
                  transition: 'color 0.2s ease', letterSpacing: '0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#B8962E'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#111111'; }}
              >
                {link.label}
              </button>
            ))}

            {/* Language Switcher */}
            <div style={{ position: 'relative' }}>
              <button
                className="nav-lang-button"
                onClick={() => { setLangOpen(!langOpen); setSettingsOpen(false); }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8962E'; }}
                onMouseLeave={e => { if (!langOpen) e.currentTarget.style.borderColor = '#E0DDD8'; }}
              >
                {lang.toUpperCase()}
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ marginLeft: '2px', transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l3 3 3-3" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {langOpen && (
                <div
                  className="lang-menu"
                  style={{
                    position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                    backgroundColor: '#FFFFFF', border: '1px solid #E0DDD8',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    minWidth: '110px', zIndex: 200,
                  }}
                >
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        width: '100%', padding: '10px 14px', background: 'none', border: 'none',
                        fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: lang === l.code ? 600 : 400,
                        color: lang === l.code ? '#B8962E' : '#111111', cursor: 'pointer',
                        borderBottom: '1px solid #F0EDE8', textAlign: 'left',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F8F7F4'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <span>{l.label}</span>
                      {lang === l.code && <span style={{ marginLeft: 'auto', color: '#B8962E', fontSize: '10px' }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo("#angebot")}
              className="btn-primary"
              style={{ fontSize: '11px', padding: '10px 22px' }}
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="nav-mobile" style={{ alignItems: 'center', gap: '12px' }}>
            {/* Mobile lang switcher */}
            <div style={{ position: 'relative' }}>
              <button
                className="nav-lang-button"
                onClick={() => { setLangOpen(!langOpen); setSettingsOpen(false); }}
              >
                {lang.toUpperCase()}
              </button>
              {langOpen && (
                <div className="lang-menu" style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                  backgroundColor: '#FFFFFF', border: '1px solid #E0DDD8',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)', minWidth: '100px', zIndex: 200,
                }}>
                  {LANGS.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        width: '100%', padding: '9px 12px', background: 'none', border: 'none',
                        fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
                        fontWeight: lang === l.code ? 600 : 400,
                        color: lang === l.code ? '#B8962E' : '#111111', cursor: 'pointer',
                        borderBottom: '1px solid #F0EDE8',
                      }}>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="nav-menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', color: '#111111', cursor: 'pointer' }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`nav-menu-panel ${menuOpen ? 'open' : ''}`}
        style={{
          backgroundColor: '#F8F7F4', display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}
      >
          {navLinks.map((link) => (
            <button className="nav-menu-item" key={link.href} onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none', textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 500,
                color: '#111111', cursor: 'pointer', padding: '4px 0',
              }}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#angebot")} className="btn-primary nav-menu-item"
            style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            {t.nav.cta}
          </button>
      </div>
    </nav>
    <div style={{ position: 'fixed', right: '1rem', bottom: '1rem', zIndex: 260 }}>
      <button
        className="nav-icon-button"
        aria-label="Logo settings"
        title="Logo settings"
        onClick={() => { setSettingsOpen(!settingsOpen); setLangOpen(false); setMenuOpen(false); }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8962E'; }}
        onMouseLeave={e => { if (!settingsOpen) e.currentTarget.style.borderColor = '#E0DDD8'; }}
      >
        <Settings size={17} />
      </button>
      {settingsOpen && settingsMenu}
    </div>
    </>
  );
}
