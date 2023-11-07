import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const Table = () => {
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
  const tableData = [
    {
      id: 1,
      itemName: "Item A",
      location: "Location A",
      timeFound: "10:00 AM",
      foundBy: "John Doe",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      itemName: "Item B",
      location: "Location B",
      timeFound: "11:30 AM",
      foundBy: "Jane Smith",
      phoneNumber: "987-654-3210",
    },
    {
      id: 3,
      itemName: "Item C",
      location: "Location C",
      timeFound: "1:00 PM",
      foundBy: "Emily Johnson",
      phoneNumber: "555-555-5555",
    },
    {
      id: 4,
      itemName: "Item D",
      location: "Location D",
      timeFound: "2:45 PM",
      foundBy: "Mark Davis",
      phoneNumber: "789-123-4567",
    },
  ];

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...tableData];
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
            <th
              onClick={() => requestSort("id")}
              className="px-6 text-left cursor-pointer"
            >
              <div className="flex">
                <div>
                  <p>Item ID</p>
                </div>
                <div>
                  <TiArrowSortedUp size={12}className="text-grey hover:text-black" />
                  <TiArrowSortedDown size={12} className="text-grey hover:text-black"/>
                </div>
              </div>
            </th>
            <th
              onClick={() => requestSort("itemName")}
              className="px-6 py-6 text-left cursor-pointer"
            >
              <div className="flex">
                <div>
                  <p>Item Name</p>
                </div>
                <div>
                  <TiArrowSortedUp size={12}className="text-grey hover:text-black" />
                  <TiArrowSortedDown size={12} className="text-grey hover:text-black"/>
                </div>
              </div>
            </th>
            <th
              onClick={() => requestSort("location")}
              className="py-6 px-6 text-left cursor-pointer"
            >
              <div className="flex">
                <div>
                  <p>Location</p>
                </div>
                <div>
                  <TiArrowSortedUp size={12} className="text-grey hover:text-black"/>
                  <TiArrowSortedDown size={12}className="text-grey hover:text-black" />
                </div>
              </div>
            </th>
            <th
              onClick={() => requestSort("timeFound")}
              className="py-6 px-6 text-left cursor-pointer"
            >
              <div className="flex">
                <div>
                  <p>Time Found</p>
                </div>
                <div>
                  <TiArrowSortedUp size={12}className="text-grey hover:text-black" />
                  <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                </div>
              </div>
            </th>
            <th
              onClick={() => requestSort("foundBy")}
              className="py-6 px-6 text-left cursor-pointer"
            >
              <div className="flex">
                <div>
                  <p>Found By</p>
                </div>
                <div>
                  <TiArrowSortedUp size={12} className="text-grey hover:text-black"/>
                  <TiArrowSortedDown size={12} className="text-grey hover:text-black"/>
                </div>
              </div>
            </th>
            <th
              onClick={() => requestSort("phoneNumber")}
              className="py-6 px-6 text-left cursor-pointer"
            >
              <div className="flex">
                <div>
                  <p>Phone Number</p>
                </div>
                <div>
                  <TiArrowSortedUp size={12}  className="text-grey hover:text-black" />
                  <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((data, index) => (
            <tr
              key={data.id}
              className={index % 2 === 0 ? "bg-gray" : "bg-white"}
            >
              <td className="py-6 px-6">{data.id}</td>
              <td className="py-6 px-6">{data.itemName}</td>
              <td className="py-6 px-6">{data.location}</td>
              <td className="py-6 px-6">{data.timeFound}</td>
              <td className="py-6 px-6">{data.foundBy}</td>
              <td className="py-6 px-6">{data.phoneNumber}</td>
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
                    <div className="absolute right-10 mt-0 mb-32 bg-white rounded-lg shadow">
                      <ul>
                        <Link to="/admin/user/itemDetails">
                          <li className="py-2 px-6 cursor-pointer  hover:bg-grey">
                            Edit
                          </li>
                        </Link>
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
