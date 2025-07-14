import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";

const LANG_FILES = {
  uzlotin: () => import("../data/uzlotin.json"),
  uzkiril: () => import("../data/uzkiril.json"),
  rus: () => import("../data/rus.json"),
};

const TicketQuiz = () => {
  const { ticketIndex } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const lang = state?.lang || "uzlotin";
      const data = await LANG_FILES[lang]();
      const startIdx = parseInt(ticketIndex) * 10;
      const endIdx = startIdx + 10;
      setQuestions(data.default.slice(startIdx, endIdx));
    };
    loadData();
  }, []);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (idx) => {
    if (confirmed || finished) return;

    if (selected === idx) {
      const isCorrect = currentQuestion.choises[idx].answer;
      setConfirmed(true);
      if (isCorrect) setCorrectCount((prev) => prev + 1);

      setTimeout(() => {
        setConfirmed(false);
        setSelected(null);

        if (currentIdx + 1 >= questions.length) {
          setFinished(true);
          setTimeout(() => {
            alert(
              `✅ Ticket Finished!\nCorrect: ${
                correctCount + (isCorrect ? 1 : 0)
              }/10`
            );
            navigate("/");
          }, 1000);
        } else {
          setCurrentIdx((prev) => prev + 1);
        }
      }, 1500);
    } else {
      setSelected(idx);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!currentQuestion) return <div>Loading ticket...</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ color: "yellow" }}>{currentQuestion.question}</h3>
        <div style={{ color: "#f0f0f0" }}>⏱️ {formatTime(timeLeft)}</div>
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
              Solving {currentIdx + 1} of {questions.length}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketQuiz;
