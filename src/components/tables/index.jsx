import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import DeleteModal from "../modal";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../redux/reducers/itemsSlice";
import { useDispatch } from "react-redux";
const Table = ({ headers, data, showEdit = false, context }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    setDeleteModalOpen(true);
  };
  const handleSelect=(item)=>{
    if (window.location.pathname === "/admin/user/foundItems") {
      navigate(`/admin/user/foundItems/itemDetails/${item._id}`);
    }
  }
  return (
    <div className="my-5">
      <table className="w-full">
        <thead>
          <tr className="border border-x-0 border-y-grey text-navy-blue">
            {headers?.map((header) => (
              <th
                key={header.key}
                className="px-6 py-4 text-left cursor-pointer"
              >
                <div>
                  <p>{header.label}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="cursor-pointer ">
          {data?.map((item, index) => (
            <tr key={item._id} className={index % 2 === 0 ? "bg-gray" : "bg-white"}>
              {
                headers.map((header) => (
                  header.key === 'action' ? (
                    <td className="py-6 px-6 flex cursor-pointer text-grey hover:text-black">
                      <AiOutlineDelete
                        size={26}
                        onClick={() => handleDeleteClick(item._id)}
                      />
                      {showEdit && (
                        <FiEdit size={24} onClick={() => navigate(`/admin/user/foundItems/editfoundItems/${item._id}`)} />
                      )}
                    </td>
                  ) : (
                    <td key={header.key} className="py-4 px-6" onClick={() => handleSelect(item)}>{item[header.key]}</td>
                  )
                ))}
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
          dispatch(deleteItem(selectedItemId));
          setDeleteModalOpen(false);
          setSelectedItemId(null);
        }}
        selectedItemId={selectedItemId}
        context={context}
      />
    </div>
  );
};

export default Table;
