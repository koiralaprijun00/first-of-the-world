// src/components/FilterAccordion.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterAccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isDarkMode: boolean;
}

export const FilterAccordion: React.FC<FilterAccordionProps> = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false, 
  isDarkMode 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
      <button
        className="w-full flex items-center justify-between py-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="flex items-center font-medium">
          {icon}
          <span className="ml-2">{title}</span>
        </span>
        <ChevronDown 
          className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="mt-2 ml-6 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};