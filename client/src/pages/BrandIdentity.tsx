import { useMemo, useRef, useState } from "react";
import { Check, Copy, PenLine, X } from "lucide-react";
import Navigation from "@/components/Navigation";

type LogoType = "none" | "text" | "image";

type SignatureForm = {
  name: string;
  role: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  logoType: LogoType;
  stackedContact: boolean;
};

const defaultSignature: SignatureForm = {
  name: "DUYGU SALTIK",
  role: "CHIEF OPERATING OFFICER",
  address: "Ostwall 21 | 47798 Krefeld | Germany",
  phone: "",
  mobile: "+49 160 1010602",
  email: "duygu.saltik@bindimmobilien.de",
  website: "",
  logoType: "text",
  stackedContact: false,
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSignatureHtml(form: SignatureForm, logoImageUrl: string) {
  const name = escapeHtml(form.name);
  const role = escapeHtml(form.role);
  const address = escapeHtml(form.address);
  const phone = escapeHtml(form.phone);
  const mobile = escapeHtml(form.mobile);
  const email = escapeHtml(form.email);
  const website = escapeHtml(form.website);
  const dividerColor = "#d9d9d9";
  const primaryText = "#222";
  const logoText = "#000";
  const bodyText = "#555";
  const contactText = "#333";
  const mutedText = "#8a8a8a";
  const roleText = "#9a9a9a";

  const contactParts = [
    mobile && `<strong>M.</strong>&nbsp;${mobile}`,
    phone && `<strong>T.</strong> ${phone}`,
    email &&
      `<strong>E.</strong>&nbsp;<a href="mailto:${email}" style="color:${contactText};text-decoration:none;">${email}</a>`,
    website &&
      `<strong>W.</strong>&nbsp;<a href="https://${website.replace(/^https?:\/\//, "")}" style="color:${contactText};text-decoration:none;">${website}</a>`,
  ].filter(Boolean);

  const logoCell =
    form.logoType === "text"
      ? `<td width="162" style="width:162px;min-width:162px;max-width:162px;padding:0;border-right:2px solid ${dividerColor};vertical-align:middle;mso-line-height-rule:exactly;">
        <div style="width:162px;min-width:162px;max-width:162px;margin:0;padding:0;font-size:24px;font-weight:700;line-height:25px;letter-spacing:-0.2px;color:${logoText};mso-line-height-rule:exactly;">
          <span style="display:block;white-space:nowrap;margin:0;padding:0;line-height:25px;mso-line-height-rule:exactly;">BIND</span>
          <span style="display:block;white-space:nowrap;margin:0;padding:0;line-height:25px;mso-line-height-rule:exactly;">IMMOBILIEN</span>
          <span style="display:block;white-space:nowrap;margin:0;padding:0;line-height:25px;mso-line-height-rule:exactly;">GMBH</span>
        </div>
      </td>`
      : form.logoType === "image"
        ? `<td width="162" style="width:162px;min-width:162px;max-width:162px;padding:0;border-right:2px solid ${dividerColor};vertical-align:middle;mso-line-height-rule:exactly;">
        <img src="${escapeHtml(logoImageUrl)}" width="150" alt="BIND Immobilien" style="display:block;width:150px;height:auto;border:0;outline:none;text-decoration:none;">
      </td>`
        : "";

  const contentPadding = form.logoType !== "none" ? "0 0 0 22px" : "0";
  const contactHtml = contactParts.join(form.stackedContact ? "<br>" : "&nbsp;&nbsp;|&nbsp;&nbsp;");

  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
  <tr>
    ${logoCell}
    <td style="padding:${contentPadding};vertical-align:top;mso-line-height-rule:exactly;">
      <div style="margin:0;padding:0;font-size:18px;font-weight:700;color:${primaryText};letter-spacing:1px;line-height:21px;mso-line-height-rule:exactly;">
        ${name}
      </div>
      <div style="font-size:10px;color:${roleText};letter-spacing:2px;margin:2px 0 0;padding:0;line-height:13px;mso-line-height-rule:exactly;">
        ${role}
      </div>
      <div style="margin:8px 0 0;padding:0;font-size:12px;color:${bodyText};line-height:16px;mso-line-height-rule:exactly;">
        ${address}
      </div>
      <div style="margin:6px 0 0;padding:0;font-size:12px;color:${contactText};line-height:16px;white-space:nowrap;mso-line-height-rule:exactly;">
        ${contactHtml}
      </div>
      <div style="margin:10px 0 0;padding:0;font-size:11px;color:${mutedText};line-height:15px;mso-line-height-rule:exactly;">
        Sitz der Gesellschaft: 47798 Krefeld<br>
        Handelsregister: Amtsgericht Köln HRB 118677<br>
        USt-IdNr. DE 359540228
      </div>
    </td>
  </tr>
</table>`;
}

async function copyRichHtml(html: string, plainText: string, previewElement: HTMLElement | null) {
  if (navigator.clipboard?.write && "ClipboardItem" in window) {
    const ClipboardItemCtor = window.ClipboardItem;
    await navigator.clipboard.write([
      new ClipboardItemCtor({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([plainText], { type: "text/plain" }),
      }),
    ]);
    return;
  }

  if (!previewElement) {
    await navigator.clipboard.writeText(plainText);
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(previewElement);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  document.execCommand("copy");
  selection?.removeAllRanges();
}

export default function BrandIdentity() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState<SignatureForm>(defaultSignature);
  const [copied, setCopied] = useState<"html" | "rich" | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const logoImageUrl =
    typeof window === "undefined"
      ? "/brand/bind-logo-new.svg"
      : `${window.location.origin}/brand/bind-logo-new.svg`;
  const signatureHtml = useMemo(() => buildSignatureHtml(form, logoImageUrl), [form, logoImageUrl]);
  const plainText = useMemo(
    () =>
      [
        form.name,
        form.role,
        form.address,
        form.phone && `T ${form.phone}`,
        form.mobile && `M ${form.mobile}`,
        form.email && `E ${form.email}`,
        form.website && `W ${form.website}`,
      ]
        .filter(Boolean)
        .join("\n"),
    [form],
  );

  const updateField = (field: keyof SignatureForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setCopied(null);
  };

  const copyRichText = async () => {
    await copyRichHtml(signatureHtml, plainText, previewRef.current);
    setCopied("rich");
  };

  return (
    <div style={{ backgroundColor: "#ebe6dc", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ paddingTop: "76px" }}>
        <iframe
          title="BIND Immobilien Brand Identity"
          src="/brand/bind-immobilien-identity.html"
          style={{
            display: "block",
            width: "100%",
            minHeight: "calc(100vh - 76px)",
            border: 0,
            backgroundColor: "#ebe6dc",
          }}
        />
      </main>

      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          zIndex: 140,
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          border: "1px solid #1a1a1a",
          background: "#1a1a1a",
          color: "#fff",
          padding: "13px 18px",
          fontFamily: "DM Sans, Arial, sans-serif",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          boxShadow: "0 14px 35px rgba(26,26,26,0.22)",
        }}
      >
        <PenLine size={16} />
        Signature
      </button>

      {drawerOpen && (
        <div
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            background: "rgba(26,26,26,0.34)",
          }}
        />
      )}

      <aside
        aria-label="Email signature configurator"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 160,
          width: "min(720px, 100vw)",
          height: "100vh",
          background: "#fbfaf7",
          borderLeft: "1px solid rgba(26,26,26,0.14)",
          boxShadow: "-24px 0 60px rgba(26,26,26,0.18)",
          transform: drawerOpen ? "translateX(0)" : "translateX(105%)",
          transition: "transform 0.28s ease",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "26px" }}>
          <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "18px" }}>
            <div>
              <p style={{ margin: 0, color: "#c8a05a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Rendered HTML Signature
              </p>
              <h1 style={{ margin: "8px 0 0", fontFamily: "Playfair Display, Georgia, serif", fontSize: "30px", lineHeight: 1.05 }}>
                Outlook signature
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close signature configurator"
              style={{ border: "1px solid #ded6ca", background: "#fff", width: "38px", height: "38px", display: "grid", placeItems: "center" }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: "grid", gap: "14px", marginTop: "26px" }}>
            {[
              ["name", "Name"],
              ["role", "Role"],
              ["address", "Address"],
              ["phone", "Phone"],
              ["mobile", "Mobile"],
              ["email", "Email"],
              ["website", "Website"],
            ].map(([field, label]) => (
              <label key={field} style={{ display: "grid", gap: "6px", fontFamily: "DM Sans, Arial, sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {label}
                <input
                  value={String(form[field as keyof SignatureForm])}
                  onChange={(event) => updateField(field as keyof SignatureForm, event.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #ded6ca",
                    background: "#fff",
                    padding: "12px 13px",
                    fontSize: "14px",
                    fontFamily: "Arial, sans-serif",
                    letterSpacing: 0,
                    textTransform: "none",
                  }}
                />
              </label>
            ))}

            <div style={{ display: "grid", gap: "10px" }}>
              <label style={{ display: "grid", gap: "6px", fontFamily: "DM Sans, Arial, sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Logo type
                <select
                  value={form.logoType}
                  onChange={(event) => updateField("logoType", event.target.value as LogoType)}
                  style={{
                    width: "100%",
                    border: "1px solid #ded6ca",
                    background: "#fff",
                    padding: "12px 13px",
                    fontSize: "14px",
                    fontFamily: "Arial, sans-serif",
                    letterSpacing: 0,
                    textTransform: "none",
                  }}
                >
                  <option value="none">None</option>
                  <option value="text">Text logo</option>
                <option value="image" disabled>New brand logo</option>
                </select>
              </label>
            </div>

            <label style={{ display: "grid", gap: "6px", fontFamily: "DM Sans, Arial, sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Contact layout
              <select
                value={form.stackedContact ? "list" : "inline"}
                onChange={(event) => updateField("stackedContact", event.target.value === "list")}
                style={{
                  width: "100%",
                  border: "1px solid #ded6ca",
                  background: "#fff",
                  padding: "12px 13px",
                  fontSize: "14px",
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: 0,
                  textTransform: "none",
                }}
              >
                <option value="inline">Inline</option>
                <option value="list">List</option>
              </select>
            </label>
          </div>

          <div style={{ marginTop: "26px", border: "1px solid #ded6ca", background: "#fff", padding: "18px", overflowX: "auto" }}>
            <div ref={previewRef} dangerouslySetInnerHTML={{ __html: signatureHtml }} />
          </div>

          <div style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
            <button type="button" className="btn-primary" onClick={copyRichText} style={{ justifyContent: "center", padding: "12px 14px" }}>
              {copied === "rich" ? <Check size={16} /> : <Copy size={16} />}
              Copy Rich Text
            </button>
          </div>

          <p style={{ margin: "14px 0 0", color: "#687280", fontSize: "12px", lineHeight: 1.5 }}>
            Use “Copy Rich Text” for the copy-paste method in Outlook.
          </p>
        </div>
      </aside>
    </div>
  );
}
