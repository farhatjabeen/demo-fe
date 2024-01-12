import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewDetails, viewItemById, viewUserItemById } from '../../redux/reducers/itemsSlice';
import { userData } from '../../redux/reducers/userSlice';
import { IoMdArrowBack } from "react-icons/io";

export default function BusinessItemDetails() {

    const dispatch = useDispatch();
    const itemId = useParams();
    const itemDetails = useSelector(viewDetails);
    const userDetails = useSelector(userData);
    useEffect(() => {
        if (userDetails?.role === 'BUSINESS') {
            dispatch(viewItemById(itemId.id))
        } else {
            dispatch(viewUserItemById(itemId.id))
        }
    }, [itemId])


    const itemTitles = [{ query: "Item name", answer: itemDetails.itemName }, { query: "Item Category", answer: itemDetails.itemCategory },
    { query: "Item description", answer: itemDetails.itemDescription },
    { query: "Keywords", answer: `${itemDetails.keywords}` },
    { query: "Location identifiers", answer: itemDetails.locationIdentifiers }];


    const personTitles = [{ query: "Name", answer: itemDetails.userName },
    { query: "Phone number", answer: itemDetails.mobileNumber },
    { query: "Mail id", answer: itemDetails.emailMailId },
    { query: "Location", answer: itemDetails.location }];

    useEffect(() => {
        const interval = setInterval((prevIndex) => (prevIndex + 1) % itemDetails?.itemImage?.length);

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
        <div className='flex relative flex-col justify-center items-center'>
            <button className='cursor-pointer absolute left-20 text-2xl top-2' onClick={()=> window.history.back()}><IoMdArrowBack /></button>
            <div className='font-semibold text-3xl '>Item details</div>
            <div className='w-3/12 mt-20 '>
                <Slider {...settings}>
                    {itemDetails?.itemImage?.map((items, i) => {
                        return (
                            // <div key={i} className='w-1/2 flex justify-end'>
                                <img className='h-96 w-fit' src={items} alt='keys' />
                            // </div>
                        );
                    })}
                </Slider>
            </div>


            <div className='my-20 w-full flex justify-center'>
                <div className='bg-white rounded-lg mx-16 bg-green xl:w-full md:w-96 sm:w-72 p-5 '>
                    <div className='xl:text-3xl md:text-xl sm:text-lg text-primary-color w-full xl:pt-5 md:pt-3 sm:pt-2 xl:pb-10 md:pb-6 sm:pb-5'>Item Description</div>
                    {itemTitles.map((items, i) => {
                        return (
                            <div key={i} className='flex justify-start'>
                                <div className='xl:w-52 md:w-60 sm:w-56 text-light-black xl:text-lg md:text-base sm:text-xs py-1'>{items.query}</div>
                                <div className='xl:w-full text-left xl:text-lg md:text-base sm:text-xs font-semibold py-1'>{items.answer}</div>
                            </div>
                        );
                    })}
                </div>

                {/* {userDetails?.role === 'BUSINESS' ?
                    <div className='bg-white rounded-lg xl:w-max md:w-96 sm:w-72 p-5 mr-10'>
                        <div className='xl:text-3xl md:text-xl sm:text-lg text-primary-color w-full xl:pt-5 md:pt-3 sm:pt-2 xl:pb-10 md:pb-6 sm:pb-5'>Posted person details</div>
                        {personTitles.map((items, i) => {
                            return (
                                <div key={i} className='flex justify-start'>
                                    <div className='xl:w-52 md:w-60 sm:w-56 text-light-black xl:text-lg md:text-base sm:text-xs py-1'>{items.query}</div>
                                    <div className='xl:w-96 md:w-60 sm:w-56 text-left xl:text-lg md:text-base sm:text-xs font-semibold py-1'>{items.answer}</div>
                                </div>
                            );
                        })}
                    </div>
                    :
                    ""} */}
            </div>

        </div>
    )
}
