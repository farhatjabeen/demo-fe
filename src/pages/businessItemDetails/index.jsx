import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { viewDetails, viewItemById, viewUserItemById } from '../../redux/reducers/itemsSlice'
import { userData } from '../../redux/reducers/userSlice'
import { IoMdArrowBack } from 'react-icons/io'
import { goToTop } from '../../utils/helper'
import './index.css'

export default function BusinessItemDetails() {
  const [isLoader, setIsLoader] = useState(true)
  const dispatch = useDispatch()
  const itemId = useParams()
  const itemDetails = useSelector(viewDetails)
  const userDetails = useSelector(userData)
  useEffect(() => {
    goToTop()
    const fetchData = async () => {
      setIsLoader(true)
      try {
        if (userDetails?.role === 'BUSINESS') {
          await dispatch(viewItemById(itemId.id))
        } else {
          await dispatch(viewUserItemById(itemId.id))
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoader(false)
      }
    }

    fetchData()
  }, [dispatch, itemId, userDetails])

  const itemTitles = [
    { query: 'Item name', answer: itemDetails.itemName },
    { query: 'Item Category', answer: itemDetails.itemCategory },
    { query: 'Item description', answer: itemDetails.itemDescription },
    { query: 'Keywords', answer: `${itemDetails.keywords}` },
    { query: 'Location identifiers', answer: itemDetails.locationIdentifiers },
  ]

  const settings = {
    infinite: true,
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    customPaging: () => <button className="slick-dot"></button>,
  }

  return (
    <div className="flex relative flex-col justify-center items-center">
      <button
        className="cursor-pointer absolute left-20 text-2xl top-2"
        onClick={() => window.history.back()}
      >
        <IoMdArrowBack />
      </button>
      <h1 className="font-semibold text-3xl ">Item details</h1>
      {isLoader ? (
        <p className="font-bold p-24 flex justify-center w-full text-md">Loading...</p>
      ) : (
        <>
          <div className="w-3/12 mt-20 ">
            <Slider {...settings}>
              {itemDetails?.itemImage?.map((items, i) => {
                return <img className="h-96 w-fit" src={items} alt="keys" />
              })}
            </Slider>
          </div>
          <div className="my-20 w-full flex justify-center">
            <div className="bg-white rounded-lg mx-16 bg-green xl:w-full md:w-96 sm:w-72 p-5 ">
              <div
                className="xl:text-3xl md:text-xl sm:text-lg text-primary-color w-full xl:pt-5 md:pt-3 
                            sm:pt-2 xl:pb-10 md:pb-6 sm:pb-5"
              >
                Item Description
              </div>
              {itemTitles.map((items, i) => {
                return (
                  <div key={i} className="flex justify-start">
                    <div
                      className="xl:w-52 md:w-60 sm:w-56 text-light-black xl:text-xl md:text-lg sm:text-xs 
                                            py-1 font-bold"
                    >
                      {items.query}
                    </div>
                    <div
                      className={
                        userDetails?.role === 'BUSINESS'
                          ? 'xl:w-72 md:w-60 sm:w-56 text-left xl:text-xl md:text-base sm:text-xs font-bold py-1'
                          : 'xl:w-full text-left xl:text-xl md:text-base sm:text-xs font-bold py-1'
                      }
                    >
                      {items.answer}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
