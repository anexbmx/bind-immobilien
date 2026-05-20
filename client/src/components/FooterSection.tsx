/* FooterSection – i18n */

import { useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";

const logoVariants = [
  { id: "current", src: "/manus-storage/bind_logo_white_bg_2805c0ff.png", dark: false },
  { id: "v1", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/logo_v1_light-mn32VyaRRYjzC62RGs4cJq.webp", dark: false },
  { id: "v3", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/logo_v3_wordmark-MbyBTPVj2SuKhEnoqo7nVs.webp", dark: false },
];

const logoLabels = (t: any) => [t.footer.logoCurrentLabel, t.footer.logoAlt1, t.footer.logoAlt2];

export default function FooterSection() {
  const { t } = useLang();
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
      {/* Logo showcase */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '3.5rem 0' }}>
        <div className="container">
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '2rem' }}>{t.footer.logoLabel}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
            {logoVariants.map((logo, i) => (
              <div key={logo.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1rem 1.5rem', border: logo.id === 'current' ? '1px solid rgba(184,150,46,0.4)' : '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '200px' }}>
                  <img src={logo.src} alt={logoLabels(t)[i]} style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
                </div>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: logo.id === 'current' ? '#B8962E' : 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{logoLabels(t)[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ padding: '4rem 0 3rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }} className="footer-grid">
            <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:2.5rem!important;}}`}</style>

            <div>
              <img src="/manus-storage/bind_logo_white_bg_2805c0ff.png" alt="BIND Immobilien GmbH" style={{ height: '52px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }} />
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '320px' }}>{t.footer.desc}</p>
            </div>

            <div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '1.5rem' }}>{t.footer.navTitle}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {t.footer.segments.map(s => (
                  <span key={s} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>© {new Date().getFullYear()} BIND Immobilien GmbH · HRB 118677 Amtsgericht Köln</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[{ label: t.footer.impressum, path: '/impressum' }, { label: t.footer.datenschutz, path: '/impressum' }].map(item => (
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
