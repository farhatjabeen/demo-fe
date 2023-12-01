import React, { useState } from 'react'
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

export default function FormDropdown({ editButton, selection, dropdownValues }) {
  const [options, setOptions] = useState('');

  const [select, setSelect] = useState(false);
  const handleValues = (index) => {
    setOptions(dropdownValues[index]);
    setSelect(false);
  }
  return (
    <div className="xl:w-96 sm:w-6/12 relative inline-block text-left">

      <div>
        <button
          onClick={() => setSelect(!select)}
          disabled={!editButton}
          className={`flex w-full h-12 items-center justify-between rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'} px-4 border border-solid border-[#B6B6B6]`}>
          {options || "Options"}
          {select ? <RxChevronUp className='h-6 w-6' /> : <RxChevronDown className='h-6 w-6' />}
        </button>
      </div>

      <div className={`absolute right-0 z-10 mt-2 w-full h-28 overflow-y-scroll rounded-md bg-white shadow-lg border border-solid border-[#B6B6B6] ${selection && select ? '' : 'hidden'} `}>
        <div className="py-1">
          {dropdownValues?.map((items, i) => {
            return (
              <button
                key={i}
                className="px-4 py-2 flex w-fit text-sm hover:bg-green"
                onClick={() => handleValues(i)}
              >
                {items}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
};
