// src/components/FactsGrid.tsx
import React from 'react';
import { Fact } from '../data/factsData';

interface FactsGridProps {
  facts: Fact[] | undefined; // Allow facts to be undefined
  totalFacts: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loadingMore: boolean;
  setLoadingMore: (loading: boolean) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  isDarkMode: boolean;
  bookmarkedFacts: number[];
  toggleBookmark: (factId: number) => void;
  openFactModal: (fact: Fact) => void;
  getCategoryColor: (category: string) => string;
  setSearchQuery: (query: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedCountries: (countries: string[]) => void;
  setSelectedTimeperiods: (timeperiods: string[]) => void;
  hasMore: boolean;
}

const FactsGrid: React.FC<FactsGridProps> = ({
  facts,
  totalFacts,
  currentPage,
  setCurrentPage,
  loadingMore,
  setLoadingMore,
  sortOption,
  setSortOption,
  isDarkMode,
  bookmarkedFacts,
  toggleBookmark,
  openFactModal,
  getCategoryColor,
  setSearchQuery,
  setSelectedCategories,
  setSelectedCountries,
  setSelectedTimeperiods,
  hasMore,
}) => {
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex-1">
      {/* Sorting and Filtering Controls */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={`border rounded p-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategories(['all']);
              setSelectedCountries(['all']);
              setSelectedTimeperiods(['all']);
              setSortOption('newest');
            }}
            className="text-blue-500 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Facts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(facts) && facts.length > 0 ? (
          facts.map((fact) => (
            <div
              key={fact.id}
              className={`p-6 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
              }`}
              onClick={() => openFactModal(fact)}
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${getCategoryColor(
                    fact.category
                  )} text-white`}
                >
                  {fact.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(fact.id);
                  }}
                  className={`text-2xl ${bookmarkedFacts.includes(fact.id) ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  {bookmarkedFacts.includes(fact.id) ? '★' : '☆'}
                </button>
              </div>
              <h3 className="text-lg font-bold mb-2">{fact.question}</h3>
              <p className="text-md font-semibold">{fact.answer}</p>
              <p className="text-sm mt-2">{fact.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm">{fact.year}</span>
                <div className="flex space-x-2">
                  <span className="text-sm">❤️ {fact.likes}</span>
                  <span className="text-sm">🔖 {fact.bookmarks}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            {facts === undefined ? 'Loading facts...' : 'No facts available.'}
          </p>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && Array.isArray(facts) && facts.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className={`px-6 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } ${loadingMore ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* Total Facts */}
      <div className="mt-4 text-center">
        <p className="text-sm">
          Showing {Array.isArray(facts) ? facts.length : 0} of {totalFacts} facts
        </p>
      </div>
    </div>
  );
};

export default FactsGrid;