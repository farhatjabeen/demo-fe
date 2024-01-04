import React, { useEffect, useState } from 'react'
import CustomCombinedButton from "../../components/common/adminButton";
import DropdownMenu from '../../components/common/dropdown';
import Breadcrumbs from '../../components/common/breadcrumbs';
import useValidationResolver from '../../hooks/useValidationResolver';
import { editFoundItemsSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextInput from "../../components/common/textInput";
import TextAreaInput from '../../components/common/textAreaInput';
import { adminUpdateFoundItems, foundItemById, getItemId, itemDropdown, itemDropdownValues } from '../../redux/reducers/itemsSlice';
import { useParams } from "react-router-dom";


const EditFoundItems = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState();
  const dispatch = useDispatch();
  const resolver = useValidationResolver(editFoundItemsSchema);
  const items = useSelector(itemDropdown)
  const dropdownValues = Object.values(items);

  const methods = useForm({
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemCategory: "",
      keywords: "",
      locationIdentifiers: "",
    },
    resolver
  });
  useEffect(() => {
    dispatch(foundItemById(id))
  }, [id])
  const foundItemDetails = useSelector(getItemId);
  const { userName, mobileNumber, emailMailId, foundDate, foundTime, location, itemCategory } = foundItemDetails || {};
  useEffect(() => {
    if (foundItemDetails) {
      methods.reset({
        itemName: foundItemDetails.itemName,
        keywords: foundItemDetails.keywords,
        itemDescription: foundItemDetails.itemDescription,
        locationIdentifiers: foundItemDetails.locationIdentifiers,
        itemCategory: foundItemDetails.itemCategory,
      });
    }
  }, [foundItemDetails]);
  useEffect(() => {
    setSelectedCategory(itemCategory)
    dispatch(itemDropdownValues());
  }, [itemCategory]);


  const submitData = (data) => {
    try {
      const updatedData = {
        ...data,
        itemCategory: selectedCategory,
      };

      dispatch(adminUpdateFoundItems(id, updatedData));
      navigate('/admin/user/foundItems');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };


  return (
    <div className="m-4">
      <div>
        <Breadcrumbs
          items={[
            { label: 'Found Items', link: '/admin/user/foundItems', className: 'text-black xl:text-4xl sm:text-2xl mt-10' },
            { label: 'Edit Found Items', className: 'text-black font-bold xl:text-4xl sm:text-2xl  mt-10' },
          ]}
        />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <div className="bg-blueback  mt-10 rounded-lg p-4 ">
            <div className=" pb-4 mx-4 ">
              <h1 className="text-navy-blue font-bold text-xl mt-2">
                Founder Details
              </h1>
            </div>
            <div className="p-4">
              <div className='xl:flex lg:flex md:flex xs:block '>
                <div className="xl:w-1/3 xs:w-full md:w-1/2 mb-4">
                  <label >Founder Name</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray  rounded-md" >{userName}</p>
                </div>

                <div className=" xl:w-1/3 xs:w-full md:w-1/2 mb-4">
                  <label >Founder Mobile Number</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{mobileNumber}</p>
                </div>
                <div className="xl:w-1/3 xs:w-full md:w-1/2 mb-4">
                  <label >Founder Email ID</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{emailMailId}</p>
                </div>
              </div>
              <div className='xl:flex lg:flex md:flex xs:block '>
                <div className="mb-4  xl:w-1/3 xs:w-full md:w-1/2">
                  <label>Found Date</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{foundDate}</p>
                </div>
                <div className="mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <label >Found Time</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{foundTime}</p>
                </div>
                <div className=" mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <label >Found Location </label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{location}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blueback mt-10 p-4 rounded-lg ">
            <div className="mx-4 pb-4 ">
              <h1 className="text-navy-blue font-bold text-xl">Items Details</h1>
            </div>
            <div className="xl:flex lg:flex md:flex xs:block p-4 ">
              <div className="xl:w-1/3 xs:w-full md:w-1/2 mb-2">
                <label >Item Name</label>
                <TextInput
                  name='itemName'
                  className="w-11/12 py-2 px-3  border border-light-gray rounded-md"
                  required
                />
              </div>
              <div className="mb-2 xl:w-1/3 xs:w-full md:w-1/2">
                <label>Item Category</label>
                <DropdownMenu
                  dropdownValues={dropdownValues}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>
              <div className="xl:w-1/3 xs:w-full md:w-1/2 mb-2 xl:ml-6 md:ml-4">
                <label >Keywords</label>
                <TextInput
                  name='keywords'
                  className="w-11/12 py-2 px-3  border border-light-gray rounded-md"
                  required
                />
              </div>
            </div>
            <div className="p-4 xl:flex lg:flex md:flex xs:block">
              <div className='xl:w-1/3 xs:w-full md:w-1/2'>
                <label >Item Description</label>
                <TextAreaInput
                  name='itemDescription'
                  autoComplete="off"
                  className="w-11/12 py-2 px-3 border border-light-gray rounded-md"
                  rows="4"
                  required
                ></TextAreaInput>
              </div>
              <div className='xl:w-1/3 xs:w-full md:w-1/2'>
                <label >Landmark</label>
                <TextAreaInput
                  name='locationIdentifiers'
                  autoComplete="off"
                  className="w-11/12 py-2 px-3 border border-light-gray rounded-md"
                  rows="4"
                  required
                ></TextAreaInput>
              </div>
              <div className='xl:w-1/3 xs:w-full md:w-1/2'>
                <label >Upload Images</label>
                <div>
                  <button className='bg-primary-color py-2 rounded-xl w-80'>
                    Upload Image
                  </button>
                </div>
              </div>
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
        </form>
      </FormProvider>
    </div >
  )
}

export default EditFoundItems
