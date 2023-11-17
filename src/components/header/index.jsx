import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg"
import { useNavigate } from "react-router-dom";
import PopoverComponent from "../popover";


const Header = (props) => {
    const navigate = useNavigate();

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
                    <PopoverComponent />
                </div>

            </div>
        </div>
    )
}

export default Header;
