import React from 'react'
import Logo from "../../assets/images/footer_logo.png"
import './index.css'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { userData } from '../../redux/reducers/userSlice'

const Footer = () => {
    const userDetails = useSelector(userData);
    const navigate = useNavigate();
    return (
        <div>
            <div className='bg-primary-color flex flex-col justify-center items-center p-10 pb-5'>
                <div className='p-6 flex flex-col justify-space items-center h-full'>
                    <div className='flex justify-center p-5'>
                        <img className="w-4/5 h-auto" src={Logo} alt="logo" />
                    </div>
                    <div >
                        <ul className='footer-links flex p-3 sm:flex-col md:flex-row 
                        lg:flex-row xl:flex-row xs:flex-col relative'>
                            <li className='px-8 text-white'><a href='/aboutus'>About Us</a></li>
                            <li className='px-8 text-white'><a href='/contactUs'>Contact Us</a></li>
                            <li className='px-8 text-white'><a href='/termsOfUse'>Terms of Use</a></li>
                            <li className='px-8 text-white'><a href='/privacyPolicy'>Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className={`flex justify-center py-5 ${userDetails?.role === 'BUSINESS' ? 'hidden' : ""}`}>
                        <button
                            className='cursor-pointer text-white text-lg px-5 py-1 bg-trans-white rounded-xl font-semibold curs'
                            onClick={() => navigate('/businessSignIn')}
                        >
                            Are you a business user? Sign in here
                        </button>
                    </div>


                </div>
            </div>
            <div className='copy-rights w-full py-2'>
                <p className='text-white text-center font-bold'>Copyright &#169; 2023 ILost Serbia. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;
