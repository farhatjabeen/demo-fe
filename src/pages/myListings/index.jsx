import React, { useState, useEffect } from 'react'
import { FaRegMap, FaRegCalendar, FaRegClock } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMyListingItems, itemDetails, myListingItems } from '../../redux/reducers/itemsSlice'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from '../../components/common/pagination'

export default function MyListings() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const myReports = useSelector(itemDetails)
  const [isLoader, setIsLoader] = useState(false)
  const tableData = useSelector(itemDetails)
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const pageNow = searchParams.get('page')

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page')
    const fetchData = async () => {
      setIsLoader(true)
      const listingItems = await dispatch(myListingItems(page))
      if (listingItems) {
        setIsLoader(false)
      }
      if (!myReports) {
        navigate('/')
      }
    }
    fetchData()
  }, [location.search])

  const handleEditItem = (itemId) => {
    navigate(`/user/addMoreDetails/${itemId}`)
  }

  const handleListingDelete = (itemId) => {
    try {
      dispatch(deleteMyListingItems({ itemId }))
      dispatch(myListingItems(pageNow))
    } catch (error) {
      console.error('submitData errors', error)
    }
  }

  const handlePageChange = (pageNumber) => {
    navigate(`/user/mylistings?page=${pageNumber}`)
  }

  return (
    <div className="mb-5 flex flex-col items-center">
      <div className="font-bold xl:text-4xl md:text-3xl sm:text-2xl">My listings</div>

      {isLoader ? (
        <p className="font-bold p-24 flex justify-center w-full text-md">Loading...</p>
      ) : (
        <div className="mt-14  xl:w-11/12 md:w-10/12 sm:w-8/12 ">
          {myReports?.list?.length ? (
            myReports.list.map((details, i) => (
              <div key={i} className="mb-5 w-full flex justify-center items-center">
                <div className="w-1/3">
                  {details.itemImage[0] ? (
                    <img
                      src={details.itemImage[0]}
                      alt="keys"
                      className="rounded-3xl w-full xl:h-72 md:h-60 sm:h-56"
                    ></img>
                  ) : (
                    <div
                      className="flex justify-center items-center bg-white xl:h-72 md:h-60 sm:h-56 
                                    rounded-3xl xl:p-8 md:p-6 sm:p-6 border border-solid border-white-grey"
                    >
                      <p>No Image</p>
                    </div>
                  )}
                </div>
                <div
                  className="bg-white w-2/3 xl:h-72 md:h-60 sm:h-56 rounded-3xl xl:p-8 md:p-6 sm:p-6 
                            ml-5 border border-solid border-white-grey"
                >
                  <div className="font-bold xl:text-4xl md:text-3xl sm:text-2xl">
                    {details.itemName}
                  </div>
                  <div className="xl:mt-6 md:mt-6 sm:mt-3">
                    <div className="w-64 flex">
                      <div className="flex items-center">
                        <FaRegMap style={{ color: '#00b8b8', height: '17px', width: '20px' }} />
                      </div>
                      <div className=" xl:text-lg md:text-lg sm:text-base ml-2">
                        {details?.location}
                      </div>
                    </div>

                    <div className="w-64 mt-2 flex">
                      <div className="flex items-center">
                        <FaRegCalendar
                          style={{ color: '#00b8b8', height: '17px', width: '20px' }}
                        />
                      </div>
                      <div className=" xl:text-lg md:text-lg sm:text-base ml-2">
                        {details?.foundDate}
                      </div>
                    </div>
                    <div className="w-64 mt-2 flex">
                      <div className="flex items-center">
                        <FaRegClock style={{ color: '#00b8b8', height: '17px', width: '20px' }} />
                      </div>
                      <div className=" xl:text-lg md:text-lg sm:text-base ml-2">
                        {details?.foundTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-5">
                    <button
                      onClick={() => handleEditItem(details._id)}
                      className="cursor-pointer bg-primary-color xl:w-40 xl:h-12 md:w-32 md:h-10 sm:w-32 
                                        sm:h-9 rounded-lg text-sm"
                    >
                      Edit Content
                    </button>

                    <button
                      onClick={() => handleListingDelete(details._id)}
                      className="cursor-pointer border border-#BC0000 text-dark-red xl:w-40 xl:h-12 md:w-32 
                                        md:h-10 sm:w-32 sm:h-9 rounded-lg text-sm ml-2"
                    >
                      Remove Listing
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="font-bold p-24 flex justify-center w-full text-md">No Data Found</p>
          )}
        </div>
      )}
      <Pagination
        currentPage={tableData?.pageMeta?.page}
        totalPages={tableData?.pageMeta?.totalPages}
        isBlueBackground={false}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
