import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewDetails, viewItemById, viewUserItemById } from '../../redux/reducers/itemsSlice';
import { userData } from '../../redux/reducers/userSlice';
import { IoMdArrowBack } from "react-icons/io";
import { goToTop } from '../../utils/helper';
export default function BusinessItemDetails() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoader, setIsLoader] = useState(true);
    const dispatch = useDispatch();
    const itemId = useParams();
    const itemDetails = useSelector(viewDetails);
    const userDetails = useSelector(userData);
    useEffect(() => {
        goToTop (); 
        const fetchData = async () => {
            setIsLoader(true);
            try {
                if (userDetails?.role === 'BUSINESS') {
                    await dispatch(viewItemById(itemId.id));
                } else {
                    await dispatch(viewUserItemById(itemId.id));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoader(false);
            }
        };

        fetchData();
    }, [dispatch, itemId, userDetails]);

    const itemTitles = [{ query: "Item name", answer: itemDetails.itemName }, { query: "Item Category", answer: itemDetails.itemCategory },
    { query: "Item description", answer: itemDetails.itemDescription },
    { query: "Keywords", answer: `${itemDetails.keywords}` },
    { query: "Location identifiers", answer: itemDetails.locationIdentifiers }];


    const personTitles = [{ query: "Name", answer: itemDetails.userName },
    { query: "Phone number", answer: itemDetails.mobileNumber },
    { query: "Mail id", answer: itemDetails.emailMailId },
    { query: "Location", answer: itemDetails.location }];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % itemDetails?.itemImage?.length);
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
        autoplaySpeed: 2000,
    };


    return (
        <div className='flex relative flex-col justify-center items-center'>
            <button className='cursor-pointer absolute left-20 text-2xl top-2' onClick={() => window.history.back()}><IoMdArrowBack /></button>
            <h1 className='font-semibold text-3xl '>Item details</h1>
            {isLoader ?
                <p className='font-bold p-24 flex justify-center w-full text-md'>Loading...</p>
                :
                <>
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
                    <div className='flex justify-center mt-4'>
                        {itemDetails?.itemImage?.map((_, i) => (
                            <button
                                className={`cursor-pointer rounded h-2 w-2 mx-1 ${i === activeIndex ? "bg-info" : "bg-gray2"
                                    }`}
                            ></button>
                        ))}
                    </div>


                    <div className='my-20 w-full flex justify-center'>
                        <div className='bg-white rounded-lg mx-16 bg-green xl:w-full md:w-96 sm:w-72 p-5 '>
                            <div className='xl:text-3xl md:text-xl sm:text-lg text-primary-color w-full xl:pt-5 md:pt-3 sm:pt-2 xl:pb-10 md:pb-6 sm:pb-5'>Item Description</div>
                            {itemTitles.map((items, i) => {
                                return (
                                    <div key={i} className='flex justify-start'>
                                        <div
                                            className='xl:w-52 md:w-60 sm:w-56 text-light-black xl:text-xl md:text-lg sm:text-xs py-1 font-bold'>
                                            {items.query}
                                        </div>
                                        <div
                                            className={userDetails?.role === 'BUSINESS' ? 'xl:w-72 md:w-60 sm:w-56 text-left xl:text-xl md:text-base sm:text-xs font-bold py-1' : 'xl:w-full text-left xl:text-xl md:text-base sm:text-xs font-bold py-1'}>
                                            {items.answer}
                                        </div>
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
                                    <div className='xl:w-52 md:w-60 sm:w-56 text-light-black xl:text-xl md:text-base sm:text-xs py-1 font-bold'>{items.query}</div>
                                    <div className='xl:w-96 md:w-60 sm:w-56 text-left xl:text-xl md:text-base sm:text-xs font-bold py-1'>{items.answer}</div>
                                </div>
                            );
                        })}
                    </div>
                    :
                    ""} */}
                    </div>
                </>
            }
        </div>
    )
}
