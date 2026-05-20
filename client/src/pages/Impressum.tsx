import Navigation from "@/components/Navigation";

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(160px, 240px) 1fr",
  gap: "1.5rem",
  padding: "0.75rem 0",
  borderBottom: "1px solid #E0DDD8",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "13px",
  color: "#6B6B6B",
};

const valueStyle: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "15px",
  color: "#111111",
  lineHeight: 1.7,
};

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8962E", marginBottom: "1.25rem" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Impressum() {
  return (
    <div style={{ backgroundColor: "#F8F7F4", minHeight: "100vh", color: "#111111" }}>
      <Navigation />

      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "9rem 2rem 8rem" }}>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8962E", marginBottom: "1.5rem" }}>
          Rechtliche Angaben
        </p>
        <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 3.6rem)", fontWeight: 600, color: "#111111", marginBottom: "3rem", lineHeight: 1.1 }}>
          Impressum
        </h1>

        <div style={{ borderTop: "1px solid #E0DDD8", paddingTop: "2.5rem" }}>
          <LegalSection title="Angaben gemäß § 5 DDG">
            <div style={valueStyle}>
              <p style={{ fontWeight: 600 }}>BIND Immobilien GmbH</p>
              <p>Ostwall 9-11</p>
              <p>47798 Krefeld</p>
              <p>Deutschland</p>
            </div>
          </LegalSection>

          <LegalSection title="Vertreten durch">
            <div style={valueStyle}>
              <p>Duygu Saltik</p>
              <p style={{ color: "#6B6B6B", fontSize: "14px" }}>Geschäftsführerin</p>
            </div>
          </LegalSection>

          <LegalSection title="Kontakt">
            <div style={rowStyle}>
              <span style={labelStyle}>E-Mail</span>
              <a href="mailto:info@bindimmobilien.de" style={{ ...valueStyle, color: "#111111", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                info@bindimmobilien.de
              </a>
            </div>
          </LegalSection>

          <LegalSection title="Registereintrag">
            <div>
              {[
                ["Registergericht", "Amtsgericht Köln"],
                ["Registernummer", "HRB 118677"],
                ["Rechtsform", "Gesellschaft mit beschränkter Haftung"],
                ["Gesellschaftsvertrag", "07. März 2024"],
                ["Stammkapital", "4.000.000,00 EUR"],
              ].map(([label, value]) => (
                <div key={label} style={rowStyle}>
                  <span style={labelStyle}>{label}</span>
                  <span style={valueStyle}>{value}</span>
                </div>
              ))}
            </div>
          </LegalSection>

          <LegalSection title="Umsatzsteuer-ID">
            <p style={{ ...valueStyle, color: "#6B6B6B" }}>
              Eine Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz wird nach Zuteilung ergänzt.
            </p>
          </LegalSection>

          <LegalSection title="Verantwortlich für redaktionelle Inhalte">
            <div style={valueStyle}>
              <p>Duygu Saltik</p>
              <p>BIND Immobilien GmbH</p>
              <p>Ostwall 9-11, 47798 Krefeld</p>
            </div>
          </LegalSection>

          <LegalSection title="EU-Streitschlichtung">
            <p style={{ ...valueStyle, color: "#6B6B6B" }}>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. Die BIND Immobilien GmbH ist nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalSection>

          <LegalSection title="Haftung für Inhalte und Links">
            <p style={{ ...valueStyle, color: "#6B6B6B", marginBottom: "1rem" }}>
              Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.
            </p>
            <p style={{ ...valueStyle, color: "#6B6B6B" }}>
              Diese Website kann Links zu externen Websites enthalten. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich.
            </p>
          </LegalSection>

          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#999999", borderTop: "1px solid #E0DDD8", paddingTop: "1.5rem" }}>
            Stand: Mai 2026
          </p>
        </div>
      </main>
    </div>
  );
}
