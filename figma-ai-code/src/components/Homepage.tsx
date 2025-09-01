import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Shield, Clock, Zap, Coffee } from 'lucide-react';
import logoImage from 'figma:asset/339496cd88776d45635d6ed31c3cb94887cccdd8.png';

interface HomepageProps {
  onNavigate: (page: 'exam' | 'practice') => void;
}

export function Homepage({ onNavigate }: HomepageProps) {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Shield,
      title: t.noAds,
      description: 'Hech qanday reklama va chalg\'ituvchi elementlarsiz'
    },
    {
      icon: Clock,
      title: t.realExam,
      description: 'Haqiqiy imtixon kabi vaqt va format'
    },
    {
      icon: Zap,
      title: t.freeForever,
      description: 'Hech qachon pul talab qilinmaydi'
    }
  ];

  const handleDonate = () => {
    window.open('https://t.me/apexavtotest_support', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6">
              <img src={logoImage} alt="apex avto test logo" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {t.tagline}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => onNavigate('exam')}
            >
              {t.startExam}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg rounded-xl transition-all"
              onClick={() => onNavigate('practice')}
            >
              {t.practiceTickets}
            </Button>
          </div>

          <button
            onClick={handleDonate}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl transform-gpu"
            style={{
              backgroundColor: '#FFDD04',
              color: '#0D0C23',
              boxShadow: '0 10px 25px rgba(255, 221, 4, 0.3)'
            }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#0D0C23' }}
            >
              <Coffee size={18} style={{ color: '#FBFBFA' }} />
            </div>
            <span className="font-bold text-lg">{t.donateSupport}</span>
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nima uchun ApexAvtoTest?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Eng yaxshi tajriba va natijalar uchun yaratilgan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">700+</div>
              <div className="text-gray-600 text-lg">Savollar</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">70</div>
              <div className="text-gray-600 text-lg">Biletlar</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-gray-600 text-lg">Bepul</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Tayyor bo'ldingizmi?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Hoziroq boshlab, haydovchilik huquqini oling
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
            onClick={() => onNavigate('exam')}
          >
            {t.startExam}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 mr-3">
              <img src={logoImage} alt="apex avto test logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white">{t.appName}</span>
          </div>
          <p className="text-gray-400 text-sm">
            {t.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}