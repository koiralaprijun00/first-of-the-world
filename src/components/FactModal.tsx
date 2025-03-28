import React from 'react';
import { X, MapPin, Calendar, Book, ThumbsUp, Share2, Bookmark } from 'lucide-react';
import { Fact } from '../data/factsData';

interface FactModalProps {
  isModalOpen: boolean;
  currentFact: Fact | null;
  closeFactModal: () => void;
  isDarkMode: boolean;
  getCategoryColor: (category: string) => string;
  isBookmarked: boolean;
  toggleBookmark: (factId: number) => void;
}

export const FactModal: React.FC<FactModalProps> = ({
  isModalOpen,
  currentFact,
  closeFactModal,
  isDarkMode,
  getCategoryColor,
  isBookmarked,
  toggleBookmark
}) => {
  if (!isModalOpen || !currentFact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div
        className={`relative max-w-4xl w-full mx-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-xl overflow-hidden transition-all duration-300 transform scale-100 animate-fadeIn`}
      >
        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left column - Header and metadata */}
          <div className="md:w-1/3 md:border-r md:border-gray-200 dark:md:border-gray-700">
            <div className={`w-full h-2 ${getCategoryColor(currentFact.category)}`}></div>  
            <div className="p-6">
              
              <div className="flex flex-col space-y-3 text-sm">
                <span className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {currentFact.country}
                </span>
                <span className="flex items-center text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  {currentFact.year}
                </span>
                <span className="flex items-center text-gray-500 dark:text-gray-400">
                  <Book className="h-4 w-4 mr-2" />
                  {currentFact.category.charAt(0).toUpperCase() + currentFact.category.slice(1)}
                </span>
              </div>
              
              {/* Action buttons on small screens */}
              <div className="flex md:hidden justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Like this fact"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{currentFact.likes}</span>
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Share this fact"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleBookmark(currentFact.id)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label={isBookmarked ? "Remove bookmark" : "Save this fact"}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right column - Content */}
          <div className="md:w-2/3">
            <div className="p-6">
              <div className="mb-6">
              <div className="flex justify-between items-start">
              <h3 className="text-lg pr-8">{currentFact.question}</h3>
                <button
                  onClick={closeFactModal}
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors -mt-2 -mr-2`}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
                <p className="leading-relaxed text-2xl font-bold">{currentFact.answer}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">More Information</h4>
                <p className="leading-relaxed text-base">{currentFact.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};