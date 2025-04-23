
import React from 'react';
import { useTopics } from '@/contexts/TopicsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import MathFormula from '@/components/MathFormula';

const MainPanel: React.FC = () => {
  const { selectedTopic } = useTopics();
  const { t } = useLanguage();

  if (!selectedTopic) return null;

  // Helper function to render content based on topic ID
  const renderTopicContent = () => {
    switch (selectedTopic.id) {
      /* Content for shaders */
      case 'shaders':
        return (
          <>
            {/* Example of how to include a local image:
            import shaderImage from '@/imgs/shader-example.png';
            <img 
              src={shaderImage} 
              alt="Shader Example"
              className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"
            /> 
            */}
            
            {/* Example of how to include a URL-based image:
            <img 
              src="https://images.unsplash.com/photo-example"
              alt="Shader visualization"
              className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"
              style={{ objectFit: 'cover' }}
            /> 
            */}
            
            <h2 className="text-2xl font-bold mb-4">{t('shadersTitle')}</h2>
            <p className="mb-4">{t('shadersContent')}</p>
            
            {/* Add shader-specific content here */}
            <div className="bg-gray-100 p-4 rounded-md">
              <code>
                <pre>{`// Example GLSL shader
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}`}</pre>
              </code>
            </div>
          </>
        );


        /* Content for linear-algebra */
      case 'linear-algebra':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">{t('linearAlgebraTitle')}</h2>
            <p className="mb-4">{t('linearAlgebraContent')}</p>
            
            {/* Example of mathematics formula */}
            <div className="my-4">
              <MathFormula 
                formula="\begin{bmatrix} x' \\ y' \\ z' \end{bmatrix} = \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix} \begin{bmatrix} x \\ y \\ z \end{bmatrix}"
                displayMode={true}
              />
            </div>
          </>
        );
        


        /* Content for color-theory */
      case 'color-theory':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">{t('colorTheoryTitle')}</h2>
            <p className="mb-4">{t('colorTheoryContent')}</p>
            
            {/* Add color theory specific content */}
            <div className="grid grid-cols-3 gap-4 my-4">
              <div className="bg-red-500 h-20 rounded-md flex items-center justify-center text-white">RGB</div>
              <div className="bg-yellow-500 h-20 rounded-md flex items-center justify-center text-white">HSL</div>
              <div className="bg-blue-500 h-20 rounded-md flex items-center justify-center text-white">CMYK</div>
            </div>
          </>
        );
        
      default:
        return (
          <div className="text-center text-gray-500">
            <p>Select a topic from the navigation panel</p>
          </div>
        );
    }
  };

  return (
    <Card className="w-full bg-gray-100 rounded-lg shadow-md overflow-auto">
      <ScrollArea className="h-[calc(100vh-140px)]">
        <CardContent className="p-6">
          <div className="prose prose-gray max-w-none">
            {renderTopicContent()}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default MainPanel;
