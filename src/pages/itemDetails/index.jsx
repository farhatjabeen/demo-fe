import React, { useState, useEffect } from "react";
import Breadcrumbs from '../../components/common/breadcrumbs';
import { useParams } from "react-router-dom";
import { foundItemById, getItemId } from "../../redux/reducers/itemsSlice";
import { useDispatch, useSelector } from "react-redux";


function ItemDetails() {
  const [isLoader, setIsLoader] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoader(true);
    dispatch(foundItemById(id)).then(() => {
      setIsLoader(false);
    })
  }, [dispatch, id]);
  const foundItemDetails = useSelector(getItemId);
  const { userName, itemCode, mobileNumber, foundDate, emailMailId, keywords, locationIdentifiers, foundTime, location, itemName, itemCategory, itemDescription } = foundItemDetails || {};

  return (
    <div className="m-4">
      <div>
        <Breadcrumbs
          items={[
            { label: 'Found Items', link: '/admin/user/foundItems', className: 'text-black   xl:text-4xl sm:text-xl mt-10' },
            { label: `Item Details (#${itemCode})`, className: 'text-black font-bold  xl:text-4xl sm:text-xl mt-10' },
          ]}
        />
      </div>
      {isLoader ? <p className='font-bold p-24 flex justify-center w-full text-md'>Loading...</p>
        :
        <>
          <div className="bg-white mt-10 rounded-lg p-4 shadow-md">
            <div className=" border-b pb-4 mx-4 justify-between">
              <div>
                <h1 className="text-navy-blue font-bold text-xl mt-2">
                  Founder Details
                </h1>
              </div>
            </div>
            <div className="p-4 ">
              <div className="xl:flex lg:flex md:flex xs:block ">
                <div className="mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <p className="font-bold mb-2">Founder Name</p>
                  <p>{userName}</p>
                </div>
                <div className="mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <p className="font-bold mb-2">Founder Mobile Number</p>
                  <p>{mobileNumber}</p>
                </div>
                <div className="mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <p className="font-bold mb-2">Founder Email ID</p>
                  <p>{emailMailId}</p>
                </div>
              </div>
              <div className='xl:flex lg:flex md:flex xs:block '>
                <div className="mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <p className="font-bold mb-2">Found Date</p>
                  <p>{foundDate}</p>
                </div>
                <div className="mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <p className="font-bold mb-2">Found Time</p>
                  <p>{foundTime}</p>
                </div>
                <div className="mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <p className="font-bold mb-2">Found Location </p>
                  <p>
                    {location}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-10 p-4 rounded-lg shadow-md">
            <div className="mx-4 border-b pb-4 ">
              <h1 className="text-navy-blue font-bold text-xl">Items Details</h1>
            </div>
            <div className="xl:flex lg:flex md:flex xs:block p-4 ">
              <div className=" xl:w-1/3 xs:w-full md:w-1/2 mb-2">
                <p className="font-bold mb-2">Item Name</p>
                <p>{itemName}</p>
              </div>
              <div className=" xl:w-1/3 xs:w-full md:w-1/2 mb-2">
                <p className="font-bold mb-2">Item Category </p>
                <p>{itemCategory}</p>
              </div>
              <div className=" xl:w-1/3 xs:w-full md:w-1/2 mb-2">
                <p className="font-bold mb-2">Keywords</p>
                <p>{`${keywords}`}</p>
              </div>
            </div>
            <div className="px-4">
              <p className="font-bold mb-2">Landmark</p>
              <p>
                {locationIdentifiers}
              </p>
            </div>
            <div className="p-4  max-w-screen-xl">
              <p className="font-bold mb-2">Item Description</p>
              <p>
                {itemDescription}
              </p>
            </div>
            <div className="p-4">
              <p className="font-bold mb-2">Images</p>
              <div className="flex gap-2">
                {foundItemDetails?.itemImage.map((items, i) => {
                  return (
                    <img src={items} alt="key" className="h-40 w-40" />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default ItemDetails;
