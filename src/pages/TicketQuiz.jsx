import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaCheck, FaTimes, FaArrowLeft, FaArrowRight, FaHome, FaFlagCheckered } from "react-icons/fa";

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
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
  user-select: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  background: ${({ selected, confirmed, correct, locked }) => {
    if (locked) return 'rgba(148, 163, 184, 0.1)';
    if (confirmed) {
      return selected 
        ? (correct ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)')
        : 'rgba(30, 41, 59, 0.8)';
    }
    return selected 
      ? 'rgba(96, 165, 250, 0.2)'
      : 'rgba(30, 41, 59, 0.8)';
  }};

  color: ${({ selected, confirmed, correct, locked }) => {
    if (locked) return '#64748b';
    if (confirmed) {
      return selected 
        ? (correct ? '#22c55e' : '#ef4444')
        : '#94a3b8';
    }
    return selected ? '#60a5fa' : '#cbd5e1';
  }};

  border-color: ${({ selected, confirmed, correct, locked }) => {
    if (locked) return 'rgba(148, 163, 184, 0.1)';
    if (confirmed) {
      return selected 
        ? (correct ? '#22c55e' : '#ef4444')
        : 'rgba(255, 255, 255, 0.1)';
    }
    return selected ? '#60a5fa' : 'rgba(255, 255, 255, 0.1)';
  }};

  &:hover {
    ${({ disabled, locked }) => !disabled && !locked && `
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
  background: ${({ selected, confirmed, correct, locked }) => {
    if (locked) return 'rgba(148, 163, 184, 0.2)';
    if (confirmed) {
      return selected 
        ? (correct ? '#22c55e' : '#ef4444')
        : 'rgba(96, 165, 250, 0.1)';
    }
    return selected ? '#60a5fa' : 'rgba(96, 165, 250, 0.1)';
  }};
  color: ${({ selected, confirmed,  locked }) => {
    if (locked) return '#64748b';
    if (confirmed) {
      return selected ? 'white' : '#60a5fa';
    }
    return selected ? 'white' : '#60a5fa';
  }};
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
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

const ProgressBox = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: ${({ locked }) => locked ? "not-allowed" : "pointer"};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid;

  background: ${({ status, active, locked }) => {
    if (locked) return 'rgba(239, 68, 68, 0.9)';
    if (status === "correct") return 'rgba(34, 197, 94, 0.2)';
    if (status === "wrong") return 'rgba(239, 68, 68, 0.2)';
    if (active) return 'rgba(96, 165, 250, 0.2)';
    return 'rgba(30, 41, 59, 0.5)';
  }};

  border-color: ${({ status, active, locked }) => {
    if (locked) return '#ef4444';
    if (status === "correct") return '#22c55e';
    if (status === "wrong") return '#ef4444';
    if (active) return '#60a5fa';
    return 'rgba(255, 255, 255, 0.1)';
  }};

  color: ${({ status, active, locked }) => {
    if (locked) return 'white';
    if (status === "correct") return '#22c55e';
    if (status === "wrong") return '#ef4444';
    if (active) return '#60a5fa';
    return '#64748b';
  }};

  &:hover {
    ${({ locked }) => !locked && `
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `}
  }

  ${({ locked }) => locked && `
    &::after {
      content: '🔒';
      position: absolute;
      top: 2px;
      right: 2px;
      font-size: 0.7rem;
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
  padding: 12px 30px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  }

  @media (max-width: 480px) {
    padding: 10px 25px;
    font-size: 0.9rem;
  }
`;

const ResultModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
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
  color: ${({ score, total }) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return '#22c55e';
    if (percentage >= 60) return '#eab308';
    return '#ef4444';
  }};
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

const TicketHeader = styled.div`
  background: rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 15px 25px;
  margin-bottom: 25px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  h1 {
    color: #60a5fa;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  .ticket-info {
    color: #cbd5e1;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 20px;

    span {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

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
  const [timeLeft, setTimeLeft] = useState(600);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [lockedQuestions, setLockedQuestions] = useState(new Set());

  useEffect(() => {
    const loadData = async () => {
      const lang = state?.lang || "uzlotin";
      const data = await LANG_FILES[lang]();
      const startIdx = parseInt(ticketIndex) * 10;
      const endIdx = startIdx + 10;
      const ticketQuestions = data.default.slice(startIdx, endIdx);
      setQuestions(ticketQuestions);
    };
    loadData();
  }, [ticketIndex, state]);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!finished) handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (idx) => {
    if (confirmed || finished || lockedQuestions.has(currentIdx)) return;

    if (selected === idx) {
      const isCorrect = currentQuestion.choises[idx].answer;
      setConfirmed(true);
      if (isCorrect) setCorrectCount(prev => prev + 1);
      
      setResults(prev => {
        const newRes = [...prev];
        newRes[currentIdx] = isCorrect ? "correct" : "wrong";
        return newRes;
      });

      const newLocked = new Set([...lockedQuestions, currentIdx]);
      setLockedQuestions(newLocked);

      setTimeout(() => {
        setConfirmed(false);
        setSelected(null);

        // Keyingi qulflanmagan savolni topish
        let nextIdx = currentIdx + 1;
        while (nextIdx < questions.length && newLocked.has(nextIdx)) {
          nextIdx++;
        }

        if (nextIdx >= questions.length) {
          handleFinish();
        } else {
          setCurrentIdx(nextIdx);
        }
      }, 1500);
    } else {
      setSelected(idx);
    }
  };

  const handleFinish = () => {
    setFinished(true);
    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  const handleNavClick = (index) => {
    if (finished || lockedQuestions.has(index)) return;

    if (!results[currentIdx]) {
      setLockedQuestions(prev => new Set([...prev, currentIdx]));
      setResults(prev => {
        const r = [...prev];
        r[currentIdx] = "wrong";
        return r;
      });
    }

    setCurrentIdx(index);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      let nextIdx = currentIdx + 1;
      while (nextIdx < questions.length && lockedQuestions.has(nextIdx)) {
        nextIdx++;
      }
      
      if (nextIdx < questions.length) {
        setCurrentIdx(nextIdx);
      }
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      let prevIdx = currentIdx - 1;
      while (prevIdx >= 0 && lockedQuestions.has(prevIdx)) {
        prevIdx--;
      }
      
      if (prevIdx >= 0) {
        setCurrentIdx(prevIdx);
      }
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleCloseModal = () => {
    setShowResult(false);
    navigate("/");
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const formatTimeSpent = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m} minut ${s} soniya`;
  };

  const wrongCount = results.filter(r => r === "wrong").length;
  const pendingCount =
    questions.length - results.filter(r => r === "correct" || r === "wrong").length;

  if (!currentQuestion) return (
    <Container>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#60a5fa',
        fontSize: '1.2rem'
      }}>
        Ticket yuklanmoqda...
      </div>
    </Container>
  );

  return (
    <Container>
      <TicketHeader>
        <h1>Ticket #{parseInt(ticketIndex) + 1}</h1>
        <div className="ticket-info">
          <span>📋 {questions.length} ta savol</span>
          <span>🎯 {correctCount} ta to'g'ri</span>
          <span>⏱️ 10 daqiqa</span>
        </div>
      </TicketHeader>

      <Header>
        <QuestionText>{currentQuestion.question}</QuestionText>
        <TimerWrapper>
          <Timer warning={timeLeft < 60}>
            <FaClock />
            {formatTime(timeLeft)}
          </Timer>
        </TimerWrapper>
      </Header>

      <Layout>
        <ChoicesWrapper>
          {currentQuestion.choises?.map((choice, idx) => (
            <Choice
              key={idx}
              selected={selected === idx}
              confirmed={confirmed}
              correct={choice.answer}
              locked={lockedQuestions.has(currentIdx)}
              disabled={finished || lockedQuestions.has(currentIdx)}
              onClick={() => handleSelect(idx)}
            >
              <ChoiceNumber
                selected={selected === idx}
                confirmed={confirmed}
                correct={choice.answer}
                locked={lockedQuestions.has(currentIdx)}
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
                <span>📊</span> {currentIdx + 1} / {questions.length}
              </ProgressText>
              <Stats>
                <span className="correct"><FaCheck /> {correctCount}</span>
                <span className="wrong"><FaTimes /> {wrongCount}</span>
                <span className="pending">⏳ {pendingCount}</span>
              </Stats>
            </ProgressHeader>
            
            <ProgressGrid>
              {questions.map((_, i) => (
                <ProgressBox
                  key={i}
                  status={results[i]}
                  active={i === currentIdx}
                  locked={lockedQuestions.has(i)}
                  onClick={() => handleNavClick(i)}
                >
                  {i + 1}
                </ProgressBox>
              ))}
            </ProgressGrid>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HomeButton onClick={handleGoHome}>
                <FaHome />
                Home Page ga Qaytish
              </HomeButton>
            </div>
          </ProgressWrapper>
        </MediaWrapper>
      </Layout>

      <Controls>
        <NavButton 
          onClick={handlePrev}
          disabled={currentIdx === 0 || finished}
        >
          <FaArrowLeft />
          Oldingi
        </NavButton>
        
        <FinishButton onClick={handleFinish} disabled={finished}>
          <FaFlagCheckered />
          Yakunlash
        </FinishButton>
        
        <NavButton 
          onClick={handleNext}
          disabled={currentIdx >= questions.length - 1 || finished}
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
              <ResultTitle score={correctCount} total={questions.length}>
                Ticket #{parseInt(ticketIndex) + 1} Yakunlandi!
              </ResultTitle>
              
              <ResultScore>{correctCount} / {questions.length}</ResultScore>
              
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
                  <div className="value">{formatTime(600 - timeLeft)}</div>
                  <div className="label">Vaqt</div>
                </StatItem>
              </ResultStats>
              
              <div style={{ 
                color: '#94a3b8', 
                fontSize: '0.9rem',
                marginBottom: '20px'
              }}>
                Sarflangan vaqt: {formatTimeSpent(600 - timeLeft)}
              </div>
              
              <CloseBtn onClick={handleCloseModal}>
                Bosh Sahifaga Qaytish
              </CloseBtn>
            </ResultBox>
          </ResultModal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default TicketQuiz;