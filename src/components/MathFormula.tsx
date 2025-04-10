
import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

const MathFormula: React.FC<MathFormulaProps> = ({ 
  formula, 
  displayMode = false, 
  className = '' 
}) => {
  // For display mode, we wrap in $$ ... $$ to make it centered and larger
  const formattedFormula = displayMode ? `$$${formula}$$` : formula;
  
  return (
    <div className={className}>
      <Latex>{formattedFormula}</Latex>
    </div>
  );
};

export default MathFormula;
