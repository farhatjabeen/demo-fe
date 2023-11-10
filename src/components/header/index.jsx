import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg"
import UserLogin from "../userLogin";


const Header = (props) => {
    const [loginButton,setLoginButton]=useState(false);

    const handleLoginButton = () =>{
        setLoginButton(true);
    }
    const handleLogoutButton = () =>{
        setLoginButton(false);
    }
    return (
        <div className="headerContainer">
            <div className="flex justify-between items-center h-22 m-16 rounded-full bg-white">
                <div className='flex justify-start grow p-5 xl:pl-12 md:pl-10 sm:pl-8'>
                    <img className="xl:h-14 xl:w-32 md:h-12 md:w-28 sm:h-10 sm:w-20" src={Logo} alt="logo" />
                </div>
                <div className='flex justify-end grow items-center px-3 pr-6'>
                    <button className="xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color  mx-3">Ilost for Business</button>
                    <button className="xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold bg-primary-color text-white rounded-full xl:mx-1" onClick={handleLoginButton}>Login / Register</button>
                </div>
                <div>
                    <UserLogin isOpen={loginButton} onClose={handleLogoutButton} />
                </div>
            </div>
        </div>
    )
}

export default Header;
