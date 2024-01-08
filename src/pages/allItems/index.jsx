import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { HiPlus } from "react-icons/hi";
import Pagination from '../../components/common/pagination';
import { deleteBusinessItem, fetchItems, itemDetails } from '../../redux/reducers/itemsSlice';
import DeleteModal from '../../components/deleteModal';

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
        dispatch(fetchItems(currentPage))
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                    <div className='text-xs font-medium text-white'>TOTAL FOUND ITEMS</div>
                    <div className='text-4xl font-bold text-white'>{tableData?.list?.length}</div>
                </div>

                <div className='mt-10 mb-4 font-semibold text-2xl'>All Items</div>

                <div className='w-full flex flex-col justify-center items-center mb-20 '>
                    <table className="w-full ">
                        <thead>
                            <tr >
                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div className="flex w-fit">
                                        <div>
                                            <p className='text-[#1B2E6B]  md:text-base'>Item Code</p>
                                        </div>
                                        <div>
                                            <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                                            <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                                        </div>
                                    </div>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div className="flex">
                                        <div>
                                            <p className='text-[#1B2E6B]'>Item Name</p>
                                        </div>
                                        <div>
                                            <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                                            <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                                        </div>
                                    </div>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div className="flex">
                                        <div>
                                            <p className='text-[#1B2E6B]'>Description</p>
                                        </div>
                                        <div>
                                            <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                                            <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                                        </div>
                                    </div>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div className="flex">
                                        <div>
                                            <p className='text-[#1B2E6B]'>Location</p>
                                        </div>
                                        <div>
                                            <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                                            <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                                        </div>
                                    </div>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div className="flex">
                                        <div>
                                            <p className='text-[#1B2E6B]'>Location Identifiers</p>
                                        </div>
                                        <div>
                                            <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                                            <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                                        </div>
                                    </div>
                                </th>

                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div className="flex">
                                        <div>
                                            <p className='text-[#1B2E6B]'>Listing Date</p>
                                        </div>
                                        <div>
                                            <TiArrowSortedUp size={12} className="text-grey hover:text-black" />
                                            <TiArrowSortedDown size={12} className="text-grey hover:text-black" />
                                        </div>
                                    </div>
                                </th>
                                <th className="px-6 py-6 text-left cursor-pointer">
                                    <div>
                                        <p className='text-[#1B2E6B]'>Action</p>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.list?.length && tableData.list.map((items, i) => {
                                return (
                                    <tr key={i} className={`cursor-grab ${i % 2 === 0 ? "bg-gray" : "bg-inherit"}`} onClick={() => navigate(`/businessitemdetails/${items._id}`)}>
                                        <td className="py-6 px-6 text-[#52575C] text-sm font-semibold">{items.itemCode}</td>
                                        <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.itemName}</td>
                                        <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.itemDescription}</td>
                                        <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.location}</td>
                                        <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.locationIdentifiers}</td>
                                        <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.foundDate}</td>
                                        <td className="py-6 px-6 text-[#52575C] text-sm font-normal flex">
                                            <AiOutlineDelete size={24} onClick={(e) => {
                                                handleDeleteClick(items._id)
                                                e.stopPropagation();
                                            }} className="text-gray-500 hover:text-black cursor-pointer"
                                            />
                                            <FiEdit size={24} className="text-gray-500 hover:text-black mr-4 cursor-pointer" onClick={(e) => {
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
