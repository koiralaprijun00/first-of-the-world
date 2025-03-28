'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FiX } from 'react-icons/fi'; // Importing the X icon from react-icons
import FactsGrid from '../components/FactsGrid';
import { FactModal } from '../components/FactModal';
import { Header } from '../components/Header';
import { FiltersSidebar as Sidebar } from '../components/FiltersSidebar';
import factsData1 from '../data/facts/facts_1.json' assert { type: 'json' };
import factsData2 from '../data/facts/facts_2.json'assert { type: 'json' };
import factsData3 from '../data/facts/facts_3.json' assert { type: 'json' };
import factsData4 from '../data/facts/facts_4.json' assert { type: 'json' };
import categoriesData from '../data/categories.json';
import countriesData from '../data/countries.json';
import timeperiodsData from '../data/timeperiods.json';
import { Fact } from '../data/factsData';

const Home: React.FC = () => {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [sortOption, setSortOption] = useState('newest');
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookmarkedFacts, setBookmarkedFacts] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['all']);
  const [selectedTimeperiods, setSelectedTimeperiods] = useState<string[]>(['all']);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedMode ? JSON.parse(savedMode) : prefersDark;
    setIsDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);

    const combinedFacts = [...factsData1, ...factsData2, ...factsData3,...factsData4] as Fact[];
    setFacts(combinedFacts);

    const savedBookmarks = localStorage.getItem('bookmarkedFacts');
    if (savedBookmarks) {
      try {
        setBookmarkedFacts(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Error parsing bookmarks:', error);
        localStorage.removeItem('bookmarkedFacts');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkedFacts', JSON.stringify(bookmarkedFacts));
  }, [bookmarkedFacts]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      document.documentElement.classList.toggle('dark', newDarkMode);
      return newDarkMode;
    });
  };

  const toggleBookmark = (factId: number) => {
    setBookmarkedFacts((prev) =>
      prev.includes(factId) ? prev.filter((id) => id !== factId) : [...prev, factId]
    );
  };

  const openFactModal = (fact: Fact) => {
    setCurrentFact(fact);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFactModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setCurrentFact(null), 200);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories(['all']);
    setSelectedCountries(['all']);
    setSelectedTimeperiods(['all']);
    setSortOption('newest');
  };

  const filteredFacts = useMemo(() => {
    let filtered = [...facts];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (fact) =>
          fact.question.toLowerCase().includes(query) ||
          fact.answer.toLowerCase().includes(query) ||
          fact.description.toLowerCase().includes(query)
      );
    }
    if (!selectedCategories.includes('all')) {
      filtered = filtered.filter((fact) => selectedCategories.includes(fact.category));
    }
    if (!selectedCountries.includes('all')) {
      filtered = filtered.filter((fact) => selectedCountries.includes(fact.country));
    }
    if (!selectedTimeperiods.includes('all')) {
      filtered = filtered.filter((fact) => selectedTimeperiods.includes(fact.timeperiod));
    }
    switch (sortOption) {
      case 'newest': return filtered.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      case 'oldest': return filtered.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
      case 'az': return filtered.sort((a, b) => a.question.localeCompare(b.question));
      case 'za': return filtered.sort((a, b) => b.question.localeCompare(a.question));
      default: return filtered;
    }
  }, [facts, searchQuery, selectedCategories, selectedCountries, selectedTimeperiods, sortOption]);

  const categoryColors = useMemo(() => ({
    sports: 'bg-red-500', space: 'bg-blue-500', architecture: 'bg-yellow-500', invention: 'bg-green-500',
    education: 'bg-purple-500', adventure: 'bg-teal-500', entertainment: 'bg-pink-500', medicine: 'bg-indigo-500',
    science: 'bg-orange-500', politics: 'bg-gray-500',
  }), []);

  const getCategoryColor = (category: string): string => {
    return categoryColors[category as keyof typeof categoryColors] || 'bg-gray-500';
  };

  if (isDarkMode === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : ' text-gray-900'}`}>
      {/* Header - Full width */}
      <div className="w-full">
        <Header 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          toggleDarkMode={toggleDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Main content area - Below header */}
      <div className="flex flex-1">
        {/* Mobile sidebar toggle - Only show on mobile */}
        <div className="md:hidden p-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ' border-gray-200 text-gray-800'
            }`}
          >
            <span className="flex items-center font-medium">
              <span className="mr-2">Filters</span>
              {(searchQuery || !selectedCategories.includes('all') || !selectedCountries.includes('all') || !selectedTimeperiods.includes('all') || sortOption !== 'newest') && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-600 text-white">
                  {[
                    searchQuery ? 1 : 0,
                    !selectedCategories.includes('all') ? selectedCategories.length : 0,
                    !selectedCountries.includes('all') ? selectedCountries.length : 0,
                    !selectedTimeperiods.includes('all') ? selectedTimeperiods.length : 0,
                    sortOption !== 'newest' ? 1 : 0
                  ].reduce((a, b) => a + b, 0)}
                </span>
              )}
            </span>
          </button>
        </div>

        {/* Mobile sidebar - Overlay when open */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 p-4" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <Sidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showFilters={true}
                setShowFilters={setIsMobileMenuOpen}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
                selectedTimeperiods={selectedTimeperiods}
                setSelectedTimeperiods={setSelectedTimeperiods}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                facts={facts}
                categories={categoriesData}
                countries={countriesData}
                timeperiods={timeperiodsData}
                resetFilters={resetFilters}
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
          </div>
        )}

        {/* Desktop Layout - Two column layout with fixed sidebar */}
        <div className="hidden md:flex max-w-[90rem] mx-auto">
          {/* Fixed sidebar for desktop */}
          <div className="w-64 h-screen sticky top-12 overflow-y-auto">
            <Sidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showFilters={true}
              setShowFilters={setIsMobileMenuOpen}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
              selectedTimeperiods={selectedTimeperiods}
              setSelectedTimeperiods={setSelectedTimeperiods}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              facts={facts}
              categories={categoriesData}
              countries={countriesData}
              timeperiods={timeperiodsData}
              resetFilters={resetFilters}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 px-8  overflow-y-auto">
            <FactsGrid
              facts={filteredFacts}
              totalFacts={filteredFacts.length}
              sortOption={sortOption}
              setSortOption={setSortOption}
              isDarkMode={isDarkMode}
              bookmarkedFacts={bookmarkedFacts}
              toggleBookmark={toggleBookmark}
              openFactModal={openFactModal}
              getCategoryColor={getCategoryColor}
              setSearchQuery={setSearchQuery}
              setSelectedCategories={setSelectedCategories}
              setSelectedCountries={setSelectedCountries}
              setSelectedTimeperiods={setSelectedTimeperiods}
            />
          </div>
        </div>

        {/* Mobile Facts Grid (when sidebar is closed) */}
        <div className="flex-1 p-4 md:hidden">
          <FactsGrid
            facts={filteredFacts}
            totalFacts={filteredFacts.length}
            sortOption={sortOption}
            setSortOption={setSortOption}
            isDarkMode={isDarkMode}
            bookmarkedFacts={bookmarkedFacts}
            toggleBookmark={toggleBookmark}
            openFactModal={openFactModal}
            getCategoryColor={getCategoryColor}
            setSearchQuery={setSearchQuery}
            setSelectedCategories={setSelectedCategories}
            setSelectedCountries={setSelectedCountries}
            setSelectedTimeperiods={setSelectedTimeperiods}
          />
        </div>
      </div>

      {/* Modal */}
      <FactModal
        isModalOpen={isModalOpen}
        currentFact={currentFact}
        closeFactModal={closeFactModal}
        isDarkMode={isDarkMode}
        getCategoryColor={getCategoryColor}
        toggleBookmark={toggleBookmark}
        isBookmarked={currentFact ? bookmarkedFacts.includes(currentFact.id) : false}
      />
    </div>
  );
};

export default Home;