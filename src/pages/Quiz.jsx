import { useEffect, useState } from "react";
import placeholder from "../assets/placeholder.jpg";
import styled from "styled-components";
import bgImage from "../assets/defaultbackground.png";
import { motion, AnimatePresence } from "framer-motion"; // ⬅️ Kiritildi

const Container = styled.div`
  background: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bgImage}) center/cover no-repeat;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  background-color: #2f466c;
  border: 3px solid #101824;
`;

const QuestionText = styled.h2`
  color: yellow;
  font-size: 20px;
`;

const Timer = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: lightgray;
`;

const Layout = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const ChoicesWrapper = styled.div`
  flex: 1;
`;

const Choice = styled.div`
  border: 1px solid gray;
  padding: 10px;
  margin-bottom: 10px;
  background: ${({ confirmed, selected, correct }) =>
    confirmed && selected
      ? correct
        ? "lightgreen"
        : "salmon"
      : selected
      ? "#929292"
      : "#fff"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  user-select: none;
`;

const MediaWrapper = styled.div`
  flex: 1;
`;

const MediaImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
`;

const ProgressWrapper = styled.div`
  margin-top: 10px;
`;

const ProgressText = styled.strong`
  color: #f0f0f0;
`;

const ProgressGrid = styled.div`
  display: flex;
  margin-top: 5px;
  flex-wrap: wrap;
`;

const ProgressBox = styled.div`
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 2px;
  text-align: center;
  border: 1px solid gray;
  background: ${({ status, active, locked }) =>
    locked
      ? "red"
      : status === "correct"
      ? "lightgreen"
      : status === "wrong"
      ? "salmon"
      : active
      ? "#ccc"
      : "#fff"};
  cursor: ${({ locked }) => (locked ? "not-allowed" : "pointer")};
`;
const FinishButton = styled.button`
  margin-top: 15px;
  padding: 8px 16px;
  background: yellow;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TimerCtn = styled.div`
  padding: 20px;
`;

const QuizTextCtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 60px;
  width: 85%;
`;

/* ======== MODAL ======== */
const ResultModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ResultBox = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 350px;
`;

const ResultTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #0cff0c;
`;

const ResultText = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: black;
`;

const CloseBtn = styled.button`
  padding: 10px 20px;
  background: yellow;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LANG_FILES = {
  uzlotin: () => import("../data/uzlotin.json"),
  uzkiril: () => import("../data/uzkiril.json"),
  rus: () => import("../data/rus.json"),
};

const Home = () => {
  const [tests, setTests] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 min
  const [finished, setFinished] = useState(false);
  const [lang] = useState("uzlotin");

  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          evaluateResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  useEffect(() => {
    const loadData = async () => {
      const data = await LANG_FILES[lang]();
      const shuffled = data.default.sort(() => 0.5 - Math.random()).slice(0, 20);
      setTests(shuffled);
    };
    loadData();
  }, [lang]);

  const currentQuestion = tests[currentIdx];

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

        if (wrongCount > 3) {
          evaluateResults(false, "too_many_mistakes");
          return;
        }

        if (nextIdx >= tests.length) {
          evaluateResults(false);
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
    setFinalScore(correct);
    setShowResult(true); // modalni ko‘rsatish
  };

  const handleFinishNow = () => {
    evaluateResults(false);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleCloseModal = () => {
    setShowResult(false);
    window.location.reload();
  };

  if (!currentQuestion) return <div>Yuklanmoqda...</div>;

  return (
    <Container>
      <Header>
        <QuizTextCtn>
          <QuestionText>{currentQuestion.question}</QuestionText>
        </QuizTextCtn>
        <TimerCtn>
          <Timer>🕐 {formatTime(timeLeft)}</Timer>
        </TimerCtn>
      </Header>

      <Layout>
        <ChoicesWrapper>
          {currentQuestion.choises.map((choice, idx) => (
            <Choice
              key={idx}
              confirmed={confirmed}
              selected={selected === idx}
              correct={choice.answer}
              disabled={finished}
              onClick={() => handleSelect(idx)}
            >
              {`F${idx + 1}`} — {choice.text}
            </Choice>
          ))}
        </ChoicesWrapper>

        <MediaWrapper>
          <MediaImage
            src={
              currentQuestion.media.exist
                ? `/src/assets/test-images/${currentQuestion.media.name}.png`
                : placeholder
            }
            alt="question"
          />
          <ProgressWrapper>
            <ProgressText>Savol {currentIdx + 1} / 20</ProgressText>
            <ProgressGrid>
              {Array.from({ length: 20 }).map((_, i) => (
                <ProgressBox
  key={i}
  status={results[i]}
  active={i === currentIdx}
  locked={i < currentIdx} // yangi prop
  onClick={() => {
    // Faqat hozirgi yoki keyingi savollarga o'tish mumkin
    if (!finished && i >= currentIdx) {
      setCurrentIdx(i);
    }
  }}
>
  {i + 1}
</ProgressBox>
              ))}
            </ProgressGrid>
            <FinishButton onClick={handleFinishNow} disabled={finished}>
              ❌ Testni Yakunlash
            </FinishButton>
          </ProgressWrapper>
        </MediaWrapper>
      </Layout>

      {/* ===== RESULT MODAL ===== */}
      <AnimatePresence>
        {showResult && (
          <ResultModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ResultTitle>Natija</ResultTitle>
              <ResultText>{finalScore} / 20 ta to‘g‘ri</ResultText>
              <CloseBtn onClick={handleCloseModal}>Yopish</CloseBtn>
            </ResultBox>
          </ResultModal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Home;