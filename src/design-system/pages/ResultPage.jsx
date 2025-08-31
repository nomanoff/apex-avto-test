import { useLocation, Link, useNavigate } from "react-router-dom";
import { uiStrings } from "../../app/i18n";
import useLang from "../../hooks/useLang";

export default function ResultPage() {
  const { state } = useLocation();
  const nav = useNavigate();
  const { lang } = useLang();
  const pass = state?.pass;
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h1 style={{ color: pass ? "#16a34a" : "#dc2626", fontSize: 48 }}>
        {pass ? uiStrings.pass[lang] : uiStrings.fail[lang]}
      </h1>
      {state && (
        <p style={{ marginTop: 8, color: "#333" }}>
          Correct: {state.correct ?? 0} • Wrong: {state.wrong ?? 0} • Time:{" "}
          {formatDur(state.duration)}
        </p>
      )}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          gap: 12,
          justifyContent: "center",
        }}
      >
        <button onClick={() => nav(-1)} style={btnSecondary}>
          Back
        </button>
        <Link to="/" style={{ ...btnPrimary, textDecoration: "none" }}>
          Home
        </Link>
      </div>
    </div>
  );
}

function formatDur(s = 0) {
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

const btnPrimary = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
};
const btnSecondary = {
  background: "#e5e7eb",
  color: "#111",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
};
