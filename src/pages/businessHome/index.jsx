import React, { useState } from 'react';
import businessDoodle from '../../assets/images/businessDoodle.png';
import transportLondon from '../../assets/images/transportLondon.png';
import quotes from '../../assets/images/quotes.png';
import OurBrands from '../../components/ourBrands';
import containers from '../../assets/images/containers.jpg';
import bione from '../../assets/images/businessicon1.png';
import bitwo from '../../assets/images/businessicon2.png';
import bithree from '../../assets/images/businessicon3.png';
import bifour from '../../assets/images/businessicon4.png';
import bifive from '../../assets/images/businessicon5.png';
import bisix from '../../assets/images/businessicon6.png';
import { useEffect } from 'react';
import Slider from 'react-slick';
import './index.scss';
import { useNavigate } from 'react-router-dom';

export default function BusinessHome() {
    const [readMore, setReadMore] = useState(false);
    // const [more, setMore] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();

    const contentData = [{
        content: "“I have points across so many programs. Thanks to BTZapp, I can now use all these points together to get what I want.”",
        author: "Mark"
    },
    { content: "“Rise up & attack the day with Passion. The struggle you're in today is developing the strength you need for tomorrow.”", author: "Antony" }, { content: "“life isn't about black and white,look around and you will see that the world is much more colorful than you thought”", author: "John" }];

    const iconAndCaption = [{ icons: bione, caption: "Simple and reassuring for your customers" },
    { icons: bitwo, caption: "Generate positive feedback and reviews" },
    { icons: bithree, caption: "Free up valuable time" },
    { icons: bifour, caption: "Automate manual tasks" },
    { icons: bifive, caption: "Respond to internal audits" },
    { icons: bisix, caption: "Improve visibility for management" }]

    const cardValues = [containers, containers, containers]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % contentData.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex flex-col items-center mt-10 mb-20'>
                <div className='xl:text-4xl md:text-4xl sm:text-2xl font-bold text-[#404041]'>Transform your lost and found process</div>
                <div className='font-normal xl:text-lg md:text-lg sm:text-xs text-center mt-3 mb-8 text-[#404041]'>Reassure your customers, save time & money and return <br></br> more items of lost property with our lost and found software.</div>
                <div>
                    <button className='border border-[#FF9900] xl:w-48 md:w-48 sm:w-32 xl:h-14 md:h-14 sm:h-10 rounded-lg text-[#834F00]' onClick={() => navigate('/businessSignIn')}>Sign in</button>
                    <button className='xl:w-48 md:w-48 sm:w-32 xl:h-14 md:h-14 sm:h-10 rounded-lg bg-[#FF9900] ml-5 ' onClick={() => navigate('/businessSignIn')}>Sign Up</button>
                </div>
            </div>

            <div className='relative'>
                <img className='w-full bg-[#00B8B8] opacity-80' src={businessDoodle} alt='businessDoodle' />
                {/* <div className='bg-green flex items-center'> */}
                <div className='absolute xl:top-44 md:top-12 sm:top-6 xl:pl-32 md:pl-16 sm:pl-5'>
                    <div className='xl:text-4xl md:text-2xl sm:text-xl font-bold text-white'>BTZapp win contract to<br></br> replace Europe’s largest lost<br></br> property system</div>
                    <div className='xl:mt-4 md:mt-4 sm:mt-2'>
                        <p className={`text-white font-medium xl:text-lg md:text-sm sm:text-xs xl:w-4/12 md:w-2/5 sm:w-6/12 overflow-hidden ${readMore ? 'h-fit' : 'xl:h-36 md:h-36 sm:h-24'}`}>
                            New intelligent, cloud-based solution to be introduced across Transport for London.
                            It will cover the entire underground, train and bus network of more than 400 sites and will transform the lost property experience for millions of customers and thousands of TfL staff,
                            increasing efficiency and ensuring more items can be returned. <span > New intelligent,
                                cloud-based solution to be introduced across Transport for London.</span>
                        </p>
                        <button className='text-[#444444] font-medium xl:text-lg md:text-sm sm:text-xs' onClick={() => setReadMore(!readMore)}>{readMore ? 'Less' : 'More'}...</button>
                    </div>
                </div>
                <div className='absolute xl:top-40 md:top-14 sm:top-7 xl:left-2/4 md:left-80 sm:left-52 ml-32'>
                    <div className=''><img src={transportLondon} className='xl:h-72 xl:w-full md:h-56 md:w-full sm:h-44 sm:w-full' alt='transportLondon' /></div>
                    <div className='flex justify-center xl:mt-8 md:mt-6 sm:mt-4 text-white'><button className='bg-[#FF9900] xl:w-72 md:w-52 sm:w-44 xl:h-10 md:h-9 sm:h-7 xl:text-lg md:text-sm sm:text-xs'>Click here to find out more</button></div>
                </div>
                {/* </div> */}
            </div>

            <div> <OurBrands /> </div>

            <div className='overflow-hidden flex justify-center py-20'>
                <div><img src={quotes} alt='quotes' className='sm:h-20 w-20' /></div>
                <div className='xl:w-3/6 md:w-4/6 sm:w-5/6'>
                    <Slider {...settings}>
                        {contentData.map((items, index) => (
                            <div key={index} className=' w-96'>
                                <div className='text-center xl:text-2xl md:text-xl sm:text-lg font-normal'>{items.content}</div>
                                <div className='text-center xl:text-xl md:text-xl sm:text-lg font-medium mt-2 pb-16'>{items.author}</div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div><img src={containers} alt='containers' /></div>

            <div className='xl:px-60 md:52 pt-20 pb-80 flex flex-col justify-center items-center'>
                <div className='text-[#404041] font-semibold xl:text-3xl md:text-2xl sm:text-xl text-center'>How our lost and found software helps<br></br> leading Siberian brands</div>
                <div className='text-[#4C4C4C] xl:text-lg md:text-sm sm:text-xs text-center py-10'>Lost and found management is a nuisance for staff and frustrating for customers. NotLost helps you get the<br></br>
                    job done with speed and ease, simplifying and automating the tasks you hate. This enables your team to<br></br>
                    respond quickly to customers and return more items, delivering an excellent customer experience. </div>
                <div className='h-44 xl:w-6/12 md:w-7/12 sm:w-10/12 flex flex-wrap justify-between'>
                    {
                        iconAndCaption.map((items, i) => {
                            return (
                                <div key={i} className='py-10 flex flex-col items-center'>
                                    <div><img src={items.icons} alt='bione' /></div>
                                    <div className='text-center text-[#404041] w-32 pt-5'>{items.caption}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className='bg-[#FFF0DA] py-16'>
                <div className='flex justify-center text-center text-[#404041] xl:text-lg md:text-lg sm:text-base '>
                    BTZapp is transforming lost and found management from a recurring problem into a fast<br></br>
                    and simple process for businesses. Free up valuable staff time, return more items of lost<br></br>
                    property and deliver an excellent customer experience.
                </div>
                <div className='flex justify-center pt-8'>
                    <button className='bg-[#FF9900] h-10 w-40 font-semibold text-white'>Request a demo</button>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div className='flex justify-center xl:text-2xl md:text-xl text-[#404041] font-semibold pt-10'>Explore our industry insights and customer success stories</div>
                <div className='flex justify-between py-16 xl:w-3/4 md:w-full sm:w-full md:px-8 sm:px-50 '>
                    {
                        cardValues.map((items, i) => {
                            return (
                                <div key={i} className='xl:w-80 md:w-64 sm:w-48 bg-white border border-[#DDDDDD]'>
                                    <div><img src={items} alt='containers' /></div>
                                    <div className='pt-5 pb-10 xl:pl-4 md:pl-4 sm:pl-3'>
                                        <div className='xl:text-xl md:text-base sm:text-sm font-semibold w-5/6'>2023 UPDATE: When it comes to software, should I buy or build?</div>
                                        <div className='text-[#666666] xl:text-sm md:text-xs sm:text-xs py-5'>May 23, 2023 | Blog, SaaS, Transport</div>
                                        <div className={`text-[#666666] xl:w-64 md:w-52 sm:w-40 xl:text-base md:text-sm sm:text-xs overflow-hidden`}>
                                            Today we'll be discussing the big question in software development....To buy or to build, This puzzle has been a quandary for heads of businesses...
                                            {/* <span>Today we'll be discussing the big question in software development....</span> */}
                                        </div>
                                        <button className='text-[#FF9900] xl:text-base md:text-base sm:text-xs'>read more</button>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        </div>
    )
}
