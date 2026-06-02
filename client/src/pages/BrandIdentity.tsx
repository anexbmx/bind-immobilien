import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Download, PenLine, Settings, X } from "lucide-react";
import Navigation from "@/components/Navigation";

type LogoType = "none" | "text" | "image";
type ExportLogoType = "full" | "icon";
type ExampleLogoType = "none" | "stacked" | "wordmark" | "mark" | "image" | "initials";
type ExampleLayoutType = "classic" | "compact" | "stacked" | "top" | "reference" | "referenceDark" | "referenceSplit";

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

type SignatureExample = {
  title: string;
  note: string;
  logo: ExampleLogoType;
  layout: ExampleLayoutType;
  accent?: boolean;
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

const signatureExamples: SignatureExample[] = [
  { title: "01 Reference Full Lockup", note: "Closest to the requested visual direction.", logo: "image", layout: "reference", accent: true },
  { title: "02 Dark Reference Lockup", note: "Black premium version with white and gold contrast.", logo: "image", layout: "referenceDark", accent: true },
  { title: "03 Split Dark Logo Panel", note: "Dark brand block with light content area.", logo: "image", layout: "referenceSplit", accent: true },
  { title: "04 Classic Text Logo", note: "Current clean Outlook-safe direction.", logo: "stacked", layout: "classic" },
  { title: "05 Wordmark Inline", note: "More modern and lighter logo treatment.", logo: "wordmark", layout: "classic" },
  { title: "06 Brand Mark", note: "Icon-led version with compact identity.", logo: "mark", layout: "classic" },
  { title: "07 Full Logo", note: "Uses the full brand logo asset.", logo: "image", layout: "classic" },
  { title: "08 No Logo", note: "Pure text signature for strict email clients.", logo: "none", layout: "classic" },
  { title: "09 Compact Wordmark", note: "Reduced height for frequent replies.", logo: "wordmark", layout: "compact" },
  { title: "10 Stacked Contact", note: "Phone and email one under another.", logo: "stacked", layout: "stacked" },
  { title: "11 Initial Mark", note: "Very minimal brand cue.", logo: "initials", layout: "compact" },
  { title: "12 Top Wordmark", note: "Logo above details for narrow layouts.", logo: "wordmark", layout: "top" },
  { title: "13 Accent Line", note: "Premium version with gold divider.", logo: "mark", layout: "classic", accent: true },
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function telHref(value: string) {
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

function webHref(value: string) {
  return `https://${value.replace(/^https?:\/\//, "")}`;
}

async function assetToDataUrl(path: string) {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
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
    mobile && `<strong>M.</strong>&nbsp;<a href="${telHref(mobile)}" style="color:${contactText};text-decoration:none;">${mobile}</a>`,
    phone && `<strong>T.</strong>&nbsp;<a href="${telHref(phone)}" style="color:${contactText};text-decoration:none;">${phone}</a>`,
    email &&
      `<strong>E.</strong>&nbsp;<a href="mailto:${email}" style="color:${contactText};text-decoration:none;">${email}</a>`,
    website &&
      `<strong>W.</strong>&nbsp;<a href="${webHref(website)}" style="color:${contactText};text-decoration:none;">${website}</a>`,
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

function buildExampleLogo(logo: ExampleLogoType, logoImageUrl: string) {
  if (logo === "none") return "";

  if (logo === "image") {
    return `<img src="${escapeHtml(logoImageUrl)}" width="118" alt="BIND Immobilien" style="display:block;width:118px;height:auto;border:0;outline:none;text-decoration:none;">`;
  }

  if (logo === "mark") {
    return `<div style="width:74px;height:54px;margin:0;padding:0;">
      <svg width="74" height="54" viewBox="0 0 74 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 51V21L37 4L64 21V51" stroke="#1A1A1A" stroke-width="5" stroke-linejoin="miter"/>
        <path d="M28 51V34L37 25L46 34V51" stroke="#C8A05A" stroke-width="5" stroke-linejoin="miter"/>
      </svg>
    </div>`;
  }

  if (logo === "initials") {
    return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:32px;line-height:34px;font-weight:700;letter-spacing:6px;color:#1a1a1a;">BI</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:12px;font-weight:700;letter-spacing:2px;color:#c8a05a;margin-top:4px;">IMMOBILIEN</div>`;
  }

  if (logo === "wordmark") {
    return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:26px;font-weight:400;letter-spacing:9px;color:#1a1a1a;white-space:nowrap;">BIND</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:13px;font-weight:400;letter-spacing:5px;color:#c8a05a;margin-top:2px;white-space:nowrap;">IMMOBILIEN</div>`;
  }

  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:23px;line-height:24px;font-weight:700;letter-spacing:-0.2px;color:#1a1a1a;">
    <span style="display:block;white-space:nowrap;">BIND</span>
    <span style="display:block;white-space:nowrap;">IMMOBILIEN</span>
    <span style="display:block;white-space:nowrap;">GMBH</span>
  </div>`;
}

function buildReferenceLogo(imageUrl: string) {
  return `<img src="${escapeHtml(imageUrl)}" width="162" alt="BIND Immobilien" style="display:block;width:162px;height:auto;border:0;outline:none;text-decoration:none;">`;
}

function buildDarkReferenceLogo(imageUrl: string) {
  return `<img src="${escapeHtml(imageUrl)}" width="162" alt="BIND Immobilien" style="display:block;width:162px;height:auto;border:0;outline:none;text-decoration:none;">`;
}

function buildCompactDarkReferenceLogo(imageUrl: string) {
  return `<img src="${escapeHtml(imageUrl)}" width="128" alt="BIND Immobilien" style="display:block;width:128px;height:auto;border:0;outline:none;text-decoration:none;">`;
}

function buildSignatureExampleHtml(form: SignatureForm, logoImageUrl: string, darkLogoImageUrl: string, example: SignatureExample) {
  const name = escapeHtml(form.name);
  const role = escapeHtml(form.role);
  const address = escapeHtml(form.address);
  const phone = escapeHtml(form.phone);
  const mobile = escapeHtml(form.mobile);
  const email = escapeHtml(form.email);
  const website = escapeHtml(form.website);
  const contactParts = [
    mobile && `<strong>M.</strong>&nbsp;<a href="${telHref(mobile)}" style="color:#333;text-decoration:none;">${mobile}</a>`,
    phone && `<strong>T.</strong>&nbsp;<a href="${telHref(phone)}" style="color:#333;text-decoration:none;">${phone}</a>`,
    email && `<strong>E.</strong>&nbsp;<a href="mailto:${email}" style="color:#333;text-decoration:none;">${email}</a>`,
    website && `<strong>W.</strong>&nbsp;<a href="${webHref(website)}" style="color:#333;text-decoration:none;">${website}</a>`,
  ].filter(Boolean);
  const contactHtml = contactParts.join(example.layout === "stacked" ? "<br>" : "&nbsp;&nbsp;|&nbsp;&nbsp;");
  const legal = `Sitz der Gesellschaft: 47798 Krefeld<br>Handelsregister: Amtsgericht Köln HRB 118677<br>USt-IdNr. DE 359540228`;
  const logoHtml = buildExampleLogo(example.logo, logoImageUrl);
  const divider = example.accent ? "#c8a05a" : "#d9d9d9";
  const contentSize = example.layout === "compact" ? { name: 16, role: 9, body: 11, legal: 10 } : { name: 18, role: 10, body: 12, legal: 11 };

  if (example.layout === "reference") {
    const web = website || "www.bindimmobilien.de";
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;margin:0;padding:0;">
      <tr>
        <td width="162" style="width:162px;min-width:162px;max-width:162px;padding:0 18px 0 0;vertical-align:middle;">
          ${buildReferenceLogo(logoImageUrl)}
        </td>
        <td width="2" style="width:2px;min-width:2px;background:${divider};font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:0 0 0 22px;vertical-align:middle;">
          <div style="font-size:18px;font-weight:700;letter-spacing:1px;color:#000;line-height:21px;white-space:nowrap;">${name}</div>
          <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#c8a05a;margin-top:2px;line-height:13px;white-space:nowrap;">${role}</div>
          <div style="font-size:12px;color:#1a1a1a;margin-top:8px;line-height:16px;white-space:nowrap;">${address.replace(/\s\|\s/g, "&nbsp;&middot;&nbsp;")}</div>
          <div style="font-size:12px;color:#1a1a1a;margin-top:6px;line-height:16px;">
            ${mobile ? `<strong>M.</strong>&nbsp;&nbsp;<a href="${telHref(mobile)}" style="color:#1a1a1a;text-decoration:none;">${mobile}</a><br>` : ""}
            ${email ? `<strong>E.</strong>&nbsp;&nbsp;<a href="mailto:${email}" style="color:#1a1a1a;text-decoration:none;">${email}</a><br>` : ""}
            <strong>W.</strong>&nbsp;&nbsp;<a href="${webHref(web)}" style="color:#1a1a1a;text-decoration:none;">${escapeHtml(web)}</a>
          </div>
          <div style="height:1px;background:${divider};font-size:0;line-height:0;margin:10px 0 8px;">&nbsp;</div>
          <div style="font-size:11px;color:#777;line-height:15px;">
            Sitz der Gesellschaft: 47798 Krefeld<br>
            Handelsregister: Amtsgericht Köln HRB 118677<br>
            USt-IdNr. DE 359540228
          </div>
        </td>
      </tr>
    </table>`;
  }

  if (example.layout === "referenceDark") {
    const web = website || "www.bindimmobilien.de";
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;margin:0;padding:18px;background:#050505;background-color:#050505;">
      <tr>
        <td width="162" style="width:162px;min-width:162px;max-width:162px;padding:0 18px 0 0;vertical-align:middle;">
          ${buildDarkReferenceLogo(darkLogoImageUrl)}
        </td>
        <td width="2" style="width:2px;min-width:2px;background:${divider};font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:0 0 0 22px;vertical-align:middle;">
          <div style="font-size:18px;font-weight:700;letter-spacing:1px;color:#ffffff;line-height:21px;white-space:nowrap;">${name}</div>
          <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#c8a05a;margin-top:2px;line-height:13px;white-space:nowrap;">${role}</div>
          <div style="font-size:12px;color:#ffffff;margin-top:8px;line-height:16px;white-space:nowrap;">${address.replace(/\s\|\s/g, "&nbsp;<span style='color:#c8a05a;'>|</span>&nbsp;")}</div>
          <div style="font-size:12px;color:#ffffff;margin-top:6px;line-height:16px;">
            ${mobile ? `<strong style="color:#c8a05a;">M.</strong>&nbsp;&nbsp;<a href="${telHref(mobile)}" style="color:#ffffff;text-decoration:none;">${mobile}</a><br>` : ""}
            ${email ? `<strong style="color:#c8a05a;">E.</strong>&nbsp;&nbsp;<a href="mailto:${email}" style="color:#ffffff;text-decoration:none;">${email}</a><br>` : ""}
            <strong style="color:#c8a05a;">W.</strong>&nbsp;&nbsp;<a href="${webHref(web)}" style="color:#ffffff;text-decoration:none;">${escapeHtml(web)}</a>
          </div>
          <div style="height:1px;background:${divider};font-size:0;line-height:0;margin:10px 0 8px;">&nbsp;</div>
          <div style="font-size:11px;color:#b8b8b8;line-height:15px;">
            Sitz der Gesellschaft: 47798 Krefeld<br>
            Handelsregister: Amtsgericht Köln HRB 118677<br>
            USt-IdNr. DE 359540228
          </div>
        </td>
      </tr>
    </table>`;
  }

  if (example.layout === "referenceSplit") {
    const web = website || "www.bindimmobilien.de";
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;margin:0;padding:0;background:#ffffff;background-color:#ffffff;">
      <tr>
        <td width="156" style="width:156px;min-width:156px;max-width:156px;padding:14px;background:#050505;background-color:#050505;vertical-align:middle;">
          ${buildCompactDarkReferenceLogo(darkLogoImageUrl)}
        </td>
        <td width="2" style="width:2px;min-width:2px;background:${divider};font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:18px 18px 18px 22px;background:#ffffff;background-color:#ffffff;vertical-align:middle;">
          <div style="font-size:18px;font-weight:700;letter-spacing:1px;color:#000;line-height:21px;white-space:nowrap;">${name}</div>
          <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#c8a05a;margin-top:2px;line-height:13px;white-space:nowrap;">${role}</div>
          <div style="font-size:12px;color:#1a1a1a;margin-top:8px;line-height:16px;white-space:nowrap;">${address.replace(/\s\|\s/g, "&nbsp;<span style='color:#c8a05a;'>|</span>&nbsp;")}</div>
          <div style="font-size:12px;color:#1a1a1a;margin-top:6px;line-height:16px;">
            ${mobile ? `<strong>M.</strong>&nbsp;&nbsp;<a href="${telHref(mobile)}" style="color:#1a1a1a;text-decoration:none;">${mobile}</a><br>` : ""}
            ${email ? `<strong>E.</strong>&nbsp;&nbsp;<a href="mailto:${email}" style="color:#1a1a1a;text-decoration:none;">${email}</a><br>` : ""}
            <strong>W.</strong>&nbsp;&nbsp;<a href="${webHref(web)}" style="color:#1a1a1a;text-decoration:none;">${escapeHtml(web)}</a>
          </div>
          <div style="height:1px;background:${divider};font-size:0;line-height:0;margin:10px 0 8px;">&nbsp;</div>
          <div style="font-size:11px;color:#666;line-height:15px;">
            Sitz der Gesellschaft: 47798 Krefeld<br>
            Handelsregister: Amtsgericht Köln HRB 118677<br>
            USt-IdNr. DE 359540228
          </div>
        </td>
      </tr>
    </table>`;
  }

  if (example.layout === "top") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;margin:0;padding:0;width:100%;max-width:560px;">
      <tr><td style="padding:0 0 12px 0;border-bottom:2px solid ${divider};">${logoHtml}</td></tr>
      <tr><td style="padding:14px 0 0 0;">
        <div style="font-size:${contentSize.name}px;font-weight:700;letter-spacing:1px;color:#222;line-height:${contentSize.name + 3}px;">${name}</div>
        <div style="font-size:${contentSize.role}px;color:#9a9a9a;letter-spacing:2px;margin-top:2px;line-height:${contentSize.role + 3}px;">${role}</div>
        <div style="font-size:${contentSize.body}px;color:#555;margin-top:8px;line-height:${contentSize.body + 4}px;">${address}</div>
        <div style="font-size:${contentSize.body}px;color:#333;margin-top:6px;line-height:${contentSize.body + 4}px;">${contactHtml}</div>
        <div style="font-size:${contentSize.legal}px;color:#8a8a8a;margin-top:10px;line-height:${contentSize.legal + 4}px;">${legal}</div>
      </td></tr>
    </table>`;
  }

  const logoCell = logoHtml
    ? `<td width="150" style="width:150px;min-width:150px;max-width:150px;padding:0 18px 0 0;border-right:2px solid ${divider};vertical-align:middle;">${logoHtml}</td>`
    : "";
  const contentPadding = logoHtml ? "0 0 0 20px" : "0";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;margin:0;padding:0;">
    <tr>
      ${logoCell}
      <td style="padding:${contentPadding};vertical-align:top;">
        <div style="font-size:${contentSize.name}px;font-weight:700;letter-spacing:1px;color:#222;line-height:${contentSize.name + 3}px;">${name}</div>
        <div style="font-size:${contentSize.role}px;color:#9a9a9a;letter-spacing:2px;margin-top:2px;line-height:${contentSize.role + 3}px;">${role}</div>
        <div style="font-size:${contentSize.body}px;color:#555;margin-top:8px;line-height:${contentSize.body + 4}px;">${address}</div>
        <div style="font-size:${contentSize.body}px;color:#333;margin-top:6px;line-height:${contentSize.body + 4}px;">${contactHtml}</div>
        <div style="font-size:${contentSize.legal}px;color:#8a8a8a;margin-top:10px;line-height:${contentSize.legal + 4}px;">${legal}</div>
      </td>
    </tr>
  </table>`;
}

async function copyRichHtml(html: string, plainText: string, previewElement: HTMLElement | null) {
  if (previewElement) {
    const range = document.createRange();
    range.selectNodeContents(previewElement);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const copiedRenderedPreview = document.execCommand("copy");
    selection?.removeAllRanges();

    if (copiedRenderedPreview) {
      return;
    }
  }

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

  await navigator.clipboard.writeText(plainText);
}

export default function BrandIdentity() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [examplesOpen, setExamplesOpen] = useState(false);
  const [logoSettingsOpen, setLogoSettingsOpen] = useState(false);
  const [exportLogoType, setExportLogoType] = useState<ExportLogoType>("full");
  const [selectedSignatureIndex, setSelectedSignatureIndex] = useState<number | null>(null);
  const [form, setForm] = useState<SignatureForm>(defaultSignature);
  const [copied, setCopied] = useState<"html" | "rich" | null>(null);
  const [signatureLogoDataUrl, setSignatureLogoDataUrl] = useState("");
  const [darkSignatureLogoDataUrl, setDarkSignatureLogoDataUrl] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      assetToDataUrl("/brand/bind-signature-logo.png"),
      assetToDataUrl("/brand/bind-signature-logo-dark.png"),
    ])
      .then(([lightLogo, darkLogo]) => {
        if (!cancelled) {
          setSignatureLogoDataUrl(lightLogo);
          setDarkSignatureLogoDataUrl(darkLogo);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSignatureLogoDataUrl("");
          setDarkSignatureLogoDataUrl("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const fallbackLogoImageUrl =
    typeof window === "undefined"
      ? "/brand/bind-signature-logo.png"
      : `${window.location.origin}/brand/bind-signature-logo.png`;
  const fallbackDarkLogoImageUrl =
    typeof window === "undefined"
      ? "/brand/bind-signature-logo-dark.png"
      : `${window.location.origin}/brand/bind-signature-logo-dark.png`;
  const logoImageUrl = signatureLogoDataUrl || fallbackLogoImageUrl;
  const darkLogoImageUrl = darkSignatureLogoDataUrl || fallbackDarkLogoImageUrl;
  const exportLogo = exportLogoType === "full"
    ? { href: "/brand/bind-logo-header.svg", filename: "bind-immobilien-full-logo.svg", label: "Full logo" }
    : { href: "/brand/bind-logo-icon.svg", filename: "bind-immobilien-icon.svg", label: "Icon only" };
  const signatureHtml = useMemo(() => buildSignatureHtml(form, logoImageUrl), [form, logoImageUrl]);
  const exampleHtml = useMemo(
    () => signatureExamples.map((example) => buildSignatureExampleHtml(form, logoImageUrl, darkLogoImageUrl, example)),
    [form, logoImageUrl, darkLogoImageUrl],
  );
  const activeSignatureHtml = selectedSignatureIndex === null
    ? signatureHtml
    : exampleHtml[selectedSignatureIndex] ?? signatureHtml;
  const activeSignatureLabel = selectedSignatureIndex === null
    ? "Custom editable signature"
    : signatureExamples[selectedSignatureIndex]?.title ?? "Custom editable signature";
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
    await copyRichHtml(activeSignatureHtml, plainText, previewRef.current);
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
        onClick={() => setLogoSettingsOpen(true)}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "140px",
          zIndex: 140,
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          border: "1px solid #ded6ca",
          background: "#fbfaf7",
          color: "#1a1a1a",
          padding: "13px 18px",
          fontFamily: "DM Sans, Arial, sans-serif",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          boxShadow: "0 14px 35px rgba(26,26,26,0.14)",
          cursor: "pointer",
        }}
      >
        <Settings size={16} />
        Logo settings
      </button>

      <a
        href={exportLogo.href}
        download={exportLogo.filename}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "82px",
          zIndex: 140,
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          border: "1px solid #ded6ca",
          background: "#fbfaf7",
          color: "#1a1a1a",
          padding: "13px 18px",
          fontFamily: "DM Sans, Arial, sans-serif",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textDecoration: "none",
          boxShadow: "0 14px 35px rgba(26,26,26,0.14)",
        }}
      >
        <Download size={16} />
        Export {exportLogo.label}
      </a>

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

          <button
            type="button"
            onClick={() => setExamplesOpen(true)}
            style={{
              marginTop: "18px",
              width: "100%",
              border: "1px solid #ded6ca",
              background: "#fff",
              color: "#1a1a1a",
              padding: "12px 14px",
              fontFamily: "DM Sans, Arial, sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            View 13 Signature Examples
          </button>

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

          <div style={{ marginTop: "26px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
            <div>
              <p style={{ margin: 0, color: "#c8a05a", fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Active variation
              </p>
              <p style={{ margin: "4px 0 0", color: "#1a1a1a", fontSize: "13px", fontWeight: 700 }}>
                {activeSignatureLabel}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setExamplesOpen(true)}
                style={{
                  border: "1px solid #1a1a1a",
                  background: "#1a1a1a",
                  color: "#fff",
                  padding: "9px 12px",
                  fontFamily: "DM Sans, Arial, sans-serif",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Select variation
              </button>
              {selectedSignatureIndex !== null && (
              <button
                type="button"
                onClick={() => {
                  setSelectedSignatureIndex(null);
                  setCopied(null);
                }}
                style={{
                  border: "1px solid #ded6ca",
                  background: "#fff",
                  color: "#1a1a1a",
                  padding: "9px 12px",
                  fontFamily: "DM Sans, Arial, sans-serif",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Use custom
              </button>
              )}
            </div>
          </div>

          <div style={{ marginTop: "12px", border: "1px solid #ded6ca", background: "#fff", padding: "18px", overflowX: "auto" }}>
            <div ref={previewRef} dangerouslySetInnerHTML={{ __html: activeSignatureHtml }} />
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

      {examplesOpen && (
        <div
          role="presentation"
          onClick={() => setExamplesOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 220,
            background: "rgba(26,26,26,0.48)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            role="dialog"
            aria-label="Signature examples"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(1180px, 100%)",
              maxHeight: "min(860px, calc(100vh - 48px))",
              overflowY: "auto",
              background: "#fbfaf7",
              border: "1px solid #ded6ca",
              boxShadow: "0 28px 80px rgba(0,0,0,0.26)",
            }}
          >
            <div style={{ padding: "24px 26px", borderBottom: "1px solid #ded6ca", display: "flex", alignItems: "start", justifyContent: "space-between", gap: "18px" }}>
              <div>
                <p style={{ margin: 0, color: "#c8a05a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Signature Design Directions
                </p>
                <h2 style={{ margin: "8px 0 0", fontFamily: "Playfair Display, Georgia, serif", fontSize: "32px", lineHeight: 1.05 }}>
                  13 logo and layout examples
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setExamplesOpen(false)}
                aria-label="Close signature examples"
                style={{ border: "1px solid #ded6ca", background: "#fff", width: "38px", height: "38px", display: "grid", placeItems: "center", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
                gap: "16px",
                padding: "22px",
              }}
            >
              {signatureExamples.map((example, index) => (
                <article
                  key={example.title}
                  style={{
                    background: "#fff",
                    border: selectedSignatureIndex === index ? "2px solid #c8a05a" : "1px solid #ded6ca",
                    padding: "18px",
                    display: "grid",
                    gap: "14px",
                    minWidth: 0,
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, fontFamily: "DM Sans, Arial, sans-serif", fontSize: "13px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1a1a1a" }}>
                      {example.title}
                    </h3>
                    <p style={{ margin: "5px 0 0", color: "#687280", fontSize: "12px", lineHeight: 1.45 }}>
                      {example.note}
                    </p>
                  </div>
                  <div
                    style={{
                      border: "1px solid #eee5d8",
                      background: index % 2 === 0 ? "#ffffff" : "#f7f4ed",
                      padding: "18px",
                      overflowX: "auto",
                    }}
                    dangerouslySetInnerHTML={{ __html: exampleHtml[index] }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSignatureIndex(index);
                      setCopied(null);
                      setExamplesOpen(false);
                      setDrawerOpen(true);
                    }}
                    style={{
                      width: "100%",
                      border: selectedSignatureIndex === index ? "1px solid #c8a05a" : "1px solid #1a1a1a",
                      background: selectedSignatureIndex === index ? "#c8a05a" : "#1a1a1a",
                      color: "#fff",
                      padding: "11px 14px",
                      fontFamily: "DM Sans, Arial, sans-serif",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    {selectedSignatureIndex === index ? "Selected variation" : "Select variation"}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {logoSettingsOpen && (
        <div
          role="presentation"
          onClick={() => setLogoSettingsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 230,
            background: "rgba(26,26,26,0.48)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            role="dialog"
            aria-label="Logo export settings"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(760px, 100%)",
              background: "#fbfaf7",
              border: "1px solid #ded6ca",
              boxShadow: "0 28px 80px rgba(0,0,0,0.26)",
            }}
          >
            <div style={{ padding: "24px 26px", borderBottom: "1px solid #ded6ca", display: "flex", alignItems: "start", justifyContent: "space-between", gap: "18px" }}>
              <div>
                <p style={{ margin: 0, color: "#c8a05a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Logo Export Settings
                </p>
                <h2 style={{ margin: "8px 0 0", fontFamily: "Playfair Display, Georgia, serif", fontSize: "30px", lineHeight: 1.05 }}>
                  Choose active SVG
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setLogoSettingsOpen(false)}
                aria-label="Close logo settings"
                style={{ border: "1px solid #ded6ca", background: "#fff", width: "38px", height: "38px", display: "grid", placeItems: "center", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", padding: "22px" }}>
              {[
                { type: "full" as const, title: "Full logo", src: "/brand/bind-logo-header.svg", file: "bind-immobilien-full-logo.svg" },
                { type: "icon" as const, title: "Icon only", src: "/brand/bind-logo-icon.svg", file: "bind-immobilien-icon.svg" },
              ].map((option) => {
                const active = exportLogoType === option.type;
                return (
                  <button
                    type="button"
                    key={option.type}
                    onClick={() => setExportLogoType(option.type)}
                    style={{
                      textAlign: "left",
                      background: active ? "#fff" : "#f1ede5",
                      border: active ? "2px solid #c8a05a" : "1px solid #ded6ca",
                      padding: "16px",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ minHeight: "112px", display: "grid", placeItems: "center", background: "#fff", border: "1px solid #eee5d8", marginBottom: "14px" }}>
                      <img src={option.src} alt={option.title} style={{ maxWidth: option.type === "full" ? "220px" : "82px", maxHeight: "82px", width: "auto", height: "auto" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center" }}>
                      <span style={{ fontFamily: "DM Sans, Arial, sans-serif", fontSize: "13px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1a1a1a" }}>
                        {option.title}
                      </span>
                      <span style={{ fontFamily: "DM Sans, Arial, sans-serif", fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: active ? "#c8a05a" : "#8a8a8a" }}>
                        {active ? "Active" : "Disabled"}
                      </span>
                    </div>
                    <p style={{ margin: "8px 0 0", color: "#687280", fontSize: "12px", lineHeight: 1.45 }}>
                      {option.file}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
