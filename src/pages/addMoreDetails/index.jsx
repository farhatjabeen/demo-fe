import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useValidationResolver from '../../hooks/useValidationResolver';
import { addMoreDetailsItemSchema, addMoreDetailsSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/common/textInput';
import TextAreaInput from '../../components/common/textAreaInput';
import { IoMdRefresh } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { businessAddMoreDetails, clearItemData, filesUploadAPI, itemDropdown, itemDropdownValues, locationDetails, locationDropdownValues, newItemId, searchDetailsById, searchItemById, userAddMoreDetails, userEditItemDetails } from '../../redux/reducers/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FormDropdown from '../../components/common/formDropdown';
import ImageUpload from '../../components/common/imageUpload';
import { userData } from '../../redux/reducers/userSlice';
import { Toast } from '../../components/toast';

export default function AddMoreDetails() {
    const [newItemId, setNewItemId] = useState('');
    const [fileName, setFileName] = useState('');
    const [files, setFiles] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [imageLoader, setImageLoader] = useState(true);
    const items = useSelector(itemDropdown);
    const itemCategories = items ? Object.values(items) : [];
    const cities = useSelector(locationDetails);
    const citiesInSerbia = cities ? Object.values(cities) : [];
    const [cloudinaryId, setCloudinaryId] = useState([]);
    const [itemImage, setItemImage] = useState([]);
    const userDetails = useSelector(userData);
    const itemDetailsById = useSelector(searchDetailsById);
    const [imageDisable, setImageDisable] = useState(false);
    const reportDetails = useParams();
    console.log(reportDetails, "reportDetails");

    const imageTitle= ["User Item image of missing", "Item", "Business User Item image of missing things"]

    useEffect(() => {
        dispatch(locationDropdownValues())
        dispatch(itemDropdownValues())
        setIsLoader(true)
        const addData = async () => {

            if (reportDetails.id) {
                const getDetails = await dispatch(searchItemById(reportDetails.id))
                if (getDetails) {
                    setIsLoader(false)
                }
            }
        }
        addData();

        // if (reportDetails.newItem || reportDetails==={}) {
        methods.setValue("itemName", reportDetails?.newItem)
        methods.setValue("location", reportDetails?.location)
        methods.setValue("itemImage", null)
        methods.setValue("cloudinary_id", null)
        methods.setValue("keywords", null)
        setIsUploaded(false)
        setImageLoader(true);
        // }
    }, []);

    useEffect(()=>{

    },[fileName])

    useEffect(() => {

        if (itemDetailsById && reportDetails.id) {
            setItemImage(itemDetailsById?.itemImage);
            setCloudinaryId(itemDetailsById?.cloudinary_id);
            if (itemDetailsById?.itemImage) {
                setImageLoader(true);
            }
            methods.reset({
                emailMailId: itemDetailsById?.emailMailId || "",
                mobileNumber: itemDetailsById?.mobileNumber != undefined ? `${itemDetailsById?.mobileNumber}` : "",
                userName: itemDetailsById?.userName || "",
                location: itemDetailsById?.location || "",
                locationIdentifiers: itemDetailsById?.locationIdentifiers || "",
                itemDescription: itemDetailsById?.itemDescription || "",
                itemCategory: itemDetailsById?.itemCategory || "",
                itemName: itemDetailsById?.itemName || "",
                keywords: `${itemDetailsById?.keywords}` || "",
                itemImage: itemImage || "",
                cloudinary_id: cloudinaryId || ""
            });
        }

    }, [itemDetailsById])

    const resolver = useValidationResolver(reportDetails?.id ? addMoreDetailsSchema : addMoreDetailsItemSchema);

    const methods = useForm({
        defaultValues: {
            emailMailId: "",
            mobileNumber: "",
            userName: "",
            location: "",
            locationIdentifiers: "",
            itemDescription: "",
            itemCategory: "",
            itemName: "",
            keywords: "",
            itemImage: "",
            cloudinary_id: ""
        },
        resolver
    });

    useEffect(() => {
        if (newItemId) {
            navigate(`/querypublished/${newItemId}`)
        }
    }, [newItemId])

    useEffect(() => {
        if (itemImage?.length === 0) {
            setIsUploaded(false)
        }
        if (itemImage?.length === 3) {
            setImageDisable(true);
        }else{
            setImageDisable(false);
        }
    }, [itemImage])

    const submitData = async (data) => {
        try {

            console.log("from submit form");

            if (userDetails?.role === 'BUSINESS' && !reportDetails.id) {
                const inputString = methods.getValues().keywords;
                methods.setValue('keywords', inputString.split(','));
                methods.setValue("itemImage", itemImage);
                methods.setValue("cloudinary_id", cloudinaryId);
                // const datas = methods.getValues()
                console.log(cloudinaryId?.length, "cloudinaryId.length")

                console.log("hi from businessAddMoreDetails")
                const addedItem = await dispatch(businessAddMoreDetails(data));
                if (addedItem) {
                    navigate('/allitems')
                }


            } else if (userDetails?.role === 'USER' && !reportDetails.id) {
                const inputString = methods.getValues().keywords;
                methods.setValue('keywords', inputString.split(','));
                methods.setValue("itemImage", itemImage);
                methods.setValue("cloudinary_id", cloudinaryId);
                const addItem = dispatch(userAddMoreDetails(data));
                console.log('itemadded', addItem)
                addItem?.then((res) => {
                    setNewItemId(res.data._id)
                })

            } else {
                const inputString = methods.getValues().keywords;
                console.log(JSON.stringify(inputString), "inputString")

                methods.setValue('keywords', inputString.replace(/^"(.*)"$/, '$1').split(','));
                console.log(methods.getValues().keywords, "keywords")

                // methods.setValue("itemImage", itemImage?.map(item => item));
                // methods.setValue("cloudinary_id", cloudinaryId?.map(item => item));
                methods.setValue("itemImage", itemImage);
                methods.setValue("cloudinary_id", cloudinaryId);
                const dataNow = methods.getValues();
                console.log(dataNow, "datanow")
                console.log(itemImage, "itemImage")
                console.log(cloudinaryId, "cloudinaryId")

                if (itemImage?.length > 0 && cloudinaryId?.length > 0) {
                    setImageLoader(true)
                    const isEdited = await dispatch(userEditItemDetails(reportDetails.id, data))

                    isEdited && setItemImage([]);
                    isEdited && setCloudinaryId([]);
                    isEdited && (navigate(window.history.back()))
                } else {
                    setImageLoader(false)
                }
            }

        } catch (error) {
            console.log(error, 'submitted errors')
        }
    };

    const handleReset = () => {
        setFiles([]);
        setIsUploaded(false);
        setItemImage([]);
        setCloudinaryId([]);
    }

    const handleFileUpload = (e) => {
        const selectedFiles = e.target.files;
        console.log(selectedFiles, "selectedFiles")
        console.log(selectedFiles?.name, "selectedFiles?.name")
        setFiles((prevFiles) => {
            const newFiles = prevFiles ? [...prevFiles, ...selectedFiles] : selectedFiles;
            if (newFiles) {
                setIsUploaded(true);
            }
            return newFiles;
        });
    }

    const handleDbFileDelete = (index) => {

        setItemImage((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setCloudinaryId((prevFiles) => prevFiles.filter((_, i) => i !== index));
        if (!reportDetails.id) {
            setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        }

    };

    useEffect(() => {
        console.log(files?.length, "files?.length")
        if (files && files?.length > 0) {
            console.log("hi file")
            let formData = new FormData();
            files?.map((items, i) => {
                return (
                    formData.append("item", items)
                );
            })
            console.log(formData, 'formData')

            setIsImageUploaded(true)
            // if (reportDetails.id) {
            //     setImageLoader(false);
            // }
            const imagesResponse = dispatch(filesUploadAPI(formData));
            imagesResponse?.then((res) => {
                if (imagesResponse) {
                    setIsImageUploaded(false)
                    setCloudinaryId(res?.data?.cloudinary_id)
                    setItemImage(res?.data?.itemImage)
                    if (reportDetails.id) {
                        setImageLoader(true);
                    }
                }
            }).then(() => {

                // setIsImageUploaded(true)
                if (itemImage && reportDetails.id) {
                    setItemImage((filesInside) => filesInside ? [...filesInside, ...itemImage] : itemImage)
                    setCloudinaryId((filesInside) => filesInside ? [...filesInside, ...cloudinaryId] : cloudinaryId)
                    // setIsImageUploaded(false)
                    // if(itemImage.length>0 && cloudinaryId.length>0){
                    //     setImageLoader(true);
                    // }else{
                    setImageLoader(true);
                    setFiles([])
                    // }
                }
            });
        }
    }, [files])

    const handleCancel = () => {
        dispatch(clearItemData())
        setIsUploaded(false)

        window.history.back();
    }

    return (
        <div className='flex justify-center items-center flex-col md:container md:mx-auto'>
            <div className='flex w-full justify-center p-6'>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16'>Add More details</div>
            </div>

            <FormProvider {...methods}>
                {/* <form onSubmit={(e) => submitData(e)} className='flex justify-around w-full'> */}
                <form onSubmit={methods.handleSubmit(submitData)} className='flex justify-around w-full'>
                    {/* {isLoader ? <p className='font-bold p-24 flex justify-center w-full text-md'>Loading...</p>
                        : */}
                    <div className='w-full px-24'>
                        <div>
                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Item Name</label>
                                    <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Item Name</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Type Name"
                                    name="itemName"
                                    className='h-14 sm:h-12 border border-greys rounded-lg p-5 xl:w-96 md:w-96 sm:w-64'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Item Category</label>
                                    <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Item Category</p>
                                </div>

                                <FormDropdown
                                    name='itemCategory'
                                    optionButtonClass={`flex w-96 h-12 items-center justify-between rounded-lg bg-white px-4 border border-solid border-greys`}
                                    editButton={true}
                                    selection={true}
                                    firstOptionName="Select Category"
                                    valueFromDb={itemDetailsById?.itemCategory}
                                    dropdownValues={itemCategories} />
                            </div>

                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Item Description</label>
                                    <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Item Description</p>
                                </div>
                                <TextAreaInput
                                    rows="4"
                                    placeholder="Type desc"
                                    name="itemDescription"
                                    className='border border-greys rounded-lg p-5 xl:w-96 md:w-96 sm:w-64'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between h-12 mb-16'>
                                <div>
                                    <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Keywords</label>
                                    <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Keywords</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter Keywords comma seperated"
                                    name="keywords"
                                    className='h-14 sm:h-12 border border-greys rounded-lg p-5 xl:w-96 md:w-96 sm:w-64'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between h-fit mb-9 relative'>
                                <div>
                                    <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Upload Images</label>
                                    <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Upload Images</p>
                                </div>
                                <div>
                                    {isUploaded || itemImage ?
                                        <div className='flex flex-wrap w-96'>

                                            {isImageUploaded ? <p>Loading...</p>
                                                :
                                                <div className='w-fit  flex justify-between'>
                                                    {itemImage?.map((items, i) => {
                                                        return (
                                                            <div>
                                                                <div key={i} className=' mb-2 mr-2 w-32 h-fit px-2 pt-2 pb-1 bg-white rounded-lg border border-primary-color'>
                                                                    <div className='flex w-20'>
                                                                        <img className='w-20 h-20' src={items} alt={i}></img>
                                                                        <div className='flex items-center ml-2' onClick={() => handleDbFileDelete(i)}><MdClose /></div>
                                                                    </div>
                                                                    <div className='flex justify-center text-sm'>{files?.name}</div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>}
                                        </div>
                                        :
                                        null
                                    }
                                    <div className="flex justify-center items-center">
                                        <ImageUpload
                                            name={reportDetails?.id ?
                                                "imageUploads" : "itemImage"}
                                            designClass={cloudinaryId?.length > 0 || isUploaded ?
                                                "xl:w-80 xl:mr-2 md:w-96 sm:w-64 h-14 sm:h-12 rounded-lg bg-primary-color flex items-center justify-center cursor-pointer"
                                                :
                                                "xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 rounded-lg bg-primary-color flex items-center justify-center cursor-pointer"}
                                            multiple={true}
                                            type = {imageDisable ? "text" : "file"}
                                            isEdit={reportDetails.id ? true : false}
                                            handleFileUpload={handleFileUpload}
                                        />

                                        {cloudinaryId?.length > 0 || isUploaded ?
                                            <div>
                                                <button onClick={handleReset} className='cursor-pointer h-12 w-11 bg-primary-color ml-3 rounded-lg flex justify-center items-center'>
                                                    <IoMdRefresh className='h-6 w-6' />
                                                </button>
                                            </div>
                                            :
                                            ""}

                                    </div>
                                    {imageLoader ?
                                        ""
                                        :
                                        <p className='text-red'>Images required</p>
                                    }
                                </div>
                            </div>
                            <div className='border-b border-b-gray58 mb-10'>
                                <div className='flex justify-between mb-9 relative location'>
                                    <div>
                                        <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Location</label>
                                        <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Location</p>
                                    </div>
                                    <FormDropdown
                                        name='location'
                                        optionButtonClass={`flex w-96 h-12 items-center justify-between rounded-lg bg-white px-4 border border-solid border-greys`}
                                        editButton={true}
                                        selection={true}
                                        firstOptionName="Select Location"
                                        valueFromDb={reportDetails.location || itemDetailsById?.location}
                                        dropdownValues={citiesInSerbia}
                                    />
                                </div>

                                <div className='flex justify-between h-12 mb-9 relative'>
                                    <div>
                                        <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Location Identifiers</label>
                                        <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Location Identifiers</p>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="Landmarks of the location"
                                        name="locationIdentifiers"
                                        className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-greys rounded-lg p-5'
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative location'>
                                <div>
                                    <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Your Name</label>
                                    <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Your Name</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Name"
                                    name="userName"
                                    className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-greys rounded-lg p-5'
                                    autoComplete="off"
                                />
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative'>
                                <div>
                                    <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Your Phone Number</label>
                                    <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Your Phone Number</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Number"
                                    name="mobileNumber"
                                    className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-greys rounded-lg p-5'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative'>
                                <div>
                                    <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Your Mail address</label>
                                    <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Your Mail address</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Email address"
                                    name="emailMailId"
                                    className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-greys rounded-lg p-5'
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-between mt-20'>
                            <div className='xl:w-4/12 md:w-2/5 sm:w-80 flex justify-between items-center mb-10'>
                                <div>
                                    <button
                                        className='cursor-pointer xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-greys bg-white rounded-lg text-lg'
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type='submit'
                                        className='cursor-pointer xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-greys bg-primary-color rounded-lg text-lg'
                                    >
                                        {itemDetailsById && reportDetails.id ? <p>Edit form</p> : <p>Submit form</p>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* } */}
                </form>
            </FormProvider>
        </div>
    )
};
