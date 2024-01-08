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
import { useNavigate } from 'react-router-dom';

export default function BusinessHome() {
    const [readMore, setReadMore] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const contentData = [
        {
            content: "“I have points across so many programs. Thanks to BTZapp, I can now use all these points together to get what I want.”", author: "Mark"
        },
        {
            content: "“Rise up & attack the day with Passion. The struggle you're in today is developing the strength you need for tomorrow.”", author: "Antony"
        },
        {
            content: "“life isn't about black and white,look around and you will see that the world is much more colorful than you thought”", author: "John"
        }];

    const iconAndCaption = [{ icons: bione, caption: "Simple and reassuring for your customers" },
    { icons: bitwo, caption: "Generate positive feedback and reviews" },
    { icons: bithree, caption: "Free up valuable time" },
    { icons: bifour, caption: "Automate manual tasks" },
    { icons: bifive, caption: "Respond to internal audits" },
    { icons: bisix, caption: "Improve visibility for management" }]

    const cardValues = [containers, containers, containers]
    const intervalTime = 2000;
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % contentData.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const settings = {
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: intervalTime
    };

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex flex-col items-center mt-10 mb-20'>
                <div className='xl:text-4xl md:text-4xl sm:text-2xl font-bold text-text-color'>Transform your lost and found process</div>
                <div className='font-normal xl:text-lg md:text-lg sm:text-xs text-center mt-3 mb-8 text-text-color'>Reassure your customers, save time & money and return <br></br> more items of lost property with our lost and found software.</div>
                <div>
                    <button className='cursor-pointer border border-[#FF9900] xl:w-48 md:w-48 sm:w-32 xl:h-14 md:h-14 sm:h-10 rounded-lg text-[#834F00]' onClick={() => navigate('/businessSignIn')}>Sign in</button>
                    <button className='cursor-pointer xl:w-48 md:w-48 sm:w-32 xl:h-14 md:h-14 sm:h-10 rounded-lg bg-[#FF9900] ml-5 ' onClick={() => navigate('/businessignup')}>Sign Up</button>
                </div>
            </div>

            <div className='relative'>
                <img className='w-full bg-[#00B8B8] opacity-80' src={businessDoodle} alt='businessDoodle' />
                <div className='absolute top-0 xl:pt-36 md:pt-16 sm:pt-14 xl:pl-32 md:pl-16 sm:pl-5 z-50'>
                    <div className='xl:text-3xl md:text-2xl sm:text-xl font-extrabold text-white'>BTZapp win contract to<br></br> replace Europe’s largest lost<br></br> property system</div>
                    <div className='xl:mt-4 md:mt-4 sm:mt-2'>
                        <p className={`text-white font-medium xl:text-lg md:text-sm sm:text-xs xl:w-4/12 md:w-5/12 sm:w-6/12 overflow-hidden ${readMore ? 'h-fit' : 'xl:h-36 md:h-36 sm:h-16'}`}>
                            New intelligent, cloud-based solution to be introduced across Transport for London.
                            It will cover the entire underground, train and bus network of more than 400 sites and will transform the lost property experience for millions of customers and thousands of TfL staff,
                            increasing efficiency and ensuring more items can be returned. <span > New intelligent,
                                cloud-based solution to be introduced across Transport for London.</span>
                        </p>
                        <button className='text-primary-color font-medium xl:text-lg md:text-sm sm:text-xs' onClick={() => setReadMore(!readMore)}>{readMore ? 'Less' : 'More'}...</button>
                    </div>
                    <div className='text-white'>
                        <button className='bg-primary-color px-4 py-1 rounded-md xl:text-lg md:text-sm sm:text-xs' onClick={() => navigate('/businesshome/detailpage')}>Know more</button>
                        </div>
                </div>
                <div className='absolute xl:top-0 xl:pt-36 md:top-14 sm:top-10 w-full flex flex-col items-end xl:pr-32 md:pr-16 sm:pr-7'>
                    <div><img src={transportLondon} className='xl:h-72 xl:w-full md:h-56 md:w-80 sm:h-40 sm:w-60' alt='transportLondon' /></div>
                </div>
            </div>

            <div> <OurBrands /> </div>

            <div className='overflow-hidden flex justify-center py-20'>
                <div><img src={quotes} alt='quotes' className='sm:h-20 w-20' /></div>
                <div className='xl:w-3/6 md:w-4/6 sm:w-5/6'>
                    <Slider {...settings}>
                        {contentData.map((items, index) => (
                            <div key={index} className=' w-96'>
                                <div className='text-center xl:text-3xl md:text-xl sm:text-lg  font-normal'>{items.content}</div>
                                <div className='text-center xl:text-2xl md:text-xl sm:text-lg font-semibold mt-2 pb-16'>{items.author}</div>
                            </div>
                        ))}
                    </Slider>
                    <div className=" flex justify-center">
                        <ul className="flex">
                            {contentData.map((_, index) => (
                                <li key={index} className="mx-1">
                                    <button
                                        className={`cursor-pointer h-3 w-3 ${index === activeIndex ? "bg-orange" : "bg-light-gray"
                                            }`}
                                    ></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div><img src={containers} alt='containers' /></div>

            <div className='xl:px-60 md:52 pt-20 pb-20 flex flex-col justify-center items-center'>
                <div className='text-text-color font-semibold xl:text-3xl md:text-2xl sm:text-xl text-center'>How our lost and found software helps<br></br> leading Siberian brands</div>
                <div className='text-[#4C4C4C] xl:text-lg md:text-sm sm:text-xs text-center py-10'>Lost and found management is a nuisance for staff and frustrating for customers. NotLost helps you get the<br></br>
                    job done with speed and ease, simplifying and automating the tasks you hate. This enables your team to<br></br>
                    respond quickly to customers and return more items, delivering an excellent customer experience. </div>
                <div className=' flex flex-wrap md-justify-between justify-center  mx-auto'>
                    {
                        iconAndCaption.map((items, i) => {
                            return (
                                <div key={i} className='py-5 sm:py-2 md:py-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3'>
                                    <div><img src={items.icons} alt='bione' /></div>
                                    <div className='text-center text-text-color w-32 pt-5'>{items.caption}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className='bg-[#FFF0DA] py-16 flex justify-center text-center text-text-color font-semibold xl:text-xl md:text-lg sm:text-base'>

                BTZapp is transforming lost and found management from a recurring problem into a fast<br></br>
                and simple process for businesses. Free up valuable staff time, return more items of lost<br></br>
                property and deliver an excellent customer experience.

            </div>
            <div className='flex flex-col items-center'>
                <div className='flex justify-center xl:text-3xl md:text-2xl text-text-color font-semibold pt-10'>Explore our industry insights and customer success stories</div>
                <div className='flex flex-wrap justify-between py-16 xl:w-3/4 md:w-full sm:w-full md:px-8 sm:px-5 '>
                    {
                        cardValues.map((items, i) => {
                            return (
                                <div key={i} className='w-full sm:w-1/1 lg:w-1/4 xl:w-1/4 md:w-1/4 bg-white border border-[#DDDDDD] mb-8 mx-auto'>
                                    <div><img src={items} alt='containers' /></div>
                                    <div className='pt-5 pb-10 px-4'>
                                        <div className='text-lg font-semibold'>2023 UPDATE: When it comes to software, should I buy or build?</div>
                                        <div className='text-[#666666] text-xs py-2'>May 23, 2023 | Blog, SaaS, Transport</div>
                                        <div className='text-[#666666] font-medium text-sm overflow-hidden'>
                                            Today we'll be discussing the big question in software development....To buy or to build, This puzzle has been a quandary for heads of businesses...
                                        </div>
                                        <button className='cursor-pointer text-[#FF9900] text-xs'>read more</button>
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
