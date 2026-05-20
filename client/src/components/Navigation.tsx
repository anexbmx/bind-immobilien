/* Navigation – Clean Authority Design + Language Switcher DE/EN/TR */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
];

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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/manus-storage/bind_logo_white_bg_2805c0ff.png"
              alt="BIND Immobilien GmbH"
              style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
            />
          </button>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
            {navLinks.map((link) => (
              <button
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
                {LANGS.find(l => l.code === lang)?.flag} {lang.toUpperCase()}
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ marginLeft: '2px', transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l3 3 3-3" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {langOpen && (
                <div
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
                      <span>{l.flag}</span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="md:hidden">
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
                <div style={{
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
                      {l.flag} {l.label}
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
      {menuOpen && (
        <div style={{
          backgroundColor: '#F8F7F4', borderTop: '1px solid #E0DDD8',
          padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none', textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 500,
                color: '#111111', cursor: 'pointer', padding: '4px 0',
              }}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#angebot")} className="btn-primary"
            style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            {t.nav.cta}
          </button>
        </div>
      )}
    </nav>
  );
}
