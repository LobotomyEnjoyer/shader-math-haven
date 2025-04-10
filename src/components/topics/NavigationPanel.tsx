
import React, { useState } from 'react';
import { useTopics } from '@/contexts/TopicsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationPanelProps {
  onAddTopic?: () => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ onAddTopic }) => {
  const { topics, selectedTopic, selectTopic } = useTopics();
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const togglePanel = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  return (
    <div 
      className={`fixed top-0 left-0 h-full bg-magenta/70 backdrop-blur-sm transition-all duration-300 ease-out ${
        isHovered ? 'w-64' : 'w-1'
      } shadow-lg z-40`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={isMobile ? togglePanel : undefined}
    >
      {/* Content tag */}
      <div 
        className={`absolute top-4 -right-8 transform -rotate-90 origin-top-left text-white text-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-1">
          <span>{t('content')}</span>
          <ChevronRight size={16} />
        </div>
        {!isHovered && !isMobile && (
          <div className="text-xs text-white/70 mt-1">
            {t('hoverToOpen')}
          </div>
        )}
      </div>

      <div className={`h-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="pt-20 px-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-xl">{t('topics')}</h2>
            {onAddTopic && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white hover:bg-white/20"
                onClick={onAddTopic}
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">{t('addTopic')}</span>
              </Button>
            )}
          </div>
          
          <Separator className="bg-white/20 mb-4" />
          
          <ScrollArea className="flex-1 pr-4">
            <nav className="space-y-1">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedTopic?.id === topic.id
                      ? 'bg-white/20 text-white font-medium'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                  onClick={() => selectTopic(topic.id)}
                >
                  {t(topic.titleKey)}
                </button>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>
      
      {/* Show a hint when collapsed */}
      <div 
        className={`absolute top-0 left-0 h-full w-1 bg-magenta transition-opacity duration-300 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default NavigationPanel;
