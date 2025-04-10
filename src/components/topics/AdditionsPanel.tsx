
import React from 'react';
import { useTopics } from '@/contexts/TopicsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const AdditionsPanel: React.FC = () => {
  const { selectedTopic, selectTopic, relatedTopics } = useTopics();
  const { t } = useLanguage();

  if (!selectedTopic || !relatedTopics[selectedTopic.id]) return null;

  const currentRelatedTopics = relatedTopics[selectedTopic.id];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{t('relatedTopics')}</h3>
      
      {currentRelatedTopics.map((topic, index) => (
        <Card 
          key={topic.id} 
          className="bg-cyan/30 hover:bg-cyan/40 transition-colors border-none shadow-md"
        >
          <CardContent className="p-4">
            {topic.type === 'internal' ? (
              // Internal topic - changes the MainPanel content
              <button
                onClick={() => {
                  // For demo purposes, just update the content
                  selectTopic(selectedTopic.id);
                }}
                className="w-full text-left font-medium text-blue-700 hover:text-blue-800 flex items-center justify-between"
              >
                <span>{t(topic.titleKey)}</span>
              </button>
            ) : (
              // External topic - links to external site
              <a
                href={topic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left font-medium text-blue-700 hover:text-blue-800 flex items-center justify-between"
              >
                <span>{t(topic.titleKey)}</span>
                <ExternalLink size={16} />
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdditionsPanel;
