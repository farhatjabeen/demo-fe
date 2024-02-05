import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Tabs = ({ children, className }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)


  const tabs = React.Children.map(children, (child) => ({
    label: child.props.label,
    route: child.props.route,
  }))

  useEffect(() => {
    const activeTab = tabs.findIndex((tab) => `${location.pathname}?page=1`.includes(tab.route))
    setActiveTab(activeTab ? activeTab : 0)
  }, [location.pathname, tabs])

  const handleClick = (e, newActiveTab, route) => {
    e.preventDefault()
    setActiveTab(newActiveTab)
    navigate(route)
  }

  return (
    <div className={className}>
      <ul className="flex  border-b border-gray6 mx-2">
        {tabs.map((tab, index) => (
          <div key={index}>
            <li
              className={`cursor-pointer p-2 relative ${
                activeTab === index ? 'border-b-2 border-black' : ''
              }`}
              onClick={(e) => handleClick(e, index, tab.route)}
            >
              {tab.label}
            </li>
          </div>
        ))}
      </ul>
      <div>{children[activeTab].props.children}</div>
    </div>
  )
}

export default Tabs
