/* InvestmentFocusSection – i18n */

import { useEffect, useRef, useState } from "react";
import { Building2, Hotel, Hammer, MapPin } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const icons = [Building2, Hotel, Hammer, MapPin];
const images = [
  {
    src: "/assets/home/focus-office-640.webp",
    srcSet: "/assets/home/focus-office-640.webp 640w, /assets/home/focus-office-768.webp 768w, /assets/home/focus-office-960.webp 960w",
    width: 1920,
    height: 1072,
  },
  {
    src: "/assets/home/focus-hotel-640.webp",
    srcSet: "/assets/home/focus-hotel-640.webp 640w, /assets/home/focus-hotel-768.webp 768w, /assets/home/focus-hotel-960.webp 960w",
    width: 1920,
    height: 1072,
  },
  {
    src: "/assets/home/focus-development-640.webp",
    srcSet: "/assets/home/focus-development-640.webp 640w, /assets/home/focus-development-768.webp 768w, /assets/home/focus-development-960.webp 960w",
    width: 1920,
    height: 1434,
  },
  {
    src: "/assets/home/focus-region-640.webp",
    srcSet: "/assets/home/focus-region-640.webp 640w, /assets/home/focus-region-768.webp 768w, /assets/home/focus-region-960.webp 960w",
    width: 1920,
    height: 1434,
  },
];

export default function InvestmentFocusSection() {
  const { t } = useLang();
  const { ref, inView } = useInView(0.05);

  return (
    <section id="investitionsfokus" ref={ref} className="section" style={{ backgroundColor: '#F8F7F4' }}>
      <div className="container">
        <style>{`@media(max-width:768px){.invest-header{grid-template-columns:1fr!important;}.invest-grid{grid-template-columns:1fr!important;}}`}</style>

        {/* Header */}
        <div className="invest-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
              <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: '#806000' }} />
              <span className="label-text">{t.invest.label}</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 600, color: '#111111', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '520px' }}>
              {t.invest.headline1}<br />
              <em style={{ color: '#806000', fontWeight: 400 }}>{t.invest.headline2}</em>
            </h2>
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.75, maxWidth: '340px' }}>
            {t.invest.sub}
          </p>
        </div>

        {/* Grid */}
        <div className="invest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5px', backgroundColor: '#E0DDD8' }}>
          {t.invest.categories.map((cat, i) => {
            const Icon = icons[i];
            return (
              <div key={cat.title} className="card-clean" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s` }}>
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={images[i].src} srcSet={images[i].srcSet} sizes="(max-width: 768px) 100vw, 50vw" width={images[i].width} height={images[i].height} alt={cat.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                    onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }} />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <Icon size={16} style={{ color: '#806000' }} />
                    <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.4rem', fontWeight: 600, color: '#111111' }}>{cat.title}</h3>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.75, marginBottom: '1.5rem' }}>{cat.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', color: '#806000', backgroundColor: 'rgba(128,96,0,0.08)', padding: '4px 10px', border: '1px solid rgba(128,96,0,0.22)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
