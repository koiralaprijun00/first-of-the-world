import React from 'react';
import { SlidersHorizontal, ChevronDown, Globe, Book, Calendar, X } from 'lucide-react';
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
}) => {
  const hasActiveFilters =
    searchQuery !== '' ||
    !selectedCategories.includes('all') ||
    !selectedCountries.includes('all') ||
    !selectedTimeperiods.includes('all');

  const getActiveFiltersCount = () => {
    let count = 0;
    if (!selectedCategories.includes('all')) count += selectedCategories.length;
    if (!selectedCountries.includes('all')) count += selectedCountries.length;
    if (!selectedTimeperiods.includes('all')) count += selectedTimeperiods.length;
    if (searchQuery) count++;
    return count;
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4 px-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'
          }`}
          aria-expanded={showFilters}
          aria-controls="filters-panel"
        >
          <span className="flex items-center font-medium">
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-600 text-white">
                {getActiveFiltersCount()}
              </span>
            )}
          </span>
          <ChevronDown className={`h-5 w-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Sidebar Content */}
      <aside
        id="filters-panel"
        className={`${
          showFilters
            ? 'fixed top-16 left-0 right-0 bottom-0 z-40 bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent'
            : 'hidden md:block'
        } md:fixed md:top-16 md:left-0 md:w-64 md:h-[calc(100vh-4rem)] md:overflow-y-auto md:border-r md:border-gray-200 md:dark:border-gray-700`}
      >
        <div className={`h-full p-4 md:p-6 ${isDarkMode ? 'bg-gray-800/50 md:bg-gray-800' : 'bg-gray-50/80 md:bg-white'} md:border-0 border border-gray-200 dark:border-gray-700 rounded-lg`}>
          {/* Close Button for Mobile */}
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="space-y-4">
            <div className="relative">
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

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {showFilters && (
        <div
          className="fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </>
  );
};