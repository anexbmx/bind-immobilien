/* Navigation - Clean Authority Design + Language Switcher DE/EN */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const LANGS: { code: Lang; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
];

const LOGO_SRC = "/assets/bind-logo.png";

export default function Navigation() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: t.nav.about, href: "#ueber-uns" },
    { label: t.nav.focus, href: "#investitionsfokus" },
    { label: t.nav.offer, href: "#angebot" },
    { label: t.nav.contact, href: "#kontakt" },
  ];

  return (
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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem' }}>
        <style>{`
          .nav-desktop { display: flex; }
          .nav-mobile { display: none; }
          .nav-logo-img { height: 44px; width: auto; object-fit: contain; }
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
          @keyframes langMenuIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @media (max-width: 1080px) {
            .nav-desktop { display: none !important; }
            .nav-mobile { display: flex !important; }
          }
          @media (max-width: 767px) {
            .nav-shell { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
            .nav-logo-img { height: 38px; }
          }
        `}</style>
        <div className="nav-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? '68px' : '76px', transition: 'height 0.3s ease' }}>

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img
              className="nav-logo-img"
              src={LOGO_SRC}
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
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  background: 'none', border: '1px solid #E0DDD8',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600,
                  color: '#111111', cursor: 'pointer', padding: '6px 12px',
                  letterSpacing: '0.08em', transition: 'border-color 0.2s ease',
                }}
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
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  background: 'none', border: '1px solid #E0DDD8',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600,
                  color: '#111111', cursor: 'pointer', padding: '5px 9px',
                }}
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
  );
}
