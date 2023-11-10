import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const Table = ({ headers, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleDropdownClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
      setShowDropdown(false);
    } else {
      setSelectedRow(index);
      setShowDropdown(true);
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...data];
    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  return (
    <div className="my-5">
      <table className="w-full">
        <thead>
          <tr className="border border-x-0 border-y-grey">
          {headers.map((header) => (
            <th
              key={header.key}
              onClick={() => requestSort(header.key)}
              className="px-6 py-6 text-left cursor-pointer"
            >
              <div className="flex">
                <div>
                  <p>{header.label}</p>
                </div>
                <div>
                  <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                  <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                </div>
              </div>
            </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData().map((rowData, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray" : "bg-white"}
            >
              {headers.map((header) => (
              <td key={header.key} className="py-6 px-6">
                  {header.key === "id" ? (
                <Link to="/admin/user/itemDetails">{rowData[header.key]}</Link>
                  ):(
                    rowData[header.key]
                    )}
                </td>
              ))}
              <td className="py-6 px-6 relative">
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => handleDropdownClick(index)}
                    className="focus:outline-none"
                  >
                    <div className="w-6 h-6 flex flex-col items-center justify-between">
                      <span className="w-1 h-1 bg-grey rounded-full"></span>
                      <span className="w-1 h-1 bg-grey rounded-full"></span>
                      <span className="w-1 h-1 bg-grey rounded-full"></span>
                    </div>
                  </button>
                  {showDropdown && selectedRow === index && (
                    <div className="absolute right-8 mt-0 mb-32 bg-white rounded-lg shadow">
                      <ul>
                        <li className="py-2 px-6 cursor-pointer  hover:bg-grey">
                          Edit
                        </li>
                        <li className="py-2 px-6 cursor-pointer hover:bg-grey">
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
