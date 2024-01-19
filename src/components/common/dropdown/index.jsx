import React, { useState, useEffect } from 'react';
import './index.css';

const DropdownMenu = ({ dropdownValues, value, onChange, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className='w-full '>
      <select
        onChange={handleChange}
        value={value}
        className='custom-arrow w-full px-2 py-3 border text-gray3 border-gray3 rounded'
      >
        <option className='text-black' value="" disabled>
          {placeholder}
        </option>
        {dropdownValues?.map((item, i) => (
          <option className='text-black' key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
