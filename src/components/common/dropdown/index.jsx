import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const categories = [
  'Category 1',
  'Category 2',
  'Category 3',
];

export default function DropdownMenu({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          type="button"
          className="inline-flex justify-between rounded-md border border-gray-300 bg-white pl-4 w-full py-2 mr-2 shadow-sm text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {selectedCategory ? selectedCategory : 'Filter by category'}
          <HiOutlineChevronDown className="mr-1 ml-2 h-5 w-5" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="origin-top-right absolute  right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategorySelect(category)}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                role="menuitem"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
