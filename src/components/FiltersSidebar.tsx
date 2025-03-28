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
  toggleDarkMode: () => void;
  facts?: Fact[]; // Make facts optional
  categories: string[];
  countries: string[];
  timeperiods: string[];
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
  facts = [], // Provide a default empty array
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
          {/* ... rest of the component remains the same ... */}
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
      </aside>
    </>
  );
};