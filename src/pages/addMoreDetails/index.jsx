import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

export default function AddMoreDetails() {
    const [itemname,setItemname] = useState('');
    const [location,setLocation] = useState('');
    const [newreport, setNewreport] = useState({
        category: '',
        description: '',
        keywords: '',
        locationidentifier: '',
        name: '',
        mobilenumber: '',
        mail: '',
        date: '',
        time: '',
        reporterid: ''
    })

    useEffect(()=>{
        if(!itemname){
            setItemname(reportDetails.itemName);
        }
        if(!location){
            setLocation(reportDetails.location);
        }
    },[]);

    const navigate = useNavigate();
    const reportDetails = useParams();

    const handleName = () =>{
        
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewreport({ ...newreport, [name]: value });
    };
    const { dayjs } = require('dayjs');
    const handleSubmit = (e) => {

        const date = new Date();
        const formattedDate = dayjs(date).format('DD[th] MMMM YYYY');
        const formattedTime = dayjs(date).format('hh : mm A');
        e.preventDefault();
        console.log(newreport, 'newreport');
        
    };
    return (
        <div className='flex flex-col items-center'>
            <div>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16'>Add More details</div>
            </div>

            <div className='xl:w-9/12 md:w-10/12 sm:w-11/12 xl:ml-16 mb-10'>

                <div className='border-b border-b-[#949494] mb-10'>
                    <div className='flex justify-between h-12 mb-9 relative'>
                        <div>
                            <label className='font-bold text-lg'>Item Name</label>
                            <div className='font-medium text-sm'>Item Name</div>
                        </div>
                        <input className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5' type='text' name='itemname' value={itemname} onChange={(e)=>setItemname(e.target.value)} placeholder='Type Name' />

                    </div>

                    <div className='flex justify-between h-12 mb-9 relative'>
                        <div>
                            <label className='font-bold text-lg'>Item Category</label>
                            <div className='font-medium text-sm'>Item Category</div>
                        </div>
                        <input className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5' type='text' name='category' value={newreport.category} onChange={handleInputChange} placeholder='Select Category' />

                    </div>

                    <div className='flex justify-between h-12 mb-48 relative'>
                        <div>
                            <label className='font-bold text-lg'>Item Description</label>
                            <div className='font-medium text-sm'>Item Description</div>
                        </div>
                        <input className='w-2/4 h-52 sm:h-44 border border-[#B6B6B6] rounded-lg p-5' name='description' value={newreport.description} onChange={handleInputChange} id='itemdescription' type='text' placeholder='Type desc' />

                    </div>

                    <div className='flex justify-between h-12 mb-16 relative keywordbox'>
                        <div>
                            <label className='font-bold text-lg'>Keywords</label>
                            <div className='font-medium text-sm'>Keywords</div>
                        </div>
                        <input className='w-2/4 h-20 sm:h-16 border border-[#B6B6B6] rounded-lg p-5' type='text' name='keywords' value={newreport.keywords} onChange={handleInputChange} placeholder='Keywords' />

                    </div>

                    <div className='flex justify-between h-12 mb-9 relative'>
                        <div>
                            <label className='font-bold text-lg'>Upload Images</label>
                            <div className='font-medium text-sm'>Upload Images</div>
                        </div>
                        <button className='w-2/4 h-14 sm:h-12 rounded-lg bg-primary-color'>Upload Image</button>

                    </div>

                </div>

                <div className='border-b border-b-[#949494] mb-10'>
                    <div className='flex justify-between h-12 mb-9 relative location'>
                        <div>
                            <label className='font-bold text-lg'>Location</label>
                            <div className='font-medium text-sm'>Location</div>
                        </div>
                        <input className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5' type='text' name='location' value={location} onChange={(e)=>setLocation(e.target.value)} placeholder='Type Address' />

                    </div>

                    <div className='flex justify-between h-12 mb-9 relative'>
                        <div>
                            <label className='font-bold text-lg'>Location Identifiers</label>
                            <div className='font-medium text-sm'>Location Identifiers</div>
                        </div>
                        <input className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5' type='text' name='locationidentifier' value={newreport.locationidentifier} onChange={handleInputChange} placeholder='Landmarks of the location' />
                    </div>
                </div>

                <div className='flex justify-between h-12 mb-9 relative location'>
                    <div>
                        <label className='font-bold text-lg'>Your Name</label>
                        <div className='font-medium text-sm'>Your Name</div>
                    </div>
                    <input className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5' type='text' name='name' value={newreport.name} onChange={handleInputChange} placeholder='Full name' />
                </div>

                <div className='flex justify-between h-12 mb-9 relative'>
                    <div>
                        <label className='font-bold text-lg'>Your Phone Number</label>
                        <div className='font-medium text-sm'>Your Phone Number</div>
                    </div>
                    <input className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5' type='tel' name='mobilenumber' value={newreport.mobilenumber} onChange={handleInputChange} placeholder='Phone number' />
                </div>

                <div className='flex justify-between h-12 mb-9 relative'>
                    <div>
                        <label className='font-bold text-lg'>Your Mail address</label>
                        <div className='font-medium text-sm'>Your Mail address</div>
                    </div>
                    <input className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5' type='email' name='mail' value={newreport.mail} onChange={handleInputChange} placeholder='Mail address' />
                </div>
            </div>
            <div className='xl:w-7/12 md:w-2/5 sm:w-80 flex justify-between mb-10'>
                    <div><button className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-white rounded-lg text-lg cursor-grab'>Cancel</button></div>
                    <div><button className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-primary-color rounded-lg text-lg cursor-grab' onClick={handleSubmit}>Submit form</button></div>
                </div>
        </div>
    )
}