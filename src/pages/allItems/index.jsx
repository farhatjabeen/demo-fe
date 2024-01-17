import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import Pagination from '../../components/common/pagination';
import { deleteBusinessItem, fetchItems, itemDetails } from '../../redux/reducers/itemsSlice';
import DeleteModal from '../../components/deleteModal';
import { goToTop } from '../../utils/helper';

export default function AllItems() {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tableData = useSelector(itemDetails);
    const handleDeleteClick = (id) => {
        setSelectedItemId(id);
        setDeleteModalOpen(true);
    };
    useEffect(() => {
        goToTop (); 
        dispatch(fetchItems(currentPage))
    }, [currentPage]);
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const itemsDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 10) {
            return words.slice(0, 10).join(' ') + '...';
        }
        return description;
    };
    return (
        <>
            <div className='px-28'>
                <div className='flex justify-end mb-5'>
                    <div className=' flex justify-end w-full'>
                        <button className='cursor-pointer h-10 w-36 bg-primary-color rounded-lg flex justify-center items-center' onClick={() => navigate('/addMoreDetails')}><HiPlus className='mr-2' /> Add Item</button>
                    </div>
                </div>

                <div className='h-32 mb-10 p-5 flex flex-col space-y-10 rounded-lg w-full bg-gradient-to-r from-dark-yellow to-yellow'>
                    <div className='text-base font-medium text-white'>TOTAL FOUND ITEMS</div>
                    <div className='text-4xl font-bold text-white'>{tableData?.list?.length}</div>
                </div>

                <div className='mt-10 mb-4 font-semibold text-2xl'>All Items</div>

                <div className='w-full flex flex-col justify-center items-center mb-20 '>
                    <table className="w-full ">
                        <thead>
                            <tr >
                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div className=" w-fit">
                                        <p className='text-navy-blue  md:text-base'>Item Code</p>
                                    </div>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div>
                                        <p className='text-navy-blue'>Item Name</p>
                                    </div>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div>
                                        <p className='text-navy-blue'>Description</p>
                                    </div>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <p className='text-navy-blue'>Location</p>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <p className='text-navy-blue'>Location Identifiers</p>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <p className='text-navy-blue'>Listing Date</p>
                                </th>
                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <p className='text-navy-blue'>Action</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.list?.length && tableData.list.map((items, i) => {
                                return (
                                    <tr key={i} className={`cursor-pointer ${i % 2 === 0 ? "bg-gray12 bg-opacity-30" : "bg-inherit"}`} onClick={() => navigate(`/businessitemdetails/${items._id}`)}>
                                        <td className="py-6 px-6 text-gray48 text-sm font-semibold">{items.itemCode}</td>
                                        <td className="py-6 px-6 text-gray48 text-sm font-normal">{items.itemName}</td>
                                        <td className="py-6 px-6 text-gray48 text-sm font-normal">
                                            {itemsDescription(items.itemDescription)}
                                        </td>
                                        <td className="py-6 px-6 text-gray48 text-sm font-normal">{items.location}</td>
                                        <td className="py-6 px-6 text-gray48 text-sm font-normal">{items.locationIdentifiers}</td>
                                        <td className="py-6 px-6 text-gray48 text-sm font-normal">{items.foundDate}</td>
                                        <td className="py-6 px-6 text-gray48 text-sm font-normal flex">
                                            <AiOutlineDelete size={24} onClick={(e) => {
                                                handleDeleteClick(items._id)
                                                e.stopPropagation();
                                            }} className="text-gray-500 hover:text-black cursor-pointer"
                                            />
                                            <FiEdit size={24} className="text-gray-500 hover:text-black ml-1 cursor-pointer" onClick={(e) => {
                                                navigate(`/editdetails/${items._id}`)
                                                e.stopPropagation();
                                            }} />
                                        </td>
                                    </tr>
                                );
                            })}
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
                            dispatch(deleteBusinessItem(selectedItemId));
                            setDeleteModalOpen(false);
                            setSelectedItemId(null);
                        }}
                        selectedItemId={selectedItemId}
                    />
                </div>
            </div>
            <div className=' flex justify-center mb-20'>
                <Pagination
                    currentPage={tableData?.pageMeta?.page}
                    totalPages={tableData?.pageMeta?.totalPages}
                    onPageChange={handlePageChange}
                    isBlueBackground={false} />
            </div>
        </>
    )
}
