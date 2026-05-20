/* SubmitOfferSection – i18n */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

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
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '420px', display: 'flex', alignItems: 'center' }}>
        <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/duesseldorf_hero-hL9a8GLKi27MNSSuz7fthf.webp" alt="Düsseldorf" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.4) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: '#B8962E' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8962E' }}>{t.submit.label}</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '600px', marginBottom: '1.5rem' }}>
            {t.submit.headline1}{' '}<em style={{ color: '#B8962E', fontWeight: 400 }}>{t.submit.headline2}</em>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, maxWidth: '500px', marginBottom: '2.5rem' }}>{t.submit.sub}</p>
          <button onClick={() => { const el = document.querySelector("#kontakt"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px', backgroundColor: '#B8962E', color: '#FFFFFF', border: 'none', cursor: 'pointer', transition: 'background-color 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4AE4A'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#B8962E'; }}>
            {t.submit.ctaBtn} <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="section" style={{ backgroundColor: '#F8F7F4' }}>
        <div className="container">
          <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 600, color: '#111111', marginBottom: '3.5rem', letterSpacing: '-0.02em' }}>{t.submit.processTitle}</h3>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {t.submit.steps.map((s, i) => (
              <div key={i} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: `opacity 0.7s ease ${0.2 + i * 0.12}s, transform 0.7s ease ${0.2 + i * 0.12}s` }}>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '3rem', fontWeight: 600, color: 'rgba(184,150,46,0.15)', lineHeight: 1, marginBottom: '0.75rem' }}>0{i + 1}</div>
                <div style={{ width: '24px', height: '2px', backgroundColor: '#B8962E', marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#111111', marginBottom: '0.5rem' }}>{s.title}</h4>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Docs */}
      <div style={{ backgroundColor: '#FFFFFF', paddingTop: '4rem', paddingBottom: '5rem', borderTop: '1px solid #E0DDD8' }}>
        <div className="container">
          <div className="docs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 600, color: '#111111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                {t.submit.docsTitle1}{' '}<em style={{ color: '#B8962E', fontWeight: 400 }}>{t.submit.docsTitle2}</em>{t.submit.docsTitle3 ? ` ${t.submit.docsTitle3}` : ''}
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.75, marginBottom: '1.5rem' }}>{t.submit.docsSub}</p>
              {/* Exposé note */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', backgroundColor: 'rgba(184,150,46,0.07)', border: '1px solid rgba(184,150,46,0.3)' }}>
                <Upload size={15} style={{ color: '#B8962E', flexShrink: 0 }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500, color: '#111111' }}>{t.submit.exposeNote}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {t.submit.docs.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '1rem 0', borderBottom: '1px solid #E0DDD8' }}>
                  <CheckCircle2 size={15} style={{ color: '#B8962E', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.6 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
