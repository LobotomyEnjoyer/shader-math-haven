
import React from 'react';
import { useTopics } from '@/contexts/TopicsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

const MainPanel: React.FC = () => {
  const { selectedTopic } = useTopics();
  const { t } = useLanguage();

  if (!selectedTopic) return null;

  return (
    <Card className="w-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <ScrollArea className="h-[calc(100vh-140px)]">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">{t(selectedTopic.titleKey)}</h2>
          
          <div className="prose prose-gray max-w-none">
            <p className="mb-4">{t(selectedTopic.contentKey)}</p>
            
            {/* If there's an image, display it */}
            {selectedTopic.imageUrl && (
              <div className="my-6">
                <img 
                  src={selectedTopic.imageUrl} 
                  alt={t(selectedTopic.titleKey)} 
                  className="rounded-md max-w-full h-auto"
                />
              </div>
            )}
            
            {/* Add more dummy content for demonstration purposes */}
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada neque id massa vestibulum, 
              vel feugiat nisi aliquam. Nunc finibus, ligula vel tincidunt semper, purus nulla facilisis nunc, 
              vel vestibulum mauris est non odio. 
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Mathematics Behind It</h3>
            
            <p className="mb-4">
              The power of mathematics in computer graphics is undeniable. From simple coordinate transformations 
              to complex differential equations, math provides the tools to create stunning visual effects.
            </p>
            
            <div className="my-6 p-4 bg-gray-200 rounded-md overflow-x-auto">
              <code>
                <pre>{`// Example mathematical formula in code
const getNormal = (p1, p2, p3) => {
  const v1 = subtract(p2, p1);
  const v2 = subtract(p3, p1);
  return normalize(crossProduct(v1, v2));
};`}</pre>
              </code>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default MainPanel;
