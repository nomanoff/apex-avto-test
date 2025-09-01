import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, CheckCircle, XCircle, Clock } from 'lucide-react';

interface TicketScore {
  score: number;
  total: number;
  date: string;
}

interface PracticeTicketsProps {
  onNavigate: (page: 'home' | 'exam') => void;
  onStartTicket: (ticketNumber: number) => void;
}

export function PracticeTickets({ onNavigate, onStartTicket }: PracticeTicketsProps) {
  const { t } = useLanguage();
  const [ticketScores, setTicketScores] = useState<Record<number, TicketScore>>({});

  useEffect(() => {
    // Load saved scores from localStorage
    const saved = localStorage.getItem('apex-ticket-scores');
    if (saved) {
      setTicketScores(JSON.parse(saved));
    }
  }, []);

  const getTicketStatus = (ticketNumber: number) => {
    const score = ticketScores[ticketNumber];
    if (!score) return 'not-attempted';
    
    const percentage = (score.score / score.total) * 100;
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    return 'needs-practice';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-success text-success-foreground';
      case 'good':
        return 'bg-warning text-warning-foreground';
      case 'needs-practice':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-neutral text-neutral-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4" />;
      case 'good':
        return <Clock className="w-4 h-4" />;
      case 'needs-practice':
        return <XCircle className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'A\'lo';
      case 'good':
        return 'Yaxshi';
      case 'needs-practice':
        return 'Mashq kerak';
      default:
        return 'Boshlanmagan';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Stats Overview */}
      <div className="bg-white py-8 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.practiceTickets}</h1>
            <p className="text-gray-600">70 ta bilet orqali mashq qiling va tayyor bo'ling</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-1">70</div>
              <div className="text-sm text-gray-600">Jami biletlar</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {Object.values(ticketScores).filter(score => (score.score / score.total) >= 0.9).length}
              </div>
              <div className="text-sm text-gray-600">A'lo natija</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {Object.values(ticketScores).filter(score => {
                  const pct = score.score / score.total;
                  return pct >= 0.7 && pct < 0.9;
                }).length}
              </div>
              <div className="text-sm text-gray-600">Yaxshi natija</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-gray-600 mb-1">
                {70 - Object.keys(ticketScores).length}
              </div>
              <div className="text-sm text-gray-600">Boshlanmagan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Biletlarni tanlang</h2>
              <p className="text-gray-600">Har bir biletda 20 ta savol mavjud</p>
            </div>
            <Button
              onClick={() => onNavigate('exam')}
              className="bg-primary hover:bg-primary/90 px-6 py-3 text-lg"
              size="lg"
            >
              {t.startExam}
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {Array.from({ length: 70 }, (_, i) => {
              const ticketNumber = i + 1;
              const status = getTicketStatus(ticketNumber);
              const score = ticketScores[ticketNumber];

              return (
                <div
                  key={ticketNumber} 
                  className="bg-white rounded-xl p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-primary/20 group"
                  onClick={() => onStartTicket(ticketNumber)}
                >
                  <div className="text-xl font-bold text-gray-900 mb-3">
                    {ticketNumber.toString().padStart(2, '0')}
                  </div>
                  
                  <div className={`w-4 h-4 rounded-full mx-auto mb-3 ${
                    status === 'excellent' ? 'bg-green-500' :
                    status === 'good' ? 'bg-yellow-500' :
                    status === 'needs-practice' ? 'bg-red-500' :
                    'bg-gray-300'
                  }`}></div>

                  {score && (
                    <div className="text-sm text-gray-600 mb-2">
                      {score.score}/20
                    </div>
                  )}

                  <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Boshlash →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white py-12 px-4 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Qanday ishlaydi?</h3>
            <p className="text-gray-600">Uch oddiy qadamda imtihonga tayyor bo'ling</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Biletni tanlang</h4>
              <p className="text-gray-600 text-sm">70 ta biletdan birini tanlab, 20 ta savolni javoblang</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Natijani ko'ring</h4>
              <p className="text-gray-600 text-sm">18+ to'g'ri javob bilan muvaffaqiyatli yakunlang</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Imtihon toping</h4>
              <p className="text-gray-600 text-sm">Tayyor bo'lganingizda haqiqiy imtihonni topshiring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}