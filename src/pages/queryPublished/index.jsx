import React, { useState } from 'react'
import { useParams } from 'react-router';
import { FaMap, FaCalendar, FaClock } from 'react-icons/fa';

export default function QueryPublished() {
    const newid = useParams();
    const [newproduct, setNewproduct] = useState([]);
    console.log(newproduct, 'newproduct');
    // useEffect(()=>{
    //     axios.get(`https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu/${newid.id}`)
    //     .then(res=>setNewproduct(res.data))
    // },[])
    return (
        <div>
            <div>
                <div className='flex justify-center'>
                    <div className='w-[553px] h-11 font-bold text-4xl'>Your query has been published!</div>
                </div>
                <div className='flex justify-center h-72 mt-10 mb-10'>
                    <div><img src='' alt='keys' className=' bg-green w-96 h-72 rounded-[24px]'></img></div>
                    <div className='h-72 w-[820px] ml-7 rounded-[24px] border border-[#B2B2B2] bg-white'>
                        <div className='p-7'>
                            <div className='h-11 w-28 font-bold text-4xl' >{newproduct.itemname}</div>
                            <div className='m-5'>
                                <div className='w-[250px] flex'><div className='flex items-center'><FaMap style={{ color: "#00b8b8", height: "17px", width: "20px" }} /> </div> <div className='font-semibold text-lg ml-2'>{newproduct.location}</div></div>
                                <div className='w-[250px] mt-2 flex'><div className='flex items-center'><FaCalendar style={{ color: "#00b8b8", height: "17px", width: "20px" }} /></div> <div className='font-semibold text-lg ml-2'>{newproduct.date}</div></div>
                                <div className='w-[250px] mt-2 flex'><div className='flex items-center'> <FaClock style={{ color: "#00b8b8", height: "17px", width: "20px" }} /></div> <div className='font-semibold text-lg ml-2'>{newproduct.time}</div> </div>
                            </div>
                            <div className='flex justify-between w-96 mt-10'>
                                <div ><button className='h-14 w-44 rounded-lg bg-[#E8B810] border-none font-normal text-lg'>Edit Content</button></div>
                                <div ><button className='h-14 w-44 rounded-lg bg-white border border-[#E8B810] text-[#E8B810] font-normal text-lg'>Contact Us</button></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
