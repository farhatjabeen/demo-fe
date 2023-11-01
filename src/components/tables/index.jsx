
import React from "react";

const Table = () => {
  return (
    <div className="my-10">
      <table className="w-full">
        <thead>
          <tr className=" border border-x-white border-y-gray-300 ">
            <th className="py-6 px-6 text-left">Item ID</th>
            <th className="py-6 px-6 text-left">Item Name</th>
            <th className="py-6 px-6 text-left">Location</th>
            <th className="py-6 px-6 text-left">Time Found</th>
            <th className="py-6 px-6 text-left">Found By</th>
            <th className="py-6 px-6 text-left">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-200">
            <td className="py-6 px-6">1</td>
            <td className="py-6 px-6">Item A</td>
            <td className="py-6 px-6">Location A</td>
            <td className="py-6 px-6">10:00 AM</td>
            <td className="py-6 px-6">John Doe</td>
            <td className="py-6 px-6">123-456-7890</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="py-6 px-6">2</td>
            <td className="py-6 px-6">Item B</td>
            <td className="py-6 px-6">Location B</td>
            <td className="py-6 px-6">11:30 AM</td>
            <td className="py-6 px-6">Jane Smith</td>
            <td className="py-6 px-6">987-654-3210</td>
          </tr>
          <tr className="bg-gray-200">
            <td className="py-6 px-6">3</td>
            <td className="py-6 px-6">Item C</td>
            <td className="py-6 px-6">Location C</td>
            <td className="py-6 px-6">1:00 PM</td>
            <td className="py-6 px-6">Emily Johnson</td>
            <td className="py-6 px-6">555-555-5555</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="py-6 px-6">4</td>
            <td className="py-6 px-6">Item D</td>
            <td className="py-6 px-6">Location D</td>
            <td className="py-6 px-6">2:45 PM</td>
            <td className="py-6 px-6">Mark Davis</td>
            <td className="py-6 px-6">789-123-4567</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
