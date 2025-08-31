import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useLang from "../../hooks/useLang";
import { uiStrings } from "../../app/i18n";
import AppHeader from "../organisms/AppHeader";

export default function PracticePage() {
  const { lang } = useLang();
  const [history, setHistory] = useState({});
  useEffect(() => {
    const raw = localStorage.getItem("apex.practiceHistory");
    if (raw) setHistory(JSON.parse(raw));
  }, []);
  const tickets = Array.from({ length: 70 }, (_, i) => i + 1);
  return (
    <div style={{ padding: 24 }}>
      <AppHeader />
      <h2 style={{ marginTop: 12 }}>{uiStrings.practiceTickets[lang]}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 12,
        }}
      >
        {tickets.map((n) => {
          const key = `ticket_${String(n).padStart(3, "0")}`;
          const rec = history[key];
          return (
            <Link key={n} to={`/practice/${n}`} style={card}>
              <div>Ticket {String(n).padStart(2, "0")}</div>
              {rec && (
                <small style={{ color: "#666" }}>
                  {rec.correct}/10 •{" "}
                  {new Date(rec.finishedAt).toLocaleDateString()}
                </small>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const card = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  textAlign: "center",
  textDecoration: "none",
  color: "inherit",
};
