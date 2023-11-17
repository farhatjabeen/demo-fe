import React from 'react';
import { GoLock } from "react-icons/go";

const Settings = () => {
    return (
        <div className="ml-10">
            <h1 className='text-black font-bold text-4xl mt-10'>
                Settings
            </h1>
            <div className='flex mt-24'>
                <GoLock size={20} color='blue' />
                <p className='text-black font-bold ml-10'>Change Password</p>
            </div>
        </div>
    )
}

export default Settings