/* HeroSection – Clean Authority Design + i18n */

import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const HERO_IMAGE = {
  src: "/assets/home/duesseldorf-hero-960.webp",
  srcSet:
    "/assets/home/duesseldorf-hero-640.webp 640w, /assets/home/duesseldorf-hero-960.webp 960w, /assets/home/duesseldorf-hero-1280.webp 1280w, /assets/home/duesseldorf-hero-1920.webp 1920w",
  sizes: "(max-width: 900px) 100vw, 50vw",
  width: 1920,
  height: 1072,
};

export default function HeroSection() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ minHeight: '100vh', backgroundColor: '#F8F7F4', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        #hero-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; min-width: 0; width: 100%; max-width: 1900px; margin: 0 auto; }
        #hero-text { min-width: 0; }
        #hero-headline {
          font-size: 5.5rem;
          line-height: 1;
          letter-spacing: 0;
          max-width: 100%;
        }
        @media (max-width: 1200px) {
          #hero-text { padding-left: 3rem !important; padding-right: 3rem !important; }
          #hero-headline { font-size: 4.4rem; }
        }
        @media (max-width: 900px) {
          #hero-grid { grid-template-columns: 1fr !important; min-height: auto; }
          #hero-img { order: 2; min-height: 320px; height: 40vh; max-height: 420px; }
          #hero-text {
            justify-content: flex-start !important;
            padding: 8.5rem 2rem 3.5rem !important;
          }
          #hero-headline { font-size: 4rem; }
        }
        @media (max-width: 600px) {
          #hero-text { padding: 8rem 1.5rem 3rem !important; }
          #hero-headline { font-size: 3rem; }
        }
        @media (max-width: 420px) {
          #hero-text { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          #hero-headline { font-size: 2.6rem; }
        }
      `}</style>

      <div id="hero-grid">
        {/* Left: Text */}
        <div id="hero-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 4rem 6rem 4rem', backgroundColor: '#F8F7F4' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: '#806000' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#806000' }}>
              {t.hero.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 id="hero-headline" style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 600, color: '#111111', marginBottom: '1.5rem' }}>
            {t.hero.headline1}<br />
            <em style={{ color: '#806000', fontStyle: 'italic', fontWeight: 400 }}>{t.hero.headline2}</em>{' '}
            {t.hero.headline3}
          </h1>

          {/* Gold rule */}
          <div style={{ width: '48px', height: '2px', backgroundColor: '#806000', marginBottom: '2rem' }} />

          {/* Sub */}
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.75, maxWidth: '420px', marginBottom: '3rem' }}>
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button type="button" onClick={() => scrollTo("#angebot")} className="btn-primary">
              {t.hero.ctaPrimary} <ArrowRight size={14} />
            </button>
            <button type="button" onClick={() => scrollTo("#ueber-uns")} className="btn-outline">
              {t.hero.ctaSecondary}
            </button>
          </div>

        </div>

        {/* Right: Image */}
        <div id="hero-img" style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={HERO_IMAGE.src}
            srcSet={HERO_IMAGE.srcSet}
            sizes={HERO_IMAGE.sizes}
            alt="Düsseldorf Medienhafen"
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(248,247,244,0.15) 0%, transparent 30%)' }} />
          {/* Badge */}
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '2rem', backgroundColor: 'rgba(248,247,244,0.95)', backdropFilter: 'blur(12px)', padding: '1.25rem 1.5rem', borderLeft: '3px solid #806000' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#806000', marginBottom: '4px' }}>{t.hero.badge}</div>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.1rem', fontWeight: 600, color: '#111111' }}>{t.hero.badgeSub}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
