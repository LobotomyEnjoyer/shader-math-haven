
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';

// Define the topic structure
export interface Topic {
  id: string;
  titleKey: string;
  contentKey: string;
  imageUrl?: string;
}

export interface RelatedTopic {
  id: string;
  titleKey: string;
  type: 'internal' | 'external';
  url?: string;
}

interface TopicsContextType {
  topics: Topic[];
  addTopic: (topic: Topic) => void;
  selectedTopic: Topic | null;
  selectTopic: (topicId: string) => void;
  relatedTopics: Record<string, RelatedTopic[]>;
  addRelatedTopic: (topicId: string, relatedTopic: RelatedTopic) => void;
}

const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

// Initial topics data
const initialTopics: Topic[] = [
  {
    id: 'shaders',
    titleKey: 'shaders',
    contentKey: 'shadersContent',
    imageUrl: '/lovable-uploads/66975d7e-d368-4983-8083-c804b86dffb6.png'
  },
  {
    id: 'transformation-matrices',
    titleKey: 'transformationMatrices',
    contentKey: 'transMatrContent'
  },
  {
    id: 'color-theory',
    titleKey: 'colorTheory',
    contentKey: 'colorTheoryContent'
  }
];

// Initial related topics
const initialRelatedTopics: Record<string, RelatedTopic[]> = {
  'shaders': [
    { id: 'shader-types', titleKey: 'vulkan', type: 'external', url: 'https://docs.vulkan.org/spec/latest/index.html' },
    { id: 'glsl', titleKey: 'glsl', type: 'external', url: 'https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)' },
    { id: 'webgl', titleKey: 'webgl', type: 'external', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API' }
  ],
  'transformation-matrices': [
    { id: 'matrices', titleKey: 'matrices', type: 'external', url: 'http://mathprofi.ru/deistviya_s_matricami.html' },
    { id: 'vectors', titleKey: 'vectors', type: 'external', url: 'http://mathprofi.ru/vektory_dlya_chainikov.html' },
    { id: 'linear-transformations', titleKey: 'geogebraClassic', type: 'external', url: 'https://www.geogebra.org/m/sncrqsf6' } //titleKey was "linearTransformations"
  ],
  'color-theory': [
    { id: 'rgb', titleKey: 'rgb', type: 'external', url: 'https://ru.wikipedia.org/wiki/RGB' },
    { id: 'hsv', titleKey: 'hsv', type: 'external', url: 'https://ru.wikipedia.org/wiki/HSV_(%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C)' },
    { id: 'color-spaces', titleKey: 'colorSpaces', type: 'external', url: 'https://habr.com/ru/articles/181580/' }
  ]
};

export const TopicsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(initialTopics[0]);
  const [relatedTopics, setRelatedTopics] = useState<Record<string, RelatedTopic[]>>(initialRelatedTopics);

  const addTopic = (topic: Topic) => {
    setTopics((prev) => [...prev, topic]);
  };

  const selectTopic = (topicId: string) => {
    const topic = topics.find((t) => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
    }
  };

  const addRelatedTopic = (topicId: string, relatedTopic: RelatedTopic) => {
    setRelatedTopics((prev) => ({
      ...prev,
      [topicId]: [...(prev[topicId] || []), relatedTopic]
    }));
  };

  return (
    <TopicsContext.Provider
      value={{
        topics,
        addTopic,
        selectedTopic,
        selectTopic,
        relatedTopics,
        addRelatedTopic
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
};

export const useTopics = (): TopicsContextType => {
  const context = useContext(TopicsContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicsProvider');
  }
  return context;
};
