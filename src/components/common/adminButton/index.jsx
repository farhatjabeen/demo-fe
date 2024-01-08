import React from 'react';

const CustomCombinedButton = ({ text, icon, onClick, isReset, buttonColor, additionalClasses }) => {
  const blueButton = (
    <button
      className={`cursor-pointer border py-2 px-4 rounded-lg flex items-center ml-4 ${isReset ? '' : 'mr-0'} ${additionalClasses}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );

  const otherButton = (
    <button
      className={`cursor-pointer border bg-blue text-white  py-2 px-4 rounded-lg flex items-center ml-2 ${additionalClasses}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text ? text : 'Default Text'}
    </button>
  );

  const combinedButton = buttonColor === 'blue' ? blueButton : otherButton;

  return combinedButton;
};

export default CustomCombinedButton;

