
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import CustomButton from './CustomButton';
import { Menu, X, FlagTriangleRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t, getCountryFlag } = useLanguage();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a href="#about" className="nav-link">{t('aboutUs')}</a>
            <a href="#support" className="nav-link">{t('support')}</a>
            <a href="#help" className="nav-link">{t('wantToHelp')}</a>
          </nav>
          
          {/* Language Selector */}
          <button 
            onClick={toggleLanguage}
            className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-md transition-colors",
              isScrolled ? "bg-secondary/50 hover:bg-secondary" : "bg-white/20 hover:bg-white/30"
            )}
            aria-label={`Change language to ${language === 'en' ? 'Russian' : 'English'}`}
          >
            <FlagTriangleRight size={18} className={language === 'en' ? 'text-blue-600' : 'text-red-600'} />
            <span className="font-medium">{getCountryFlag()}</span>
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#about" 
              className="px-4 py-2 text-lg text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('aboutUs')}
            </a>
            <a 
              href="#support" 
              className="px-4 py-2 text-lg text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('support')}
            </a>
            <a 
              href="#help" 
              className="px-4 py-2 text-lg text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('wantToHelp')}
            </a>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 text-lg text-foreground hover:bg-secondary rounded-md"
            >
              <FlagTriangleRight size={18} className={language === 'en' ? 'text-blue-600' : 'text-red-600'} />
              <span className="font-medium">{language === 'en' ? 'English (US)' : 'Русский (RU)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
