import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={() => handleClick('home')}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Emaar_logo.svg" 
                     alt="EMAAR" 
                     className="h-7" 
                />
<span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 block mt-5px">
    VisualAI
</span>

              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {currentPage === 'home' ? (
                <>
                  <a href="#features" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
                  <a href="#models" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Models</a>
                  <a href="#implementation" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Implementation</a>
                  <a href="#use-cases" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Use Cases</a>
                </>
              ) : (
                <button
                  onClick={() => handleClick('home')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Home
                </button>
              )}
              <button 
                onClick={() => handleClick('generate')}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentPage === 'home' ? (
              <>
                <a
                  href="#features"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#models"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsOpen(false)}
                >
                  Models
                </a>
                <a
                  href="#implementation"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsOpen(false)}
                >
                  Implementation
                </a>
                <a
                  href="#use-cases"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsOpen(false)}
                >
                  Use Cases
                </a>
              </>
            ) : (
              <button
                onClick={() => handleClick('home')}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                Home
              </button>
            )}
            <button 
              onClick={() => handleClick('generate')}
              className="w-full mt-4 px-4 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;