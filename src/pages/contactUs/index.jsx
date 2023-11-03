import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import contactUsImage from '../../assets/images/contactus.png';

export default function ContactUs() {
    return (
        <div className='flex flex-col items-center'>
            <div className='font-bold text-4xl mb-5'>Contact Us</div>
            <div className='h-[229px] w-[899px] rounded-[30px] bg-white flex flex-col justify-center'>
                <div className='font-medium text-2xl h-[33px] w-[362px] ml-[30px] mt-[30px]'>Feel free to get in touch with us</div>
                <div className='h-[105px] w-[835px] m-[30px] flex justify-between'>
                    <div className='w-[404px] h-[105px] rounded-[15px] flex flex-col justify-center items-center bg-[#F3F3F3]'>
                        <div className='flex relative'>
                            <div className='w-[32px] h-[32px] left-[-35px]'><FaPhoneAlt style={{ color: "#00b8b8", height: '23.95px', width: '23.95px' }} /></div>
                            <div className='h-[32px] w-[81px] font-medium text-2xl'>Call Us</div>
                        </div>
                        <div className='font-normal text-xl mr-[10px] underline underline-offset-4'>+12345657890</div>
                    </div>
                    <div className='w-[404px] h-[105px] rounded-[15px] flex flex-col justify-center items-center bg-[#F3F3F3]'>
                        <div className='flex relative'>
                            <div className='w-[32px] h-[32px] '><FaEnvelope style={{ color: "#00b8b8", height: '21.33px', width: '26.67px' }} /></div>
                            <div className='h-[32px] w-[99px] font-medium text-2xl'>Email Us</div>
                        </div>
                        <div className='font-normal text-xl mr-[30px] underline underline-offset-4'>info@ilost.com</div>
                    </div>
                </div>
            </div>

            <div className='h-[500px] w-[1208px] flex justify-between mt-16'>
                <div><img src={contactUsImage} alt='contactUsImage' /></div>
                <div className='h-[483px] w-[611px]'>
                    <div className='h-[33px] w-[611px] font-semibold text-3xl'>Get in Touch</div>
                    <div className='mt-7 grid justify-items-end'>
                            <div><input className='w-[611px] mb-4 h-14 rounded-lg border bg-inherit p-4' type="email" placeholder='Enter your email' /></div>
                        <div><input className='w-[611px] mb-4 h-14 rounded-lg border bg-inherit p-4' type="text" placeholder='Subject' /></div>
                        <div><input className='w-[611px] mb-4 h-52 rounded-lg border bg-inherit p-4' name="text" placeholder='Message' /></div>
                        <input className='h-14 w-44 rounded-lg bg-[#E8B810]' type="submit" value="Submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}
