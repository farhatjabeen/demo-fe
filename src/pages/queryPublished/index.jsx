import React, { useEffect, useState } from 'react'
import { FaMap, FaCalendar, FaClock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { viewDetails, viewUserItemById } from '../../redux/reducers/itemsSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function QueryPublished() {
    const dispatch = useDispatch();
    const itemId = useParams();
    const itemDetailsFromApi = useSelector(viewDetails);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(viewUserItemById(itemId.id))
    }, [])

    const handleEditItem = (id) => {
        navigate(`/addmoredetails/${id}`)
    }

    return (
        <div>
            <div>
                <div className='flex justify-center'>
                    <div className='h-11 font-bold text-4xl'>Your query has been published!</div>
                </div>
                <div className='flex justify-center xl:my-12 sm:mt-12 px-4'>
                    <div>

                        {itemDetailsFromApi?.itemImage && itemDetailsFromApi?.itemImage[0] && (
                            <img
                                src={itemDetailsFromApi?.itemImage[0]}
                                alt='keys'
                                className='xl:w-96 xl:h-72 md:w-72 md:h-60 sm:w-48 sm:h-48 rounded-[24px]'>
                            </img>
                        )}

                    </div>
                    <div className='xl:h-72 xl:w-6/12 md:h-60 md:w-8/12 sm:h-48 sm:w-10/12 ml-7 rounded-[24px] border border-[#B2B2B2] bg-white'>
                        <div className='xl:p-7 md:px-5 md:pt-4 sm:pl-4'>
                            <div className='font-bold text-4xl pb-1' >{itemDetailsFromApi?.itemName}</div>
                            <div className='m-2'>
                                <div className='w-[250px] flex'>
                                    <div className='flex items-center'>
                                        <FaMap style={{ color: "#00b8b8", height: "17px", width: "20px" }} />
                                    </div>
                                    <p className='font-semibold text-lg ml-2'>{itemDetailsFromApi?.location}</p>
                                </div>
                                <div className='w-[250px] mt-2 flex'><div className='flex items-center'>
                                    <FaCalendar style={{ color: "#00b8b8", height: "17px", width: "20px" }} />
                                </div>
                                    <p className='font-semibold text-lg ml-2'>{itemDetailsFromApi?.foundDate}</p>
                                </div>
                                <div className='w-[250px] mt-2 flex'><div className='flex items-center'>
                                    <FaClock style={{ color: "#00b8b8", height: "17px", width: "20px" }} /></div>
                                    <p className='font-semibold text-lg ml-2'>{itemDetailsFromApi?.foundTime}</p>
                                </div>
                            </div>
                            <div className='flex justify-between xl:w-80 xl:mt-8 md:w-80 md:mt-7 sm:w-72 sm:mt-5'>
                                <div >
                                    <button 
                                    onClick={() => handleEditItem(itemId.id)}
                                    className='xl:h-14 xl:w-44 md:h-12 md:w-36 sm:h-10 sm:w-32 rounded-lg bg-primary-color border-none font-normal sm:text-base text-lg'>
                                        Edit Content
                                    </button>
                                </div>
                                <div >
                                    <button className='xl:h-14 xl:ml-3 xl:w-44 md:h-12 md:w-36 sm:h-10 sm:w-32 rounded-lg bg-white border border-primary-color text-primary-color font-normal sm:text-base text-lg'>
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
