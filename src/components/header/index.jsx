import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom'
import PopoverComponent from '../popover'
import { useDispatch, useSelector } from 'react-redux'
import {
  userData,
  clearUserData,
  generalUserLogout,
  businessUserLogout,
  generalUserDetails,
  companyProfileData,
  generalUserData,
  userProfile,
} from '../../redux/reducers/userSlice'
import { clearItemData } from '../../redux/reducers/itemsSlice'
import HeaderDropdown from '../common/headerDropdown'
import { IoMdArrowBack } from 'react-icons/io'

const Header = (props) => {
  const navigate = useNavigate()
  const [login, setLogin] = useState(false)
  const [isBusiness, setIsBusiness] = useState(false)
  const dispatch = useDispatch()
  const userDetails = useSelector(userData)
  const generalUserInformation = useSelector(generalUserData)
  const businessUserInformation = useSelector(userProfile)
  const [backButton, setBackButton] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (
      window.location.pathname !== '/businessignup' &&
      window.location.pathname !== '/termsOfUse'
    ) {
      sessionStorage.setItem('enteredData', null)
    }
    if (window.location.pathname === '/businesshome/detailpage') {
      setBackButton(true)
    } else {
      setBackButton(false)
    }
  }, [navigate])

  useEffect(() => {
    checkUser()
  }, [userDetails])

  const checkUser = async () => {
    try {
      if (userDetails?.role === 'USER') {
        setLogin(true)
        setIsBusiness(false)
        setLoader(true)
        const user = await dispatch(generalUserDetails())
        if (user) {
          setLoader(false)
        }
      }
      if (userDetails?.role === 'BUSINESS') {
        setLogin(true)
        setIsBusiness(true)
        setLoader(true)
        const user = await dispatch(companyProfileData())
        if (user) {
          setLoader(false)
        }
      }
    } catch (error) {
      console.log(error, 'submitted errors')
    }
  }

  const handleLogout = () => {
    try {
      if (userDetails?.role === 'USER') {
        dispatch(generalUserLogout())
        setLogin(false)
      }
      if (userDetails?.role === 'BUSINESS') {
        dispatch(businessUserLogout())
        setLogin(false)
        setIsBusiness(false)
      }

      dispatch(clearItemData())
      dispatch(clearUserData())
    } catch (error) {
      console.log('Logout errors', error)
    }
  }

  return (
    <div className="headerContainer" style={{ position: 'relative', zIndex: 50 }}>
      {backButton && (
        <button
          className="cursor-pointer absolute left-5 text-2xl top-20 xl:mt-2"
          onClick={() => window.history.back()}
        >
          <IoMdArrowBack />
        </button>
      )}
      <div className="flex justify-between items-center h-22 m-14 rounded-full bg-white shadow-lg">
        <div className="flex justify-start grow p-5 xl:pl-12 md:pl-10 sm:pl-8">
          <img
            onClick={() => navigate('/')}
            className="cursor-pointer xl:h-14 xl:w-32 md:h-12 md:w-28 sm:h-10 sm:w-20"
            src={Logo}
            alt="logo"
          />
        </div>
        <div className="flex justify-end grow items-center px-3 pr-6">
          {login ? (
            <div>
              {isBusiness ? (
                <HeaderDropdown
                  userName={loader ? '...' : businessUserInformation?.name}
                  linkTo="/businesssignin"
                  isBusiness={isBusiness}
                  titleOne="Dashboard"
                  navigateOne="/user/allitems?page=1"
                  titleTwo="My Profile"
                  navigateTwo="/user/companyprofile"
                  handleLogout={handleLogout}
                />
              ) : (
                <HeaderDropdown
                  userName={loader ? '...' : generalUserInformation?.name}
                  linkTo="/"
                  isBusiness={isBusiness}
                  titleOne="My listing"
                  navigateOne="/user/mylistings?page=1"
                  titleTwo="My Profile"
                  navigateTwo="/user/myprofile"
                  handleLogout={handleLogout}
                />
              )}
            </div>
          ) : (
            <div className="flex">
              <button
                className="cursor-pointer xl:w-72 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg 
                                sm:w-36 sm:h-12 sm:text-sm font-bold border rounded-full border-primary-color text-primary-color  mx-3"
                onClick={() => navigate('/businessHome')}
              >
                <p>Ilost for Business</p>
              </button>
              <PopoverComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
