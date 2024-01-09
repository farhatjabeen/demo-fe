import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'


const BusinessTab = ({ children, className }) => {
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/itemDescription') {
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, [location]);
    const [activeTab, setActiveTab] = useState(0);
    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
    };

    return (
        <div className={className}>
            <ul className="mx-2">
                {children.map((child, index) => (
                    <div>
                        <li
                            key={index}
                            className={`cursor-pointer p-2 relative font-semibold text-2xl ${activeTab === index ? "border-b-2 border-primary-color" : "text-greys text-xl"
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

export default BusinessTab;
