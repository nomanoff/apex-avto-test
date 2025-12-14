import { useEffect, useState } from "react";
import placeholder from "../assets/placeholder.jpg";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaFlagCheckered, FaArrowLeft, FaArrowRight, FaCheck, FaTimes, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 15px;
  padding: 15px 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    padding: 12px 15px;
    flex-direction: column;
    align-items: stretch;
  }
`;

const QuestionText = styled.h2`
  color: #f1f5f9;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
  flex: 1;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(15, 23, 42, 0.7);
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Timer = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  color: ${({ warning }) => warning ? '#ef4444' : '#60a5fa'};
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ChoicesWrapper = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Choice = styled.div`
  padding: 18px 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  cursor: ${({ disabled, clickable }) => (disabled || !clickable) ? "not-allowed" : "pointer"};
  user-select: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  /* Normal state */
  background: ${({ selected, confirmed, correct }) => 
    confirmed 
      ? (selected ? (correct ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)') : 'rgba(30, 41, 59, 0.8)')
      : selected 
      ? 'rgba(96, 165, 250, 0.2)'
      : 'rgba(30, 41, 59, 0.8)'};

  color: ${({ selected, confirmed, correct }) => 
    confirmed 
      ? (selected ? (correct ? '#22c55e' : '#ef4444') : '#94a3b8')
      : selected 
      ? '#60a5fa'
      : '#cbd5e1'};

  border-color: ${({ selected, confirmed, correct }) => 
    confirmed 
      ? (selected ? (correct ? '#22c55e' : '#ef4444') : 'rgba(255, 255, 255, 0.1)')
      : selected 
      ? '#60a5fa'
      : 'rgba(255, 255, 255, 0.1)'};

  &:hover {
    ${({ disabled, clickable }) => (!disabled && clickable) && `
      transform: translateY(-2px);
      background: rgba(96, 165, 250, 0.15);
      border-color: rgba(96, 165, 250, 0.3);
    `}
  }
`;

const ChoiceNumber = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  background: ${({ selected, confirmed, correct }) => 
    confirmed 
      ? (selected ? (correct ? '#22c55e' : '#ef4444') : 'rgba(96, 165, 250, 0.1)')
      : selected 
      ? '#60a5fa'
      : 'rgba(96, 165, 250, 0.1)'};
  color: ${({ selected, confirmed, }) => 
    confirmed 
      ? (selected ? 'white' : '#60a5fa')
      : selected 
      ? 'white'
      : '#60a5fa'};
`;

const ChoiceText = styled.span`
  flex: 1;
  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const MediaWrapper = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const MediaImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
`;

const ProgressWrapper = styled.div`
  background: rgba(15, 23, 42, 0.7);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 20px;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const ProgressText = styled.strong`
  color: #f1f5f9;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  color: #94a3b8;
  font-size: 0.9rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 5px;
    
    &.correct { color: #22c55e; }
    &.wrong { color: #ef4444; }
    &.pending { color: #60a5fa; }
  }
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }
`;

