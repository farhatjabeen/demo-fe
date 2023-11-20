import React from 'react'
import { useState } from 'react'
import { RxChevronDown,RxChevronUp } from "react-icons/rx";

export default function FormDropdown({editButton,selectt,dropdownValues}) {
  const[options,setOptions]=useState('');
  
  const[select,setSelect]=useState(false);
  const handleValues=(index)=>{
    setOptions(dropdownValues[index]);
    setSelect(false);
  }
  return (
    <div className="xl:w-96 sm:w-6/12 relative inline-block text-left">
  <div>
    <button onClick={()=>setSelect(!select)} disabled={!editButton} class={`flex w-full h-12 items-center justify-between rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'} px-4 border border-solid border-[#B6B6B6]`}>
      {options?options:"Options"}
      {select?<RxChevronUp className='h-6 w-6' />:<RxChevronDown className='h-6 w-6' />}
    </button>
  </div>

  <div class={`absolute right-0 z-10 mt-2 w-full h-28 overflow-y-scroll rounded-md bg-white shadow-lg border border-solid border-[#B6B6B6] ${selectt&&select?'':'hidden'} `}>
    <div class="py-1">
      {dropdownValues.map((items,i)=>{
        return(
          <button key={i} class="px-4 py-2 flex w-full text-sm hover:bg-green" onClick={()=>handleValues(i)}>{items}</button>
        );
      })}
    </div>
  </div>
</div>

  )
}
