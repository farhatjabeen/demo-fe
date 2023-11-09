import React, { useState } from "react";
import Logo from "../../assets/images/logo.png"

import "./index.scss"
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
            <div className="flex justify-between h-22 m-16 rounded-full bg-white">
                <div className='flex justify-start grow p-5 pl-14'>
                    <img className="h-auto" src={Logo} alt="logo" />
                </div>
                <div className='flex justify-end grow items-center px-3 pr-6'>
                    <button className="w-64 h-14 border rounded-full border-primary-color text-primary-color text-2xl font-bold mx-3">Ilost for Business</button>
                    <button className="h-14 w-64 bg-primary-color text-white rounded-full font-bold text-2xl mx-3" onClick={handleLoginButton}>Login / Register</button>
                </div>
                <div>
                    <UserLogin isOpen={loginButton} onClose={handleLogoutButton} />
                </div>
            </div>
        </div>
    )
}

export default Header;
