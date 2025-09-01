import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppHeader } from './components/AppHeader';
import { Homepage } from './components/Homepage';
import { ExamInterface } from './components/ExamInterface';
import { PracticeTickets } from './components/PracticeTickets';

type Page = 'home' | 'exam' | 'practice' | 'ticket';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const handleNavigate = (page: 'home' | 'exam' | 'practice') => {
    setCurrentPage(page);
    setSelectedTicket(null);
  };

  const handleStartTicket = (ticketNumber: number) => {
    setSelectedTicket(ticketNumber);
    setCurrentPage('ticket');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} />;
      
      case 'exam':
        return (
          <ExamInterface 
            onNavigate={handleNavigate} 
            mode="exam"
          />
        );
      
      case 'practice':
        return (
          <PracticeTickets 
            onNavigate={handleNavigate}
            onStartTicket={handleStartTicket}
          />
        );
      
      case 'ticket':
        return (
          <ExamInterface 
            onNavigate={handleNavigate} 
            mode="practice"
          />
        );
      
      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  // Only show header on homepage and practice list - exam pages have their own headers
  const showHeader = currentPage === 'home' || currentPage === 'practice';

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <AppHeader 
          currentPage={currentPage === 'ticket' ? 'practice' : currentPage}
          onNavigate={handleNavigate}
        />
      )}
      {renderCurrentPage()}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}