import React, { useState } from "react";
import { Link} from "react-router-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import DeleteModal from "../modal";

const Table = ({ headers, data, showEdit = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedItemId(null);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting item with ID ${selectedItemId}`);
    setDeleteModalOpen(false);
    setSelectedItemId(null);
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
                  {header.key !== "actions" && (
                  <div>
                    <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                    <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                  </div>
                  )}
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
                    <Link to="/admin/user/foundItems/itemDetails">{rowData[header.key]}</Link>
                  ) : header.key === "actions" ? (
                    <div className="flex cursor-pointer ">
                    <AiOutlineDelete size={26}
                      onClick={() => handleDeleteClick(rowData.id)} />
                    {showEdit && (
                      <Link to='/admin/user/foundItems/editfoundItems'>
                        <FiEdit size={24} className="ml-2 "
                        />
                      </Link>
                    )}
                  </div>
                  ):(
                    rowData[header.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        isOpen={deleteModalOpen}
        onCancel={handleCancelDelete}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default Table;
