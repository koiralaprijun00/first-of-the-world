// Updated FiltersSidebar.tsx with sort options and reset button
import React from 'react';
import { SlidersHorizontal, ChevronDown, Globe, Book, Calendar, X, ArrowDownAZ, ArrowUpZA, Clock } from 'lucide-react';
import { Fact } from '../data/factsData';
import { FilterAccordion } from './FilterAccordion';
import { CheckboxGroup } from './CheckboxGroup';

interface FiltersSidebarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  selectedCountries: string[];
  setSelectedCountries: (value: string[]) => void;
  selectedTimeperiods: string[];
  setSelectedTimeperiods: (value: string[]) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  facts?: Fact[];
  categories: string[];
  countries: string[];
  timeperiods: string[];
  resetFilters: () => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  selectedCategories,
  setSelectedCategories,
  selectedCountries,
  setSelectedCountries,
  selectedTimeperiods,
  setSelectedTimeperiods,
  isDarkMode,
  facts = [],
  categories,
  countries,
  timeperiods,
  resetFilters,
  sortOption,
  setSortOption,
}) => {
  const hasActiveFilters =
    searchQuery !== '' ||
    !selectedCategories.includes('all') ||
    !selectedCountries.includes('all') ||
    !selectedTimeperiods.includes('all') ||
    sortOption !== 'newest';

  const getActiveFiltersCount = () => {
    let count = 0;
    if (!selectedCategories.includes('all')) count += selectedCategories.length;
    if (!selectedCountries.includes('all')) count += selectedCountries.length;
    if (!selectedTimeperiods.includes('all')) count += selectedTimeperiods.length;
    if (searchQuery) count++;
    if (sortOption !== 'newest') count++;
    return count;
  };

  return (
    <div className={`h-full px-4 py-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white border-r-1 border-gray-300 rounded-none'} rounded-lg`}>
      {/* Close button - only for mobile */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => setShowFilters(false)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Filter Content */}
      <div className="space-y-4">
        <div className="relative md:hidden"> {/* Search bar - only for mobile */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search facts..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'
            }`}
          />
          <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <button
            onClick={resetFilters}
            className="w-full text-right text-sm mb-4 font-medium text-indigo-600"
          >
            Reset All Filters
          </button>

          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-indigo-600" />
            Sort By
          </h3>
          <div className={`w-full rounded-md border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
            <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-600">
              <button 
                className={`flex items-center justify-center py-2 text-sm transition-colors ${
                  sortOption === 'newest' || sortOption === 'oldest' 
                    ? 'text-indigo-600 font-medium' 
                    : isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
                onClick={() => setSortOption(sortOption === 'newest' ? 'oldest' : 'newest')}
              >
                <Clock className="h-3.5 w-3.5 mr-1" />
                {sortOption === 'newest' ? 'Newest' : sortOption === 'oldest' ? 'Oldest' : 'Date'}
              </button>
              <button 
                className={`flex items-center justify-center py-2 text-sm transition-colors ${
                  sortOption === 'az' || sortOption === 'za' 
                    ? 'text-indigo-600 font-medium' 
                    : isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
                onClick={() => setSortOption(sortOption === 'az' ? 'za' : 'az')}
              >
                {sortOption === 'az' ? (
                  <ArrowDownAZ className="h-3.5 w-3.5 mr-1" />
                ) : (
                  <ArrowUpZA className="h-3.5 w-3.5 mr-1" />
                )}
                {sortOption === 'az' ? 'A-Z' : sortOption === 'za' ? 'Z-A' : 'Alpha'}
              </button>
            </div>
          </div>
        </div>

       
        <FilterAccordion
          title="Category"
          icon={<Book className="h-4 w-4 text-indigo-600" />}
          defaultOpen={true}
          isDarkMode={isDarkMode}
        >
          <CheckboxGroup
            options={categories.map((category) => ({
              id: category,
              label: category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1),
              count: category === 'all' 
                ? facts.length 
                : facts.filter((f) => f.category === category).length,
            }))}
            selected={selectedCategories}
            onChange={setSelectedCategories}
            name="category"
            isDarkMode={isDarkMode}
          />
        </FilterAccordion>

        <FilterAccordion
          title="Country"
          icon={<Globe className="h-4 w-4 text-indigo-600" />}
          defaultOpen={false}
          isDarkMode={isDarkMode}
        >
          <CheckboxGroup
            options={countries.map((country) => ({
              id: country,
              label: country === 'all' ? 'All Countries' : country,
              count: country === 'all' 
                ? facts.length 
                : facts.filter((f) => f.country.split('/').map((c) => c.trim()).includes(country)).length,
            }))}
            selected={selectedCountries}
            onChange={setSelectedCountries}
            name="country"
            isDarkMode={isDarkMode}
          />
        </FilterAccordion>

        <FilterAccordion
          title="Time Period"
          icon={<Calendar className="h-4 w-4 text-indigo-600" />}
          defaultOpen={false}
          isDarkMode={isDarkMode}
        >
          <CheckboxGroup
            options={timeperiods.map((period) => ({
              id: period,
              label: period === 'all' ? 'All Time Periods' : period.charAt(0).toUpperCase() + period.slice(1),
              count: period === 'all' 
                ? facts.length 
                : facts.filter((f) => f.timeperiod === period).length,
            }))}
            selected={selectedTimeperiods}
            onChange={setSelectedTimeperiods}
            name="timeperiod"
            isDarkMode={isDarkMode}
          />
        </FilterAccordion>
      </div>
    </div>
  );
};