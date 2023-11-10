import React from 'react'
import { useState } from 'react';
import { FaPenToSquare } from "react-icons/fa6";

export default function CompanyProfile() {

    const [editButton, setEditButton] = useState(false);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [dbPassword, setDbPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false);

    const handleEditButton = () => {
        setEditButton(!editButton);
    }

    const handlePassword = (e) => {
        const rPass = e.target.value;
        setReEnterPassword(rPass);
        if (dbPassword === currentPassword) {
            if (reEnterPassword === newPassword) {
                setAllowSubmit(true);
            }
        }
    }

    const handleSubmit = () => {
        
        setEditButton(false);
    }



  return (
    <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mb-20'>
                <div className='font-bold text-4xl mr-5'>Company Profile</div>
                {editButton ? null : <div><button className='w-24 h-10 rounded-xl bg-primary-color border-none text-sm flex justify-center items-center cursor-grab' onClick={handleEditButton}> Edit <FaPenToSquare style={{ marginLeft: "5px" }} /></button> </div>}
            </div>

            <div className='w-9/12 xl:mb-28 sm:mb-20'>

            <div className='border-b border-b-solid border-b-[#949494] '>
                    <div className='flex justify-between mb-9'>
                        <div>
                            <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Company Name</label>
                            <div className='font-medium text-xs'>Company Name</div>
                        </div>

                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='text' name='username' value={name} disabled={!editButton} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' />

                    </div>

                    <div className='flex justify-between mb-9'>

                        <div>
                            <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Company Category</label>
                            <div className='font-medium text-xs'>Company Category</div>
                        </div>
                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="tel" name='mobilenumber' value={mobileNumber} disabled={!editButton} onChange={(e) => setMobileNumber(e.target.value)} placeholder='Enter your Number' />
                    </div>

                    <div className='flex justify-between mb-9'>
                        <div>
                            <label className='xl:text-lg sm:text-base font-bold mt-[13px]'>Company Location</label>
                            <div className='font-medium text-xs'>Company Location</div>
                        </div>
                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='email' name='email' value={email} disabled={!editButton} onChange={(e) => setEmail(e.target.value)} placeholder='abc@xyz.com' />

                    </div>
                </div>

                <div className='border-b border-b-solid border-b-[#949494] mt-12'>
                    <div className='flex justify-between mb-9'>
                        <div>
                            <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Name</label>
                            <div className='font-medium text-xs'>Your Name</div>
                        </div>

                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='text' name='username' value={name} disabled={!editButton} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' />

                    </div>

                    <div className='flex justify-between mb-9'>

                        <div>
                            <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Mobile Number</label>
                            <div className='font-medium text-xs'>Your Mobile Number</div>
                        </div>
                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="tel" name='mobilenumber' value={mobileNumber} disabled={!editButton} onChange={(e) => setMobileNumber(e.target.value)} placeholder='Enter your Number' />
                    </div>

                    <div className='flex justify-between mb-9'>
                        <div>
                            <label className='xl:text-lg sm:text-base font-bold mt-[13px]'>Mail ID</label>
                            <div className='font-medium text-xs'>Your Mail ID</div>
                        </div>
                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='email' name='email' value={email} disabled={!editButton} onChange={(e) => setEmail(e.target.value)} placeholder='abc@xyz.com' />

                    </div>
                </div>

                <div>
                    <div className='font-bold text-2xl mt-12 mb-12'>
                        Change Password
                    </div>
                    <div className='flex justify-between mb-9'>

                        <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Enter Current password</label>
                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl  ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="password" name='currentpassword' value={currentPassword} disabled={!editButton} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Enter your current password' />
                    </div>

                    <div className='flex justify-between mb-9'>
                        <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Enter New password</label>
                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='text' name='newPassword' value={newPassword} disabled={!editButton} onChange={(e) => setNewPassword(e.target.value)} placeholder='New password' />
                    </div>

                    <div className='flex justify-between'>
                        <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Re - Enter New password</label>
                        <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="password" name='reenterpassword' value={reEnterPassword} disabled={!editButton} onChange={handlePassword} placeholder='New password' />
                    </div>
                </div>

            </div>

            {editButton ?
                <div className='xl:w-3/12 md:w-5/12 sm:w-7/12 flex justify-between mb-10'>
                    <div>
                        <button onClick={handleEditButton} className='w-44 h-14 border border-[solid] border-[#B6B6B6] bg-white rounded-xl text-lg cursor-grab'>
                            Cancel
                        </button>
                    </div>
                    <div>
                        <button disabled={allowSubmit} onClick={handleSubmit} className='w-44 h-14 border border-[solid] border-primary-color bg-primary-color rounded-xl text-lg cursor-grab'>
                            Save Changes
                        </button>
                    </div>
                </div>
                :
                null}
        </div>
  )
}
