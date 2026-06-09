/* Project band */

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function StatsSection() {
  const { t } = useLang();
  const { ref, inView } = useInView(0.15);

  return (
    <section
      ref={ref}
      className="stats-section"
      style={{ backgroundColor: "#111111", padding: "5rem 0" }}
    >
      <div className="container">
        <style>{`
          @media(max-width:768px){
            .project-band{padding:0!important;}
            .project-title{font-size:13px!important;}
            .project-name{font-size:clamp(1.75rem, 8vw, 2.5rem)!important;}
          }
        `}</style>
        <div
          className="project-band"
          style={{
            padding: "0 2rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div
            className="project-title"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#B8962E",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            {t.stats.projectLabel}
          </div>
          <div
            className="project-name"
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(2.1rem, 4vw, 3.8rem)",
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.05,
            }}
          >
            {t.stats.projectName}
          </div>
        </div>
      </div>
    </section>
  );
}
