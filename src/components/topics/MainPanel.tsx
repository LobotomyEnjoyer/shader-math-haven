
import React from 'react';
import { useTopics } from '@/contexts/TopicsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import MathFormula from '@/components/MathFormula';
import LatexText from '@/components/LatexText';

const MainPanel: React.FC = () => {
  const { selectedTopic } = useTopics();
  const { t } = useLanguage();

  if (!selectedTopic) return null;

  // Helper function to render content based on topic ID
  const renderTopicContent = () => {
    switch (selectedTopic.id) {
      case 'shaders':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">{t('shadersTitle')}</h2>
            <p className="mb-4">{t('shadersContent')}</p>
            
            <div className="bg-gray-100 p-4 rounded-md w-full min-w-0">
              <code>
                <pre className="whitespace-pre-wrap break-all">
                  {`// Example GLSL shader
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}`}
                </pre>
              </code>
            </div>
          </>
        );

      case 'linear-algebra':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">{t('linearAlgebraTitle')}</h2>
            <LatexText className="mb-4">
              {`${t('linearAlgebraContent')} Here's an example of inline math: $x + y = z$ and 
              another one $\\vec{v} = (x, y, z)$. You can also use display mode math:`}
            </LatexText>
            
            <div className="my-4">
              <MathFormula 
                formula="\begin{bmatrix} x' \\ y' \\ z' \end{bmatrix} = \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix} \begin{bmatrix} x \\ y \\ z \end{bmatrix}"
                displayMode={true}
              />
            </div>
          </>
        );

      case 'color-theory':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">{t('colorTheoryTitle')}</h2>
            <p className="mb-4">{t('colorTheoryContent')}</p>
            
            <div className="grid grid-cols-3 gap-4 my-4">
              <div className="bg-red-500 h-20 rounded-md flex items-center justify-center text-white">RGB</div>
              <div className="bg-yellow-500 h-20 rounded-md flex items-center justify-center text-white">HSL</div>
              <div className="bg-blue-500 h-20 rounded-md flex items-center justify-center text-white">CMYK</div>
            </div>

            <h2 className="text-2xl font-bold mb-4">{'RGB'}</h2>
            
            <p className="mb-4">RGB - это цветовая модель, представляющая собой вектор с тремя координатами (R, G, B), где R - красный, G - зеленый, B - синий. Обычно данная модель 8-битная, т.е. каждый цвет принимает значения в диапазоне [0, 255], т.е. 256 оттенков на каждый цвет. Разновидностью данной цветовой модели являются 16-битные модели и HDR (32-битные модели). Иногда RGB модель записывается в шестнадцатеричном формате (0xRRGGBB), принимающий значения в шестнадцатеричном диапазоне [0, F].</p>
            
            <p className="mb-4">RGB рассчитана на создание цвета на экране компьютера или мониторе. RGB часто используется в веб-дизайне, видеообработке и фотографий для создания ярких и насыщенных изображений. Эта модель также лежит в основе работы многих графических редакторов, таких как Photoshop или GIMP</p>
            
            <h6 className="font-bold mb-4">Преимущества модели RGB:</h6>
            <ol className="list-decimal ml-6">
              <li>Простота. Модель RGB довольно проста и наглядна в понимании и в своем представлении, данная цветовая модель из-за своей простоты используется в мониторах компьютера и цифровых дисплеях, т.к. для кодировки цвета достаточно трёх пикселей, отвечающих за разные цветовые каналы.</li>
              <li>Яркая и насыщенная цветовая гамма.</li>
            </ol>
            
            
            <h6 className="font-bold mb-4">Недостатки модели RGB:</h6>
              <ol className="list-decimal ml-6">
                <li>Недостаточность цветового охвата. Независимо от размера цветового пространства модели цвета RGB, в ней невозможно воспроизвести много воспринимаемых глазом цветов (например, спектрально чистые голубой и оранжевый). У таких цветов в формуле цвета RGB имеются отрицательные значения интенсивностей базового цвета, а реализовать не сложение, а вычитание базовых цветов при технической реализации аддитивной модели очень сложно.</li>
                <li>Качество и насыщенность цвета зависит от технических характеристик устройства, выводящего на экран изображение.</li>
              </ol>
            
            <h2 className="text-2xl font-bold mb-4">{'CMYK'}</h2>

            
            <p className = "mb-4">CMYK - Цветовая модель, расшифровывающаяся как Cyan (Голубой), Magenta (Пурпурный), Yellow (Желтый) и Key/Black (Черный). Данная цветовая модель используется в основном в полиграфии. Результат применения CMYK зависит не только от спектральных характеристик, но и от типа бумаги и от способа нанесения красок. В отличие от модели RGB, числовые значения в CMYK определяются процентным содержанием какого-либо цвета. На пример, значение (60, 10, 30, 5) будет означать 60-голубой, 10-пурпурный, 30-желтый, 5-черный. Иногда записывается в другом формате: C60M10Y30K5. В оптимизированном случае чёрная составляющая полностью компенсирует максимально равные доли цветных красителей так, что при определении любого цвета как минимум один цветной компонент равен нулю. То есть цвет (30, 45, 80, 5) оптимизируется в (0, 15, 50, 35). На изображениях ниже представлен пример такой оптимизации.</p>
            
            <figure>
            <img
            src = "src/imgs/CMYK_bef_opti.png"
            alt="CMYK"
            className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"></img>
            <figcaption>Значения CMYK до оптимизации</figcaption>
            </figure>

            <figure>
            <img
            src = "src/imgs/CMYK_bef_opti.png"
            alt="CMYK"
            className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"></img>
            <figcaption>Значения CMYK после оптимизации</figcaption>
            </figure>
              



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
    <Card className="w-full h-full bg-gray-100 rounded-lg shadow-md">
      <ScrollArea className="h-[calc(100vh-140px)] w-full">
        <CardContent className="p-6">
          <div className="prose prose-gray max-w-none">
            {renderTopicContent()}
          </div>
        </CardContent>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </Card>
  );
};

export default MainPanel;
