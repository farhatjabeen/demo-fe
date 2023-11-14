import React from 'react';
import { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function BusinessSignIn() {
    const [seePassword, setSeePassword] = useState(false)
    return (
        <div className='flex justify-center mb-28'>
            <div className='bg-white xl:w-2/6 md:w-3/5 sm:w-4/5 border-[#878787] border rounded-lg p-8'>
                <h1 className='font-light text-2xl'>Welcome!</h1>
                <h2 className='font-meidum text-3xl mt-5 mb-10'>Sign in to your business</h2>
                <div className='flex flex-col justify-center '>
                    <div className='flex flex-col'>
                        <label className='font-normal text-base mb-3'>Email address</label>
                        <input type='text' className='h-14 w-full border border-[#282828] rounded-md placeholder:text-sm p-4' placeholder='Enter your Email address' />
                        <label className='font-normal text-base mt-8 mb-3'>Password</label>
                        <div className='relative'>
                            <input type={`${seePassword ? "password" : "text"}`} className='h-14 w-full border border-[#282828] rounded-md placeholder:text-sm p-4' placeholder='Enter your Password' />
                            <div className='absolute top-4 left-3/4 ml-16' onClick={() => setSeePassword(!seePassword)}>
                                {seePassword ? <BsFillEyeSlashFill className='h-6 w-6' /> : <BsFillEyeFill className='h-6 w-6' />}

                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <div className='flex justify-between w-24'>
                            <input type='checkbox' />
                            <div className='text-xs text-[#4D4D4D] font-light'>Remember me</div>
                        </div>
                        <div className='text-xs text-[#4D4D4D] font-light'>
                            Forgot Password?
                        </div>
                    </div>


                    <button className='bg-primary-color w-full h-14 rounded-md mt-8'>Login</button>

                </div>

                <div className='text-[#7D7D7D] font-light mt-14 flex justify-center'>
                    Don't have an Account? <span className='text-[#000000] font-semibold'>Get more info</span>
                </div>

            </div>
        </div>
    )
}
