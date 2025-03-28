'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Fact } from '../../data/factsData';
import categoriesData from '../../data/categories.json';
import countriesData from '../../data/countries.json';
import timeperiodsData from '../../data/timeperiods.json';

// Extract dark mode logic to a custom hook for reusability
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedMode ? JSON.parse(savedMode) : prefersDark;
    setIsDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      if (prev === null) return true;
      const newDarkMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      document.documentElement.classList.toggle('dark', newDarkMode);
      return newDarkMode;
    });
  };

  return { isDarkMode, toggleDarkMode, isMounted };
};

const SubmitAFact: React.FC = () => {
  const { isDarkMode, toggleDarkMode, isMounted } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Fact>>({
    question: '',
    answer: '',
    description: '',
    category: '',
    country: '',
    year: undefined,
    timeperiod: '',
    source: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' ? (value ? Number(value) : undefined) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      // In a real application, you would send this data to your API
      console.log('Submitted Fact:', formData);
      
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        question: '',
        answer: '',
        description: '',
        category: '',
        country: '',
        year: undefined,
        timeperiod: '',
        source: '',
      });
      
      // Reset form success message after a delay
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting fact:', error);
      setSubmitStatus('error');
    }
  };

  // Show a loading state instead of null for better UX
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header 
        isDarkMode={isDarkMode || false}
        setIsDarkMode={() => {}}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        searchQuery=""
        setSearchQuery={() => {}}
      />

      <div className="container mx-auto p-4 md:p-6">
        <section className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Submit a Fascinating Fact
          </h1>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
            Share a unique fact with the world! Fill out the form below.
          </p>

          {submitStatus === 'success' ? (
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center mb-6">
              <h3 className="text-green-700 dark:text-green-400 text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-green-600 dark:text-green-300">
                Your fact has been submitted successfully. Our team will review it shortly.
              </p>
              <button 
                onClick={() => setSubmitStatus('idle')}
                className="mt-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-4 py-2 rounded-md hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
              >
                Submit Another Fact
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div>
                <label htmlFor="question" className="block text-sm font-medium mb-1">
                  Question
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={formData.question || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g., What was the first manned spacecraft?"
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="answer" className="block text-sm font-medium mb-1">
                  Answer
                </label>
                <input
                  type="text"
                  id="answer"
                  name="answer"
                  value={formData.answer || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Apollo 11"
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                  placeholder="Provide more details about this fact..."
                  rows={4}
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="" disabled>Select a category</option>
                    {categoriesData.filter(cat => cat !== 'all').map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="" disabled>Select a country</option>
                    {countriesData.filter(country => country !== 'all').map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year !== undefined ? formData.year : ''}
                    onChange={handleChange}
                    required
                    min="1"
                    max={new Date().getFullYear()}
                    placeholder="e.g., 1969"
                    className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="timeperiod" className="block text-sm font-medium mb-1">
                    Time Period
                  </label>
                  <select
                    id="timeperiod"
                    name="timeperiod"
                    value={formData.timeperiod || ''}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="" disabled>Select a time period</option>
                    {timeperiodsData.filter(period => period !== 'all').map((period) => (
                      <option key={period} value={period}>
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="source" className="block text-sm font-medium mb-1">
                  Source (optional)
                </label>
                <input
                  type="url"
                  id="source"
                  name="source"
                  value={formData.source || ''}
                  onChange={handleChange}
                  placeholder="e.g., https://example.com"
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  isDarkMode
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                } ${submitStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitStatus === 'submitting' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit Fact'}
              </button>

              {submitStatus === 'error' && (
                <p className="text-center text-red-500 dark:text-red-400 mt-4">
                  Error submitting fact. Please try again.
                </p>
              )}
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default SubmitAFact;