
import React, { createContext, useState, useContext, ReactNode } from 'react';

const translations = {
  en: {
    topics: 'Topics',
    content: 'Content',
    hoverToOpen: 'Hover to open',
    addTopic: 'Add Topic',
    aboutUs: 'About Us',
    support: 'Support',
    wantToHelp: 'Want to Help',
    back: 'Back',
    heroTitle: 'Learn and Explore Topics',
    heroSubtitle: 'Discover interesting information and educational content',
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
    heroTitle: 'Изучайте и исследуйте темы',
    heroSubtitle: 'Откройте для себя интересную информацию и образовательный контент',
    readButton: 'Начать чтение',
    copyright: '© {year} Все права защищены',
    relatedTopics: 'Связанные темы'
  }
};

type Language = keyof typeof translations;
type TranslationKey = keyof (typeof translations)['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  getCountryFlag: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey) => {
    return translations[language][key];
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
