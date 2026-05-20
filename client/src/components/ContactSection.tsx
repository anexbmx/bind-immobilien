/* ContactSection – i18n */

import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
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

export default function ContactSection() {
  const { t } = useLang();
  const { ref, inView } = useInView(0.08);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', location: '', price: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success(t.contact.successMsg);
      setForm({ name: '', email: '', phone: '', type: '', location: '', price: '', message: '' });
    }, 1200);
  };

  const inputStyle: React.CSSProperties = { width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #E0DDD8', padding: '10px 0', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 300, color: '#111111', outline: 'none', transition: 'border-color 0.25s ease' };
  const labelStyle: React.CSSProperties = { fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999999', display: 'block', marginBottom: '8px' };
  const onFocus = (e: React.FocusEvent<any>) => { e.target.style.borderBottomColor = '#111111'; };
  const onBlur = (e: React.FocusEvent<any>) => { e.target.style.borderBottomColor = '#E0DDD8'; };

  return (
    <section id="kontakt" ref={ref} className="section" style={{ backgroundColor: '#F8F7F4' }}>
      <div className="container">
        <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:3rem!important;}}.form-2col{display:grid;grid-template-columns:1fr 1fr;gap:0 2rem;}@media(max-width:600px){.form-2col{grid-template-columns:1fr!important;}}`}</style>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4rem' }}>
          <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: '#B8962E' }} />
          <span className="label-text">{t.contact.label}</span>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '6rem', alignItems: 'start' }}>
          {/* Info */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 600, color: '#111111', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              {t.contact.headline1}<br /><em style={{ color: '#B8962E', fontWeight: 400 }}>{t.contact.headline2}</em>{t.contact.headline3 ? ` ${t.contact.headline3}` : ''}
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.75, marginBottom: '3rem' }}>{t.contact.sub}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { icon: Mail, label: t.contact.emailLabel, value: 'info@bindimmobilien.de' },
                { icon: Clock, label: t.contact.responseLabel, value: t.contact.responseVal },
                { icon: MapPin, label: t.contact.focusLabel, value: t.contact.focusVal },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E0DDD8', flexShrink: 0 }}>
                    <Icon size={14} style={{ color: '#B8962E' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999999', marginBottom: '3px' }}>{label}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 400, color: '#111111', lineHeight: 1.5 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Register */}
            <div style={{ marginTop: '2.5rem', padding: '1.25rem', border: '1px solid #E0DDD8', backgroundColor: '#FFFFFF' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '0.75rem' }}>{t.contact.regTitle}</p>
              {t.contact.regData.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '4px 0', borderBottom: '1px solid #F0EDE8' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#999999' }}>{k}</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#111111', textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', border: '1px solid #E0DDD8', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(20px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}>
            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, color: '#111111', marginBottom: '2.5rem' }}>{t.contact.formTitle}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-2col">
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>{t.contact.fields.name}</label>
                  <input required type="text" placeholder={t.contact.fields.namePh} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>{t.contact.fields.email}</label>
                  <input required type="email" placeholder={t.contact.fields.emailPh} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>{t.contact.fields.phone}</label>
                  <input type="tel" placeholder={t.contact.fields.phonePh} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>{t.contact.fields.type}</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="">{t.contact.fields.typePh}</option>
                    {t.contact.fields.typeOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>{t.contact.fields.location}</label>
                  <input type="text" placeholder={t.contact.fields.locationPh} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>{t.contact.fields.price}</label>
                  <input type="text" placeholder={t.contact.fields.pricePh} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={labelStyle}>{t.contact.fields.message}</label>
                <textarea rows={4} placeholder={t.contact.fields.messagePh} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical', border: '1px solid #E0DDD8', padding: '10px 12px', borderBottom: '1px solid #E0DDD8' }} onFocus={e => { e.target.style.borderColor = '#111111'; }} onBlur={e => { e.target.style.borderColor = '#E0DDD8'; }} />
              </div>
              <button type="submit" disabled={sending}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '15px 32px', backgroundColor: sending ? '#999' : '#111111', color: '#FFFFFF', border: 'none', cursor: sending ? 'default' : 'pointer', transition: 'background-color 0.25s ease' }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.backgroundColor = '#B8962E'; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.backgroundColor = '#111111'; }}>
                {sending ? t.contact.submitting : (<>{t.contact.submitBtn} <ArrowRight size={14} /></>)}
              </button>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#999999', textAlign: 'center', marginTop: '1rem' }}>{t.contact.privacy}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
