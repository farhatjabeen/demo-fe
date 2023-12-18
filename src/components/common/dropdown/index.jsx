import React, { useState, useEffect } from 'react';

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
        className='w-full px-2 py-3 border rounded'
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {dropdownValues?.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
