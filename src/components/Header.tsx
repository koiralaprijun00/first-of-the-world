// Updated Header.tsx with proper positioning
import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  setIsDarkMode, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only run this effect on the client side
  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedMode ? JSON.parse(savedMode) : prefersDark;
    setIsDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);
  }, [setIsDarkMode]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Early return with a skeleton UI that matches your dark/light theme before client-side hydration
  if (!mounted) {
    return (
      <header className="w-full bg-white text-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-4"></div>
              <div className="flex items-center space-x-2">  
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  First of the World
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-8"></nav>
              <div className="w-9 h-9"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Main Header */}
      <header className={`w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-100/20" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/" className="flex items-center space-x-2">  
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'}`}>
                  First of the World
                </h1>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/submit-fact" className={`font-medium hover:text-indigo-600 transition-colors`}>Submit a Fact</Link>
              </nav>
              
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className={`py-20 md:py-32 px-4 ${isDarkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Discover the First of Everything
          </h2>
          <div className={`relative mx-auto max-w-3xl transition-all duration-300 transform ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for fascinating facts..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full py-6 px-8 pr-16 text-xl md:text-2xl rounded-md shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all ${
                isDarkMode ? 'bg-gray-700/90 text-white placeholder-gray-300' : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
              aria-label="Search facts"
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 transition-colors p-3 rounded-full cursor-pointer">
              <Search 
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-base">
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Popular searches:</span>
            <a href="#" className={`${isDarkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-800'} font-medium`}>First computer</a>
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
            <a href="#" className={`${isDarkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-800'} font-medium`}>First photograph</a>
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
            <a href="#" className={`${isDarkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-800'} font-medium`}>First Olympic Games</a>
          </div>
        </div>
      </div>
    </>
  );
};