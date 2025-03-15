
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    aboutUs: 'About us',
    support: 'Support',
    wantToHelp: 'Want to help us?',
    heroTitle: 'Exploring the Math Behind Beautiful Visuals',
    heroSubtitle: 'Welcome to the community of math enthusiasts and shader artists. Dive into the world where algorithms create beauty.',
    readButton: 'READ',
    copyright: '© {year} ShaderMath. All rights reserved.'
  },
  ru: {
    aboutUs: 'О нас',
    support: 'Поддержка',
    wantToHelp: 'Хотите помочь нам?',
    heroTitle: 'Исследуя математику за красивыми визуальными эффектами',
    heroSubtitle: 'Добро пожаловать в сообщество энтузиастов математики и художников шейдеров. Погрузитесь в мир, где алгоритмы создают красоту.',
    readButton: 'ЧИТАТЬ',
    copyright: '© {year} ShaderMath. Все права защищены.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
