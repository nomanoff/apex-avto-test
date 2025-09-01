import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import examScreenImage from 'figma:asset/4bf4f8dc6e4b24351adcf37af0bf022579339383.png';
import successScreenImage from 'figma:asset/d237fa29cc4528087b6f75d69e96b6da23b5e687.png';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  image?: string;
}

interface ExamInterfaceProps {
  onNavigate: (page: 'home' | 'practice') => void;
  mode: 'exam' | 'practice';
}

// Mock exam data
const mockQuestions: Question[] = [
  {
    id: 1,
    text: "M3 toifadagi avtotransport vositalarining boshqaruv huquqini olish uchun eng kam yosh nechta?",
    options: [
      "16 yosh",
      "18 yosh", 
      "21 yosh",
      "25 yosh",
      "20 yosh"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Yo'l belgilaridan qaysi biri majburiy harakatni bildiradi?",
    options: [
      "Ogohlantiruvchi belgilar",
      "Taqiqlash belgilari",
      "Ko'rsatma belgilari", 
      "Buyruq belgilari",
      "Qo'shimcha axborot belgilari"
    ],
    correctAnswer: 3
  },
  // Add more questions as needed...
];

export function ExamInterface({ onNavigate, mode }: ExamInterfaceProps) {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(20).fill(null));
  const [timeLeft, setTimeLeft] = useState(mode === 'exam' ? 1200 : null); // 20 minutes for exam
  const [showResult, setShowResult] = useState(false);
  const [questions] = useState(mockQuestions.slice(0, 20));

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev && prev <= 1) {
          handleFinishExam();
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleFinishExam = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer !== null && questions[index] && answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    const score = calculateScore();
    const passed = score >= 18; // Need 18+ correct answers to pass

    return (
      <div className="min-h-screen text-white flex items-center justify-center p-4 relative" style={{ backgroundColor: '#0f1419' }}>
        {/* Background gradient similar to official exam */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 30%, #2c3e50 70%, #34495e 100%)' }}></div>
        
        <div className="relative z-10 text-center max-w-2xl">
          {/* Result ID Badge */}
          <div className="absolute top-4 right-4 bg-white/20 px-4 py-2 rounded text-sm font-mono">
            A-{(Math.floor(Math.random() * 100) + 1).toString().padStart(2, '0')}
          </div>

          {/* Success/Fail Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white/90 mb-4 uppercase tracking-wide">
              {passed ? "ERGASHEV UMAR FAXRIDDIN O'G'LI" : "IMTIHON YAKUNLANDI"}
            </h1>
            
            <div className="text-green-400 text-xl leading-relaxed">
              {passed ? (
                <>
                  <div className="mb-2">Tabriklaymiz!</div>
                  <div className="mb-2">Nazariy imtihonni muvaffaqiyatli</div>
                  <div className="mb-4">topshirdingiz.</div>
                  
                  <div className="text-lg">
                    <div className="mb-1">Поздравляем!</div>
                    <div className="mb-1">Вы успешно сдали теоретический</div>
                    <div>экзамен.</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-red-400">
                    <div className="mb-2">Afsuski!</div>
                    <div className="mb-2">Nazariy imtihondan</div>
                    <div className="mb-4">o'ta olmadingiz.</div>
                    
                    <div className="text-lg">
                      <div className="mb-1">К сожалению!</div>
                      <div className="mb-1">Вы не прошли теоретический</div>
                      <div>экзамен.</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Score */}
          <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: 'rgba(26, 35, 50, 0.6)' }}>
            <div className="text-3xl font-bold mb-2">
              {t.correctAnswers}: {score}/20
            </div>
            <div className="text-white/70">
              Kerakli ball: 18 yoki undan yuqori
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button 
              onClick={() => onNavigate('home')} 
              className="w-full py-3 text-lg font-semibold"
              style={{ backgroundColor: '#D0D7E9', color: '#0f1419' }}
              size="lg"
            >
              Bosh sahifaga qaytish
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="w-full text-white py-3 text-lg"
              style={{ borderColor: 'rgba(208, 215, 233, 0.2)', backgroundColor: 'rgba(26, 35, 50, 0.4)' }}
              size="lg"
            >
              Qayta urinish
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0f1419' }}>
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 30%, #2c3e50 70%, #34495e 100%)' }}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: '#D0D7E9' }}>
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('home')}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#1a2332' }}>O'zbek tili</span>
              <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#1a2332' }}>Русский язык</span>
            </div>
          </div>

          {/* Center - Question indicator */}
          <div className="text-center">
            <div className="text-sm text-white/70">Test Test Test | Tolfa- | Tug'ilgan sanasi-</div>
          </div>

          {/* Right side - Timer and ID */}
          <div className="flex items-center gap-4">
            {mode === 'exam' && timeLeft !== null && (
              <div className="text-xl font-mono bg-white/10 px-4 py-2 rounded">
                {formatTime(timeLeft)}
              </div>
            )}
            <div className="bg-white/20 px-4 py-2 rounded text-sm font-mono">
              A-{(currentQuestion + 1).toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
          {/* Question Area */}
          <div className="lg:w-1/2 p-6">
            <div className="rounded-lg p-6 h-full" style={{ backgroundColor: 'rgba(26, 35, 50, 0.6)' }}>
              {/* Question text */}
              <div className="p-4 rounded mb-6 text-center text-sm" style={{ backgroundColor: '#1a2332' }}>
                {questions[currentQuestion]?.text}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded border transition-all ${
                      answers[currentQuestion] === index
                        ? 'text-white border-white/50'
                        : 'text-white/90 border-white/30 hover:border-white/60'
                    }`}
                    style={{
                      backgroundColor: answers[currentQuestion] === index ? '#2c3e50' : 'rgba(26, 35, 50, 0.3)'
                    }}
                  >
                    <span className="font-bold mr-3">F{index + 1}</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image/Media Area */}
          <div className="lg:w-1/2 p-6">
            <div className="rounded-lg p-6 h-full flex items-center justify-center border" style={{ backgroundColor: 'rgba(26, 35, 50, 0.4)', borderColor: 'rgba(208, 215, 233, 0.2)' }}>
              {questions[currentQuestion]?.image ? (
                <ImageWithFallback
                  src={questions[currentQuestion].image!}
                  alt="Question illustration"
                  className="max-w-full max-h-full object-contain rounded"
                />
              ) : (
                <div className="text-center text-white/60">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(26, 35, 50, 0.8)' }}>
                    <span className="text-3xl">🚗</span>
                  </div>
                  <p>Bu savolda rasm mavjud emas</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="p-4 border-t" style={{ backgroundColor: 'rgba(15, 20, 25, 0.8)', borderColor: 'rgba(208, 215, 233, 0.1)' }}>
          <div className="max-w-6xl mx-auto">
            {/* Question Numbers */}
            <div className="flex flex-wrap gap-1 justify-center mb-4">
              {Array.from({ length: 20 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-8 h-8 text-xs font-bold rounded transition-all border-2 ${
                    i === currentQuestion
                      ? 'text-white border-white'
                      : answers[i] !== null
                      ? 'bg-green-600 text-white border-green-600'
                      : 'text-white/70 border-white/30'
                  }`}
                  style={{
                    backgroundColor: i === currentQuestion ? '#2c3e50' : 
                                   answers[i] !== null ? '#16A34A' : 'rgba(26, 35, 50, 0.6)'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Navigation and Finish */}
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                variant="outline"
                className="text-white hover:text-white"
                style={{ borderColor: 'rgba(208, 215, 233, 0.2)', backgroundColor: 'rgba(26, 35, 50, 0.4)' }}
              >
                ← Oldingi
              </Button>

              <div className="text-sm" style={{ color: '#D0D7E9' }}>
                Savol {currentQuestion + 1} / 20 • Javoblangan: {answers.filter(a => a !== null).length}
              </div>

              {currentQuestion < 19 ? (
                <Button
                  onClick={() => setCurrentQuestion(Math.min(19, currentQuestion + 1))}
                  variant="outline"
                  className="text-white hover:text-white"
                  style={{ borderColor: 'rgba(208, 215, 233, 0.2)', backgroundColor: 'rgba(26, 35, 50, 0.4)' }}
                >
                  Keyingi →
                </Button>
              ) : (
                <Button
                  onClick={handleFinishExam}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Tugatish ✓
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}