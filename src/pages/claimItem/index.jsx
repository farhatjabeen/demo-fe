import React, { useEffect, useState } from 'react';
import { FaMap, FaCalendar, FaClock, FaPhoneAlt } from 'react-icons/fa';
import { HiMail } from "react-icons/hi";
import { useParams } from 'react-router';
import { searchDetailsById, searchItemById } from '../../redux/reducers/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ClaimItem() {
    const dispatch = useDispatch();
    const productDetails = useSelector(searchDetailsById);
    const itemId = useParams();

    useEffect(() => {
        dispatch(searchItemById(itemId.id));
    }, []);

    // ** Temporarily not using  **
    // const handleMail = () => {
    //     try {
    //         dispatch(claimItemNow(productDetails._id));
    //     } catch (error) {
    //         console.log("submitData errors", error)
    //     }
    // }

    return (
        <div>
            <div className='flex flex-col items-center'>
                <div >
                    <div className='font-bold xl:text-4xl md:text-3xl sm:text-2xl'>Prove your authenticity to claim the item</div>
                </div>
                <div className='mt-10 px-16 w-full flex justify-center items-center'>
                    <div>
                        {productDetails?.itemImage && productDetails.itemImage[0] ? (
                            <img src={productDetails?.itemImage[0]}
                                alt='keys'
                                className='rounded-3xl xl:h-72 xl:w-96 md:h-60 md:w-64 sm:h-48 sm:w-48'>
                            </img>
                        ) : (
                            <div className='flex justify-center items-center bg-white rounded-3xl xl:h-72 xl:w-96 md:h-60 md:w-64 sm:h-48 sm:w-48 border border-solid border-white-grey'>
                                <p>No Image</p>
                            </div>
                        )
                        }
                    </div>
                    <div className='bg-white xl:w-4/5 xl:h-72 md:w-9/12 md:h-60 sm:w-11/12 sm:h-48 rounded-3xl xl:p-8 md:p-8 sm:p-6 ml-5 border border-solid border-white-grey'>
                        <div className='font-bold xl:text-4xl md:text-3xl sm:text-2xl' >{productDetails?.itemName} (Item #{productDetails?.itemCode})</div>
                        <div className='xl:mt-6 md:mt-6 sm:mt-3'>
                            <div className='w-64 flex'>
                                <div className='flex items-center'>
                                    <FaMap style={{ color: "#00b8b8", height: "17px", width: "20px" }} />
                                </div>
                                <div className='font-semibold xl:text-lg md:text-lg sm:text-base ml-2'>
                                    {productDetails?.location}
                                </div>
                            </div>

                            <div className='w-64 mt-2 flex'><div className='flex items-center'><FaCalendar style={{ color: "#00b8b8", height: "17px", width: "20px" }} /></div> <div className='font-semibold xl:text-lg md:text-lg sm:text-base ml-2'>{productDetails?.foundDate}</div></div>
                            <div className='w-64 mt-2 flex'><div className='flex items-center'> <FaClock style={{ color: "#00b8b8", height: "17px", width: "20px" }} /></div> <div className='font-semibold xl:text-lg md:text-lg sm:text-base ml-2'>{productDetails?.foundTime}</div> </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='font-bold xl:text-4xl md:text-3xl sm:text-2xl mt-10 xl:ml-36 md:ml-12 sm:ml-8'>Contact iLost to claim the item</div>
            <div className='flex justify-center items-center mt-10 mb-16'>
                <div className='bg-white rounded-3xl xl:h-48 xl:w-96 md:h-44 md:w-80 sm:h-40 sm:w-60 shadow-lg flex flex-col items-center justify-center'>
                    <div className='xl:mb-5 md:mb-5 sm:mb-4'><FaPhoneAlt className='xl:h-10 xl:w-10 md:h-9 md:w-9 sm:h-7 sm:w-7' style={{ color: "#E3A903" }} /></div>
                    <div className='text-light-red font-bold xl:text-4xl md:text-3xl mb-2'>Phone</div>
                    <div className='text-sm font-normal'>+91 12345 12323</div>
                </div>
                <div className='bg-white rounded-3xl xl:h-48 xl:w-96 md:h-44 md:w-80 sm:h-40 sm:w-60 ml-14 shadow-lg flex flex-col items-center justify-center'>
                    <div className='xl:mb-5 md:mb-5 sm:mb-4'><HiMail className='xl:h-10 xl:w-10 md:h-9 md:w-9 sm:h-8 sm:w-8 ' style={{ color: "#E3A903" }} /></div>
                    <div className='text-light-red font-bold xl:text-4xl md:text-3xl mb-2'>Mail address</div>
                    <div className='text-sm font-normal'>admin@ilost.com</div>
                </div>
            </div>
        </div>
    )
}
