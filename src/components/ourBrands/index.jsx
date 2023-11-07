import React from 'react'
import starbucks from '../../assets/images/startbucks.png';
import amazon from '../../assets/images/amazon.png';
import airarabia from '../../assets/images/airarabia.png';
import suitcase from '../../assets/images/suitcase.png';
import './index.scss';

export default function OurBrands() {
    const businessbrands = [starbucks, amazon, airarabia, suitcase,starbucks, amazon, airarabia, suitcase];
    return (
        <div className='xl:h-80 sm:h-80 xl:w-[1519px] bg-[#F5F5F5] sm:w-screen overflow-hidden'>
            <div className='font-bold text-4xl text-[#676767] opacity-90 xl:ml-20 sm:ml-10 md:text-3xl sm:text-3xl pt-9 mb-7'>Businesses that use our platform</div>
            <div className='flex xl:w-screen md:w-screen xl:pl-20 sm:pl-10 whitespace-nowrap animate-marquee'>
            
                {businessbrands.map((items,i) => {
                    return (
                            <div key={i} className=' flex bg-white mr-5 flex shrink-0 justify-center items-center rounded-3xl w-48 h-44'>
                                <img src={items} alt='brandimages' />
                            </div>
                    );
                })}
                {businessbrands.map((items,i) => {
                    return (
                            <div key={i} className='flex bg-white mr-5 flex shrink-0 justify-center items-center rounded-3xl w-48 h-44'>
                                <img src={items} alt='brandimages' />
                            </div>
                    );
                })}
                

            </div>
        </div>
    )
}
