// src/components/FiltersSidebar.tsx
import React from 'react';
import { Search, SlidersHorizontal, ChevronDown, Globe, Book, Calendar, X } from 'lucide-react';
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
  facts: Fact[];
  categories: string[]; // Add missing prop
  countries: string[];  // Add missing prop
  timeperiods: string[]; // Add missing prop
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
  facts,
  categories,
  countries,
  timeperiods,
}) => {
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories(['all']);
    setSelectedCountries(['all']);
    setSelectedTimeperiods(['all']);
  };

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
      <div className="md:hidden mb-4">
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

      <aside
        id="filters-panel"
        className={`w-full md:w-1/4 md:pr-6 mb-6 md:mb-0 ${showFilters ? 'block' : 'hidden md:block'}`}
      >
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50/80 border-gray-200'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className={`text-sm px-3 py-1 rounded-lg ${
                  isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'
                } transition-colors`}
                aria-label="Clear all filters"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for historical firsts..."
              className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500/50' : 'bg-white border-gray-200 text-gray-800 focus:ring-indigo-400'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search historical firsts"
            />
            <Search className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4.5 w-4.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3.5 top-1/2 transform -translate-y-1/2 rounded-full p-0.5 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                aria-label="Clear search"
              >
                <X className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {!selectedCategories.includes('all') &&
                  selectedCategories.map((category) => (
                    <span
                      key={category}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode ? 'bg-indigo-900/70 text-indigo-100' : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {category}
                      <button
                        onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                        aria-label={`Remove ${category} filter`}
                        className="ml-1 p-0.5 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                {!selectedCountries.includes('all') &&
                  selectedCountries.map((country) => (
                    <span
                      key={country}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode ? 'bg-purple-900/70 text-purple-100' : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {country}
                      <button
                        onClick={() => setSelectedCountries(selectedCountries.filter((c) => c !== country))}
                        aria-label={`Remove ${country} filter`}
                        className="ml-1 p-0.5 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                {!selectedTimeperiods.includes('all') &&
                  selectedTimeperiods.map((period) => (
                    <span
                      key={period}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode ? 'bg-blue-900/70 text-blue-100' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {period}
                      <button
                        onClick={() => setSelectedTimeperiods(selectedTimeperiods.filter((p) => p !== period))}
                        aria-label={`Remove ${period} filter`}
                        className="ml-1 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
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
                  count: facts.filter((f) => category === 'all' || f.category === category).length,
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
                  count: facts.filter((f) => country === 'all' || f.country.split('/').map((c) => c.trim()).includes(country)).length,
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
                  count: facts.filter((f) => period === 'all' || f.timeperiod === period).length,
                }))}
                selected={selectedTimeperiods}
                onChange={setSelectedTimeperiods}
                name="timeperiod"
                isDarkMode={isDarkMode}
              />
            </FilterAccordion>
          </div>
        </div>
      </aside>
    </>
  );
};