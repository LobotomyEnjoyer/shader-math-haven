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
  shaders: string;
  linearAlgebra: string;
  colorTheory: string;
  shadersTitle: string;
  shadersContent: string;
  linearAlgebraTitle: string;
  linearAlgebraContent: string;
  colorTheoryTitle: string;
  colorTheoryContent: string;
  [key: string]: string; // Add index signature to support dynamic keys
}

const translations: Record<string, TranslationValues> = {
  en: {
    topics: 'Topics',
    content: 'Content',
    hoverToOpen: 'Hover/click to open',
    addTopic: 'Add Topic',
    aboutUs: 'About Us',
    support: 'Support',
    wantToHelp: 'Want to Help',
    back: 'Back',
    heroTitle: 'Math and Shaders',
    heroSubtitle: 'Explore mathematics and shader examples for computer graphics',
    readButton: 'Start Reading',
    copyright: '© {year} All Rights Reserved',
    relatedTopics: 'Related Topics',
    shaders: 'Shaders',
    transformationMatrices: 'Transformation Matrices',
    colorTheory: 'Color Space',
    

    shadersTitle: 'Introduction to Shaders',
    shadersContent: 'Shaders are programs that run on the GPU and define how pixels are rendered. They are essential for modern computer graphics and can create stunning visual effects.',
    
    transMatrTitle: 'Transformation Matrices',
    transMatrContent: 'Linear algebra is the foundation of computer graphics. It deals with vectors, matrices, and transformations that are crucial for 3D rendering.',
    
    colorTheoryTitle: 'Understanding Color Spaces',
    colorTheoryContent: 'Color theory explores how we perceive and represent colors in digital graphics. Understanding color spaces like RGB, HSV, and CMYK is essential.',


    vulkan: 'Vulkan',
    glsl: 'GLSL',
    webgl: 'WebGL',
    matrices: 'Matrices',
    vectors: 'Vectors',
    geogebraClassic: 'Interactive Matrices',
    rgb: 'RGB',
    hsv: 'HSV',
    colorSpaces: 'Color Spaces',
    glsl_editor: 'GLSL Online Editor',
  },
  ru: {
    topics: 'Темы',
    content: 'Содержание',
    hoverToOpen: 'Наведитесь/кликните для открытия',
    addTopic: 'Добавить тему',
    aboutUs: 'О нас',
    support: 'Поддержка',
    wantToHelp: 'Хочу помочь',
    back: 'Назад',
    heroTitle: 'Математика и Шейдеры',
    heroSubtitle: 'Изучайте математические и шейдерные примеры для компьютерной графики',
    readButton: 'Начать чтение',
    copyright: '© {year} Все права защищены',
    relatedTopics: 'Связанные темы',
    shaders: 'Шейдеры',
    transformationMatrices: 'Матрицы преобразования',
    colorTheory: 'Цветовое пространство',


    shadersTitle: 'Введение в шейдеры',
    shadersContent: 'Шейдеры - это программы, работающие на GPU и определяющие способ отрисовки пикселей. Они необходимы для современной компьютерной графики и могут создавать потрясающие визуальные эффекты.',
    
    transMatrTitle: 'Матрицы преобразования',
    transMatrContent: 'Линейная алгебра - это основа компьютерной графики. Она имеет дело с векторами, матрицами и преобразованиями, которые важны для 3D-рендеринга.',
    
    colorTheoryTitle: 'Понимание цветовых пространств',
    colorTheoryContent: 'Теория цвета исследует то, как мы воспринимаем и представляем цвета в цифровой графике. Понимание цветовых пространств, таких как RGB, HSV и CMYK, является важным.',

    vulkan: 'Vulkan',
    glsl: 'GLSL',
    webgl: 'WebGL',
    matrices: 'Матрицы',
    vectors: 'Векторы',
    geogebraClassic: 'Интерактивные Матрицы',
    rgb: 'RGB',
    hsv: 'HSV',
    colorSpaces: 'Цветовые Пространства',
    glsl_editor: 'Онлайн Редактор GLSL',
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
