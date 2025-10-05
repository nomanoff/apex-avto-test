import useFullscreen from "../../hooks/useFullscreen";
import useLang from "../../hooks/useLang";
import { LANGS } from "../../app/i18n";
import { Link } from "react-router-dom";

export default function AppHeader() {
  const { isFs, enter, exit } = useFullscreen();
  const { lang, setLang } = useLang();
  return (
    <header style={bar}>
      <div style={brand}>
        <span style={brandDot} aria-hidden />
        <span style={{ fontWeight: 800 }}>Apex Avto Test</span>
      </div>
      <nav style={navCenter} aria-label="Primary">
        <Link to="/exam" style={navLink}>
          Exam
        </Link>
        <Link to="/practice" style={navLink}>
          Practice
        </Link>
      </nav>
      <div style={controls}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={select}
          aria-label="Language"
        >
          {LANGS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button
          onClick={isFs ? exit : enter}
          style={ghostBtn}
          aria-label="Toggle fullscreen"
        >
          {isFs ? "Exit" : "Fullscreen"}
        </button>
      </div>
    </header>
  );
}

const bar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid #e5e7eb",
  background: "#ffffff",
  position: "sticky",
  top: 0,
  zIndex: 10,
};
const brand = { display: "flex", alignItems: "center", gap: 10 };
const brandDot = {
  width: 18,
  height: 18,
  borderRadius: 999,
  background: "var(--primary)",
};
const navCenter = { display: "flex", gap: 16 };
const navLink = { color: "#111827", textDecoration: "none", fontWeight: 600 };
const controls = { display: "flex", alignItems: "center", gap: 8 };
const select = {
  border: "1px solid #e5e7eb",
  padding: "6px 8px",
  borderRadius: 8,
  background: "#fff",
};
const ghostBtn = {
  border: "1px solid #e5e7eb",
  background: "#fff",
  padding: "6px 10px",
  borderRadius: 8,
  cursor: "pointer",
};
