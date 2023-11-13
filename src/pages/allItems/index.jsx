import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { HiPlus } from "react-icons/hi";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function AllItems() {
    const[tableData,setTableData] = useState([]);
    
    useEffect(()=>{
        axios.get('https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu')
        .then(res=>setTableData(res.data))
        .catch(e=>console.log(e));
    },[])
        
    return (
        <div className='px-28'>
            <div className='flex justify-end mb-5'>
                <div className=' flex justify-between w-72'>
                    <button className='h-10 w-32 bg-white rounded-lg flex justify-center items-center'><AiOutlineArrowUp className='mr-2' /> Export</button>
                    <button className=' h-10 w-36 bg-primary-color rounded-lg flex justify-center items-center'><HiPlus className='mr-2' /> Add Item</button>
                </div>
            </div>

            <div className='h-32 mb-10 p-5 flex flex-col space-y-10 rounded-lg w-full bg-primary-color'>
                <div className='text-xs font-medium text-white'>TOTAL FOUND ITEMS</div>
                <div className='text-4xl font-bold text-white'>120</div>
            </div>

            <div className='mt-10 mb-4 font-semibold text-2xl'>All Items</div>

            <div className='mb-20 md:flex md:justify-center '>
                <table className="xl:w-full md:w-full">
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
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((items,i)=>(
                            <tr key={i} className={i % 2 === 0 ? "bg-gray" : "bg-inherit"}>
                                <td className="py-6 px-6 text-[#52575C] text-sm font-semibold">#{items.id}</td>
                                <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.itemname}</td>
                                <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.description}</td>
                                <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.location}</td>
                                <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.landmark}</td>
                                <td className="py-6 px-6 text-[#52575C] text-sm font-normal">{items.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
