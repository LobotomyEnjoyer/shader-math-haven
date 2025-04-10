import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TranslationValues {
  topics: string;
  content: string;
  hoverToOpen: string;
  addTopic: string;
  aboutUs: string;
  support: string;
  wantToHelp: string;
  back: string;
  heroTitle: string;
  heroSubtitle: string;
  readButton: string;
  copyright: string;
  relatedTopics: string;
  [key: string]: string; // Add index signature to support dynamic keys
}

const translations: Record<string, TranslationValues> = {
  en: {
    topics: 'Topics',
    content: 'Content',
    hoverToOpen: 'Hover to open',
    addTopic: 'Add Topic',
    aboutUs: 'About Us',
    support: 'Support',
    wantToHelp: 'Want to Help',
    back: 'Back',
    heroTitle: 'Math and Shaders',
    heroSubtitle: 'Explore mathematics and shader examples for computer graphics',
    readButton: 'Start Reading',
    copyright: '© {year} All Rights Reserved',
    relatedTopics: 'Related Topics'
  },
  ru: {
    topics: 'Темы',
    content: 'Содержание',
    hoverToOpen: 'Наведите для открытия',
    addTopic: 'Добавить тему',
    aboutUs: 'О нас',
    support: 'Поддержка',
    wantToHelp: 'Хочу помочь',
    back: 'Назад',
    heroTitle: 'Математика и Шейдеры',
    heroSubtitle: 'Изучайте математические и шейдерные примеры для компьютерной графики',
    readButton: 'Начать чтение',
    copyright: '© {year} Все права защищены',
    relatedTopics: 'Связанные темы'
  }
};

type Language = keyof typeof translations;
type TranslationKey = keyof TranslationValues;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Changed to accept any string key
  getCountryFlag: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    // Return the key itself as fallback if translation is not found
    return translations[language][key] || key;
  };

  const getCountryFlag = () => {
    return language === 'en' ? '🇺🇸 English' : '🇷🇺 Русский';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCountryFlag }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
