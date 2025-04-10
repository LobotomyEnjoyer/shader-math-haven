
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
    copyright: '© {year} ShaderMath. All rights reserved.',
    // Topics
    shaders: 'Shaders',
    linearAlgebra: 'Linear Algebra',
    colorTheory: 'Color Theory',
    // Related topics
    shaderTypes: 'Shader Types',
    glsl: 'GLSL Language',
    webgl: 'WebGL',
    matrices: 'Matrices',
    vectors: 'Vectors',
    linearTransformations: 'Linear Transformations',
    rgb: 'RGB Color Model',
    hsl: 'HSL Color Model',
    colorSpaces: 'Color Spaces',
    // Content
    shadersContent: 'Shaders are small programs that run on a GPU and define how pixels are rendered on screen. They are essential for real-time graphics and can create complex visual effects with mathematical algorithms.',
    linearAlgebraContent: 'Linear algebra is a fundamental mathematical discipline that studies vectors, vector spaces, linear mappings, and systems of linear equations. In computer graphics, linear algebra operations are used extensively to transform objects in 3D space.',
    colorTheoryContent: 'Color theory encompasses a multitude of rules and guidelines regarding the use of color in art and design. Understanding color models and spaces is crucial for creating visually appealing graphics.',
    // UI elements
    topics: 'Topics',
    relatedTopics: 'Related Topics',
    addTopic: 'Add Topic',
    back: 'Back',
    explore: 'Explore'
  },
  ru: {
    aboutUs: 'О нас',
    support: 'Поддержка',
    wantToHelp: 'Хотите помочь нам?',
    heroTitle: 'Исследуя математику за красивыми визуальными эффектами',
    heroSubtitle: 'Добро пожаловать в сообщество энтузиастов математики и художников шейдеров. Погрузитесь в мир, где алгоритмы создают красоту.',
    readButton: 'ЧИТАТЬ',
    copyright: '© {year} ShaderMath. Все права защищены.',
    // Topics
    shaders: 'Шейдеры',
    linearAlgebra: 'Линейная алгебра',
    colorTheory: 'Теория цвета',
    // Related topics
    shaderTypes: 'Типы шейдеров',
    glsl: 'Язык GLSL',
    webgl: 'WebGL',
    matrices: 'Матрицы',
    vectors: 'Векторы',
    linearTransformations: 'Линейные преобразования',
    rgb: 'Цветовая модель RGB',
    hsl: 'Цветовая модель HSL',
    colorSpaces: 'Цветовые пространства',
    // Content
    shadersContent: 'Шейдеры - это небольшие программы, которые выполняются на GPU и определяют, как пиксели отображаются на экране. Они необходимы для графики в реальном времени и могут создавать сложные визуальные эффекты с помощью математических алгоритмов.',
    linearAlgebraContent: 'Линейная алгебра - это фундаментальная математическая дисциплина, изучающая векторы, векторные пространства, линейные отображения и системы линейных уравнений. В компьютерной графике операции линейной алгебры широко используются для преобразования объектов в 3D-пространстве.',
    colorTheoryContent: 'Теория цвета охватывает множество правил и рекомендаций по использованию цвета в искусстве и дизайне. Понимание цветовых моделей и пространств имеет решающее значение для создания визуально привлекательной графики.',
    // UI elements
    topics: 'Темы',
    relatedTopics: 'Связанные темы',
    addTopic: 'Добавить тему',
    back: 'Назад',
    explore: 'Исследовать'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  getCountryFlag: () => React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Function to get the appropriate country flag based on the selected language
  const getCountryFlag = () => {
    return language === 'en' ? 'US' : 'RU';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCountryFlag }}>
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
