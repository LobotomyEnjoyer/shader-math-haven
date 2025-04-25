
import React from 'react';
import Latex from 'react-latex-next';

interface LatexTextProps {
  children: string;
  className?: string;
}

const LatexText: React.FC<LatexTextProps> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      <Latex>{children}</Latex>
    </div>
  );
};

export default LatexText;
