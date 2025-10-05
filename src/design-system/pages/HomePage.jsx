import { Link, useNavigate } from "react-router-dom";
import useLang from "../../hooks/useLang";
import { uiStrings } from "../../app/i18n";
import AppHeader from "../organisms/AppHeader";

export default function HomePage() {
  const { lang } = useLang();
  const nav = useNavigate();

  return (
    <div>
      <AppHeader />
      {/* Hero */}
      <section style={heroSection}>
        <div style={containerCenter}>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <div style={logoCircle} aria-hidden>
              <span style={logoDot} />
            </div>
          </div>
          <h1 style={heroTitle}>Apex Avto Test</h1>
          <p style={heroSubtitle}>
            Rasmiy imtihon UX’iga mos bepul trenajyor — reklamasiz, oddiy va
            tez.
          </p>
          <div style={ctaRow}>
            <button style={primaryBtn} onClick={() => nav("/exam")}>
              {uiStrings.startExam[lang]}
            </button>
            <Link to="/practice" style={secondaryBtn}>
              {uiStrings.practiceTickets[lang]}
            </Link>
          </div>
          <button
            style={donateBtn}
            onClick={() =>
              window.open("https://t.me/apexavtotest_support", "_blank")
            }
          >
            <span style={donateIcon} aria-hidden>
              ☕
            </span>
            <span style={{ fontWeight: 700, fontSize: 18 }}>
              Support / Donate
            </span>
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section style={benefitsSection}>
        <div style={containerNarrow}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={h2}>Nima uchun ApexAvtoTest?</h2>
            <p style={muted}>
              Eng yaxshi tajriba va natijalar uchun yaratilgan
            </p>
          </div>
          <div style={benefitsGrid}>
            <Benefit
              title="Reklamasiz"
              desc="Hech qanday reklama va chalg'ituvchi elementlarsiz"
            />
            <Benefit
              title="Haqiqiy format"
              desc="Haqiqiy imtihon kabi vaqt va oqim"
            />
            <Benefit
              title="Butunlay bepul"
              desc="Hech qachon pul talab qilinmaydi"
            />
          </div>
        </div>
      </section>

      {/* Stats CTA */}
      <section style={ctaStrip}>
        <div style={containerCenter}>
          <h2 style={{ ...h2, color: "#fff", marginBottom: 8 }}>
            Tayyor bo'ldingizmi?
          </h2>
          <p style={{ color: "#fff", opacity: 0.9, marginBottom: 16 }}>
            Hoziroq boshlab, haydovchilik huquqini oling
          </p>
          <button style={ctaLight} onClick={() => nav("/exam")}>
            {uiStrings.startExam[lang]}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={footer}>
        <div style={containerCenter}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div style={{ ...logoCircle, width: 48, height: 48 }} aria-hidden />
            <strong style={{ color: "#fff", fontSize: 18 }}>
              Apex Avto Test
            </strong>
          </div>
          <p style={{ color: "#9ca3af", fontSize: 12 }}>
            © {new Date().getFullYear()} ApexAvtoTest — All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Benefit({ title, desc }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={benefitIcon} aria-hidden />
      <h3 style={h3}>{title}</h3>
      <p style={muted}>{desc}</p>
    </div>
  );
}

// Styles
const containerCenter = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "0 16px",
  textAlign: "center",
};
const containerNarrow = { maxWidth: 1120, margin: "0 auto", padding: "0 16px" };
const heroSection = { padding: "96px 16px", background: "var(--surface-alt)" };
const heroTitle = {
  fontSize: "var(--fs-2xl)",
  fontWeight: 800,
  color: "var(--text-dark)",
  marginBottom: 16,
  lineHeight: 1.1,
};
const heroSubtitle = {
  fontSize: 20,
  color: "var(--text-muted)",
  margin: "0 auto 32px",
  maxWidth: 760,
};
const ctaRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
};
const primaryBtn = {
  background: "var(--primary)",
  color: "#fff",
  padding: "16px 24px",
  borderRadius: "var(--radius)",
  border: "none",
  fontWeight: 600,
  boxShadow: "0 8px 20px rgba(30,58,138,0.25)",
  cursor: "pointer",
};
const secondaryBtn = {
  border: "2px solid var(--primary)",
  color: "var(--primary)",
  padding: "14px 22px",
  borderRadius: "var(--radius)",
  fontWeight: 600,
  textDecoration: "none",
};
const donateBtn = {
  display: "inline-flex",
  gap: 12,
  alignItems: "center",
  padding: "14px 22px",
  borderRadius: 999,
  background: "var(--accent)",
  color: "#0D0C23",
  border: "none",
  marginTop: 6,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(250,204,21,0.3)",
};
const donateIcon = {
  width: 28,
  height: 28,
  borderRadius: 999,
  background: "#0D0C23",
  color: "#FBFBFA",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};
const benefitsSection = { padding: "64px 16px", background: "#fff" };
const benefitsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 24,
};
const benefitIcon = {
  width: 64,
  height: 64,
  margin: "0 auto 12px",
  borderRadius: 16,
  background: "rgba(30,58,138,0.1)",
};
const h2 = {
  fontSize: 28,
  fontWeight: 800,
  color: "var(--text-dark)",
  marginBottom: 8,
};
const h3 = {
  fontSize: 18,
  fontWeight: 700,
  color: "var(--text-dark)",
  marginBottom: 6,
};
const muted = { color: "var(--text-muted)" };
const ctaStrip = { padding: "64px 16px", background: "var(--primary)" };
const ctaLight = {
  background: "#fff",
  color: "var(--primary)",
  padding: "14px 22px",
  borderRadius: "var(--radius)",
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};
const footer = { background: "#111827", padding: "48px 16px" };
const logoCircle = {
  width: 96,
  height: 96,
  borderRadius: 999,
  background: "rgba(30,58,138,0.08)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};
const logoDot = {
  width: 40,
  height: 40,
  borderRadius: 999,
  background: "var(--primary)",
};
