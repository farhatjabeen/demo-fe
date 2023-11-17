import React from 'react';
import aboutUsImage from '../../assets/images/aboutUs.png';

export default function AboutUs() {
    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='text-4xl font-semibold'>About us</div>
                <div className='text-2xl text-primary-color font-semibold pt-4'>Welcome to Ilost</div>
            </div>

            <div className='relative '>
                <div className='flex '>
                <div><img src={aboutUsImage} alt='aboutUsImage' /></div>
                <div className='text-2xl font-sans font-medium flex items-end pb-24 pl-16'>At Ilost, we understand that losing something<br></br> valuable can be a stressful and frustrating<br></br> experience. That's why we've dedicated ourselves to<br></br> creating a platform that helps you reunite with your<br></br> lost items quickly and efficiently.</div>
                </div>

            <div className=' bg-[#F9DE8C] h-40 flex justify-center'>
                <div className='absolute top-0 mt-96 bg-white px-8 py-6 h-fit w-fit rounded-lg'>
                    <div className='text-2xl text-primary-color'>Our Mission</div>
                    <div className='text-xl text-[#455A64]'>Our mission at Ilost is simple: to simplify the process of recovering lost items and bring<br /> people together through a shared commitment to helping one another. We believe in the<br /> power of technology to connect people and make a positive impact on their lives. By<br /> harnessing the latest advancements, we aim to be the go-to platform for lost and found<br /> solutions, fostering a sense of community and compassion.</div>
                </div>
            </div>
            </div>

            <div></div>
        </div>
    )
}
