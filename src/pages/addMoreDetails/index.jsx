import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function AddMoreDetails() {
    const [newreport, setNewreport] = useState({
        itemname: '',
        category: '',
        description: '',
        keywords: '',
        location: '',
        locationidentifier: '',
        name: '',
        mobilenumber: '',
        mail: '',
        date: '',
        time: '',
        reporterid: ''
    })
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewreport({ ...newreport, [name]: value });
    };
    const { dayjs } = require('dayjs');
    const handleSubmit = (e) => {

        const date = new Date();
        const formattedDate = dayjs(date).format('DD[th] MMMM YYYY');
        const formattedTime = dayjs(date).format('hh : mm A');
        const curruserid = localStorage.getItem("currentuserid");
        e.preventDefault();
        console.log(newreport, 'newreport');
        // axios.post('https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu', {
        //     ...newreport,
        //     date: formattedDate,
        //     time: formattedTime,
        //     reporterid: curruserid
        // })
        // .then((response) => {
        //     const newReportId = response.data.id;
        //     // setReports(newReportId);
        //     axios.get(`https://64dc7b7ce64a8525a0f68ee2.mockapi.io/newfields/${curruserid}`)
        //     .then(getresponse=>{
        //         const existingreports = getresponse.data.reports;
        //         existingreports.push(newReportId);
        //         axios.put(`https://64dc7b7ce64a8525a0f68ee2.mockapi.io/newfields/${curruserid}`, {reports: existingreports})
        //     })
        //     .then(()=>{navigate(`/querypublished/${newReportId}`);})
        // })
        // .catch(err=>console.log(err));
    };
    return (
        <div className='flex flex-col items-center'>
            <div>
                <div className='font-bold text-4xl mb-16'>Add More details</div>
            </div>

            <div className='w-[1031px] mb-10'>

                <div className='border-b border-b-[#949494] mb-10'>
                    <div className='flex justify-between h-12 mb-9 relative'>
                        <div>
                            <label>Item Name</label>
                            <div className='font-medium text-sm'>Item Name</div>
                        </div>
                        <input className='w-[472px] h-[51.75px] border border-[#B6B6B6] rounded-lg p-5' type='text' name='itemname' value={newreport.itemname} onChange={handleInputChange} placeholder='Type Name' />

                    </div>

                    <div className='flex justify-between h-12 mb-9 relative'>
                        <div>
                            <label>Item Category</label>
                            <div className='font-medium text-sm'>Item Category</div>
                        </div>
                        <input className='w-[472px] h-[51.75px] border border-[#B6B6B6] rounded-lg p-5' type='text' name='category' value={newreport.category} onChange={handleInputChange} placeholder='Select Category' />

                    </div>

                    <div className='flex justify-between h-12 mb-48 relative'>
                        <div>
                            <label>Item Description</label>
                            <div className='font-medium text-sm'>Item Description</div>
                        </div>
                        <input className='w-[472px] h-[203.23px] border border-[#B6B6B6] rounded-lg p-5' name='description' value={newreport.description} onChange={handleInputChange} id='itemdescription' type='text' placeholder='Type desc' />

                    </div>

                    <div className='flex justify-between h-12 mb-16 relative keywordbox'>
                        <div>
                            <label>Keywords</label>
                            <div className='font-medium text-sm'>Keywords</div>
                        </div>
                        <input className='w-[472px] h-[86px] border border-[#B6B6B6] rounded-lg p-5' type='text' name='keywords' value={newreport.keywords} onChange={handleInputChange} placeholder='Keywords' />

                    </div>

                    <div className='flex justify-between h-12 mb-9 relative'>
                        <div>
                            <label>Upload Images</label>
                            <div className='font-medium text-sm'>Upload Images</div>
                        </div>
                        <button className='w-[472px] h[42.75px] rounded-lg bg-[#E8B810]'>Upload Image</button>

                    </div>

                </div>

                <div className='border-b border-b-[#949494] mb-10'>
                    <div className='flex justify-between h-12 mb-9 relative location'>
                        <div>
                            <label>Location</label>
                            <div className='font-medium text-sm'>Location</div>
                        </div>
                        <input className='w-[472px] h-[51.75px] border border-[#B6B6B6] rounded-lg p-5' type='text' name='location' value={newreport.location} onChange={handleInputChange} placeholder='Type Address' />

                    </div>

                    <div className='flex justify-between h-12 mb-9 relative'>
                        <div>
                            <label>Location Identifiers</label>
                            <div className='font-medium text-sm'>Location Identifiers</div>
                        </div>
                        <input className='w-[472px] h-[51.75px] border border-[#B6B6B6] rounded-lg p-5' type='text' name='locationidentifier' value={newreport.locationidentifier} onChange={handleInputChange} placeholder='Landmarks of the location' />
                    </div>
                </div>

                <div className='flex justify-between h-12 mb-9 relative location'>
                    <div>
                        <label>Your Name</label>
                        <div className='font-medium text-sm'>Your Name</div>
                    </div>
                    <input className='w-[472px] h-[51.75px] border border-[#B6B6B6] rounded-lg p-5' type='text' name='name' value={newreport.name} onChange={handleInputChange} placeholder='Full name' />
                </div>

                <div className='flex justify-between h-12 mb-9 relative'>
                    <div>
                        <label>Your Phone Number</label>
                        <div className='font-medium text-sm'>Your Phone Number</div>
                    </div>
                    <input className='w-[472px] h-[51.75px] border border-[#B6B6B6] rounded-lg p-5' type='tel' name='mobilenumber' value={newreport.mobilenumber} onChange={handleInputChange} placeholder='Phone number' />
                </div>

                <div className='flex justify-between h-12 mb-9 relative'>
                    <div>
                        <label>Your Mail address</label>
                        <div className='font-medium text-sm'>Your Mail address</div>
                    </div>
                    <input className='w-[472px] h-[51.75px] border border-[#B6B6B6] rounded-lg p-5' type='email' name='mail' value={newreport.mail} onChange={handleInputChange} placeholder='Mail address' />
                </div>
            </div>
            <div className='w-[360px] flex justify-between mb-10'>
                    <div><button className='w-[173.41px] h-[57px] border border-[#B6B6B6] bg-white rounded-lg text-lg cursor-grab'>Cancel</button></div>
                    <div><button className='w-[173.41px] h-[57px] border border-[#B6B6B6] bg-[#E8B810] rounded-lg text-lg cursor-grab' onClick={handleSubmit}>Submit form</button></div>
                </div>
        </div>
    )
}