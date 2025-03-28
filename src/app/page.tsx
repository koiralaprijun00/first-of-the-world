'use client';

import React, { useState, useEffect, useMemo } from 'react';
import FactsGrid from '../components/FactsGrid';
import { FactModal } from '../components/FactModal';
import { Header } from '../components/Header';
import { FiltersSidebar as Sidebar } from '../components/FiltersSidebar';
import factsData1 from '../data/facts/facts_1.json';
import factsData2 from '../data/facts/facts_2.json';
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

    const combinedFacts = [...factsData1, ...factsData2] as Fact[];
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
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Full-width Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
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

      {/* Main Content Below Header */}
      <div className="flex flex-1 pt-16"> {/* pt-16 matches header height */}
        {/* Sidebar */}
        <Sidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={isMobileMenuOpen}
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
          resetFilters={() => {
            setSearchQuery('');
            setSelectedCategories(['all']);
            setSelectedCountries(['all']);
            setSelectedTimeperiods(['all']);
            setSortOption('newest');
          }}
        />

        {/* Facts Grid */}
        <div className="ml-0 md:ml-64 flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto p-4 md:p-6">
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