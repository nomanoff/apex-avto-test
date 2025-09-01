import { Link, useLocation } from "react-router-dom";
import useLang from "../../hooks/useLang";
import { LANGS } from "../../app/i18n";
import {
  IoHomeOutline,
  IoDocumentTextOutline,
  IoBookOutline,
} from "react-icons/io5";

export default function AppHeader() {
  const { lang, setLang } = useLang();
  const { pathname } = useLocation();

  const nav = [
    { to: "/", label: navText.home[lang], icon: IoHomeOutline },
    { to: "/exam", label: navText.exam[lang], icon: IoDocumentTextOutline },
    { to: "/practice", label: navText.practice[lang], icon: IoBookOutline },
  ];

  return (
    <header style={wrap}>
      <div style={left}>
        <img src="/assets/APEXLOGO.png" alt="apex avto test" style={logo} />
        <span style={brand}>apex avto test</span>
      </div>
      <nav style={center} aria-label="Primary">
        {nav.map((n) => {
          const ActiveIcon = n.icon;
          const active = pathname === n.to;
          return (
            <Link
              key={n.to}
              to={n.to}
              style={{ ...navItem, ...(active ? navItemActive : null) }}
            >
              <ActiveIcon size={16} />
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>
      <div style={right}>
        <label htmlFor="lang" className="sr-only">
          Language
        </label>
        <select
          id="lang"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={select}
        >
          {LANGS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

const navText = {
  home: {
    "uz-Latn": "Bosh sahifa",
    "uz-Cyrl": "Бош саҳифа",
    ru: "Главная",
  },
  exam: {
    "uz-Latn": "Imtixon",
    "uz-Cyrl": "Имтиҳон",
    ru: "Экзамен",
  },
  practice: {
    "uz-Latn": "Mashq",
    "uz-Cyrl": "Машқ",
    ru: "Практика",
  },
};

const wrap = {
  display: "flex",
  alignItems: "center",
  height: 64,
  padding: "0 16px",
  borderBottom: "1px solid #e5e7eb",
  background: "#fff",
  gap: 12,
};
const left = { display: "flex", alignItems: "center", gap: 10 };
const logo = { width: 28, height: 28, borderRadius: 999, objectFit: "contain" };
const brand = { fontWeight: 700, color: "#0f172a", textTransform: "lowercase" };
const center = { display: "flex", gap: 18, marginLeft: 16 };
const right = { marginLeft: "auto" };
const navItem = {
  display: "inline-flex",
  gap: 6,
  alignItems: "center",
  color: "#111827",
  textDecoration: "none",
  fontSize: 14,
  padding: "6px 8px",
  borderRadius: 8,
};
const navItemActive = { background: "#f3f4f6" };
const select = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
};
