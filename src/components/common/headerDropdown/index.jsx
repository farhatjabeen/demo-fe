import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { MdOutlineBusiness } from "react-icons/md";
import { Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItemData } from '../../../redux/reducers/itemsSlice';
import { clearUserData, userData } from '../../../redux/reducers/userSlice';

export default function HeaderDropdown({ isBusiness, linkTo, navigateOne, titleOne, navigateTwo, titleTwo, handleLogout }) {
    const [select, setSelect] = useState(false);
    const dispatch = useDispatch();
    const userDetails = useSelector(userData);
    const navigate = useNavigate();

    return (
        <Menu as="div" className="relative text-left">

            <div>
                <Menu.Button
                    onClick={() => setSelect(!select)}
                    className=' xl:w-fit  xl:px-9 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color'>
                    <div className="flex  items-center justify-between px-3">
                        <div className="flex text-[#FFC727] mr-4 items-center">
                            {
                                isBusiness
                                    ?
                                    <MdOutlineBusiness className='text-[#FFC727] mb-1 h-7 w-7' />
                                    :
                                    <FaRegUser className="mb-1 h-5 w-5" />
                            }

                            <h1 className="ml-2 ">Hi, there!</h1>



                            {/* <h1 className="ml-2 ">Hi, {userDetails ? userDetails?.name : <h1>there</h1>}!</h1> */}
                        </div>
                        <div>
                            <RxChevronDown className='h-6 w-6' />
                        </div>
                    </div>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className={` absolute top-14 left-6 z-10 mt-2 xl:w-56 md:w-44 sm:w-28 rounded-md bg-white shadow-lg border border-solid border-[#B6B6B6] `}>

                    <Menu.Item>

                        <Link
                            to={navigateOne}
                            className='w-full border border-x-0 border-t-0 border-[#B6B6B6] hover:bg-gray-200/30 flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-black font-medium '
                        >
                            {titleOne}
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link
                            to={navigateTwo}
                            className='w-full border border-x-0 border-t-0 border-[#B6B6B6] hover:bg-gray-200/30 flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-black font-medium '
                        >
                            {titleTwo}
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link
                            to='/contactus'
                            className='w-full hover:bg-gray-200/30 border border-x-0 border-t-0 border-[#B6B6B6] flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-black font-medium'
                        >
                            Need Help?
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link
                            to={linkTo}
                            onClick={() => { handleLogout(); dispatch(clearItemData()); dispatch(clearUserData()); }}
                            className='w-full hover:bg-gray-200/30 flex justify-center items-center xl:h-12 md:h-12 sm:h-10 text-black font-medium'
                        >
                            Sign Out
                        </Link>
                    </Menu.Item>

                </Menu.Items>
            </Transition>
        </Menu>
    )
}
