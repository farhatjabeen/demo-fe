import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg"
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import UserLogin from "../userLogin";
import { IoTriangleSharp } from "react-icons/io5";
import linksymbol from '../../assets/images/linksymbol.png';
import { AiFillCloseCircle } from "react-icons/ai";
import businessSignIn from '../../pages/businessSignIn';

const Header = (props) => {
    const [loginButton, setLoginButton] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [passwordBox, setPasswordBox] = useState(false);
    const [passwordContainer, setPasswordContainer] = useState(null);
    const [reEnterPasswordcContainer, setReEnterPasswordContainer] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [checkUser, setCheckUser] = useState(false);
    const [passwordHere, setPasswordHere] = useState('');

    const navigate = useNavigate();

    const handleLoginButton = () => {
        setLoginButton(true);
    }
    const handleLogoutButton = () => {
        setLoginButton(false);
    }

    const handleLoginPassword = () => {
        if (validateEmail(emailAddress)) {
            setPasswordBox(true);
            setErrorMessage(false);
        }
        else {
            setErrorMessage(!errorMessage);
        }
    }
    let currentName = emailAddress.split('@');

    const registerButton = () => {

    }

    let findUser;



    const validateEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    return (
        <div className="headerContainer" style={{ position: 'relative', zIndex: 50 }}>
            <div className="flex justify-between items-center h-22 m-16 rounded-full bg-white">
                <div className='flex justify-start grow p-5 xl:pl-12 md:pl-10 sm:pl-8'>
                    <img className="xl:h-14 xl:w-32 md:h-12 md:w-28 sm:h-10 sm:w-20" src={Logo} alt="logo" />
                </div>
                <div className='flex justify-end grow items-center px-3 pr-6'>
                    <button className="xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color  mx-3" onClick={() => navigate('/businessHome')}>Ilost for Business</button>
                    {/* <UserLoginTwo title='jikoji' /> */}
                    {/* <button className="xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold bg-primary-color text-white rounded-full xl:mx-1" onClick={handleLoginButton}>Login / Register</button> */}
                    <div>
                        <Popover>
                            {({ open }) => (
                                <div>
                                    <Popover.Button>
                                        <div className="flex justify-center items-center xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold bg-primary-color text-white rounded-full xl:mx-1">Login/Register</div>
                                    </Popover.Button>
                                    <Popover.Overlay className="fixed inset-0 bg-green opacity-50" />

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1">
                                        <Popover.Panel className='fixed z-50 inset-y-0 sm:mr-20 right-0 bg-white rounded-3xl xl:pt-10 xl:pb-16 xl:pl-7 xl:pr-6 md:pt-6 md:pb-8 md:pl-6 md:pr-5 sm:pt-10 sm:pb-6 sm:pl-6  xl:w-4/12 md:w-6/12 sm:w-7/12 h-fit xl:mt-44 md:mt-40 xl:mr:20 md:mr-28 sm:mt-36 '>
                                            <div className="xl:w-full md:w-full sm:w-full">
                                                <div className='xl:h-28 md:h-28 sm:h-16 xl:w-full md:w-full sm:w-full flex flex-col justify-center'>
                                                    {/* <div className='flex justify-between '> */}
                                                    <div className='xl:text-4xl md:text-3xl sm:text-xl font-bold'>Login/Register</div>
                                                    {/* <div> */}

                                                    {/* </div> */}
                                                    {/* </div> */}

                                                    <div className='xl:text-xl md:text-lg sm:text-sm font-normal text-[#757780] pt-1'>Lorem ipsum dolor sit amet, consectetur<br></br> adipiscing elit onsectetur</div>
                                                </div>
                                            </div>
                                            <div className='xl:pt-8 md:pt-4 sm:pt-7 h-56 xl:w-11/12 md:w-11/12 sm:w-11/12'>
                                                {
                                                    passwordBox ?
                                                        <div>
                                                            {checkUser ?
                                                                <div>

                                                                    <div>
                                                                        <div className='text-sm font-medium text-[#757780] mb-1.5'>Enter Password</div>
                                                                        <input type='password' value={passwordHere} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setPasswordHere(e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            errorMessage ?
                                                                                <div className='text-sm text-[red] mt-2.5'>Enter a valid password</div>
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                    <div className='w-full h-11 rounded-md mt-6 bg-[#00B8B8] text-white flex justify-center items-center text-sm font-medium border-none'>
                                                                        <button onClick={loginButton} >LOGIN</button>
                                                                    </div>
                                                                </div>

                                                                :
                                                                <div>
                                                                    <div>
                                                                        <div className=' text-sm font-medium text-[#757780] mb-1.5'>Enter Password</div>
                                                                        <input type='password' value={passwordContainer} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setPasswordContainer(e.target.value)} />
                                                                        <div className='text-sm font-medium text-[#757780] mt-2.5'>Re-enter Password</div>
                                                                        <input type='password' value={reEnterPasswordcContainer} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setReEnterPasswordContainer(e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            errorMessage ?
                                                                                <div className='text-sm text-[red] mt-2.5'>Enter matching password in both the fields</div>
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                    <div className='w-full h-11 rounded-md mt-6 bg-[#00B8B8] text-white flex justify-center items-center text-sm font-medium border-none'>
                                                                        <button variant='filled' onClick={registerButton} >REGISTER</button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        :
                                                        <div>
                                                            <div className='xl:text-sm md:text-sm sm:text-xs font-medium text-[#757780] mb-1.5'>Email Address</div>
                                                            <div>
                                                                <input type='email' className='w-full rounded-lg xl:h-12 md:h-11 sm:h-10 p-4 font-medium text-base bg-[#E8EDF1]' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                                                            </div>

                                                            {
                                                                errorMessage ?
                                                                    <div className='text-sm text-[red] mt-2.5'>Enter a valid email address</div>
                                                                    :
                                                                    null
                                                            }
                                                            {/* <div className='w-[440px] h-[44px] rounded-[6px] mt-[18px] bg-[#A7A9AC] text-white flex justify-center items-center text-sm font-medium border-none'> */}
                                                            <button className='w-full xl:h-11 md:h-11 sm:h-9 rounded-md mt-5 bg-[#A7A9AC] text-white flex justify-center items-center xl:text-sm md:text-sm sm:text-xs font-medium border-none' onClick={handleLoginPassword} >CONTINUE</button>
                                                            {/* </div> */}
                                                            <div className="flex items-center mt-8">
                                                                <hr className="flex-1 border border-t border-gray-300" />
                                                                <span className="mx-4 text-gray-500 xl:text-base md:text-sm sm:text-xs">or</span>
                                                                <hr className="flex-1 border border-t border-gray-300" />
                                                            </div>
                                                            <div className='flex items-center justify-between w-11/12 h-6 mt-2'>
                                                                <div className='w-fit font-semibold xl:text-sm md:text-xs sm:text-xs'>Are you a business owner?</div>
                                                                <div className='flex items-center w-fit '>
                                                                    <div className='flex items-center xl:mr-2.5 md:mr-1.5 sm:mr-1'><img src={linksymbol} alt='linksymbol' className='xl:h-3 xl:w-3 sm:h-3 sm:w-3' /></div>
                                                                    <Popover.Button onClick={() => navigate('/businessSignIn')} className=' xl:text-sm md:text-xs sm:text-xs font-medium text-[#00B8B8]'>Sign in for business</Popover.Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                }
                                            </div>
                                            <div className="w-full flex justify-end xl:pr-20 md:pr-14 sm:pr-16">
                                            <IoTriangleSharp className='absolute xl:-top-6 md:-top-5 sm:-top-4 xl:h-7 xl:w-7 md:h-6 md:w-6 sm:h-5 sm:w-5 text-white' />
                                            </div>
                                            <div className="w-full flex justify-end xl:ml-6 md:ml-4 sm:pr-3">
                                                <Popover.Button className='absolute top-4 border-none bg-white space-x-end'>
                                                    <AiFillCloseCircle className=' xl:h-9 xl:w-9 md:h-8 md:w-8 sm:h-7 sm:w-7 text-[#00B8B8]' />
                                                </Popover.Button>
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
