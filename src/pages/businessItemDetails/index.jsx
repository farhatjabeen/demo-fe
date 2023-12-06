import React from 'react'
import keys from '../../assets/images/keys.png';
import BusinessTab from '../../components/businessTab';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewDetails, viewItemById } from '../../redux/reducers/itemsSlice';

export default function BusinessItemDetails() {

    const dispatch = useDispatch();
    const itemId = useParams();
    const itemDetails = useSelector(viewDetails);
    console.log(itemDetails, 'id');
    useEffect(() => {
        dispatch(viewItemById(itemId.id))
    }, [])

    const [activeIndex, setActiveIndex] = useState(0);

    const itemTitles = [{ query: "Item name", answer: itemDetails.itemName }, { query: "Item Category", answer: itemDetails.itemCategory },
    { query: "Item description", answer: itemDetails.itemDescription },
    { query: "Keywords", answer: itemDetails.keywords },
    { query: "Location identifiers", answer: itemDetails.locationIdentifiers }];

    const personTitles = [{ query: "Name", answer: itemDetails.userName },
    { query: "Phone number", answer: itemDetails.mobileNumber },
    { query: "Mail id", answer: itemDetails.emailMailId },
{query: "Location", answer:itemDetails.location}];

    const itemImages = [keys, keys, keys];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % itemDetails.itemImage.length);
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
        <div className='flex flex-col items-center justify-center items-center'>
            <div className='font-semibold text-3xl '>Item details</div>
            <div className='w-3/12 mt-20 '>
                <Slider {...settings}>
                    {itemDetails.itemImage.map((items, i) => {
                        return (
                            <div key={i} className='w-1/2 flex justify-end'><img className='h-96 w-96' src={items} alt='keys' /></div>
                        );
                    })}
                </Slider>
            </div>


            <div className='my-20 w-full flex justify-center'>
                {/* <BusinessTab className="flex"> */}
                <div className='bg-white rounded-lg  xl:w-fit md:w-96 sm:w-72 p-5 mr-10'>
                    <div className='xl:text-3xl md:text-xl sm:text-lg text-primary-color w-full xl:pt-5 md:pt-3 sm:pt-2 xl:pb-10 md:pb-6 sm:pb-5'>Item Description</div>
                    {itemTitles.map((items, i) => {
                        return (
                            <div key={i} className='flex justify-start'>
                                <div className='xl:w-52 md:w-60 sm:w-56 text-[#455A64] xl:text-lg md:text-base sm:text-xs py-1'>{items.query}</div>
                                <div className='xl:w-72 md:w-60 sm:w-56 text-left xl:text-lg md:text-base sm:text-xs font-semibold py-1'>{items.answer}</div>
                            </div>
                        );
                    })}
                </div>

                <div className='bg-white rounded-lg xl:w-fit md:w-96 sm:w-72 p-5 mr-10'>
                    <div className='xl:text-3xl md:text-xl sm:text-lg text-primary-color w-full xl:pt-5 md:pt-3 sm:pt-2 xl:pb-10 md:pb-6 sm:pb-5'>Posted person details</div>
                    {personTitles.map((items, i) => {
                        return (
                            <div key={i} className='flex justify-start'>
                                <div className='xl:w-52 md:w-60 sm:w-56 text-[#455A64] xl:text-lg md:text-base sm:text-xs py-1'>{items.query}</div>
                                <div className='xl:w-72 md:w-60 sm:w-56 text-left xl:text-lg md:text-base sm:text-xs font-semibold py-1'>{items.answer}</div>
                            </div>
                        );
                    })}
                </div>
                {/* </BusinessTab> */}
            </div>

        </div>
    )
}
