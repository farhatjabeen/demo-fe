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
        autoplaySpeed: 4000,
        
    };

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex flex-col items-center mt-10 mb-20'>
                <div className='text-4xl font-bold text-[#404041]'>Transform your lost and found process</div>
                <div className='font-normal text-lg te
                xt-center mt-3 mb-8 text-[#404041]'>Reassure your customers, save time & money and return <br></br> more items of lost property with our lost and found software.</div>
                <div>
                    <button className='border border-[#FF9900] w-48 h-14 rounded-lg text-[#834F00]' onClick={()=>navigate('/businessSignIn')}>Sign in</button>
                    <button className='w-48 h-14 rounded-lg bg-[#FF9900] ml-5 ' onClick={()=>navigate('/businessSignIn')}>Sign Up</button>
                </div>
            </div>

            <div className='relative'>
                <img className='w-full bg-[#00B8B8] opacity-80' src={businessDoodle} alt='businessDoodle' />
                {/* <div className='bg-green flex items-center'> */}
                <div className='absolute top-52 pl-32'>
                    <div className='text-3xl font-bold text-white'>BTZapp win contract to<br></br> replace Europe’s largest lost<br></br> property system</div>
                    <div className='mt-4'>
                        <p className={`text-white font-medium text-base w-1/3 overflow-hidden ${readMore ? 'h-fit' : 'h-36'}`}>
                            New intelligent, cloud-based solution to be introduced across Transport for London.
                            It will cover the entire underground, train and bus network of more than 400 sites and will transform the lost property experience for millions of customers and thousands of TfL staff,
                            increasing efficiency and ensuring more items can be returned.
                            <span > New intelligent, cloud-based solution to be introduced across Transport for London.</span>
                        </p>
                        <button className='text-[#444444] font-medium text-base' onClick={() => setReadMore(!readMore)}>{readMore ? 'Less' : 'More'}...</button>
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
                                <div className='text-center text-xl font-medium mt-2 pb-16'>{items.author}</div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div><img src={containers} alt='containers' /></div>

            <div className='px-60 pt-20 pb-80 flex flex-col justify-center items-center'>
                <div className='text-[#404041] font-semibold text-3xl text-center'>How our lost and found software helps<br></br> leading Siberian brands</div>
                <div className='text-[#4C4C4C] text-center py-10'>Lost and found management is a nuisance for staff and frustrating for customers. NotLost helps you get the<br></br>
                    job done with speed and ease, simplifying and automating the tasks you hate. This enables your team to<br></br>
                    respond quickly to customers and return more items, delivering an excellent customer experience. </div>
                <div className='h-44 w-6/12 flex flex-wrap justify-between'>
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
                <div className='flex justify-center text-center text-[#404041]'>
                    BTZapp is transforming lost and found management from a recurring problem into a fast<br></br>
                    and simple process for businesses. Free up valuable staff time, return more items of lost<br></br>
                    property and deliver an excellent customer experience.
                </div>
                <div className='flex justify-center pt-8'>
                    <button className='bg-[#FF9900] h-10 w-40 font-semibold text-white'>Request a demo</button>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div className='flex justify-center text-2xl text-[#404041] font-semibold pt-10'>Explore our industry insights and customer success stories</div>
                <div className='flex justify-between py-16 w-3/4'>
                    {
                        cardValues.map((items, i) => {
                            return (
                                <div className='w-80 bg-white border border-[#DDDDDD] '>
                                    <div><img src={items} alt='containers' /></div>
                                    <div className='pt-5 pb-10 pl-4'>
                                        <div className='text-xl font-semibold w-5/6'>2023 UPDATE: When it comes to software, should I buy or build?</div>
                                        <div className='text-[#666666] text-sm py-5'>May 23, 2023 | Blog, SaaS, Transport</div>
                                        <div className={`text-[#666666] w-64 overflow-hidden`}>
                                            Today we'll be discussing the big question in software development....To buy or to build, This puzzle has been a quandary for heads of businesses...
                                            {/* <span>Today we'll be discussing the big question in software development....</span> */}
                                        </div>
                                        <button className='text-[#FF9900]'>read more</button>
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
