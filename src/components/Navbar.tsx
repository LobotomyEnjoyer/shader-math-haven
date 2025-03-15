
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import CustomButton from './CustomButton';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
            <a href="#topics" className="nav-link">Topics</a>
            <a href="#support" className="nav-link">Support</a>
            <a href="#help" className="nav-link">Want to help us?</a>
          </nav>
          
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
              href="#topics" 
              className="px-4 py-2 text-lg text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Topics
            </a>
            <a 
              href="#support" 
              className="px-4 py-2 text-lg text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </a>
            <a 
              href="#help" 
              className="px-4 py-2 text-lg text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Want to help us?
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
