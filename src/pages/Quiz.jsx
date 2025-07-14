import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import placeholder from "../assets/placeholder.jpg";

const LANG_FILES = {
  uzlotin: () => import("../data/uzlotin.json"),
  uzkiril: () => import("../data/uzkiril.json"),
  rus: () => import("../data/rus.json"),
};

const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [finished, setFinished] = useState(false);

  // ⏱️ Timer countdown
  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          evaluateResults(true); // time up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  // 🎓 Load test data
  useEffect(() => {
    const loadData = async () => {
      const lang = state?.lang || "uzlotin";
      const data = await LANG_FILES[lang]();
      const shuffled = data.default
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);
      setTests(shuffled);
    };
    loadData();
  }, []);

  const currentQuestion = tests[currentIdx];

  // ⌨️ Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      if (key.startsWith("f")) {
        const idx = Number(key.slice(1)) - 1;
        if (idx >= 0 && idx < currentQuestion?.choises?.length) {
          handleSelect(idx);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentQuestion, selected, confirmed]);

  const handleSelect = (idx) => {
    if (confirmed || finished) return;
    if (selected === idx) {
      const isCorrect = currentQuestion.choises[idx].answer;
      setConfirmed(true);
      setResults((prev) => {
        const newRes = [...prev];
        newRes[currentIdx] = isCorrect ? "correct" : "wrong";
        return newRes;
      });

      setTimeout(() => {
        setSelected(null);
        setConfirmed(false);
        const nextIdx = currentIdx + 1;

        const wrongCount =
          results.filter((r) => r === "wrong").length + (!isCorrect ? 1 : 0);

        // ❌ Fail logic
        if (wrongCount > 3) {
          evaluateResults(false, "too_many_mistakes");
          return;
        }

        // ✅ Complete test logic
        if (nextIdx >= tests.length) {
          evaluateResults(false); // quiz complete
        } else {
          setCurrentIdx(nextIdx);
        }
      }, 2000);
    } else {
      setSelected(idx);
    }
  };

  const evaluateResults = (timeUp = false, reason = "") => {
    setFinished(true);
    const correct = results.filter((r) => r === "correct").length;
    const passed = correct >= 18;
    setTimeout(() => {
      alert(
        passed
          ? `✅ Siz testni topshirdingiz! To'g'ri javoblar: ${correct}/20`
          : reason === "too_many_mistakes"
          ? "❌ Siz 3 martadan ko'p xatoga yo'l qo'ydingiz. Test tugadi."
          : timeUp
          ? `❌ Vaqt tugadi. Siz testdan o'tolmadingiz. To'g'ri javoblar: ${correct}/20`
          : `❌ Siz testdan o'tolmadingiz. To'g'ri javoblar: ${correct}/20`
      );
      navigate("/"); // restart
    }, 1000);
  };

  const handleFinishNow = () => {
    evaluateResults(false);
  };

  if (!currentQuestion) return <div>Loading...</div>;

  // 🕐 Time format helper
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ color: "yellow" }}>{currentQuestion.question}</h2>
        <div style={{ fontWeight: "bold", fontSize: 18, color: "lightgray" }}>
          🕐 {formatTime(timeLeft)}
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          {currentQuestion.choises.map((choice, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid gray",
                padding: 10,
                marginBottom: 10,

                background:
                  confirmed && selected === idx
                    ? choice.answer
                      ? "lightgreen"
                      : "salmon"
                    : selected === idx
                    ? "#ddd"
                    : "#fff",
                cursor: finished ? "not-allowed" : "pointer",
                userSelect: "none",
              }}
              onClick={() => handleSelect(idx)}
            >
              {`F${idx + 1}`} — {choice.text}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <img
            src={
              currentQuestion.media.exist
                ? `/src/assets/test-images/${currentQuestion.media.name}.png`
                : placeholder
            }
            alt="question"
            style={{ width: "100%", maxHeight: 300, objectFit: "contain" }}
          />
          <div style={{ marginTop: 10 }}>
            <strong style={{ color: "#f0f0f0" }}>
              Question {currentIdx + 1} of 20
            </strong>
            <div style={{ display: "flex", marginTop: 5, flexWrap: "wrap" }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => !finished && setCurrentIdx(i)}
                  style={{
                    width: 30,
                    height: 30,
                    lineHeight: "30px",
                    margin: 2,
                    textAlign: "center",
                    border: "1px solid gray",
                    background:
                      results[i] === "correct"
                        ? "lightgreen"
                        : results[i] === "wrong"
                        ? "salmon"
                        : i === currentIdx
                        ? "#ccc"
                        : "#fff",
                    cursor: "pointer",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <button
              onClick={handleFinishNow}
              disabled={finished}
              style={{
                marginTop: 15,
                padding: "8px 16px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              ❌ Finish Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
