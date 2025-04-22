
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
    titleKey: 'Shaders',
    contentKey: 'shadersContent',
    imageUrl: '/lovable-uploads/66975d7e-d368-4983-8083-c804b86dffb6.png'
  },
  {
    id: 'linear-algebra',
    titleKey: 'Linear Algebra',
    contentKey: 'linearAlgebraContent'
  },
  {
    id: 'color-theory',
    titleKey: 'Color Space',
    contentKey: 'colorTheoryContent'
  }
];

// Initial related topics
const initialRelatedTopics: Record<string, RelatedTopic[]> = {
  'shaders': [
    { id: 'shader-types', titleKey: 'shaderTypes', type: 'internal' },
    { id: 'glsl', titleKey: 'glsl', type: 'external', url: 'https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)' },
    { id: 'webgl', titleKey: 'webgl', type: 'external', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API' }
  ],
  'linear-algebra': [
    { id: 'matrices', titleKey: 'matrices', type: 'internal' },
    { id: 'vectors', titleKey: 'vectors', type: 'internal' },
    { id: 'linear-transformations', titleKey: 'linearTransformations', type: 'internal' }
  ],
  'color-theory': [
    { id: 'rgb', titleKey: 'rgb', type: 'internal' },
    { id: 'hsl', titleKey: 'hsl', type: 'internal' },
    { id: 'color-spaces', titleKey: 'colorSpaces', type: 'external', url: 'https://en.wikipedia.org/wiki/Color_space' }
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
