// Simplified FactsGrid.tsx (removed sort controls since they're now in sidebar)
import React from 'react';
import { Fact } from '../data/factsData';

interface FactsGridProps {
  facts: Fact[] | undefined; 
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
  totalFacts,
  isDarkMode,
  openFactModal,
  getCategoryColor,
}) => {
  return (
    <div className="flex-1">
      {/* Results Count */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {totalFacts} {totalFacts === 1 ? 'Fact' : 'Facts'} Found
        </h2>
      </div>

      {/* Facts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(facts) && facts.length > 0 ? (
          facts.map((fact) => (
            <div
              key={fact.id}
              className={`p-6 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-102 hover:shadow-lg ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
              onClick={() => openFactModal(fact)}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm mb-4">{fact.year}</span>
              </div>
              <h3 className="text-md mb-8">{fact.question}</h3>
              <p className="text-lg font-bold mb-2">{fact.answer}</p>
              <p className="text-sm mt-2 mb-4 line-clamp-2">{fact.description}</p>
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
          <div className="col-span-3 text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {facts === undefined ? 'Loading facts...' : 'No facts match your current filters.'}
            </p>
            {facts && facts.length === 0 && (
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Try adjusting your filters to see more results.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FactsGrid;