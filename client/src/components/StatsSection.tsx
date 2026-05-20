/* StatsSection – i18n */

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Counter({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 50;
    const timer = setInterval(() => {
      frame++;
      setVal(Math.round((target / total) * frame));
      if (frame >= total) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{val.toLocaleString('de-DE')}{suffix}</>;
}

const statNums = [
  { num: 4, suffix: " Mio." },
  { num: 48, suffix: "h" },
  { num: 4, suffix: "" },
  { num: 2, suffix: "" },
];

export default function StatsSection() {
  const { t } = useLang();
  const { ref, inView } = useInView(0.15);

  return (
    <section ref={ref} style={{ backgroundColor: '#111111', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }} className="stats-grid">
          <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
          {statNums.map((s, i) => (
            <div key={i} style={{ padding: '2.5rem 2rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s` }}>
              <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 600, color: '#B8962E', lineHeight: 1, marginBottom: '0.5rem' }}>
                <Counter target={s.num} suffix={s.suffix} inView={inView} />
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                {t.stats.items[i]?.label}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                {t.stats.items[i]?.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
