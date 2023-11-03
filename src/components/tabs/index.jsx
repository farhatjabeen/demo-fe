import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className="flex  border-b border-gray-300 mx-2">
        {children.map((child, index) => (
          <div>
            <li
              key={index}
              className={`cursor-pointer p-2 relative ${
                activeTab === index ? "border-b-2 border-black" : ""
              }`}
              onClick={(e) => handleClick(e, index)}
            >
              {child.props.label}
            </li>
          </div>
        ))}
      </ul>
      <div>{children[activeTab].props.children}</div>
    </div>
  );
};

export default Tabs;
