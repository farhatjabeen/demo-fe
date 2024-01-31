import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { RxChevronDown } from "react-icons/rx";
import { MdOutlineBusiness } from "react-icons/md";
import { Menu, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { clearItemData } from '../../../redux/reducers/itemsSlice';
import { clearUserData } from '../../../redux/reducers/userSlice';

export default function HeaderDropdown({ isBusiness, linkTo, navigateOne, userName, titleOne, navigateTwo, titleTwo, handleLogout }) {
    const [select, setSelect] = useState(false);
    const dispatch = useDispatch();

    return (
        <Menu as="div" className="relative text-left">
            <div>
                <Menu.Button
                    onClick={() => setSelect(!select)}
                    className=' cursor-pointer xl:w-fit  xl:px-9 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color'>
                    <div className="flex  items-center justify-between px-3">
                        <div className="flex text-info  mr-4 items-center">
                            {
                                isBusiness
                                    ?
                                    <MdOutlineBusiness className='text-primary-color text-info mb-1 h-7 w-7' />
                                    :
                                    <FaRegUser className="text-primary-color mb-1 h-5 w-5" />
                            }
                            <h1
                                className="ml-2 text-primary-color ">
                                Hi, {userName ? userName?.split(' ')[0] : "User"}!
                            </h1>
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
                <Menu.Items className={` absolute top-14 left-10 z-10 mt-2 xl:w-56 md:w-44 sm:w-28 rounded-lg bg-white shadow-lg`}>
                    <Menu.Item>
                        <Link
                            to={navigateOne}
                            className='w-full border border-x-0 border-t-0 border-greys hover:bg-gray-200/30 
                            flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-xl font-normal '
                        >
                            {titleOne}
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link
                            to={navigateTwo}
                            className='w-full border border-x-0 border-t-0 border-greys hover:bg-gray-200/30 
                            flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-xl font-normal'
                        >
                            {titleTwo}
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link
                            to='/contactUs'
                            className='w-full hover:bg-gray-200/30 border border-x-0 border-t-0 border-greys 
                            flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-xl font-normal'
                        >
                            Need Help?
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link
                            to={linkTo}
                            onClick={() => { handleLogout(); dispatch(clearItemData()); dispatch(clearUserData()); }}
                            className='w-full hover:bg-gray-200/30 flex justify-center items-center xl:h-12 
                            md:h-12 sm:h-10 text-xl font-normal'
                        >
                            Sign Out
                        </Link>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}