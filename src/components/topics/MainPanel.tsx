
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


            <LatexText className = "mb-4">
            Матрицы преобразований работают с однородными координатами точки, т.е. с расширенными координатами, где точка имеет $(n+1)$ координату в $n$-мерном пространстве.
            </LatexText>



          

          {/* <LatexText className = "mb-4">

          </LatexText> */}

          <LatexText className = "mb-4">
          {`Например, пусть $A = (x, y) \\in \\mathbb{R}^2$ - произвольная точка на двумерной вещественной плоскости, её однородными координатами будет являться тройка координат $(x, y, t = 1)$, где $t$ - расширенная координата точки. Из проективной геометрии следует, что координата $t$ для бесконечно удалённых точек равняется $0$, в то время как у обычных точек (не бесконечно удалённых) координата $t$ равняется $1$. Отсюда следует, что матрица преобразования имеет размерность $3\\times3$ и работает сразу с тремя координатами: $x$, $y$ и $t$`}.
          </LatexText>

          <LatexText className = "mb-4">
          {`Если же точка $A = (x, y, z) \\in \\mathbb{R}^3$, то её расширенные координаты будут иметь вид: $A = (x, y, z, t = 1)$, а матрица преобразования будет размерности $4\\times4$ и работать с четырьмя координатами.`}
          </LatexText>

          <LatexText className = "mb-4">
          {`Рассмотрим следующий пример использования некоторой матрицы преобразования. Пусть $A = (a_1, a_2) \\in \\mathbb{R}^2$ - некоторая точка на вещественной двумерной плоскости,`}
          </LatexText>

          <div className="my-4">
              <MathFormula 
                formula="T = 
                \begin{bmatrix}
                x_1 & y_1 & t_1\\
                x_2 & y_2 & t_2 \\
                x_3 & y_3 & t_3\\ 
                \end{bmatrix}"
                displayMode={true}
              />
            </div>

            <LatexText className = "mb-4">
          {`T - некоторая матрица (оператор) преобразования, где все элементы матрицы из $\\mathbb{R}$. Напомним, что в матрицах преобразования каждая строчка отвечает за одну координату образа точки, в данном случае у матрицы $T$ первая строчка отвечает за $x \\in A'$, вторая строчка отвечает за $y \\in A'$, а третья строчка отвечает за проективную координату $t \\in A'$, которая так же отвечает за пропорциональность. Значения в столбцах умножаются на соответствующую координату исходной точки $A$, т.е. значения первого столбца умножаются на $x \\in A$, значения второго столбца умножаются на $y \\in A$ и значения третьего столбца умножаются на $t \\in A$. Расширим координаты точки до $A = (a_1, a_2, 1)$, т.е. до однородных координат. При преобразовании матрицей $T$, точке $A$ ставится в соответствии её образ $A' = (a_1', a_2', a_3')$, где $a_1'$, $a_2'$ и $a_3'$ - координаты точки $A'$`}.
          </LatexText>

          <p className = "mb-4">Таким образом получаем, что:</p>

          <div className="my-4">
              <MathFormula 
                formula="\begin{equation*}
    A' = T \cdot A = \begin{pmatrix}
    x_1 & y_1 & t_1\\
    x_2 & y_2 & t_2 \\
    x_3 & y_3 & t_3
    \end{pmatrix}
    \cdot 
\begin{pmatrix}
    a_1 \\
    a_2 \\
    1
\end{pmatrix}
= \begin{pmatrix}
    a_1' \\
    a_2' \\
    a_3'
\end{pmatrix}
\end{equation*}"
                displayMode={true}
              />
            </div>


            <p className = "mb-4">
            Данное равенство для простоты можно записать в виде следующей системы:
            </p>
            


            <div className="my-4">
              <MathFormula 
                formula="\begin{equation*}
    \begin{cases}
        a_1' = x_1\cdot a_1 + y_1\cdot a_2 + t_1 \\
        a_2' = x_2\cdot a_1 + y_2\cdot a_2 + t_2 \\
        a_3' = x_3\cdot a_1 + y_3\cdot a_2 + t_3
    \end{cases}
\end{equation*}"
                displayMode={true}
              />
            </div>

            <LatexText className = "mb-4">
            Отсюда мы получаем координаты для точки $A'$, подставляем их и получим:
            </LatexText>



            <div className="my-4">
              <MathFormula 
                formula="\begin{equation*}
    A' =
    \begin{pmatrix}
        a_1' \\
        a_2' \\
        a_3'
    \end{pmatrix}
    =
    \begin{pmatrix}
        x_1\cdot a_1 + y_1\cdot a_2 + t_1 \\
        x_2\cdot a_1 + y_2\cdot a_2 + t_2 \\
        x_3\cdot a_1 + y_3\cdot a_2 + t_3
    \end{pmatrix}
