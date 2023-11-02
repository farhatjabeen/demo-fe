import React, { useState } from "react";
import { Link } from "react-router-dom";

const Table = () => {
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

  return (
    <div className="my-5">
      <table className="w-full">
        <thead>
          <tr className=" border border-x-0 border-y-gray-300">
            <th className="py-6 px-6 text-left">Item ID</th>
            <th className="py-6 px-6 text-left">Item Name</th>
            <th className="py-6 px-6 text-left">Location</th>
            <th className="py-6 px-6 text-left">Time Found</th>
            <th className="py-6 px-6 text-left">Found By</th>
            <th className="py-6 px-6 text-left">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr
              key={data.id}
              className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
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
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    </div>
                  </button>
                  {showDropdown && selectedRow === index && (
                    <div className="absolute right-14 mt-0 mb-32 w-9/12 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <ul>
                        <Link to="/itemsDetails">
                          <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
                            Edit
                          </li>
                        </Link>
                        <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
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
