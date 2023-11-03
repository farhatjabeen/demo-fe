import React from 'react'
import starbucks from '../../assets/images/startbucks.png';
import amazon from '../../assets/images/amazon.png';
import airarabia from '../../assets/images/airarabia.png';
import suitcase from '../../assets/images/suitcase.png';
import './index.scss';

export default function OurBrands() {
    const businessbrands = [starbucks, amazon, airarabia, suitcase, amazon, starbucks, suitcase, airarabia, amazon];
    return (
        <div className='h-80 bg-[#F5F5F5] overflow-hidden'>
            <div className='font-bold text-4xl text-[#676767] opacity-90 ml-20 pt-9 mb-7'>Businesses that use our platform</div>
            <div className='flex flex-row w-[1519px] whitespace-nowrap pl-20 anim animate-slider'>
                {businessbrands.map((items) => {
                    return (
                            <div className='flex bg-white mr-5 flex shrink-0 justify-center items-center rounded-3xl w-48 h-44'>
                                <img src={items} alt='brandimages' />
                            </div>
                    );
                })}
                {businessbrands.map((items) => {
                    return (
                            <div className='flex bg-white mr-5 flex shrink-0 justify-center items-center rounded-3xl w-48 h-44'>
                                <img src={items} alt='brandimages' />
                            </div>
                    );
                })}

            </div>
        </div>
    )
}
