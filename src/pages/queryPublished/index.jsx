import React, { useState } from 'react'
import { useParams } from 'react-router';
import { FaMap, FaCalendar, FaClock } from 'react-icons/fa';

export default function QueryPublished() {
    const newId = useParams();
    const [newProduct, setNewproduct] = useState([]);
    console.log(newProduct, 'newProduct');
    // useEffect(()=>{
    //     axios.get(`https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu/${newid.id}`)
    //     .then(res=>setNewproduct(res.data))
    // },[])
    return (
        <div>
            <div>
                <div className='flex justify-center'>
                    <div className='h-11 font-bold text-4xl'>Your query has been published!</div>
                </div>
                <div className='flex justify-center xl:my-12 sm:mt-12 px-4'>
                    <div><img src='' alt='keys' className=' bg-green xl:w-96 xl:h-72 md:w-72 md:h-60 sm:w-48 sm:h-48 rounded-[24px]'></img></div>
                    <div className='xl:h-72 xl:w-6/12 md:h-60 md:w-8/12 sm:h-48 sm:w-10/12 ml-7 rounded-[24px] border border-[#B2B2B2] bg-white'>
                        <div className='xl:p-7 md:px-5 md:pt-4 sm:pl-4'>
                            <div className='h-11 w-28 font-bold text-4xl' >{newProduct.itemname}</div>
                            <div className='m-2'>
                                <div className='w-[250px] flex'>
                                    <div className='flex items-center'>
                                        <FaMap style={{ color: "#00b8b8", height: "17px", width: "20px" }} />
                                    </div>
                                    <p className='font-semibold text-lg ml-2'>{newProduct.location}</p>
                                </div>
                                <div className='w-[250px] mt-2 flex'><div className='flex items-center'>
                                    <FaCalendar style={{ color: "#00b8b8", height: "17px", width: "20px" }} />
                                </div>
                                    <p className='font-semibold text-lg ml-2'>{newProduct.date}</p>
                                </div>
                                <div className='w-[250px] mt-2 flex'><div className='flex items-center'>
                                    <FaClock style={{ color: "#00b8b8", height: "17px", width: "20px" }} /></div>
                                    <p className='font-semibold text-lg ml-2'>{newProduct.time}</p>
                                </div>
                            </div>
                            <div className='flex justify-between xl:w-96 xl:mt-10 md:w-80 md:mt-7 sm:w-72 sm:mt-5'>
                                <div >
                                    <button className='xl:h-14 xl:w-44 md:h-12 md:w-36 sm:h-10 sm:w-32 rounded-lg bg-[#E8B810] border-none font-normal sm:text-base text-lg'>
                                        Edit Content
                                    </button>
                                </div>
                                <div >
                                    <button className='xl:h-14 xl:w-44 md:h-12 md:w-36 sm:h-10 sm:w-32 rounded-lg bg-white border border-[#E8B810] text-[#E8B810] font-normal sm:text-base text-lg'>
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
