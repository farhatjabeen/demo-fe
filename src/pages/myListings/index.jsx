import React, { useEffect } from 'react'
import { FaRegMap, FaRegCalendar, FaRegClock } from 'react-icons/fa';
import keys from '../../assets/images/keys.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyListingItems, itemDetails, myListingItems } from '../../redux/reducers/itemsSlice';
import { useNavigate } from 'react-router-dom';

export default function MyListings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myReports = useSelector(itemDetails);

    useEffect(() => {
        dispatch(myListingItems())
        if (!myReports) {
            navigate('/')
        }
    }, []);

    const handleEditItem = (itemId) => {
        navigate(`/addmoredetails/${itemId}`)
    }

    const handleListingDelete = (itemId) => {
        try {
            dispatch(deleteMyListingItems({ itemId }))
            dispatch(myListingItems())
        } catch (error) {
            console.log("submitData errors", error)
        }
    }
    return (
        <div className='mb-5 flex flex-col items-center'>

            <div className='font-bold xl:text-4xl md:text-3xl sm:text-2xl'>
                My listings
            </div>

            <div className='mt-14 w-11/12 '>
                {
                    myReports?.list?.length && myReports.list.map((details, i) => {
                        return (
                            <div key={i} className='mb-5 w-full flex justify-center items-center'>
                                <div className='w-1/3'>
                                    <img
                                        src={details.itemImage[0]}
                                        alt='keys'
                                        className='rounded-3xl w-full xl:h-72 md:h-60 sm:h-56'
                                    >
                                    </img>
                                </div>
                                <div className='bg-white w-2/3 xl:h-72 md:h-60 sm:h-56 rounded-3xl xl:p-8 md:p-6 sm:p-6 ml-5 border border-solid border-[#B2B2B2]'>
                                    <div className='font-bold xl:text-4xl md:text-3xl sm:text-2xl' >{details.itemName}</div>
                                    <div className='xl:mt-6 md:mt-6 sm:mt-3'>
                                        <div className='w-64 flex'>
                                            <div className='flex items-center'>
                                                <FaRegMap style={{ color: "#00b8b8", height: "17px", width: "20px" }} />
                                            </div>
                                            <div className=' xl:text-lg md:text-lg sm:text-base ml-2'>
                                                {details?.location}
                                            </div>
                                        </div>

                                        <div className='w-64 mt-2 flex'>
                                            <div className='flex items-center'>
                                                <FaRegCalendar style={{ color: "#00b8b8", height: "17px", width: "20px" }} />
                                            </div>
                                            <div className=' xl:text-lg md:text-lg sm:text-base ml-2'>
                                                {details?.foundDate}
                                            </div>
                                        </div>
                                        <div className='w-64 mt-2 flex'>
                                            <div className='flex items-center'>
                                                <FaRegClock style={{ color: "#00b8b8", height: "17px", width: "20px" }} />
                                            </div>
                                            <div className=' xl:text-lg md:text-lg sm:text-base ml-2'>
                                                {details?.foundTime}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex mt-5'>
                                        <button
                                            onClick={() => handleEditItem(details._id)}
                                            className='bg-primary-color xl:w-44 xl:h-12 md:w-32 md:h-10 sm:w-32 sm:h-9 rounded-lg text-sm'
                                        >
                                            Edit Content
                                        </button>

                                        <button
                                            onClick={() => handleListingDelete(details._id)}
                                            className='border border-red text-[#BC0000] xl:w-44 xl:h-12 md:w-32 md:h-10 sm:w-32 sm:h-9 rounded-lg text-sm ml-2'
                                        >
                                            Remove Listing
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
