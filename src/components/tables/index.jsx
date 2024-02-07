import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import DeleteModal from '../deleteModal'
import { useNavigate } from 'react-router-dom'
import { deleteItem } from '../../redux/reducers/itemsSlice'
import { useDispatch } from 'react-redux'

const Table = ({ headers, data, showEdit = false, context, searchTerm, category, currentPage }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDeleteClick = (id) => {
    setSelectedItemId(id)
    setDeleteModalOpen(true)
  }

  const handleSelect = (item) => {
    if (
      window.location.pathname === '/admin/user/foundItems' ||
      window.location.pathname === `/admin/user/foundItems/${searchTerm}/${category}` ||
      window.location.pathname === `/admin/user/foundItems/${searchTerm}` ||
      window.location.pathname === `/admin/user/foundItems/${category}`
    ) {
      navigate(`/admin/user/foundItems/itemDetails/${item._id}`)
    }
  }

  return (
    <div className="my-5">
      <table className="w-full">
        <thead>
          <tr className="border border-x-0 border-y-grey text-navy-blue">
            {headers?.map((header) => (
              <th key={header.key} className="px-2 py-4 text-sm text-left">
                <div>
                  <p>{header.label}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="cursor-pointer">
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id} className={index % 2 === 0 ? 'bg-gray' : 'bg-white'}>
                {headers.map((header) =>
                  header.key === 'action' ? (
                    <td
                      className={`py-6 px-6 flex cursor-pointer text-gray48 hover:text-black `}
                      key={header.key}
                    >
                      <AiOutlineDelete
                        size={26}
                        onClick={() => handleDeleteClick(item._id)}
                        className="mr-3"
                      />
                      {showEdit && (
                        <FiEdit
                          size={24}
                          onClick={() =>
                            navigate(`/admin/user/foundItems/editfoundItems/${item._id}`)
                          }
                        />
                      )}
                    </td>
                  ) : (
                    <td
                      key={header.key}
                      className={`px-2 ${showEdit ? 'cursor-pointer' : 'cursor-default'} text-sm text-gray48 
                      ${header.key === 'userCode' ? 'font-bold' : ''} 
                      ${header.key === 'itemCode' ? 'font-bold' : ''}`}
                      onClick={() => handleSelect(item)}
                    >
                      {`${header.key === 'userCode' ? '#' : ''}`}
                      {`${header.key === 'itemCode' ? '#' : ''}`}
                      {item[header.key]}
                    </td>
                  )
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center">
                <p className="font-bold p-10 flex justify-center w-full text-md">No Data Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <DeleteModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false)
          setSelectedItemId(null)
        }}
        onDelete={() => {
          dispatch(deleteItem(selectedItemId))
          setDeleteModalOpen(false)
          setSelectedItemId(null)
        }}
        selectedItemId={selectedItemId}
        context={context}
        searchTerm={searchTerm}
        category={category}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Table
