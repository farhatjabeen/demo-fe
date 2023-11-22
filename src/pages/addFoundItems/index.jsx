import React, { useState } from 'react'
import CustomCombinedButton from "../../components/common/adminButton";
import DropdownMenu from '../../components/common/dropdown';
import { MdAttachment, MdOutlineCalendarToday } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import Breadcrumbs from '../../components/common/breadcrumbs';
const AddFoundItems = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['Private', 'Public', 'One person'];
  return (

    <div className="m-4">
      <div>
        <Breadcrumbs
          items={[
            { label: 'Found Items', link: '/admin/user/foundItems', className: 'text-black  text-4xl mt-10' },
            { label: 'Add Found Items', className: 'text-black font-bold text-4xl mt-10' },
          ]}
        />
      </div>

      <div className="bg-blueback  mt-10 rounded-lg p-4 ">
        <div className=" pb-4 mx-4 ">
          <h1 className="text-black font-bold text-xl mt-2">
            Founder Details
          </h1>
        </div>
        <div className="flex p-4 ">
          <div className="w-1/2">
            <div className=" mb-4">
              <label >Founder Name</label>
              <input
                type="text"
                placeholder="Value"
                className="w-11/12 py-2 px-3  border border-gray rounded-md"
                required
              />
            </div>
            <div className="mb-2 mb-4  ">
              <label>Found Date</label>
              <div className='relative flex'>
                <input
                  type="text"
                  placeholder="Value"
                  className="w-11/12 py-2 px-3 border border-gray rounded-md"
                  required
                />
                <div className="absolute inset-y-0 right-10 flex items-center pr-6">
                  <MdOutlineCalendarToday size={24} />
                </div>
              </div>
            </div>

            <div className="mb-2 mb-4">
              <label >Found Location </label>
              <input
                type="text"
                placeholder="Value"
                className="w-11/12 py-2 px-3  border border-gray rounded-md"
                required
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-4">
              <label >Founder Mobile Number</label>
              <input
                type="text"
                placeholder="Value"
                className="w-11/12 py-2 px-3  border border-gray rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label >Found Time</label>
              <div className='relative flex'>
                <input
                  type="text"
                  placeholder="Value"
                  className="w-11/12 py-2 px-3  border border-gray rounded-md"
                  required
                />
                <div className="absolute inset-y-0 right-10 flex items-center pr-6">
                  <FaRegClock size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blueback mt-10 p-4 rounded-lg ">
        <div className="mx-4 pb-4 ">
          <h1 className="text-black font-bold text-xl">Items Details</h1>
        </div>
        <div className="flex p-4 ">
          <div className="w-1/2 mb-2">
            <label >Item Name</label>
            <input
              type="text"
              placeholder="Value"
              className="w-11/12 py-2 px-3  border border-gray rounded-md"
              required
            />
          </div>
          <div className="mb-2 w-5/12">
            <label>Item Category</label>
            <DropdownMenu
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(category) => setSelectedCategory(category)} />
          </div>
        </div>
        <div className="p-4">
          <label >Item Description</label>
          <textarea
            placeholder="Value"
            className="w-11/12 py-2 px-3 border border-gray rounded-md"
            rows={5}
            required
          ></textarea>
        </div>
      </div>
      <div className="bg-blueback mt-10 p-4 rounded-lg ">
        <div className="mx-4 pb-4  ">
          <h1 className="text-black font-bold text-xl">Upload</h1>
        </div>
        <div className='mx-4'>
          <label >Item image</label>
        </div>
      <div className="flex items-center">
        <input
          type="text"
          className="border border-gray p-2 w-96 ml-4  rounded-md"
          placeholder="Upload "
          required
        />

        <label htmlFor="file-upload" className="cursor-pointer ">
          <div className="flex items-center px-4 py-2 bg-blue text-white rounded-md">

            <MdAttachment size={24} className='mr-2' />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
            Upload File
          </div>
        </label>

        <input
          type="file"
          id="file-upload"
          className="hidden"
        />
      </div>
      </div>
      <div className=" flex justify-end mt-6">
        <CustomCombinedButton
          text="Cancel"
          isReset={false}
          buttonColor="blue"
        />

        <CustomCombinedButton
          text="Submit"
          isReset={true}
          buttonColor="other"
        />
      </div>
    </div>
  )
}

export default AddFoundItems


