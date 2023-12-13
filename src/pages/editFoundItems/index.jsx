import React, { useEffect, useState } from 'react'
import CustomCombinedButton from "../../components/common/adminButton";
import { MdAttachment, MdOutlineCalendarToday } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import DropdownMenu from '../../components/common/dropdown';
import Breadcrumbs from '../../components/common/breadcrumbs';
import useValidationResolver from '../../hooks/useValidationResolver';
import { editFoundItemsSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextInput from "../../components/common/textInput";
import TextAreaInput from '../../components/common/textAreaInput';
import { foundItemById, getItemId } from '../../redux/reducers/itemsSlice';
import { useParams } from "react-router-dom";


const EditFoundItems = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const resolver = useValidationResolver(editFoundItemsSchema);
  
  const methods = useForm({
    defaultValues: {
      founderName: "",
      mobileNumber: "",
      foundDate: "",
      foundTime: "",
      foundLocation: "",
      itemName: "",
      itemDescription: "",
    },
    resolver
  });
  useEffect(() => {
    dispatch(foundItemById(id))
  }, [id])
  const foundItemDetails = useSelector(getItemId);
  useEffect(() => {
    if (foundItemDetails) {
      methods.reset({
        founderName: foundItemDetails.userName || '',
        mobileNumber: foundItemDetails.mobileNumber || '',
        foundDate: foundItemDetails.foundDate || '',
        foundTime: foundItemDetails.foundTime || '',
        foundLocation: foundItemDetails.location || '',
        itemName: foundItemDetails.itemName || '',
        itemDescription: foundItemDetails.itemDescription || '',
      });
    }
  }, [foundItemDetails]);
  
  const submitData = async (data) => {
    navigate('/admin/user/foundItems');
  };
  const categories = ['Electronics', 'Furniture', 'others'];
  return (
    <div className="m-4">
      <div>
        <Breadcrumbs
          items={[
            { label: 'Found Items', link: '/admin/user/foundItems', className: 'text-black  text-4xl mt-10' },
            { label: 'Edit Found Items', className: 'text-black font-bold text-4xl mt-10' },
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
            <div className="flex p-4 ">
              <div className="w-1/2">
                <div className=" mb-4">
                  <label >Founder Name</label>
                  <TextInput
                    placeholder="Value"
                    name="founderName"
                    autoComplete="off"
                    className="w-11/12 py-2 px-3  border border-gray rounded-md"
                    required
                  />
                </div>
                <div className="mb-2 mb-4  ">
                  <label>Found Date</label>
                  <div className='relative '>
                    <TextInput
                      // type='date'
                      name="foundDate"
                      placeholder="Value"
                      autoComplete="off"
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
                  <TextInput
                    name='foundLocation'
                    placeholder="Value"
                    autoComplete="off"
                    className="w-11/12 py-2 px-3  border border-gray rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-4">
                  <label >Founder Mobile Number</label>
                  <TextInput
                    name='mobileNumber'
                    autoComplete="off"
                    placeholder="Value"
                    className="w-11/12 py-2 px-3  border border-gray rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label >Found Time</label>
                  <div className='relative '>
                    <TextInput
                      name='foundTime'
                      autoComplete="off"
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
              <h1 className="text-navy-blue font-bold text-xl">Items Details</h1>
            </div>
            <div className="flex p-4 ">
              <div className="w-1/2 mb-2">
                <label >Item Name</label>
                <TextInput
                  name='itemName'
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
              <TextAreaInput
                placeholder="Value"
                name='itemDescription'
                autoComplete="off"
                className="w-11/12 py-2 px-3 border border-gray rounded-md"
                rows="4"
                required
              ></TextAreaInput>
            </div>
          </div>
          <div className="bg-blueback mt-10 p-4 rounded-lg  ">
            <div className="mx-4 pb-4  ">
              <h1 className="text-navy-blue font-bold text-xl">Upload</h1>
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
              type="submit"
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
