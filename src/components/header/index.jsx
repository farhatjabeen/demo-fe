import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg"
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import UserLogin from "../userLogin";
import { IoTriangleSharp } from "react-icons/io5";
import linksymbol from '../../assets/images/linksymbol.png';
import { AiFillCloseCircle } from "react-icons/ai";
import UserLoginTwo from "../userLogin/ind";

const Header = (props) => {
    const [loginButton, setLoginButton] = useState(false);
    const navigate = useNavigate();

    const handleLoginButton = () => {
        setLoginButton(true);
    }
    const handleLogoutButton = () => {
        setLoginButton(false);
    }
    return (
        <div className="headerContainer">
            <div className="flex justify-between items-center h-22 m-16 rounded-full bg-white">
                <div className='flex justify-start grow p-5 xl:pl-12 md:pl-10 sm:pl-8'>
                    <img className="xl:h-14 xl:w-32 md:h-12 md:w-28 sm:h-10 sm:w-20" src={Logo} alt="logo" />
                </div>
                <div className='flex justify-end grow items-center px-3 pr-6'>
                    <button className="xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color  mx-3" onClick={() => navigate('/businessHome')}>Ilost for Business</button>
                    {/* <UserLoginTwo title='jikoji' /> */}
                    {/* <button className="xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold bg-primary-color text-white rounded-full xl:mx-1" onClick={handleLoginButton}>Login / Register</button> */}
                    <div>
                        <Popover >
                            {({ open }) => (
                                <div>
                                    <Popover.Button>
                                        <div className="group inline-flex justify-center items-center xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold bg-primary-color text-white rounded-full xl:mx-1">Login/Register</div>
                                    </Popover.Button>
                                    
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1">
                                            
                                        <Popover.Panel className='fixed inset-0 bg-white rounded-3xl xl:p-8 md-p-8 sm:p-5 xl:w-2/5 xl:h-3/5 md:w-7/12 md:h-4/6 sm:w-7/12 xl:mt-40 md:mt-40 md:mr-16 sm:mt-40 z-50'>
                                            <div>
                                                <div className='h-28 w-11/12 flex flex-col justify-center'>
                                                    <div className='flex'>
                                                        <div className='xl:text-4xl md:text-3xl sm:text-2xl font-bold'>Login/Register</div>
                                                        <div className='xl:ml-48 md:ml-40 sm:ml-28'><button onClick={handleLogoutButton} className='border-none bg-white w-10 flex justify-center '><AiFillCloseCircle className='h-9 w-9 text-[#00B8B8]' /></button></div>

                                                    </div>

                                                    <div className='xl:text-xl md:text-lg sm:text-base font-normal text-[#757780] mt-2.5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit onsectetur</div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </div>
                            )}
                        </Popover>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header;
