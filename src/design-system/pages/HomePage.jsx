import { Link } from "react-router-dom";
import useLang from "../../hooks/useLang";
import { uiStrings } from "../../app/i18n";
import AppHeader from "../organisms/AppHeader";

export default function HomePage() {
  const { lang } = useLang();
  return (
    <div style={{ padding: 24 }}>
      <AppHeader />
      <main style={{ marginTop: 40 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/exam" style={btnStyle}>
            {uiStrings.startExam[lang]}
          </Link>
          <Link to="/practice" style={btnStyle}>
            {uiStrings.practiceTickets[lang]}
          </Link>
        </div>
      </main>
    </div>
  );
}

const btnStyle = {
  background: "#111",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: 8,
  textDecoration: "none",
};
