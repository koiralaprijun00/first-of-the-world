// src/components/FactModal.tsx
import React from 'react';
import { X, MapPin, Calendar, Book, ThumbsUp, Share2, Bookmark } from 'lucide-react';
import { Fact } from '../data/factsData';

interface FactModalProps {
  isModalOpen: boolean;
  currentFact: Fact | null;
  closeFactModal: () => void;
  isDarkMode: boolean;
  getCategoryColor: (category: string) => string;
}

export const FactModal: React.FC<FactModalProps> = ({
  isModalOpen,
  currentFact,
  closeFactModal,
  isDarkMode,
  getCategoryColor
}) => {
  if (!isModalOpen || !currentFact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div 
        className={`relative max-w-lg w-full mx-4 p-0 rounded-lg ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-xl overflow-hidden transition-all duration-300 transform scale-100 animate-fadeIn`}
      >
        <div className={`w-full h-2 ${getCategoryColor(currentFact.category)}`}></div>
        <div className="p-6 pb-3">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold mb-2 pr-8">{currentFact.question}</h3>
            <button
              onClick={closeFactModal}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors -mt-2 -mr-2`}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              {currentFact.country}
            </span>
            <span className="flex items-center text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              {currentFact.year}
            </span>
            <span className="flex items-center text-gray-500 dark:text-gray-400">
              <Book className="h-4 w-4 mr-1" />
              {currentFact.category.charAt(0).toUpperCase() + currentFact.category.slice(1)}
            </span>
          </div>
        </div>
        <div className="px-6 py-4">
          <p className="leading-relaxed text-base">{currentFact.answer}</p>
        </div>
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
          <button 
            className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Like this fact"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{currentFact.likes}</span>
          </button>
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Share this fact"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button 
              className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Save this fact"
            >
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};