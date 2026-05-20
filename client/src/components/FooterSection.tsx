/* FooterSection - i18n */

import { useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";

const LOGO_SRC = "/assets/bind-logo.png";

export default function FooterSection() {
  const { t, lang, setLang } = useLang();
  const [, navigate] = useLocation();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: t.nav.about, href: '#ueber-uns' },
    { label: t.nav.focus, href: '#investitionsfokus' },
    { label: t.nav.offer, href: '#angebot' },
    { label: t.nav.contact, href: '#kontakt' },
  ];

  return (
    <footer style={{ backgroundColor: '#111111', color: '#FFFFFF' }}>
      {/* Main */}
      <div style={{ padding: '4rem 0 3rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }} className="footer-grid">
            <style>{`
              .footer-link-grid{display:flex;flex-direction:column;gap:0.875rem;}
              .footer-lang{display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;}
              @media(max-width:1366px){
                .footer-grid{grid-template-columns:1.4fr 1fr!important;gap:3rem 4rem!important;}
                .footer-brand{grid-column:1 / -1;}
                .footer-brand p{max-width:560px!important;}
              }
              @media(max-width:900px){
                .footer-grid{grid-template-columns:1fr 1fr!important;gap:2.5rem!important;}
                .footer-brand{grid-column:1 / -1;}
              }
              @media(max-width:768px){
                .footer-grid{grid-template-columns:1fr!important;gap:2.5rem!important;}
                .footer-link-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.875rem 1.5rem!important;}
              }
              @media(max-width:560px){
                .footer-link-grid{grid-template-columns:1fr!important;}
                .footer-bottom{align-items:flex-start!important;flex-direction:column!important;}
              }
            `}</style>

            <div className="footer-brand">
              <img src={LOGO_SRC} alt="BIND Immobilien GmbH" style={{ height: '58px', width: 'auto', maxWidth: '260px', objectFit: 'contain', marginBottom: '1.5rem' }} />
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '320px' }}>{t.footer.desc}</p>
            </div>

            <div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '1.5rem' }}>{t.footer.navTitle}</p>
              <div className="footer-link-grid">
                {navLinks.map(l => (
                  <button key={l.href} onClick={() => scrollTo(l.href)} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', cursor: 'pointer', padding: 0, transition: 'color 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#B8962E'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '1.5rem' }}>{t.footer.segTitle}</p>
              <div className="footer-link-grid" style={{ marginBottom: '2rem' }}>
                {t.footer.segments.map(s => (
                  <span key={s} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}>{s}</span>
                ))}
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '0.875rem' }}>{t.footer.language}</p>
              <div className="footer-lang">
                {[
                  { code: 'de' as const, label: 'DE' },
                  { code: 'en' as const, label: 'EN' },
                ].map(item => (
                  <button
                    key={item.code}
                    onClick={() => setLang(item.code)}
                    style={{
                      minWidth: '44px',
                      padding: '8px 10px',
                      border: lang === item.code ? '1px solid #B8962E' : '1px solid rgba(255,255,255,0.16)',
                      background: lang === item.code ? 'rgba(184,150,46,0.12)' : 'transparent',
                      color: lang === item.code ? '#B8962E' : 'rgba(255,255,255,0.55)',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>© {new Date().getFullYear()} BIND Immobilien GmbH · HRB 118677 Amtsgericht Köln</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[{ label: t.footer.impressum, path: '/impressum' }, { label: t.footer.datenschutz, path: '/datenschutz' }].map(item => (
                <button key={item.label} onClick={() => navigate(item.path)} style={{ background: 'none', border: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#B8962E'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
