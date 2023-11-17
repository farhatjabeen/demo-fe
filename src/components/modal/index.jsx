import React from "react";

const DeleteModal = ({ isOpen, onCancel, onDelete }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white  p-6 rounded-xl shadow-lg z-10 text-center">
       <p className="text-red text-xl font-semibold pb-4">Are You Sure?</p>
        <p className="mb-4 pb-4">Do you really want to delete this record?This 
        <br></br>Process cannot be undone</p>
        <div className="flex justify-center pb-4">
          <button
            className="bg-grey text-white font-bold px-4 py-2 mr-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red  text-white font-bold  px-4 py-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
