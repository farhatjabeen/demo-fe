import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.svg"
import { useNavigate } from "react-router-dom";
import PopoverComponent from "../popover";
import { useDispatch, useSelector } from "react-redux";
import { userData, clearUserData, generalUserLogout, businessUserLogout, generalUserDetails, companyProfileData } from '../../redux/reducers/userSlice';
import { clearItemData } from "../../redux/reducers/itemsSlice";
import HeaderDropdown from "../common/headerDropdown";

const Header = (props) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const dispatch = useDispatch();
    const userDetails = useSelector(userData);


    useEffect(() => {
        if (userDetails?.role === 'USER') {
            setLogin(true);
            setIsBusiness(false);
            dispatch(generalUserDetails())
        }
        if (userDetails?.role === 'BUSINESS') {
            setLogin(true);
            setIsBusiness(true);
            dispatch(companyProfileData())
        }
    }, [userDetails])

    const handleLogout = () => {
        try {
            if (userDetails?.role === 'USER') {
                dispatch(generalUserLogout())
                setLogin(false);
            }
            if (userDetails?.role === 'BUSINESS') {
                dispatch(businessUserLogout())
                setLogin(false);
                setIsBusiness(false);
            }

            dispatch(clearItemData())
            dispatch(clearUserData())

        } catch (error) {
            console.log("Logout errors", error)
        }

    }

    return (
        <div className="headerContainer" style={{ position: 'relative', zIndex: 50 }}>
            <div className="flex justify-between items-center h-22 m-14 rounded-full bg-white shadow-lg">
                <div className='flex justify-start grow p-5 xl:pl-12 md:pl-10 sm:pl-8'>
                    <img
                        onClick={() => navigate('/user/resetpassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzZkMDJmYmQ4ZTY0YjYwODNjMDNjMSIsInNraXBTZXNzaW9uIjp0cnVlLCJpYXQiOjE3MDQ4ODM2MjMsImV4cCI6MTcwNDg4NDUyM30.mm44qR_19qf-Cp9o-1B1Yr9vSEAucB1rPI-t5IWY9t8')}
                        className="cursor-pointer xl:h-14 xl:w-32 md:h-12 md:w-28 sm:h-10 sm:w-20"
                        src={Logo} alt="logo" />
                </div>
                <div className='flex justify-end grow items-center px-3 pr-6'>
                    {login
                        ?
                        <div>
                            {
                                isBusiness
                                    ?
                                    <HeaderDropdown linkTo='/businesssignin' isBusiness={isBusiness} titleOne='Dashboard' navigateOne='/allitems'
                                        titleTwo='My Profile' navigateTwo='/companyprofile' handleLogout={handleLogout} />
                                    :
                                    <HeaderDropdown linkTo='/' isBusiness={isBusiness} titleOne='My listing' navigateOne='/mylistings'
                                        titleTwo='My Profile' navigateTwo='/user/myprofile' handleLogout={handleLogout} />
                            }
                        </div>
                        :
                        <div className="flex">
                            <button
                                className="cursor-pointer xl:w-72 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color  mx-3"
                                onClick={() => navigate('/businessHome')}
                            >
                                Ilost for Business
                            </button>
                            <PopoverComponent />
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Header;
