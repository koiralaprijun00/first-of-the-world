// src/app/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import FactsGrid from '../components/FactsGrid';
import { FactModal } from '../components/FactModal';
import { Header } from '../components/Header'; // Import Header component
import factsData from '../data/facts/facts_1.json';
import { FiltersSidebar as Sidebar } from '../components/FiltersSidebar';
import categoriesData from '../data/categories.json';
import countriesData from '../data/countries.json';
import timeperiodsData from '../data/timeperiods.json';
import { Fact } from '../data/factsData';

const Home: React.FC = () => {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookmarkedFacts, setBookmarkedFacts] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['all']);
  const [selectedTimeperiods, setSelectedTimeperiods] = useState<string[]>(['all']);

  const factsPerPage = 9;

  // Load bookmarked facts from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedFacts');
    if (savedBookmarks) {
      setBookmarkedFacts(JSON.parse(savedBookmarks));
    }
    setFacts(factsData as Fact[]); // Initialize facts from the JSON file
  }, []);

  // Save bookmarked facts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedFacts', JSON.stringify(bookmarkedFacts));
  }, [bookmarkedFacts]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  // Toggle bookmark
  const toggleBookmark = (factId: number) => {
    setBookmarkedFacts((prev) =>
      prev.includes(factId) ? prev.filter((id) => id !== factId) : [...prev, factId]
    );
  };

  // Open/close fact modal
  const openFactModal = (fact: Fact) => {
    setCurrentFact(fact);
    setIsModalOpen(true);
  };

  const closeFactModal = () => {
    setIsModalOpen(false);
    setCurrentFact(null);
  };

  // Filter and sort facts
  const filteredFacts = useMemo(() => {
    let filtered = [...factsData] as Fact[];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (fact) =>
          fact.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fact.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fact.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (!selectedCategories.includes('all')) {
      filtered = filtered.filter((fact) => selectedCategories.includes(fact.category));
    }

    // Country filter
    if (!selectedCountries.includes('all')) {
      filtered = filtered.filter((fact) => selectedCountries.includes(fact.country));
    }

    // Time period filter
    if (!selectedTimeperiods.includes('all')) {
      filtered = filtered.filter((fact) => selectedTimeperiods.includes(fact.timeperiod));
    }

    // Sort facts
    if (sortOption === 'newest') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortOption === 'oldest') {
      filtered.sort((a, b) => a.year - b.year);
    } else if (sortOption === 'az') {
      filtered.sort((a, b) => a.question.localeCompare(b.question));
    } else if (sortOption === 'za') {
      filtered.sort((a, b) => b.question.localeCompare(a.question));
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedCountries, selectedTimeperiods, sortOption]);

  // Paginate facts
  const paginatedFacts = useMemo(() => {
    const startIndex = (currentPage - 1) * factsPerPage;
    return filteredFacts.slice(0, startIndex + factsPerPage);
  }, [filteredFacts, currentPage]);

  const hasMore = paginatedFacts.length < filteredFacts.length;

  // Category colors
  const getCategoryColor = (category: string): string => {
    const categoryColors: { [key: string]: string } = {
      sports: 'bg-red-500',
      space: 'bg-blue-500',
      architecture: 'bg-yellow-500',
      invention: 'bg-green-500',
      education: 'bg-purple-500',
      adventure: 'bg-teal-500',
      entertainment: 'bg-pink-500',
      medicine: 'bg-indigo-500',
      science: 'bg-orange-500',
      politics: 'bg-gray-500',
    };
    return categoryColors[category.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Add Header component */}
      <Header 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <Sidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={isMobileMenuOpen}
          setShowFilters={setIsMobileMenuOpen}
          categories={categoriesData}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          countries={countriesData}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          timeperiods={timeperiodsData}
          selectedTimeperiods={selectedTimeperiods}
          setSelectedTimeperiods={setSelectedTimeperiods}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          facts={facts}
        />

        {/* Facts Grid */}
        <FactsGrid
          facts={paginatedFacts}
          totalFacts={filteredFacts.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loadingMore={loadingMore}
          setLoadingMore={setLoadingMore}
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
          hasMore={hasMore}
        />
      </div>

      {/* Fact Modal */}
      <FactModal
        isModalOpen={isModalOpen}
        currentFact={currentFact}
        closeFactModal={closeFactModal}
        isDarkMode={isDarkMode}
        getCategoryColor={getCategoryColor}
      />
    </div>
  );
};

export default Home;