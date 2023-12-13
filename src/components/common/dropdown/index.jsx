import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

export default function DropdownMenu({ categories, selectedCategory, onSelectCategory, isFilterMode ,dropdownValues}) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="inline-flex justify-between rounded-md border border-grey bg-white pl-4 w-full py-3 mr-2 text-grey shadow-sm text-sm font-medium  hover:border-grey"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {selectedCategory ? selectedCategory : isFilterMode ? 'Filter by category' : 'Select'}
          <HiOutlineChevronDown className="mr-1 ml-2 h-5 w-5 text-black" />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="origin-top-right absolute  right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {dropdownValues && dropdownValues.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategorySelect(category)}
                className="block px-4 py-2 text-sm  w-full text-left hover:bg-gray"
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
