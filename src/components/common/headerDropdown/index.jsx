import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { MdOutlineBusiness } from "react-icons/md";

export default function HeaderDropdown(props) {
    const [select, setSelect] = useState(false);
    

    
    return (
        <div className="relative text-left">

            <div>
                <button
                    onClick={() => setSelect(!select)}
                    className=' xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color'>
                    <div className="flex  items-center justify-between px-3">
                        <div className="flex text-[#FFC727] items-center">
                            {
                                props.isBusiness
                                ?
                                <MdOutlineBusiness className='text-[#FFC727] mb-1 h-7 w-7' />
                                :
                                <FaRegUser className="mb-1 h-5 w-5" />
                            }
                            
                            <h1 className="ml-2 ">Hi, there!</h1>
                        </div>
                        <div>
                            {select ? <RxChevronUp className='h-6 w-6' /> : <RxChevronDown className='h-6 w-6' />}
                        </div>
                    </div>
                </button>
            </div>
            <div className={` absolute top-14 left-4 z-10 mt-2 xl:w-56 md:w-44 sm:w-28 rounded-md bg-white shadow-lg border border-solid border-[#B6B6B6] ${select ? '' : 'hidden'} `}>

                <Link
                    to='/mylistings'
                    className='w-full border border-x-0 border-t-0 border-[#B6B6B6] hover:bg-gray-200/30 flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-black font-medium '
                >
                    {props.titleOne}
                </Link>
                <Link
                    to='/user/myprofile'
                    className='w-full border border-x-0 border-t-0 border-[#B6B6B6] hover:bg-gray-200/30 flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-black font-medium '
                >
                    {props.titleTwo}
                </Link>
                <Link
                    to='/contactus'
                    className='w-full hover:bg-gray-200/30 border border-x-0 border-t-0 border-[#B6B6B6] flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-black font-medium'
                >
                    Need Help?
                </Link>
                <Link
                    onClick={props.handleLogout}
                    className='w-full hover:bg-gray-200/30 flex justify-center items-center xl:h-12 md:h-12 sm:h-10 text-black font-medium'
                >
                    Sign Out
                </Link>

            </div>
        </div>
    )
}
