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
import { adminUpdateFoundItems, filesUploadAPI, foundItemById, getItemId, itemDropdown, itemDropdownValues } from '../../redux/reducers/itemsSlice';
import { useParams } from "react-router-dom";
import ImageUpload from '../../components/common/imageUpload';
import { MdClose } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";


const EditFoundItems = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState();
  const dispatch = useDispatch();
  const resolver = useValidationResolver(editFoundItemsSchema);
  const items = useSelector(itemDropdown)
  const dropdownValues = items ? Object.values(items) : [];
  const [filesFromDb, setFilesFromDb] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [cloudinaryId, setCloudinaryId] = useState([]);
  const [itemImage, setItemImage] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [isImage, setIsImage] = useState(true);

  const methods = useForm({
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemCategory: "",
      keywords: "",
      locationIdentifiers: "",
      itemImage: "",
      cloudinary_id: "",
    },
    resolver
  });
  useEffect(() => {
    setIsLoader(true);
    dispatch(foundItemById(id)).then(() => {
      setIsLoader(false); 
  });
  }, [id])
  const foundItemDetails = useSelector(getItemId);
  const { userName, mobileNumber, emailMailId, foundDate, foundTime, location, itemCategory } = foundItemDetails || {};
  useEffect(() => {
    if (foundItemDetails) {
      setItemImage(foundItemDetails?.itemImage)
      setCloudinaryId(foundItemDetails?.cloudinary_id)
      methods.reset({
        itemName: foundItemDetails?.itemName,
        keywords: `${foundItemDetails?.keywords}`,
        itemDescription: foundItemDetails?.itemDescription,
        locationIdentifiers: foundItemDetails?.locationIdentifiers,
        itemCategory: foundItemDetails?.itemCategory,
        itemImage: itemImage||"",
        cloudinary_id: cloudinaryId||""
      });
    }
  }, [foundItemDetails]);
  useEffect(() => {
    setSelectedCategory(itemCategory)
    dispatch(itemDropdownValues());
  }, [itemCategory]);

  useEffect(()=>{
    if(itemImage.length){
      setIsImage(true)
    }
  },[itemImage])

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  useEffect(() => {
    if (foundItemDetails?.cloudinary_id) {
      setFilesFromDb(foundItemDetails.cloudinary_id);
    }
  }, [foundItemDetails?.cloudinary_id]);
  const handleFileUpload = (e) => {
    const selectedFiles = e.target.files;
    setFiles((prevFiles) => {
      const newFiles = prevFiles ? [...prevFiles, ...selectedFiles] : selectedFiles;
      if (newFiles) {
        setIsUploaded(true);
      }
      return newFiles;
    });
  }
  const handleRemoveFile = (indexToRemove) => {
    setItemImage((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    setCloudinaryId((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
};
  
  const handleReset = (e) => {
    e.preventDefault();
    setFiles([]);
    setIsUploaded(false);
    setItemImage([]);
    setCloudinaryId([]);
  }
  useEffect(() => {
    if (files && files.length > 0) {
      let formData = new FormData();
      files.forEach((item) => {
        formData.append("item", item);
      });
      const upload = dispatch(filesUploadAPI(formData));
      upload.then((res) => {
        setItemImage((prevFiles) => prevFiles ? [...prevFiles, ...res.data.itemImage] : res.data.itemImage)
        setCloudinaryId((prevFiles) => prevFiles ? [...prevFiles, ...res.data.cloudinary_id] : res.data.cloudinary_id)
        setFiles([])
      })
    } else {
      console.warn("No files to upload.");
    }
  }, [files]);
  
  const submitData = async () => {
    try {
      const data = methods.getValues()
      data.keywords = data.keywords.split(',').map(keyword => keyword.trim());
      const updatedData = {
        ...data,
        itemCategory: selectedCategory,
      };
      methods.setValue('itemImage', itemImage)
      methods.setValue('cloudinary_id', cloudinaryId)
      methods.setValue('itemCategory', selectedCategory)
      const inputString = methods.getValues().keywords;
      methods.setValue('keywords', inputString.replace(/^"(.*)"$/, '$1').split(','));
      const dataNow = methods.getValues();
      console.log(itemImage,"itemImage")
      if(itemImage.length){
        setIsImage(true)
        const updateNow = await dispatch(adminUpdateFoundItems(id, dataNow));
        if(updateNow){
          navigate('/admin/user/foundItems');
        }
      }else{
        setIsImage(false)
      }
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
      {isLoader ? <p className='font-bold p-24 flex justify-center w-full text-md'>Loading...</p>
      :
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
                  <label className='text-base font-normal' >Founder Name</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray  rounded-md" >{userName}</p>
                </div>

                <div className=" xl:w-1/3 xs:w-full md:w-1/2 mb-4">
                  <label className='text-base font-normal' >Founder Mobile Number</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{mobileNumber}</p>
                </div>
                <div className="xl:w-1/3 xs:w-full md:w-1/2 mb-4">
                  <label className='text-base font-normal' >Founder Email ID</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{emailMailId}</p>
                </div>
              </div>
              <div className='xl:flex lg:flex md:flex xs:block '>
                <div className="mb-4  xl:w-1/3 xs:w-full md:w-1/2">
                  <label className='text-base font-normal'>Found Date</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{foundDate}</p>
                </div>
                <div className="mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <label className='text-base font-normal' >Found Time</label>
                  <p className="w-11/12 py-2 px-3  bg-gray border border-light-gray rounded-md" >{foundTime}</p>
                </div>
                <div className=" mb-4 xl:w-1/3 xs:w-full md:w-1/2">
                  <label className='text-base font-normal' >Found Location </label>
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
                <label className='text-base font-normal' >Item Name</label>
                <TextInput
                  name='itemName'
                  className="w-11/12 h-10 px-5 py-1 border border-light-gray rounded-md"
                  required
                />
              </div>
              <div className="mb-2 xl:w-1/3 xs:w-full md:w-1/2">
                <label className='text-base font-normal'>Item Category</label>
                <DropdownMenu
                  dropdownValues={dropdownValues}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  additionalClass='h-10 py-1'
                />
              </div>
              <div className="xl:w-1/3 xs:w-full md:w-1/2 mb-2 xl:ml-6 md:ml-4">
                <label className='text-base font-normal' >Keywords</label>
                <TextInput
                  name='keywords'
                  className="w-11/12 h-10 px-5 py-1 border border-light-gray rounded-md"
                  required
                />
              </div>
            </div>
            <div className="p-4 xl:flex lg:flex md:flex xs:block">
              <div className='xl:w-1/3 xs:w-full md:w-1/2'>
                <label className='text-base font-normal' >Item Description</label>
                <TextAreaInput
                  name='itemDescription'
                  autoComplete="off"
                  className="w-80 h-10 px-5 py-1 border border-light-gray rounded-md"
                  rows="4"
                  required
                ></TextAreaInput>
              </div>
              <div className='xl:w-1/3 xs:w-full md:w-1/2'>
                <label className='text-base font-normal' >Landmark</label>
                <TextAreaInput
                  name='locationIdentifiers'
                  autoComplete="off"
                  className="w-11/12 h-10 px-5 py-1 border border-light-gray rounded-md"
                  rows="4"
                  required
                ></TextAreaInput>
              </div>
              <div className='xl:w-1/3 xs:w-full md:w-1/2'>
                <label className='ml-1 text-base font-normal' >Upload Images</label>
                
                <div>
                <div className="flex">
                    <ImageUpload
                      name="itemImage"
                      designClass="xl:ml-1 xl:w-80 md:w-96 sm:w-80 h-14 sm:h-12 rounded-xl bg-primary-color flex items-center justify-center cursor-pointer"
                      multiple={true}
                      handleFileUpload={handleFileUpload}
                    />

                    {foundItemDetails?.itemImage || isUploaded ?
                      <div>
                        <button onClick={(e) => handleReset(e)} className='h-12 w-11 bg-primary-color ml-2 rounded-xl flex justify-center items-center'>
                          <IoMdRefresh className='h-6 w-6' />
                        </button>
                      </div>
                      :
                      ""}
                  </div>
                  {isUploaded || foundItemDetails?.itemImage ? (
                    <div className='flex ml-1 flex-wrap w-96'>
                      {cloudinaryId?.map((file, i) => (
                        <div key={i} className='flex w-fit p-2 bg-white rounded-lg border border-primary-color my-2 mr-2'>
                          <div>{file}</div>
                          <div className='flex items-center ml-2 cursor-pointer' onClick={() => handleRemoveFile(i)}><MdClose /></div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {
                    isImage ?
                    ""
                    :
                    <p className='ml-1 text-red'>Images required</p>
                  }
                  
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-end mt-6">
            <CustomCombinedButton
              text="Cancel"
              isReset={false}
              buttonColor="blue"
              onClick={(e) => handleCancel(e)}
            />
            <CustomCombinedButton
              text="Submit"
              isReset={true}
              buttonColor="other"
              type="submit"
            />
          </div>
        </form>
      </FormProvider>
}
    </div >
  )
}

export default EditFoundItems
