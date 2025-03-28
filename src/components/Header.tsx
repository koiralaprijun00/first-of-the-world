// src/components/Header.tsx
import React from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  setIsDarkMode, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  return (
    <>
      <div className={`fixed inset-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className={`h-full w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-5`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-4">
            <a href="#" className="block py-2 border-b border-gray-200 hover:text-indigo-600 transition-colors">Submit a Fact</a>
            <a href="#" className="block py-2 border-b border-gray-200 hover:text-indigo-600 transition-colors">About</a>
          </nav>
          <div className="mt-8">
            <button className={`w-full py-2 px-4 rounded-md ${isDarkMode ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-medium transition-colors`}>
              Sign In / Register
            </button>
          </div>
        </div>
        <div className="h-full w-full bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
      </div>

      <header className={`sticky top-0 z-30 transition-all duration-500 ${isDarkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-900'} backdrop-blur-md shadow-lg`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100/20" 
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <a href="#" className="flex items-center space-x-3">  
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'}`}>
                  First of the World
                </h1>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button className={`hidden md:block py-2 px-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'} hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 font-medium`}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};