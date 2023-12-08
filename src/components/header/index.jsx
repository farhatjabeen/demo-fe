import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.svg"
import { Link, useNavigate } from "react-router-dom";
import PopoverComponent from "../popover";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, generalUserLogout, userData } from "../../redux/reducers/userSlice";
import { FaRegUser } from "react-icons/fa6";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { clearItemData } from "../../redux/reducers/itemsSlice";


const Header = (props) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [select, setSelect] = useState(false);
    const dispatch = useDispatch();
    const userDetails = useSelector(userData);
    console.log(userDetails, 'ud')

    useEffect(() => {
        if (userDetails?.role ==='USER') {
            setLogin(true);
        }
    }, [])

    const handleLogout = () => {
        try {
            dispatch(generalUserLogout())
            dispatch(clearItemData())
            dispatch(clearUserData())
            setLogin(false);
            
        } catch (error) {
            console.log("Logout errors", error)
        }

    }

    return (
        <div className="headerContainer" style={{ position: 'relative', zIndex: 50 }}>
            <div className="flex justify-between items-center h-22 m-16 rounded-full bg-white">
                <div className='flex justify-start grow p-5 xl:pl-12 md:pl-10 sm:pl-8'>
                    <img className="xl:h-14 xl:w-32 md:h-12 md:w-28 sm:h-10 sm:w-20" src={Logo} alt="logo" />
                </div>
                <div className='flex justify-end grow items-center px-3 pr-6'>
                    {login
                        ?
                        null :
                        <button
                            className="xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color  mx-3"
                            onClick={() => navigate('/businessHome')}
                        >
                            Ilost for Business
                        </button>}
                    {
                        login
                            ?
                            <div className="relative text-left">

                                <div>
                                    <button
                                        onClick={() => setSelect(!select)}
                                        className=' xl:w-64 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color'>
                                        <div className="flex  items-center justify-between px-3">
                                            <div className="flex text-[#FFC727] items-center">
                                                <FaRegUser className="mb-1 h-5 w-5" />
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
                                        My listing
                                    </Link>
                                    <Link
                                        to='/myprofile'
                                        className='w-full border border-x-0 border-t-0 border-[#B6B6B6] hover:bg-gray-200/30 flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-black font-medium '
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        className='w-full hover:bg-gray-200/30 border border-x-0 border-t-0 border-[#B6B6B6] flex justify-center items-center xl:h-12 md:h-12 sm:h-10 no-underline text-black font-medium'
                                    >
                                        Need Help?
                                    </Link>
                                    <Link
                                        onClick={() => handleLogout()}
                                        className='w-full hover:bg-gray-200/30 flex justify-center items-center xl:h-12 md:h-12 sm:h-10 text-black font-medium'
                                    >
                                        Sign Out
                                    </Link>

                                </div>
                            </div>
                            :
                            <PopoverComponent />
                    }

                </div>

            </div>
        </div>
    )
}

export default Header;
