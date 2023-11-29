import React from 'react'
import keys from '../../assets/images/keys.png';
import BusinessTab from '../../components/businessTab';
import Slider from 'react-slick';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewDetails, viewItemById } from '../../redux/reducers/itemsSlice';

export default function BusinessItemDetails() {

const dispatch = useDispatch();
const itemId = useParams();
const itemDetails = useSelector(viewDetails);
console.log(itemDetails,'id');
  useEffect(()=>{
    dispatch(viewItemById(itemId.id))
  },[])

    const [activeIndex, setActiveIndex] = useState(0);

    const itemTitles = [{ query: "Item name", answer: itemDetails.itemName }, { query: "Item Category", answer: itemDetails.itemCategory },
    { query: "Item description", answer: itemDetails.itemDescription },
    { query: "Keywords", answer: itemDetails.keywords },
    { query: "Location identifiers", answer: itemDetails.locationIdentifiers }];

    const personTitles = [{ query: "Name", answer: itemDetails.userName },
    { query: "Phone number", answer: itemDetails.mobileNumber },
    { query: "Mail id", answer: itemDetails.emailMailId }];

    const itemImages = [keys,keys,keys];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % itemImages.length);
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
        <div className='flex flex-col justify-center items-center'>
            <div className='font-semibold text-3xl '>Item details</div>
            <div className='w-3/12 mt-20 '>

            <Slider {...settings}>
                {itemImages.map((items,i)=>{
                    return(
                        <div key={i} className='w-1/2 flex justify-end '><img className='h-96 w-96' src={items} alt='keys' /></div>
                    );
                })}
                {/* <div className='w-1/2 h-96 flex flex-col space-y-8 '>
                    <img className='w-full h-44' src={keys} alt='keys' />
                    <img className='w-full h-44 ' src={keys} alt='keys' />
                </div> */}
            </Slider>
            </div>


            <div className='my-20 flex'>
                {/* <BusinessTab className="flex"> */}
                    <div className='bg-white mr-10'>
                        <div className='text-3xl text-primary-color pt-5 pl-10 pb-10'>Item Description</div>
                        {itemTitles.map((items, i) => {
                            return (
                                <div key={i} className='flex px-10'>
                                    <div className='xl:w-52 md:w-48 sm:w-40 p-2 text-[#455A64] xl:text-lg md:text-lg sm:text-base'>{items.query}</div>
                                    <div className='xl:w-72 md:w-60 sm:w-56 text-left xl:text-lg md:text-lg sm:text-base xl:font-semibold md:font-semibold sm:font-medium p-2'>{items.answer}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='bg-white mr-10'>
                        <div className='text-3xl text-primary-color pt-5 pl-10 pb-10'>Posted person details</div>
                        {personTitles.map((items, i) => {
                            return (
                                <div key={i} className='flex px-10'>
                                    <div className='xl:w-52 md:w-48 sm:w-40 p-2 text-[#455A64] xl:text-xl'>{items.query}</div>
                                    <div className='xl:w-72 md:w-60 sm:w-56 text-left xl:text-xl xl:font-semibold p-2'>{items.answer}</div>
                                </div>
                            );
                        })}
                    </div>
                {/* </BusinessTab> */}
            </div>

        </div>
    )
}
