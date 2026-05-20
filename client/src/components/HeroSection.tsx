/* HeroSection – Clean Authority Design + i18n */

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ minHeight: '100vh', backgroundColor: '#F8F7F4', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        #hero-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        @media (max-width: 900px) {
          #hero-grid { grid-template-columns: 1fr !important; }
          #hero-img { min-height: 50vh; order: -1; }
          #hero-text { padding-top: 7rem !important; padding-bottom: 4rem !important; }
        }
      `}</style>

      <div id="hero-grid">
        {/* Left: Text */}
        <div id="hero-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 4rem 6rem 4rem', backgroundColor: '#F8F7F4' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: '#B8962E' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8962E' }}>
              {t.hero.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', fontWeight: 600, color: '#111111', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '1.5rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s' }}>
            {t.hero.headline1}<br />
            <em style={{ color: '#B8962E', fontStyle: 'italic', fontWeight: 400 }}>{t.hero.headline2}</em>{' '}
            {t.hero.headline3}
          </h1>

          {/* Gold rule */}
          <div style={{ width: visible ? '48px' : '0px', height: '2px', backgroundColor: '#B8962E', marginBottom: '2rem', transition: 'width 0.8s ease 0.5s' }} />

          {/* Sub */}
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.75, maxWidth: '420px', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s' }}>
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s' }}>
            <button onClick={() => scrollTo("#angebot")} className="btn-primary">
              {t.hero.ctaPrimary} <ArrowRight size={14} />
            </button>
            <button onClick={() => scrollTo("#ueber-uns")} className="btn-outline">
              {t.hero.ctaSecondary}
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #E0DDD8', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.7s', flexWrap: 'wrap' }}>
            {[
              { num: '4 Mio.', label: t.hero.stat1Label },
              { num: '48h', label: t.hero.stat2Label },
              { num: '4', label: t.hero.stat3Label },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.6rem', fontWeight: 600, color: '#111111', lineHeight: 1 }}>{f.num}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#999999', marginTop: '4px', letterSpacing: '0.05em' }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div id="hero-img" style={{ position: 'relative', overflow: 'hidden', opacity: visible ? 1 : 0, transition: 'opacity 1.2s ease 0.2s' }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/duesseldorf_hero-hL9a8GLKi27MNSSuz7fthf.webp"
            alt="Düsseldorf Medienhafen"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(248,247,244,0.15) 0%, transparent 30%)' }} />
          {/* Badge */}
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '2rem', backgroundColor: 'rgba(248,247,244,0.95)', backdropFilter: 'blur(12px)', padding: '1.25rem 1.5rem', borderLeft: '3px solid #B8962E', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: 'opacity 1s ease 0.9s, transform 1s ease 0.9s' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '4px' }}>{t.hero.badge}</div>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.1rem', fontWeight: 600, color: '#111111' }}>{t.hero.badgeSub}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
