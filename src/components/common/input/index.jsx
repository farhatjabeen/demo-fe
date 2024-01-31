import React from 'react'

function TextInput({ type, placeholder, required }) {
  const inputClasses =
    'w-full py-4 px-3 border border-gray-300 rounded-md ' + (required ? 'required' : '')

  return <input type={type} placeholder={placeholder} className={inputClasses} />
}

export default TextInput
