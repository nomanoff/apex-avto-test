import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Button } from './ui/button';
import { Home, BookOpen, FileText } from 'lucide-react';
import logoImage from 'figma:asset/339496cd88776d45635d6ed31c3cb94887cccdd8.png';

interface AppHeaderProps {
  currentPage: 'home' | 'exam' | 'practice';
  onNavigate: (page: 'home' | 'exam' | 'practice') => void;
}

export function AppHeader({ currentPage, onNavigate }: AppHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="bg-white border-b p-4 text-foreground">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo and App Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <img src={logoImage} alt="apex avto test logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold">{t.appName}</h1>
        </div>

        {/* Navigation - Only show on homepage */}
        {currentPage === 'home' && (
          <nav className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              {t.home}
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate('exam')}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              {t.exam}
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate('practice')}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {t.practice}
            </Button>
          </nav>
        )}

        {/* Language Toggle */}
        <div className="flex items-center gap-3">
          <LanguageToggle isTransparent={false} />
        </div>
      </div>
    </header>
  );
}