const ProgressBox = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: ${({ locked, finished }) => (locked || finished) ? "not-allowed" : "pointer"};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid;

  /* Base styles */
  background: ${({ status, active, locked, visited }) => {
    if (locked) return 'rgba(239, 68, 68, 0.2)';
    if (status === "correct") return 'rgba(34, 197, 94, 0.2)';
    if (status === "wrong") return 'rgba(239, 68, 68, 0.2)';
    if (active) return 'rgba(96, 165, 250, 0.2)';
    if (visited) return 'rgba(148, 163, 184, 0.1)';
    return 'rgba(30, 41, 59, 0.5)';
  }};

  border-color: ${({ status, active, locked, visited }) => {
    if (locked) return '#ef4444';
    if (status === "correct") return '#22c55e';
    if (status === "wrong") return '#ef4444';
    if (active) return '#60a5fa';
    if (visited) return 'rgba(148, 163, 184, 0.3)';
    return 'rgba(255, 255, 255, 0.1)';
  }};

  color: ${({ status, active, locked, visited }) => {
    if (locked) return '#ef4444';
    if (status === "correct") return '#22c55e';
    if (status === "wrong") return '#ef4444';
    if (active) return '#60a5fa';
    if (visited) return '#94a3b8';
    return '#64748b';
  }};

  &:hover {
    ${({ locked, finished }) => !locked && !finished && `
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `}
  }

  /* Lock icon for locked questions */
  ${({ locked }) => locked && `
    &::after {
      content: '🔒';
      position: absolute;
      top: 2px;
      right: 2px;
      font-size: 0.6rem;
    }
  `}
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: 15px;
`;

const NavButton = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ disabled }) => disabled ? 'rgba(148, 163, 184, 0.2)' : 'rgba(96, 165, 250, 0.2)'};
  color: ${({ disabled }) => disabled ? '#64748b' : '#60a5fa'};
  border: 1px solid ${({ disabled }) => disabled ? 'rgba(148, 163, 184, 0.3)' : 'rgba(96, 165, 250, 0.3)'};

  &:hover:not(:disabled) {
    background: rgba(96, 165, 250, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const FinishButton = styled.button`
  padding: 12px 30px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    padding: 10px 25px;
    font-size: 0.9rem;
  }
`;

const HomeButton = styled.button`
  padding: 12px 28px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.35);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const ResultModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ResultBox = styled(motion.div)`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const ResultTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${({ score }) => score >= 15 ? '#22c55e' : score >= 10 ? '#eab308' : '#ef4444'};
  font-weight: 800;
`;

const ResultScore = styled.div`
  font-size: 4rem;
  font-weight: 800;
  margin: 30px 0;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ResultStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 30px 0;
`;

const StatItem = styled.div`
  text-align: center;
  
  .value {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ type }) => 
      type === 'correct' ? '#22c55e' : 
      type === 'wrong' ? '#ef4444' : 
      type === 'time' ? '#60a5fa' : '#f1f5f9'};
  }
  
  .label {
    font-size: 0.9rem;
    color: #94a3b8;
    margin-top: 5px;
  }
`;

const CloseBtn = styled.button`
  padding: 15px 40px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
`;

const LANG_FILES = {
  uzlotin: () => import("../data/uzlotin.json"),
  uzkiril: () => import("../data/uzkiril.json"),
  rus: () => import("../data/rus.json"),
};

