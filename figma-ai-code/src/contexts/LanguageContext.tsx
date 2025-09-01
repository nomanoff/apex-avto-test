import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'uzb-lat' | 'uzb-cyr' | 'rus';

interface Translations {
  // Homepage
  appName: string;
  tagline: string;
  subtitle: string;
  startExam: string;
  practiceTickets: string;
  donateSupport: string;
  
  // Benefits
  noAds: string;
  realExam: string;
  practiceSystem: string;
  freeForever: string;
  
  // Navigation
  language: string;
  fullscreen: string;
  home: string;
  exam: string;
  practice: string;
  
  // Exam
  question: string;
  timeLeft: string;
  pass: string;
  fail: string;
  result: string;
  correctAnswers: string;
  
  // Support
  telegramSupport: string;
  followChannel: string;
  
  // Footer
  copyright: string;
}

const translations: Record<Language, Translations> = {
  'uzb-lat': {
    appName: 'apex avto test',
    tagline: 'Haydovchilik imtixonini tayyorlang. Bepul. Reklamasiz.',
    subtitle: 'Haqiqiy imtixon kabi savollar bilan o\'zbek va rus tillarida.',
    startExam: 'Haqiqiy Imtixonni Boshlash',
    practiceTickets: 'Biletlarni Mashq Qilish',
    donateSupport: 'Qo\'llab-quvvatlash',
    
    noAds: 'Reklamasiz',
    realExam: 'Haqiqiy imtixon tajribasi',
    practiceSystem: 'Biletlar tizimi',
    freeForever: 'Doim bepul',
    
    language: 'Til',
    fullscreen: 'Butun ekran',
    home: 'Bosh sahifa',
    exam: 'Imtixon',
    practice: 'Mashq',
    
    question: 'Savol',
    timeLeft: 'Qolgan vaqt',
    pass: 'O\'TDINGIZ',
    fail: 'O\'TA OLMADINGIZ',
    result: 'Natija',
    correctAnswers: 'To\'g\'ri javoblar',
    
    telegramSupport: 'Telegram Yordam',
    followChannel: 'Kanalga Obuna Bo\'lish',
    
    copyright: '© 2025 apex avto test. Barcha huquqlar himoyalangan.'
  },
  'uzb-cyr': {
    appName: 'apex avto test',
    tagline: 'Ҳайдовчилик имтиҳонини тайёрланг. Бепул. Рекламасиз.',
    subtitle: 'Ҳақиқий имтиҳон каби саволлар билан ўзбек ва рус тилларида.',
    startExam: 'Ҳақиқий Имтиҳонни Бошлаш',
    practiceTickets: 'Билетларни Машқ Қилиш',
    donateSupport: 'Қўллаб-қувватлаш',
    
    noAds: 'Рекламасиз',
    realExam: 'Ҳақиқий имтиҳон тажрибаси',
    practiceSystem: 'Билетлар тизими',
    freeForever: 'Доим бепул',
    
    language: 'Тил',
    fullscreen: 'Бутун экран',
    home: 'Бош саҳифа',
    exam: 'Имтиҳон',
    practice: 'Машқ',
    
    question: 'Савол',
    timeLeft: 'Қолган вақт',
    pass: 'ЎТДИНГИЗ',
    fail: 'ЎТА ОЛМАДИНГИЗ',
    result: 'Натижа',
    correctAnswers: 'Тўғри жавоблар',
    
    telegramSupport: 'Telegram Ёрдам',
    followChannel: 'Каналга Обуна Бўлиш',
    
    copyright: '© 2025 apex avto test. Барча ҳуқуқлар ҳимояланган.'
  },
  'rus': {
    appName: 'apex avto test',
    tagline: 'Подготовьтесь к экзамену на права. Бесплатно. Без рекламы.',
    subtitle: 'Вопросы как на настоящем экзамене на узбекском и русском языках.',
    startExam: 'Начать Настоящий Экзамен',
    practiceTickets: 'Практика Билетов',
    donateSupport: 'Поддержать',
    
    noAds: 'Без рекламы',
    realExam: 'Опыт настоящего экзамена',
    practiceSystem: 'Система билетов',
    freeForever: 'Всегда бесплатно',
    
    language: 'Язык',
    fullscreen: 'Полный экран',
    home: 'Главная',
    exam: 'Экзамен',
    practice: 'Практика',
    
    question: 'Вопрос',
    timeLeft: 'Осталось времени',
    pass: 'СДАЛИ',
    fail: 'НЕ СДАЛИ',
    result: 'Результат',
    correctAnswers: 'Правильных ответов',
    
    telegramSupport: 'Поддержка Telegram',
    followChannel: 'Подписаться на канал',
    
    copyright: '© 2025 apex avto test. Все права защищены.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('apex-language');
    return (saved as Language) || 'uzb-lat';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('apex-language', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}