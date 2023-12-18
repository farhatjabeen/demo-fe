import React, { useEffect, useState } from 'react'
import CustomCombinedButton from "../../components/common/adminButton";
import { MdOutlineCalendarToday } from "react-icons/md";
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
import { adminUpdateFoundItems, foundItemById, getItemId, itemDropdown, itemDropdownValues } from '../../redux/reducers/itemsSlice';
import { useParams } from "react-router-dom";


const EditFoundItems = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState();
  const [updatedData, setUpdatedData] = useState([]);
  const dispatch = useDispatch();
  const resolver = useValidationResolver(editFoundItemsSchema);
  const items = useSelector(itemDropdown)
  const dropdownValues = Object.values(items);

  const methods = useForm({
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemCategory: "",
    },
    resolver
  });
  useEffect(() => {
    dispatch(foundItemById(id))
  }, [id])
  const foundItemDetails = useSelector(getItemId);
  const { userName, mobileNumber, foundDate, foundTime, location, itemCategory } = foundItemDetails;
  useEffect(() => {
    if (foundItemDetails) {
      methods.reset({
        itemName: foundItemDetails.itemName,
        itemDescription: foundItemDetails.itemDescription,
        itemCategory: foundItemDetails.itemCategory,
      });
    }
  }, [foundItemDetails]);
  useEffect(() => {
    setSelectedCategory(itemCategory)
    dispatch(itemDropdownValues());
  }, [itemCategory]);

  useEffect(() => {
    if (updatedData) {
      dispatch(adminUpdateFoundItems(updatedData))
        .then(() => {
          navigate('/admin/user/foundItems');
        })
        .catch((error) => {
          console.error('Update failed:', error);
        });
    }
  }, [updatedData]);
 
  const submitData = (data) => {
    try {
      dispatch(adminUpdateFoundItems(id, data));
      setUpdatedData(data);
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
                  <p className="w-11/12 py-2 px-3  bg-white border border-gray rounded-md" >{userName}</p>
                </div>
                <div className="mb-2 mb-4  ">
                  <label>Found Date</label>
                  <div className='relative '>
                    <p className="w-11/12 py-2 px-3  bg-white border border-gray rounded-md" >{foundDate}</p>
                    <div className="absolute inset-y-0 right-10 flex items-center pr-6">
                      <MdOutlineCalendarToday size={24} />
                    </div>
                  </div>
                </div>

                <div className="mb-2 mb-4">
                  <label >Found Location </label>
                  <p className="w-11/12 py-2 px-3  bg-white border border-gray rounded-md" >{location}</p>
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-4">
                  <label >Founder Mobile Number</label>
                  <p className="w-11/12 py-2 px-3  bg-white border border-gray rounded-md" >{mobileNumber}</p>
                </div>
                <div className="mb-4">
                  <label >Found Time</label>
                  <div className='relative '>
                    <p className="w-11/12 py-2 px-3  bg-white border border-gray rounded-md" >{foundTime}</p>
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
                  className="w-11/12 py-2 px-3  border border-gray rounded-md"
                  required
                />
              </div>
              <div className="mb-2 w-5/12">
                <label>Item Category</label>
                <DropdownMenu
                  dropdownValues={dropdownValues}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>
            </div>
            <div className="p-4">
              <label >Item Description</label>
              <TextAreaInput
                name='itemDescription'
                autoComplete="off"
                className="w-11/12 py-2 px-3 border border-gray rounded-md"
                rows="4"
                required
              ></TextAreaInput>
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
              onClick={submitData}
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
