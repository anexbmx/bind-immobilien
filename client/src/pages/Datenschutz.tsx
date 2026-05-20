import Navigation from "@/components/Navigation";
import FooterSection from "@/components/FooterSection";

const paragraphStyle: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "15px",
  lineHeight: 1.85,
  color: "#6B6B6B",
  marginBottom: "1rem",
};

const listStyle: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "15px",
  lineHeight: 1.85,
  color: "#6B6B6B",
  paddingLeft: "1.2rem",
  marginBottom: "1rem",
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

export default function Datenschutz() {
  return (
    <div style={{ backgroundColor: "#F8F7F4", minHeight: "100vh", color: "#111111" }}>
      <Navigation />

      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "9rem 2rem 8rem" }}>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8962E", marginBottom: "1.5rem" }}>
          Datenschutz
        </p>
        <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 3.6rem)", fontWeight: 600, color: "#111111", marginBottom: "3rem", lineHeight: 1.1 }}>
          Datenschutzerklärung
        </h1>

        <div style={{ borderTop: "1px solid #E0DDD8", paddingTop: "2.5rem" }}>
          <LegalSection title="1. Verantwortlicher">
            <p style={paragraphStyle}>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "15px", lineHeight: 1.8, color: "#111111" }}>
              <p style={{ fontWeight: 600 }}>BIND Immobilien GmbH</p>
              <p>Ostwall 9-11</p>
              <p>47798 Krefeld</p>
              <p>Deutschland</p>
              <p style={{ marginTop: "0.75rem" }}>
                E-Mail: <a href="mailto:info@bindimmobilien.de" style={{ color: "#111111", textDecoration: "underline", textUnderlineOffset: "3px" }}>info@bindimmobilien.de</a>
              </p>
            </div>
          </LegalSection>

          <LegalSection title="2. Allgemeine Hinweise">
            <p style={paragraphStyle}>
              Wir nehmen den Schutz personenbezogener Daten ernst. Personenbezogene Daten werden auf dieser Website nur verarbeitet, soweit dies für den Betrieb der Website, die Bearbeitung von Anfragen oder die Erfüllung gesetzlicher Pflichten erforderlich ist.
            </p>
            <p style={paragraphStyle}>
              Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Durchführung vorvertraglicher Maßnahmen oder zur Bearbeitung Ihrer Anfrage erforderlich ist, Art. 6 Abs. 1 lit. f DSGVO bei berechtigtem Interesse am sicheren und wirtschaftlichen Betrieb dieser Website sowie Art. 6 Abs. 1 lit. c DSGVO bei gesetzlichen Pflichten.
            </p>
          </LegalSection>

          <LegalSection title="3. Hosting und Server-Logfiles">
            <p style={paragraphStyle}>
              Diese Website wird als statische Website über Vercel bereitgestellt. Beim Aufruf der Website können technische Zugriffsdaten verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Dateien, Referrer-URL, Browsertyp, Betriebssystem und Statuscodes.
            </p>
            <p style={paragraphStyle}>
              Die Verarbeitung erfolgt, um die Website technisch auszuliefern, Stabilität und Sicherheit zu gewährleisten und Missbrauch zu erkennen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Beim Einsatz von Vercel können Daten auch in Drittländer, insbesondere die USA, übermittelt werden. Vercel stützt solche Übermittlungen nach eigenen Angaben auf geeignete Garantien, insbesondere EU-Standardvertragsklauseln.
            </p>
          </LegalSection>

          <LegalSection title="4. Kontaktaufnahme und Immobilienangebote">
            <p style={paragraphStyle}>
              Wenn Sie uns per E-Mail oder über die vorbereitete E-Mail-Funktion des Kontaktformulars kontaktieren, verarbeiten wir die von Ihnen übermittelten Angaben, zum Beispiel Name, E-Mail-Adresse, Telefonnummer, Objektdaten, Standort, Preisvorstellung und Nachricht.
            </p>
            <p style={paragraphStyle}>
              Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage, zur Prüfung des angebotenen Objekts und zur weiteren Kommunikation. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO für vorvertragliche Kommunikation sowie Art. 6 Abs. 1 lit. f DSGVO für unser berechtigtes Interesse an der Bearbeitung qualifizierter Immobilienangebote.
            </p>
          </LegalSection>

          <LegalSection title="5. Lokale Speicherung im Browser">
            <p style={paragraphStyle}>
              Die Website speichert die gewählte Sprache und das gewählte Erscheinungsbild lokal im Browser mittels Local Storage. Diese Daten verbleiben auf Ihrem Gerät und werden nicht an uns übertragen. Sie können die gespeicherten Daten jederzeit über die Einstellungen Ihres Browsers löschen.
            </p>
          </LegalSection>

          <LegalSection title="6. Cookies und Analyse">
            <p style={paragraphStyle}>
              Diese Website setzt nach aktuellem Stand keine Tracking-Cookies und verwendet kein Webanalyse-Tool. Eine Profilbildung zu Werbe- oder Analysezwecken findet nicht statt.
            </p>
          </LegalSection>

          <LegalSection title="7. Externe Schriftarten">
            <p style={paragraphStyle}>
              Zur einheitlichen Darstellung nutzt diese Website Google Fonts, die von Servern von Google geladen werden können. Dabei kann Google technische Zugriffsdaten, insbesondere Ihre IP-Adresse, verarbeiten. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einer konsistenten und professionellen Darstellung der Website.
            </p>
          </LegalSection>

          <LegalSection title="8. Externe Bild- und Mediendienste">
            <p style={paragraphStyle}>
              Einzelne Bilder der Website werden über externe Content-Delivery-Dienste geladen. Beim Abruf dieser Inhalte können technische Zugriffsdaten, insbesondere IP-Adresse und Browserinformationen, an den jeweiligen Anbieter übertragen werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einer performanten und stabilen Auslieferung der Website.
            </p>
          </LegalSection>

          <LegalSection title="9. Speicherdauer">
            <p style={paragraphStyle}>
              Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist. Kommunikations- und Angebotsdaten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Interessen an einer weiteren Speicherung bestehen.
            </p>
          </LegalSection>

          <LegalSection title="10. Empfänger von Daten">
            <p style={paragraphStyle}>
              Eine Weitergabe personenbezogener Daten erfolgt nur, wenn dies zur Bearbeitung Ihrer Anfrage erforderlich ist, Sie eingewilligt haben, eine gesetzliche Verpflichtung besteht oder wir externe Dienstleister im Rahmen einer Auftragsverarbeitung einsetzen.
            </p>
          </LegalSection>

          <LegalSection title="11. Ihre Rechte">
            <p style={paragraphStyle}>
              Sie haben im Rahmen der gesetzlichen Voraussetzungen folgende Rechte:
            </p>
            <ul style={listStyle}>
              <li>Auskunft über die zu Ihrer Person gespeicherten Daten gemäß Art. 15 DSGVO</li>
              <li>Berichtigung unrichtiger Daten gemäß Art. 16 DSGVO</li>
              <li>Löschung gemäß Art. 17 DSGVO</li>
              <li>Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</li>
              <li>Datenübertragbarkeit gemäß Art. 20 DSGVO</li>
              <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gemäß Art. 21 DSGVO</li>
              <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft gemäß Art. 7 Abs. 3 DSGVO</li>
            </ul>
          </LegalSection>

          <LegalSection title="12. Beschwerderecht">
            <p style={paragraphStyle}>
              Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständig kann insbesondere die Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsortes, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes sein.
            </p>
          </LegalSection>

          <LegalSection title="13. Sicherheit">
            <p style={paragraphStyle}>
              Diese Website nutzt eine verschlüsselte Verbindung per HTTPS, sofern sie über die produktive Domain aufgerufen wird. Dadurch werden übermittelte Daten beim Transport gegen unbefugtes Mitlesen geschützt.
            </p>
          </LegalSection>

          <LegalSection title="14. Aktualisierung dieser Datenschutzerklärung">
            <p style={paragraphStyle}>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich technische, rechtliche oder organisatorische Änderungen ergeben.
            </p>
          </LegalSection>

          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#999999", borderTop: "1px solid #E0DDD8", paddingTop: "1.5rem" }}>
            Stand: Mai 2026
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
