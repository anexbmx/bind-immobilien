/* Impressum - i18n */

import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const LOGO_SRC = "/assets/bind-logo.png";

export default function Impressum() {
  const [, navigate] = useLocation();
  const { t } = useLang();
  const s = t.impressum.sections;

  return (
    <div style={{ backgroundColor: '#F8F7F4', minHeight: '100vh', color: '#111111' }}>
      <header style={{ borderBottom: '1px solid #E0DDD8', backgroundColor: '#F8F7F4' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            <button onClick={() => navigate("/")} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B6B6B', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={14} /> {t.impressum.back}
            </button>
            <img src={LOGO_SRC} alt="BIND Immobilien GmbH" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '5rem 2rem 8rem' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '1.5rem' }}>{t.impressum.label}</p>
        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600, color: '#111111', marginBottom: '3rem', lineHeight: 1.1 }}>{t.impressum.title}</h1>

        <div style={{ borderTop: '1px solid #E0DDD8', paddingTop: '2.5rem' }}>
          {[
            {
              title: s.tmg,
              content: (
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', lineHeight: 1.8, color: '#111111' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>BIND Immobilien GmbH</p>
                  <p>Ostwall 9-11</p><p>47798 Krefeld</p><p>Deutschland</p>
                </div>
              ),
            },
            {
              title: s.management,
              content: (
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', lineHeight: 1.8, color: '#111111' }}>
                  <p style={{ fontWeight: 600 }}>Duygu Saltik</p>
                  <p style={{ color: '#6B6B6B', fontSize: '14px' }}>{s.ceoTitle}</p>
                </div>
              ),
            },
            {
              title: s.register,
              content: (
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', lineHeight: 2, color: '#111111' }}>
                  {[['Registergericht / Register Court', 'Amtsgericht Köln'], ['Registernummer / Register No.', 'HRB 118677'], ['Stammkapital / Share Capital', '4.000.000,00 EUR'], ['Gesellschaftsvertrag / Articles', '07. März 2024']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '2rem' }}>
                      <span style={{ color: '#6B6B6B', minWidth: '220px', fontSize: '14px' }}>{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              title: s.contact,
              content: (
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', lineHeight: 2, color: '#111111' }}>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <span style={{ color: '#6B6B6B', minWidth: '220px', fontSize: '14px' }}>E-Mail</span>
                    <span>info@bindimmobilien.de</span>
                  </div>
                </div>
              ),
            },
            { title: s.vat, content: <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', lineHeight: 1.8, color: '#6B6B6B' }}>{s.vatText}</p> },
            { title: s.liability, content: <><p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', lineHeight: 1.8, color: '#6B6B6B', marginBottom: '1rem' }}>{s.liabilityText1}</p><p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', lineHeight: 1.8, color: '#6B6B6B' }}>{s.liabilityText2}</p></> },
            { title: s.privacy, content: <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', lineHeight: 1.8, color: '#6B6B6B' }}>{s.privacyText}</p> },
          ].map((sec, i) => (
            <section key={i} style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '1.25rem' }}>{sec.title}</h2>
              {sec.content}
              {i < 6 && <div style={{ height: '1px', backgroundColor: '#E0DDD8', marginTop: '3rem' }} />}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
