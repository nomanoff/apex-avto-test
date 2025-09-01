import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const languageOptions = [
  { value: 'uzb-lat' as Language, label: "O'zbek (Lotin)" },
  { value: 'uzb-cyr' as Language, label: 'Ўзбек (Кирилл)' },
  { value: 'rus' as Language, label: 'Русский' }
];

interface LanguageToggleProps {
  isTransparent?: boolean;
}

export function LanguageToggle({ isTransparent = false }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className={`w-40 ${isTransparent ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-border text-foreground'}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}