\end{equation*}"
                displayMode={true}
              />
            </div>


            <LatexText className = "mb-4">
            Так как до этого мы работали в однородных координатах, необходимо привести третью координату точку $A'$ к единице, для этого делим все координаты точки на $a_3' = x_3\cdot a_1 + y_3\cdot a_2 + t_3$ и получим:
            </LatexText>


            <div className="my-4">
              <MathFormula 
                formula="\begin{equation*}
    A' =
    \begin{pmatrix}
        \frac{a_1'}{a_3'} \\[6pt]
        \frac{a_2'}{a_3'} \\[6pt]
        1
    \end{pmatrix}
    =
    \begin{pmatrix}
        \frac{x_1\cdot a_1 + y_1\cdot a_2 + t_1}{x_3\cdot a_1 + y_3\cdot a_2 + t_3} \\[6pt]
        \frac{x_2\cdot a_1 + y_2\cdot a_2 + t_2}{x_3\cdot a_1 + y_3\cdot a_2 + t_3} \\[6pt]
        1
    \end{pmatrix}
\end{equation*}"
                displayMode={true}
              />
            </div>


            <LatexText className = "mb-4">
            Переводя в обычные координаты, точку $A'$ можно записать в виде:
            </LatexText>


            <div className="my-4">
              <MathFormula 
                formula="\begin{equation}
    A' = \left(\frac{x_1\cdot a_1 + y_1\cdot a_2 + t_1}{x_3\cdot a_1 + y_3\cdot a_2 + t_3},  \frac{x_2\cdot a_1 + y_2\cdot a_2 + t_2}{x_3\cdot a_1 + y_3\cdot a_2 + t_3}\right)
\end{equation}"
                displayMode={true}
              />
            </div>

            <LatexText className = "mb-4">
            Таким образом были получены координаты нового образа точки, которые зависят от координат точки $A$ и элементов матрицы преобразования $T$.
            </LatexText>






            <p className = "mb-4">
          Матрицей параллельного переноса является матрица вида:
          </p>


            <div className="my-4">
              <MathFormula 
                formula="T =
\begin{bmatrix}
    1&0&t_x\\[2pt]
    0&1&t_y\\[2pt]
    0&0&1
\end{bmatrix}"
                displayMode={true}
              />
            </div>

          <LatexText className = "mb-4">
          Данная матрица работает следующим образом:
          
          Пусть дана точка $A = (a_1,\,a_2)$, тогда образ $A' = T \cdot A$ будет задаваться следующими координатами: $A' = (a_1+t_x,\,a_2+t_y)$. Стоит отметить, что знаменатель никуда не делся, т.к. сами координаты точки $A'$ делятся на $0\cdot a_1 + 0\cdot a_2 + 1 = 1$, из-за чего знаменатель был опущен.
          </LatexText>


            <div className="my-4">
              <MathFormula 
                formula="T =
\begin{bmatrix}
    \cos{\alpha}&\mp\sin{\alpha}&0\\[2pt]
    \pm\sin{\alpha}&\cos{\alpha}&0\\[2pt]
    0&0&1
\end{bmatrix}"
                displayMode={true}
              />
            </div>



            <div className="my-4">
              <MathFormula 
                formula="T =
\begin{bmatrix}
    k_x&0&0\\[2pt]
    0&k_y&0\\[2pt]
    0&0&1
\end{bmatrix}"
                displayMode={true}
              />
            </div>


            <div className="my-4">
              <MathFormula 
                formula="T =
\begin{bmatrix}
    1&g_x&0\\[2pt]
    g_y&1&0\\[2pt]
    0&0&1
