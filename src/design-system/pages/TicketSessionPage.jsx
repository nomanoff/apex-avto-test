import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useDataset from "../../hooks/useDataset";
import useLang from "../../hooks/useLang";
import { EXAM_SECONDS, sliceTicket } from "../../lib/examEngine";
import QuestionCard from "../organisms/QuestionCard";
import AppHeader from "../organisms/AppHeader";

export default function TicketSessionPage() {
  const { id } = useParams();
  const ticketNo = Number(id);
  const { data, loading } = useDataset();
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [seconds, setSeconds] = useState(EXAM_SECONDS);

  const questions = useMemo(
    () => (data ? sliceTicket(data, ticketNo, 10) : []),
    [data, ticketNo]
  );
  const current = questions[idx];

  function onConfirm(correct) {
    setAnswers((a) => {
      const next = [...a];
      next[idx] = { correct };
      return next;
    });
  }

  // Timer (no auto-submit)
  useEffect(() => {
    if (!questions.length) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [questions.length]);

  const jump = useCallback(
    (n) => {
      if (n >= 0 && n < questions.length) setIdx(n);
    },
    [questions.length]
  );

  // Keyboard: arrows
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") jump(idx + 1);
      if (e.key === "ArrowLeft") jump(idx - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, jump]);

  // Persist last result
  useEffect(() => {
    const correct = answers.filter((a) => a?.correct).length;
    const wrong = answers.filter((a) => a && a.correct === false).length;
    if (answers.length) {
      const key = "apex.practiceHistory";
      const prev = JSON.parse(localStorage.getItem(key) || "{}");
      prev[`ticket_${String(ticketNo).padStart(3, "0")}`] = {
        correct,
        wrong,
        finishedAt: new Date().toISOString(),
      };
      localStorage.setItem(key, JSON.stringify(prev));
    }
  }, [answers, ticketNo]);

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!questions.length) return <div style={{ padding: 24 }}>No data</div>;

  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");

  return (
    <div style={{ padding: 24 }}>
      <AppHeader />
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div>
          Ticket {String(ticketNo).padStart(2, "0")} • Q {idx + 1}/10
        </div>
        <div style={{ fontVariantNumeric: "tabular-nums" }}>
          {mm}:{ss}
        </div>
      </header>
      <QuestionCard q={current} lang={lang} onConfirm={onConfirm} />
      <footer
        style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}
      >
        {questions.map((_, i) => {
          const a = answers[i];
          const bg = a ? (a.correct ? "#22c55e" : "#ef4444") : "#e5e7eb";
          return (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                border: "none",
                background: bg,
                color: "#111",
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </footer>
    </div>
  );
}
