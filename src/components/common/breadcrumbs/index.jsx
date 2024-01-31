import React from 'react'
import { Link } from 'react-router-dom'

function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm font-medium my-4">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className={`flex items-center ${item.className || ''}`}>
            {index > 0 && <span className="mx-2 text-sm">&#62;&#62;</span>}
            {item.link ? (
              <Link
                to={item.link}
                className="text-blue-500 hover:underline focus:outline-none focus:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
