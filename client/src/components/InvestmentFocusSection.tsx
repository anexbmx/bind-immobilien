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
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/hero_modern-gJnmpH7MXHKaVa8J4aZGXu.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/hero_hotel_modern-6AtJUZJtwrqo9vRWRFjUBt.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/hotel_project_new-cXKqbnVLSpSQePjqXkNu8W.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663556990306/i8Gj75QVv5anJNJu4VYAkn/cologne_skyline-T9qnXAhkenikcQUr8R8Q3d.webp",
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
              <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: '#B8962E' }} />
              <span className="label-text">{t.invest.label}</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 600, color: '#111111', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '520px' }}>
              {t.invest.headline1}<br />
              <em style={{ color: '#B8962E', fontWeight: 400 }}>{t.invest.headline2}</em>
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
                  <img src={images[i]} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                    onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }} />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <Icon size={16} style={{ color: '#B8962E' }} />
                    <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.4rem', fontWeight: 600, color: '#111111' }}>{cat.title}</h3>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.75, marginBottom: '1.5rem' }}>{cat.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: '#B8962E', backgroundColor: 'rgba(184,150,46,0.08)', padding: '4px 10px', border: '1px solid rgba(184,150,46,0.2)' }}>{tag}</span>
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
