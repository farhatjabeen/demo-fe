import React, { useState } from "react";
// import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import DeleteModal from "../modal";
import { Link, useNavigate } from "react-router-dom";
import { deleteItem } from "../../redux/reducers/itemsSlice";
import { useDispatch } from "react-redux";
const Table = ({ headers, data, showEdit = false }) => {
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const requestSort = (key) => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });
  // };

  // const sortedData = () => {
  //   const sorted = [...data];
  //   if (sortConfig.key !== null) {
  //     sorted.sort((a, b) => {
  //       if (a[sortConfig.key] < b[sortConfig.key]) {
  //         return sortConfig.direction === "asc" ? -1 : 1;
  //       }
  //       if (a[sortConfig.key] > b[sortConfig.key]) {
  //         return sortConfig.direction === "asc" ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }
  //   return sorted;
  // };

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
    dispatch(deleteItem(selectedItemId));
    setDeleteModalOpen(false);
    setSelectedItemId(null);
  };
  return (
    <div className="my-5">
      <table className="w-full">
        <thead>
          <tr className="border border-x-0 border-y-grey">
            {headers?.map((header) => (
              <th
                key={header.key}
                className="px-6 py-6 text-left cursor-pointer"
              >
                <div>
                  <p>{header.label}</p>
                </div>
                {/* <div>
                      <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                      <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                    </div> */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="cursor-pointer">
          {data?.map((item) => (
            <tr key={item._id} className="bg-inherit">
              {headers.map((header) => (
                <td key={header.key} className="py-6 px-6" onClick={() => navigate('/admin/user/foundItems/itemDetails')}>{item[header.key]}</td>
              ))}
              <td className="py-6 px-6 flex cursor-pointer">
                <AiOutlineDelete
                  size={26}
                  onClick={() => handleDeleteClick(item._id)}
                />
                {showEdit && (
                  <Link to='/admin/user/foundItems/editfoundItems'>
                    <FiEdit size={24} />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <DeleteModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedItemId(null);
        }}
        onDelete={() => {
          console.log(`Deleting item with ID ${selectedItemId}`);
          setDeleteModalOpen(false);
          setSelectedItemId(null);
        }}
        selectedItemId={selectedItemId}
      />
    </div>
  );
};

export default Table;
