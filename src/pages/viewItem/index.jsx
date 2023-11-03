import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMap, FaCalendar, FaClock, FaPhoneAlt } from 'react-icons/fa';
import { HiMail } from "react-icons/hi";
import { useParams } from 'react-router';

export default function ViewItem() {
    const [currentItem, setCurrentItem] = useState([]);
    const viewItemId = useParams();
    console.log(currentItem, 'viewItemId');
    useEffect(() => {
        axios.get(`https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu/${viewItemId.id}`)
            .then(res => setCurrentItem(res.data))
    }, []);
    return (
        <div>
            <div className='flex flex-col items-center'>
                <div >
                    <div className='font-bold text-4xl'>Prove your authenticity to claim the item</div>
                </div>
                <div className='mt-10 flex items-center'>
                    <div><img src='' alt='keys' className='rounded-3xl h-72 w-96 bg-green'></img></div>
                    <div className='bg-white w-[820px] h-[295px] rounded-[24px] p-8 ml-5 border border-solid border-[#B2B2B2]'>
                        <div className='font-bold text-4xl' >{currentItem.itemname} (#{currentItem.id})</div>
                        <div className='  mt-6'>
                            <div className='w-[250px] flex'><div className='flex items-center'><FaMap style={{ color: "#00b8b8", height: "17px", width: "20px" }} /> </div> <div className='font-semibold text-lg ml-2'>{currentItem.location}</div></div>
                            <div className='w-[250px] mt-2 flex'><div className='flex items-center'><FaCalendar style={{ color: "#00b8b8", height: "17px", width: "20px" }} /></div> <div className='font-semibold text-lg ml-2'>{currentItem.date}</div></div>
                            <div className='w-[250px] mt-2 flex'><div className='flex items-center'> <FaClock style={{ color: "#00b8b8", height: "17px", width: "20px" }} /></div> <div className='font-semibold text-lg ml-2'>{currentItem.time}</div> </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='font-bold text-4xl mt-10 ml-32'>Contact iLost to claim the item</div>
            <div className='flex justify-center items-center mt-10 mb-16'>
                <div className='bg-white rounded-3xl h-48 w-96 shadow-lg flex flex-col items-center justify-center'>
                    <div className='mb-5'><FaPhoneAlt style={{height:"36px",width:"36px", color:"#E3A903"}} /></div>
                    <div className='text-[#E3A903] font-bold text-4xl mb-2'>Phone</div>
                    <div className='text-sm font-normal'>+91 12345 12323</div>
                </div>
                <div className='bg-white rounded-3xl h-48 w-96 ml-14 shadow-lg flex flex-col items-center justify-center'>
                    <div className='mb-5'><HiMail style={{height:"40px",width:"40px", color:"#E3A903"}} /></div>
                    <div className='text-[#E3A903] font-bold text-4xl mb-2'>Mail address</div>
                    <div className='text-sm font-normal'>admin@ilost.com</div>
                </div>
            </div>
        </div>
    )
}
