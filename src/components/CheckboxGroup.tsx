// src/components/CheckboxGroup.tsx
import React from 'react';

interface CheckboxGroupProps {
  options: { id: string; label: string; count: number }[];
  selected: string[];
  onChange: (values: string[]) => void;
  name: string;
  isDarkMode: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  options, 
  selected, 
  onChange, 
  name,
  isDarkMode 
}) => {
  const handleChange = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let newSelected = [...selected];
    
    if (id === 'all') {
      if (selected.includes('all')) {
        onChange([]);
      } else {
        onChange(['all']);
      }
      return;
    }

    if (newSelected.includes('all')) {
      newSelected = newSelected.filter(val => val !== 'all');
    }

    if (newSelected.includes(id)) {
      newSelected = newSelected.filter(val => val !== id);
    } else {
      newSelected.push(id);
    }

    if (newSelected.length === 0) {
      newSelected = ['all'];
    }

    onChange(newSelected);
  };

  return (
    <div className="space-y-1.5">
      {options.map(option => (
        <label 
          key={option.id} 
          className="flex items-center group cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            name={name}
            checked={option.id === 'all' ? selected.includes('all') : selected.includes(option.id)}
            onChange={() => {}} 
            onClick={(e) => handleChange(option.id, e)}
            className="sr-only"
          />
          <span 
            className={`flex h-4 w-4 mr-2 rounded border ring-2 ring-offset-2 ${
              selected.includes(option.id) || (option.id === 'all' && selected.includes('all'))
                ? 'border-indigo-600 ring-indigo-600 bg-indigo-600' 
                : `border-gray-400 ring-transparent ${isDarkMode ? 'group-hover:border-gray-300' : 'group-hover:border-gray-500'}`
            }`}
          >
            {(selected.includes(option.id) || (option.id === 'all' && selected.includes('all'))) && (
              <svg className="h-2 w-2 m-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="flex-1 text-sm">{option.label}</span>
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            ({option.count})
          </span>
        </label>
      ))}
    </div>
  );
};