\end{bmatrix}"
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
              <div className="bg-yellow-500 h-20 rounded-md flex items-center justify-center text-white">CMYK</div>
              <div className="bg-blue-500 h-20 rounded-md flex items-center justify-center text-white">HSV</div>
            </div>

            <h2 className="text-2xl font-bold mb-4">{'RGB'}</h2>
            
            <p className="mb-4">RGB - это цветовая модель, представляющая собой вектор с тремя координатами (R, G, B), где R - красный, G - зеленый, B - синий. Обычно данная модель 8-битная, т.е. каждый цвет принимает значения в диапазоне [0, 255], т.е. 256 оттенков на каждый цвет. Разновидностью данной цветовой модели являются 16-битные модели и HDR (32-битные модели). Иногда RGB модель записывается в шестнадцатеричном формате (0xRRGGBB), принимающий значения в шестнадцатеричном диапазоне [0, F].</p>
            
            <p className="mb-4">RGB рассчитана на создание цвета на экране компьютера или мониторе. RGB часто используется в веб-дизайне, видеообработке и фотографий для создания ярких и насыщенных изображений. Эта модель также лежит в основе работы многих графических редакторов, таких как Photoshop или GIMP</p>
            
            <h6 className="font-bold mb-4">Преимущества модели RGB:</h6>
            <ol className="list-decimal ml-6 mb-4">
              <li>Простота. Модель RGB довольно проста и наглядна в понимании и в своем представлении, данная цветовая модель из-за своей простоты используется в мониторах компьютера и цифровых дисплеях, т.к. для кодировки цвета достаточно трёх пикселей, отвечающих за разные цветовые каналы.</li>
              <li>Яркая и насыщенная цветовая гамма.</li>
            </ol>
            
            <h6 className="font-bold mb-4">Недостатки модели RGB:</h6>
            
              <ol className="list-decimal mb-4 ml-6">
                <li>Недостаточность цветового охвата. Независимо от размера цветового пространства модели цвета RGB, в ней невозможно воспроизвести много воспринимаемых глазом цветов (например, спектрально чистые голубой и оранжевый). У таких цветов в формуле цвета RGB имеются отрицательные значения интенсивностей базового цвета, а реализовать не сложение, а вычитание базовых цветов при технической реализации аддитивной модели очень сложно.</li>
                <li>Качество и насыщенность цвета зависит от технических характеристик устройства, выводящего на экран изображение.</li>
              </ol>
            
            <h2 className="text-2xl font-bold mb-4">{'CMYK'}</h2>

            
            <p className = "mb-4">CMYK - Цветовая модель, расшифровывающаяся как Cyan (Голубой), Magenta (Пурпурный), Yellow (Желтый) и Key/Black (Черный). Данная цветовая модель используется в основном в полиграфии. Результат применения CMYK зависит не только от спектральных характеристик, но и от типа бумаги и от способа нанесения красок. В отличие от модели RGB, числовые значения в CMYK определяются процентным содержанием какого-либо цвета. На пример, значение (60, 10, 30, 5) будет означать 60-голубой, 10-пурпурный, 30-желтый, 5-черный. Иногда записывается в другом формате: C60M10Y30K5. В оптимизированном случае чёрная составляющая полностью компенсирует максимально равные доли цветных красителей так, что при определении любого цвета как минимум один цветной компонент равен нулю. То есть цвет (30, 45, 80, 5) оптимизируется в (0, 15, 50, 35). На изображениях ниже представлен пример такой оптимизации.</p>
            
            <figure>
            <img
            src = "src/imgs/CMYK.png"
            alt="CMYK"
            className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"></img>
            <figcaption>Графическая интерпретация CMYK</figcaption>
            </figure>


            <figure>
            <img
            src = "src/imgs/CMYK_bef_opti.png"
            alt="CMYK_bef"
            className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"></img>
            <figcaption>Значения CMYK до оптимизации</figcaption>
            </figure>


            <figure>
            <img
            src = "src/imgs/CMYK_after_opti.png"
            alt="CMYK_after"
            className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"></img>
            <figcaption>Значения CMYK после оптимизации</figcaption>
            </figure>
            
            <p className = "mb-4">Цветовую модель CMYK описать числами просто так не получится, т.к. ранее был представлен лишь процентное соотношение цвета в краске, а результат зависит от состояния печатной машины, бумаги, влажности в воздухе и т.д. Для описания модели CMYK более точными значениями применяются другие профили, такие как XYZ, LAB, ICC и другие.</p>
            
            <h6 className="font-bold mb-4">Недостатки модели CMYK:</h6>
            <ol className="list-decimal mb-4 ml-6">
              <li>Так как CMYK используется для цветной печати, то цвет изображений, цвета которых кодируются в формате RGB, может быть искажен или не таким ярким.</li>
            </ol>





            <h2 className="text-2xl font-bold mb-4">{'HSV (HSB)'}</h2>

            <LatexText className="mb-4">
              {`Цветовая модель HSB - Цветовая модель HSB (или же HSV) представляет собой набор из трёх компонент: Hue -  оттенок или тон цвета (красный, синий, зелёны), Saturation - насыщенность, Brightness (Value) - яркость цвета. Тон в данной цветовой модели в числовом формате определяется следующим образом: $0 \\leq H < 360$, либо $0 \\leq H < 100$ или $0 \\leq H < 1$; насыщенность принимает значения в диапазоне $0 \\leq S \\leq 100$ или $0 \\leq S \\leq 1$, аналогично и для яркости $B$ (или же $V$). Эта модель разработана для первых графических редакторов еще в 90-х годах. Цвет, представленный в HSB, зависит от устройства, на которое он будет выведен, так как HSB — преобразование модели RGB, которая тоже зависит от устройства. Для получения кода цвета, не зависящего от устройства, используется модель Lab.`}
            </LatexText>

            <p className = "mb-4">Это простая и понятная модель, однако ее можно использовать только для виртуальной графики. Она не совмещается с печатными устройствами, хотя и является наиболее охватывающей в сравнении с другими. Часто такую модель применяют для создания линейных (примитивных) компьютерных мультфильмов, при оформлении картинок в соцсетях и т.п.</p>
            
            <figure>
            <img
            src = "src/imgs/HSB_cylinder.jpg"
            alt="HSB_cyl"
            className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"></img>
            <figcaption>Графическая интерпретация HSV (HSB) в виде цилиндра</figcaption>
            </figure>


            <figure>
            <img
            src = "src/imgs/HSV_cone.png"
            alt="HSV_cone"
            className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"></img>
            <figcaption>Графическая интерпретация HSV (HSB) в виде конуса</figcaption>
            </figure>


            <figure>
            <img
            src = "src/imgs/Triangulo_HSV.png"
            alt="Triangulo_HSV"
            className="w-full max-w-2xl h-auto rounded-lg shadow-md my-4"></img>
            <figcaption>Цветовой круг модели HSV (HSB)</figcaption>
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
