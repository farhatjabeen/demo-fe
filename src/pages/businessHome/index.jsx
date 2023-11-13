import React, { useState } from 'react';
import businessDoodle from '../../assets/images/businessDoodle.png';
import transportLondon from '../../assets/images/transportLondon.png';
import quotes from '../../assets/images/quotes.png';
import OurBrands from '../../components/ourBrands';
import { useEffect } from 'react';
import Slider from 'react-slick';

export default function BusinessHome() {
    const [readmore, setReadmore] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const contentData = [{content:"“I have points across so many programs. Thanks to BTZapp, I can now use all these points together to get what I want.”",
    author:"Mark"},
{content:"“Rise up & attack the day with Passion. The struggle you're in today is developing the strength you need for tomorrow.”",author:"Antony"},{content:"“life isn't about black and white,look around and you will see that the world is much more colorful than you thought”",author:"John"}];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % contentData.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    
    };

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex flex-col items-center mt-10 mb-20'>
                <div className='text-4xl font-bold text-[#404041]'>Transform your lost and found process</div>
                <div className='font-normal text-lg text-center mt-3 mb-8 text-[#404041]'>Reassure your customers, save time & money and return <br></br> more items of lost property with our lost and found software.</div>
                <div>
                    <button className='border border-[#FF9900] w-48 h-14 rounded-lg text-[#834F00]'>Sign in</button>
                    <button className='w-48 h-14 rounded-lg bg-[#FF9900] ml-5'>Sign Up</button>
                </div>
            </div>

            <div className='relative'>
                <img className='w-full bg-[#00B8B8] opacity-80' src={businessDoodle} alt='businessDoodle' />
                {/* <div className='bg-green flex items-center'> */}
                <div className='absolute top-52 pl-32'>
                    <div className='text-3xl font-bold text-white'>BTZapp win contract to<br></br> replace Europe’s largest lost<br></br> property system</div>
                    <div className='mt-4'>
                        <p className={`text-white font-medium text-base w-1/3 overflow-hidden ${readmore ? 'h-fit' : 'h-36'}`}>
                            New intelligent, cloud-based solution to be introduced across Transport for London.
                            It will cover the entire underground, train and bus network of more than 400 sites and will transform the lost property experience for millions of customers and thousands of TfL staff,
                            increasing efficiency and ensuring more items can be returned.
                            <span > New intelligent, cloud-based solution to be introduced across Transport for London.</span>
                        </p>
                        <button className='text-[#444444] font-medium text-base' onClick={() => setReadmore(!readmore)}>{readmore ? 'Less' : 'More'}...</button>
                    </div>
                </div>
                <div className='absolute top-52 left-2/4 ml-32'>
                    <div className=''><img src={transportLondon} className='h-72' alt='transportLondon' /></div>
                    <div className='flex justify-center mt-8 text-white'><button className='bg-[#FF9900] w-64 h-8'>Click here to find out more</button></div>
                </div>
                {/* </div> */}
            </div>

            <div> <OurBrands /> </div>

            <div className='overflow-hidden flex justify-center py-20'>
                <div><img src={quotes} alt='quotes' /></div>
                <div className='w-3/6'>
                <Slider {...settings}>
                    {contentData.map((items, index) => (
                        <div key={index} className=' w-96'>
                            <div className='text-center text-2xl font-normal'>{items.content}</div>
                            <div className='text-center text-xl font-semibold mt-2 pb-16'>{items.author}</div>
                        </div>
                    ))}
                </Slider>
                </div>
            </div>

            <div><video src='../../assets/videos/container.mp4' /></div>

            <div></div>

            <div></div>

            <div></div>
        </div>
    )
}
