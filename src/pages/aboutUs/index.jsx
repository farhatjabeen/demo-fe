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
                    <div className='text-xl font-semibold flex items-end pb-16 pl-16'>At Ilost, we understand that losing something<br></br> valuable can be a stressful and frustrating<br></br> experience. That's why we've dedicated ourselves to<br></br> creating a platform that helps you reunite with your<br></br> lost items quickly and efficiently.</div>
                </div>

                <div className=' bg-primary-colorback h-40 flex justify-center'>
                    <div className='absolute top-32 left-96  mt-96 bg-white p-10 w-7/12 rounded-lg'>
                        <div className='text-2xl text-primary-color'>Our Mission</div>
                        <div className='text-xl'>Our mission at Ilost is simple: to simplify the process of recovering lost items and bring<br /> people together through a shared commitment to helping one another. We believe in the<br /> power of technology to connect people and make a positive impact on their lives. By<br /> harnessing the latest advancements, we aim to be the go-to platform for lost and found<br /> solutions, fostering a sense of community and compassion.</div>
                    </div>
                </div>
            </div>

            <div className='text-center'>
                <h1 className=' mt-32 font-black text-3xl'>
                    What Sets Us Apart
                </h1>
                <p className='text-xl px-20 pt-6 pb-32 font-semibold'>
                    At Ilost, we take pride in our user-friendly interface and commitment to privacy. We understand
                    <br></br>the sensitivity of personal belongings, and our platform is designed with your security in mind.<br></br> We leverage cutting-edge technology to streamline the process of reporting and recovering lost<br></br> items, ensuring a seamless experience for our users.
                </p>
            </div>
        </div>
    )
}
