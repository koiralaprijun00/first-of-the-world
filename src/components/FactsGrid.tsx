// src/components/FactsGrid.tsx
import React from 'react';
import { Fact } from '../data/factsData';

interface FactsGridProps {
  facts: Fact[] | undefined; // Allow facts to be undefined
  totalFacts: number;
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
}

const FactsGrid: React.FC<FactsGridProps> = ({
  facts,
  sortOption,
  setSortOption,
  isDarkMode,
  openFactModal,
  getCategoryColor,
  setSearchQuery,
  setSelectedCategories,
  setSelectedCountries,
  setSelectedTimeperiods,
}) => {
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
            className={`border rounded-md p-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
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
              className={`p-6 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-102 hover:shadow-lg ${
                isDarkMode ? 'bg-gray-800 text-white' : ' text-gray-900'
              }`}
              onClick={() => openFactModal(fact)}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm mb-4">{fact.year}</span>
              </div>
              <h3 className="text-md mb-8">{fact.question}</h3>
              <p className="text-lg font-bold mb-2">{fact.answer}</p>
              <p className="text-sm mt-2 mb-4">{fact.description}</p>
              <span
                className={`uppercase text-xs font-semibold px-3 py-1 rounded-md ${getCategoryColor(
                  fact.category
                )} text-white`}
              >
                {fact.category}
              </span>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            {facts === undefined ? 'Loading facts...' : 'No facts available.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default FactsGrid;