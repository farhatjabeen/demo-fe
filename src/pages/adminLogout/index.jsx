import React from 'react'
import CommonModal from '../../components/common/commonModal'

const AdminLogout = ({openModal, setOpenModal, handleLogout}) => {
  return (
    <div>
        <CommonModal
        isOpen={openModal}
        onCancel={setOpenModal}
        title="Logout"
        description="Are you sure"
        confirmText="Logout"
        onConfirm={handleLogout}
        additionalContent="you want to logout?"
      ></CommonModal>
    </div>
  )
}
export default AdminLogout
