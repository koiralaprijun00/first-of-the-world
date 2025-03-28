// src/components/FactCard.tsx
import React from 'react';
import { MapPin, Calendar, ThumbsUp, Bookmark, BookmarkPlus } from 'lucide-react';
import { Fact } from '../data/factsData';

interface FactCardProps {
  fact: Fact;
  isDarkMode: boolean;
  bookmarkedFacts: number[];
  toggleBookmark: (factId: number) => void;
  openFactModal: (fact: Fact) => void;
  getCategoryColor: (category: string) => string;
}

export const FactCard: React.FC<FactCardProps> = ({
  fact,
  isDarkMode,
  bookmarkedFacts,
  toggleBookmark,
  openFactModal,
  getCategoryColor
}) => {
  return (
    <div
      onClick={() => openFactModal(fact)}
      className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800`}
    >
      <div className={`h-1 w-full ${getCategoryColor(fact.category)}`}></div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {fact.country}
          </span>
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {fact.year}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2">{fact.question}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">{fact.answer}</p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-sm">{fact.likes}</span>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                openFactModal(fact);
              }}
              aria-label="View details"
            >
              Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(fact.id);
              }}
              className={`p-1.5 rounded-lg flex items-center justify-center ${
                bookmarkedFacts.includes(fact.id) 
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              } hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900 dark:hover:text-indigo-300 transition-colors`}
              aria-label={bookmarkedFacts.includes(fact.id) ? "Remove bookmark" : "Add bookmark"}
            >
              {bookmarkedFacts.includes(fact.id) ? (
                <Bookmark className="h-4 w-4" />
              ) : (
                <BookmarkPlus className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

