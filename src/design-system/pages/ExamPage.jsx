import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDataset from "../../hooks/useDataset";
import useLang from "../../hooks/useLang";
import {
  EXAM_SECONDS,
  PASS_MISTAKES,
  sampleExamQuestions,
} from "../../lib/examEngine";
import ConfirmModal from "../molecules/ConfirmModal";
import QuestionCard from "../organisms/QuestionCard";
import AppHeader from "../organisms/AppHeader";

export default function ExamPage() {
  const nav = useNavigate();
  const { data, loading } = useDataset();
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [seconds, setSeconds] = useState(EXAM_SECONDS);
  const [mistakes, setMistakes] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [askFinish, setAskFinish] = useState(false);
  const [visits, setVisits] = useState({ 0: Date.now() });

  const questions = useMemo(
    () => (data ? sampleExamQuestions(data, 20) : []),
    [data]
  );
  const current = questions[idx];

  // Timer
  useEffect(() => {
    if (!questions.length) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [questions.length]);

  // Auto submit at 0
  useEffect(() => {
    if (seconds === 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // Warn on navigation away during exam
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  function finish() {
    const correct = answers.filter((a) => a?.correct).length;
    const wrong = answers.filter((a) => a && a.correct === false).length;
    const pass = mistakes <= PASS_MISTAKES;
    nav("/result", {
      state: {
        mode: "exam",
        pass,
        correct,
        wrong,
        duration: EXAM_SECONDS - seconds,
      },
    });
  }

  function onConfirm(correct) {
    setAnswers((a) => {
      const next = [...a];
      next[idx] = { correct };
      return next;
    });
    if (!correct) setMistakes((m) => m + 1);
  }

  const jump = useCallback(
    (n) => {
      if (n >= 0 && n < questions.length) {
        setIdx(n);
        setVisits((v) => ({ ...v, [n]: Date.now() }));
      }
    },
    [questions.length]
  );

  // Keyboard: arrows and Cmd/Ctrl+Enter to finish
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") jump(idx + 1);
      if (e.key === "ArrowLeft") jump(idx - 1);
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") setAskFinish(true);
      // F1-F5 handled inside QuestionCard in a next iteration
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, questions.length, jump]);

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
        <div>Exam • Q {idx + 1}/20</div>
        <div style={{ fontVariantNumeric: "tabular-nums" }}>
          {mm}:{ss}
        </div>
      </header>
      <QuestionCard
        q={current}
        lang={lang}
        onConfirm={onConfirm}
        visitKey={visits[idx]}
      />
      <footer
        style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}
      >
        {questions.map((_, i) => {
          const a = answers[i];
          const bg = a ? (a.correct ? "#22c55e" : "#ef4444") : "#e5e7eb";
          return (
            <button
              key={i}
              onClick={() => jump(i)}
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
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => setAskFinish(true)}
            style={{ padding: "8px 12px" }}
          >
            Finish
          </button>
        </div>
      </footer>
      <ConfirmModal
        open={askFinish}
        title="Finish exam?"
        onCancel={() => setAskFinish(false)}
        onConfirm={finish}
        confirmText="Submit"
      >
        You won't be able to change answers after submitting. Are you sure?
      </ConfirmModal>
    </div>
  );
}
