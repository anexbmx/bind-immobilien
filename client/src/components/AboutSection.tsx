/* AboutSection – i18n */

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutSection() {
  const { t } = useLang();
  const { ref, inView } = useInView(0.1);

  return (
    <section id="ueber-uns" ref={ref} className="section" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <style>{`@media(max-width:768px){.about-top{grid-template-columns:1fr!important;}.about-bottom{grid-template-columns:1fr!important;}}`}</style>

        {/* Top */}
        <div className="about-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '5rem', alignItems: 'end' }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.75rem' }}>
              <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: '#B8962E' }} />
              <span className="label-text">{t.about.label}</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', fontWeight: 600, color: '#111111', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {t.about.headline1}<br />
              <em style={{ color: '#B8962E', fontWeight: 400 }}>{t.about.headline2}</em>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.8, marginBottom: '1.5rem' }}>{t.about.p1}</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.8 }}>{t.about.p2}</p>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#E0DDD8', marginBottom: '4rem' }} />

        {/* Bottom */}
        <div className="about-bottom" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          {/* Image */}
          <div style={{ position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-24px)', transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/hero_hotel_modern-6AtJUZJtwrqo9vRWRFjUBt.webp" alt="BIND Immobilien" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', width: '80px', height: '80px', border: '2px solid #B8962E', zIndex: -1 }} />
          </div>

          {/* Facts */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)', transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {t.about.facts.map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '2rem', padding: '1.1rem 0', borderBottom: '1px solid #E0DDD8', opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${0.4 + i * 0.07}s` }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#999999', letterSpacing: '0.05em', flexShrink: 0 }}>{f.label}</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: '#111111', textAlign: 'right' }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
