/* SubmitOfferSection – i18n */

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const BANNER_IMAGE = {
  src: "/assets/home/duesseldorf-banner-640.webp",
  srcSet:
    "/assets/home/duesseldorf-banner-640.webp 640w, /assets/home/duesseldorf-banner-960.webp 960w",
  sizes: "100vw",
  width: 1920,
  height: 1072,
};

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function SubmitOfferSection() {
  const { t } = useLang();
  const { ref, inView } = useInView(0.08);

  return (
    <section id="angebot" ref={ref} style={{ backgroundColor: '#FFFFFF' }}>
      <style>{`@media(max-width:768px){.steps-grid{grid-template-columns:repeat(2,1fr)!important;}.docs-grid{grid-template-columns:1fr!important;}}`}</style>

      {/* Banner */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '420px' }}>
        <img src={BANNER_IMAGE.src} srcSet={BANNER_IMAGE.srcSet} sizes={BANNER_IMAGE.sizes} width={BANNER_IMAGE.width} height={BANNER_IMAGE.height} alt="Düsseldorf" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.4) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: '#D4AE4A' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AE4A' }}>{t.submit.label}</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '600px', marginBottom: '1.5rem' }}>
            {t.submit.headline1}{' '}<em style={{ color: '#D4AE4A', fontWeight: 400 }}>{t.submit.headline2}</em>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, maxWidth: '500px', marginBottom: '2.5rem' }}>{t.submit.sub}</p>
          <button type="button" className="theme-cta-light" onClick={() => { const el = document.querySelector("#kontakt"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px', backgroundColor: '#806000', color: '#FFFFFF', border: 'none', cursor: 'pointer', transition: 'background-color 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#6F560B'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#806000'; }}>
            {t.submit.ctaBtn} <ArrowRight size={14} />
          </button>

          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.18)' }}>
            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 600, color: '#FFFFFF', marginBottom: '3rem', letterSpacing: '-0.02em' }}>{t.submit.processTitle}</h3>
            <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
              {t.submit.steps.map((s, i) => (
                <div key={i} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: `opacity 0.7s ease ${0.2 + i * 0.12}s, transform 0.7s ease ${0.2 + i * 0.12}s` }}>
                  <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '3rem', fontWeight: 600, color: 'rgba(212,174,74,0.72)', lineHeight: 1, marginBottom: '0.75rem' }}>0{i + 1}</div>
                  <div style={{ width: '24px', height: '2px', backgroundColor: '#D4AE4A', marginBottom: '1rem' }} />
                  <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.5rem' }}>{s.title}</h4>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.68)', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
