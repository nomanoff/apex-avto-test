import { useCallback, useEffect, useMemo, useState } from "react";
import { shuffle } from "../../lib/shuffle";

export default function QuestionCard({ q, lang, onConfirm, visitKey }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // Randomize options per mount
  const options = useMemo(() => {
    // visitKey is used to re-shuffle when revisiting the same question
    void visitKey;
    return shuffle(q.choices);
  }, [q.choices, visitKey]);

  // Reset on question change
  useEffect(() => {
    setSelected(null);
    setConfirmed(false);
  }, [q.id]);

  const handleClick = useCallback(
    (idx) => {
      if (!confirmed) {
        if (selected === idx) {
          setConfirmed(true);
          onConfirm?.(options[idx].isCorrect);
        } else {
          setSelected(idx);
        }
      }
    },
    [confirmed, onConfirm, options, selected]
  );

  // Keyboard F1-F5
  useEffect(() => {
    function onKey(e) {
      const map = { F1: 0, F2: 1, F3: 2, F4: 3, F5: 4 };
      const idx = map[e.key];
      if (typeof idx === "number" && idx < options.length) {
        handleClick(idx);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [options, handleClick]);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        overflow: "hidden",
        color: "#111",
        background: "#fff",
      }}
    >
      <div style={{ padding: 16 }}>
        <p style={{ fontWeight: 600 }}>{q.question[lang]}</p>
      </div>
      {q.media?.exist ? (
        <div
          style={{
            height: 220,
            background: "#f6f6f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            alt="question"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            src={`/test-images/${q.media.name}.png`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />
        </div>
      ) : (
        <div style={{ height: 220, background: "#fafafa" }} />
      )}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {options.map((opt, idx) => {
          const isSel = selected === idx;
          const isOk = confirmed && opt.isCorrect;
          const isBad = confirmed && isSel && !opt.isCorrect;
          const style = {
            padding: 12,
            cursor: confirmed ? "default" : "pointer",
            borderTop: "1px solid #eee",
            background: isOk
              ? "#e7f8ee"
              : isBad
              ? "#fde8e8"
              : isSel
              ? "#f5f5f5"
              : "#fff",
          };
          return (
            <li key={idx} onClick={() => handleClick(idx)} style={style}>
              {opt.text[lang]}
              {isSel && !confirmed && (
                <span style={{ marginLeft: 8, color: "#888" }}>
                  (Confirm again)
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