const Home = () => {
  const navigate = useNavigate();
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
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));

  // Timer
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

  // Load questions
  useEffect(() => {
    const loadData = async () => {
      const data = await LANG_FILES[lang]();
      const shuffled = data.default.sort(() => 0.5 - Math.random()).slice(0, 20);
      setTests(shuffled);
    };
    loadData();
  }, [lang]);

  const currentQuestion = tests[currentIdx];

  // Keyboard shortcuts
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
      // Confirm selection
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
        
        // Lock current question
        const nextIdx = currentIdx + 1;
        const wrongCount = results.filter(r => r === "wrong").length + (!isCorrect ? 1 : 0);

        if (wrongCount > 3) {
          evaluateResults(false, "too_many_mistakes");
          return;
        }

        if (nextIdx >= tests.length) {
          evaluateResults(false);
        } else {
          // Mark next question as visited
          setVisitedQuestions(prev => new Set([...prev, nextIdx]));
          setCurrentIdx(nextIdx);
        }
      }, 2000);
    } else {
      setSelected(idx);
    }
  };

  const evaluateResults = () => {
    setFinished(true);
    const correct = results.filter(r => r === "correct").length;
    setFinalScore(correct);
    setShowResult(true);
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

  const handleNavClick = (index) => {
    // Only allow navigation to:
    // 1. Current question (no effect)
    // 2. Questions after current (if they've been visited)
    // 3. Questions before current are LOCKED
    
    if (finished) return;
    
    if (index === currentIdx) return; // Current question
    
    if (index < currentIdx) {
      // Previous questions are LOCKED - can't go back
      return;
    }
    
    // Can only go to questions that have been visited OR are the next question
    if (index <= currentIdx + 1 || visitedQuestions.has(index)) {
      setCurrentIdx(index);
      setVisitedQuestions(prev => new Set([...prev, index]));
    }
  };

  const handleNext = () => {
    if (currentIdx < tests.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setVisitedQuestions(prev => new Set([...prev, nextIdx]));
    }
  };

  if (!currentQuestion) return <div>Yuklanmoqda...</div>;

  const correctCount = results.filter(r => r === "correct").length;
  const wrongCount = results.filter(r => r === "wrong").length;
  const pendingCount = 20 - results.length;

  return (
    <Container>
      <Header>
        <QuestionText>{currentQuestion.question}</QuestionText>
        <TimerWrapper>
          <Timer warning={timeLeft < 300}>
            <FaClock />
            {formatTime(timeLeft)}
          </Timer>
        </TimerWrapper>
      </Header>

      <Layout>
        <ChoicesWrapper>
          {currentQuestion.choises.map((choice, idx) => (
            <Choice
              key={idx}
              selected={selected === idx}
              confirmed={confirmed}
              correct={choice.answer}
              disabled={finished}
              clickable={!confirmed && !finished}
              onClick={() => handleSelect(idx)}
            >
              <ChoiceNumber
                selected={selected === idx}
                confirmed={confirmed}
                correct={choice.answer}
              >
                F{idx + 1}
              </ChoiceNumber>
              <ChoiceText>{choice.text}</ChoiceText>
              {confirmed && selected === idx && (
                choice.answer ? <FaCheck color="#22c55e" /> : <FaTimes color="#ef4444" />
              )}
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
            <ProgressHeader>
              <ProgressText>
                <span>📊</span> Progress: {currentIdx + 1} / 20
              </ProgressText>
              <Stats>
                <span className="correct"><FaCheck /> {correctCount}</span>
                <span className="wrong"><FaTimes /> {wrongCount}</span>
                <span className="pending">⏳ {pendingCount}</span>
              </Stats>
            </ProgressHeader>
            
            <ProgressGrid>
              {Array.from({ length: 20 }).map((_, i) => (
                <ProgressBox
                  key={i}
                  status={results[i]}
                  active={i === currentIdx}
                  locked={i < currentIdx} // Previous questions are LOCKED
                  visited={visitedQuestions.has(i)}
                  finished={finished}
                  onClick={() => handleNavClick(i)}
                >
                  {i + 1}
                </ProgressBox>
              ))}
            </ProgressGrid>
          </ProgressWrapper>
        </MediaWrapper>
      </Layout>

      <Controls>
 

        <HomeButton onClick={() => navigate("/")}>
          <FaHome />
          Home Page
        </HomeButton>

        <FinishButton onClick={handleFinishNow} disabled={finished}>
          <FaFlagCheckered />
          Testni Yakunlash
        </FinishButton>

        <NavButton 
          onClick={handleNext}
          disabled={currentIdx >= tests.length - 1 || finished}
        >
          Keyingi
          <FaArrowRight />
        </NavButton>
      </Controls>

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
              <ResultTitle score={finalScore}>
                {finalScore >= 15 ? "A'lo Natija!" : finalScore >= 10 ? "Yaxshi!" : "Yana Urinib Ko'ring"}
              </ResultTitle>
              
              <ResultScore>{finalScore} / 20</ResultScore>
              
              <ResultStats>
                <StatItem type="correct">
                  <div className="value">{correctCount}</div>
                  <div className="label">To'g'ri</div>
                </StatItem>
                <StatItem type="wrong">
                  <div className="value">{wrongCount}</div>
                  <div className="label">Noto'g'ri</div>
                </StatItem>
                <StatItem type="time">
                  <div className="value">{formatTime(1500 - timeLeft)}</div>
                  <div className="label">Vaqt</div>
                </StatItem>
              </ResultStats>
              
              <CloseBtn onClick={handleCloseModal}>
                Testni Qayta Boshlash
              </CloseBtn>
            </ResultBox>
          </ResultModal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Home;