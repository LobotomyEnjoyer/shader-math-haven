import React, { createContext, useState, useContext, ReactNode } from 'react';

const translations = {
  en: {
    topics: 'Topics',
    content: 'Content',
    hoverToOpen: 'Hover to open',
    addTopic: 'Add Topic',
  },
  ru: {
    topics: 'Темы',
    content: 'Содержание',
    hoverToOpen: 'Наведите для открытия',
    addTopic: 'Добавить тему',
  }
};

type Language = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof translations)['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof (typeof translations)['en']) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
