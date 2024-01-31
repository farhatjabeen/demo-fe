import React from "react";
import { useDispatch } from 'react-redux';
import { deleteItem } from "../../redux/reducers/itemsSlice";
import CommonModal from "../common/commonModal";

const DeleteModal = ({ isOpen, onCancel, onDelete, selectedItemId, context, currentPage }) => {
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deleteItem(selectedItemId, context, currentPage));
    onDelete();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={handleConfirmDelete}
      title="Delete an item"
      description="Do you really want to delete this record?"
      additionalContent=' This process cannot be undone.'
      confirmText="Delete"
    />
  );
};

export default DeleteModal;
