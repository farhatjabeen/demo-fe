import React from "react";
import Logo from "../../assets/images/logo.png"

import "./index.scss"

const Header = (props) => {

    return (
        <div className="headerContainer">
            <div className="flex justify-between h-22 m-16 rounded-full bg-white">
                <div className='flex justify-start grow p-5 pl-14'>
                    <img className="h-auto" src={Logo} alt="logo" />
                </div>
                <div className='flex justify-end grow items-center px-3 pr-6'>
                    <button className="btn-secondary mx-3">Ilost for Business</button>
                    <button className="btn-primary mx-3">Login / Register</button>
                </div>
            </div>
        </div>
    )
}

export default Header;
