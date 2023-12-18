import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useValidationResolver from '../../hooks/useValidationResolver';
import { addMoreDetailsSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/common/textInput';
import TextAreaInput from '../../components/common/textAreaInput';
import { IoMdRefresh } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { businessAddMoreDetails, filesUploadAPI, itemDropdown, itemDropdownValues, locationDetails, locationDropdownValues, newItemId, searchDetailsById, searchItemById, userAddMoreDetails, userEditItemDetails } from '../../redux/reducers/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FormDropdown from '../../components/common/formDropdown';
import ImageUpload from '../../components/common/imageUpload';
import { userData } from '../../redux/reducers/userSlice';

export default function AddMoreDetails() {
    const [itemName, setItemName] = useState('');
    const [location, setLocation] = useState('');
    const [newItemId,setNewItemId] = useState('');
    const [files, setFiles] = useState([]);
    const [filesFromDb, setFilesFromDb] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(itemDropdown);
    const itemCategories = Object.values(items);
    const cities = useSelector(locationDetails);
    const citiesInSerbia = Object.values(cities);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [cloudinaryId, setCloudinaryId] = useState([]);
    const [itemImage, setItemImage] = useState([]);
    const userDetails = useSelector(userData);
    // const itemIdNew = useSelector(newItemId);
    const itemDetailsById = useSelector(searchDetailsById);
    // console.log(itemIdNew, 'ud');
    const reportDetails = useParams();
    console.log("routeValues", reportDetails);
    const [selectedLocation, setSelectedLocation] = useState("");


    useEffect(() => {
        if (!itemName) {
            setItemName(reportDetails.itemName);
        }
        if (!location) {
            setLocation(reportDetails.location);
        }
        dispatch(locationDropdownValues())
        dispatch(itemDropdownValues())
        if (reportDetails.id) {
            dispatch(searchItemById(reportDetails.id))
        }

    }, []);

    useEffect(() => {
        if (itemDetailsById) {
            setFilesFromDb(itemDetailsById?.cloudinary_id)
            methods.reset({
                emailMailId: itemDetailsById?.emailMailId || "",
                mobileNumber: `${itemDetailsById?.mobileNumber}` || "",
                userName: itemDetailsById?.userName || "",
                location: reportDetails.location || itemDetailsById?.location || "",
                locationIdentifiers: itemDetailsById?.locationIdentifiers || "",
                itemDescription: itemDetailsById?.itemDescription || "",
                itemCategory: itemDetailsById?.itemCategory || "",
                itemName: reportDetails.newItem || itemDetailsById?.itemName || "",
                keywords: itemDetailsById?.keywords || "",
                itemImage: itemDetailsById?.itemImage || "",
                cloudinary_id: itemDetailsById?.cloudinary_id || ""
            });
        }
    }, [itemDetailsById])

    const resolver = useValidationResolver(addMoreDetailsSchema);

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

    useEffect(()=>{
        if(newItemId){
            navigate(`/querypublished/${newItemId}`)
        }
    },[newItemId])



    const submitData = async (e) => {
        try {
            e.preventDefault();
            methods.setValue('itemCategory', `${selectedCategory}` || itemDetailsById?.itemCategory || "")

            methods.setValue("itemImage", itemImage || itemDetailsById?.itemImage);
            methods.setValue("cloudinary_id", cloudinaryId || itemDetailsById?.cloudinaryId );
            methods.setValue("location", `${selectedLocation}` || itemDetailsById?.location || "");
            const inputString = methods.getValues().keywords;
            methods.setValue('keywords', inputString.split(' '))
            const data = methods.getValues();
            console.log("from submit form");
            if (userDetails?.role === 'USER' && !reportDetails.id) {
                const addItem = dispatch(userAddMoreDetails(data));
                console.log('itemadded',addItem)
                addItem?.then((res)=>{
                    setNewItemId( res.data._id)
                })
                
                console.log(newItemId,'newitemid')
                
            } else {
                dispatch(userEditItemDetails(reportDetails.id, data))
            }
            if (userDetails?.role === 'BUSINESS') {
                dispatch(businessAddMoreDetails(data));
            }
        } catch (error) {
            console.log(error, 'submitted errors')
        }
    };

    const handleReset = (e) => {
        setFiles([]);
        setIsUploaded(false);
        setFilesFromDb([]);
    }

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

    useEffect(() => {
        if (files && files?.length > 0) {
            let formData = new FormData();
            files.map((items, i) => {
                return (
                    formData.append("item", items)
                );
            })

            const imagesResponse = dispatch(filesUploadAPI(formData));
            imagesResponse
                .then((res) => {
                    setCloudinaryId(res.data.cloudinary_id)
                    setItemImage(res.data.itemImage)
                }).then(() => {
                    if(itemDetailsById?.itemImage){
                    setItemImage((filesInside) => filesInside ? [...filesInside, ...itemDetailsById?.itemImage] : itemDetailsById?.itemImage)
                    setCloudinaryId((filesInside) => filesInside ? [...filesInside, ...itemDetailsById?.cloudinary_id] : itemDetailsById?.cloudinary_id)
                    }
                })
        }

    }, [files])

    const handleChildData = (dataFromChild) => {
        setSelectedCategory(dataFromChild);
    };

    const handleChildDataLocation = (dataFromChild) => {
        setSelectedLocation(dataFromChild);
    };

    return (
        <div className='flex justify-center items-center flex-col md:container md:mx-auto'>
            <div className='flex w-full justify-center p-6'>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16'>Add More details</div>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={(e) => submitData(e)} className='flex justify-around w-full'>
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
                                    className='h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5 xl:w-96 md:w-96 sm:w-64'
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
                                    optionButtonClass={`flex w-96 h-12 items-center justify-between rounded-lg bg-white px-4 border border-solid border-[#B6B6B6]`}
                                    editButton={true}
                                    handleData={handleChildData}
                                    valueFromDb={itemDetailsById?.itemCategory}
                                    selection={true}
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
                                    className='border border-[#B6B6B6] rounded-lg p-5 xl:w-96 md:w-96 sm:w-64'
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
                                    placeholder="Keywords"
                                    name="keywords"
                                    className='h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5 xl:w-96 md:w-96 sm:w-64'
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
                                    {isUploaded || itemDetailsById?.itemImage ?
                                        <div className='flex flex-wrap w-96'>
                                            {
                                                itemDetailsById?.itemImage ?
                                                    <div>
                                                        {filesFromDb.map((items, i) => {
                                                            return (
                                                                <div key={i} className='flex w-fit p-2 bg-white rounded-lg border border-primary-color my-2 mr-2'>
                                                                    <div>{items}</div>
                                                                    <div className='flex items-center ml-2'><MdClose /></div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    :
                                                    ""
                                            }
                                            {files
                                                ?
                                                <div>
                                                    {
                                                        files?.map((items, i) => {
                                                            return (
                                                                <div key={i} className='flex w-fit p-2 bg-white rounded-lg border border-primary-color my-2 mr-2'>
                                                                    <div>{items.name}</div>
                                                                    <div className='flex items-center ml-2'><MdClose /></div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                                :
                                                ""
                                            }

                                        </div>
                                        :
                                        null
                                    }

                                    <div className="flex justify-center items-center">
                                        <ImageUpload
                                            name="item"
                                            designClass={
                                                `${isUploaded || itemDetailsById?.itemImage
                                                    ?
                                                    "xl:w-80 md:w-80 sm:64 xl:mr-2 h-14 sm:h-12 bg-white rounded-lg border border-primary-color text-sm flex items-center justify-center cursor-pointer"
                                                    :
                                                    "xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 rounded-lg bg-primary-color flex items-center justify-center cursor-pointer"
                                                }`
                                            }
                                            multiple={true}
                                            handleFileUpload={handleFileUpload}
                                        />

                                        {itemDetailsById?.itemImage || isUploaded ?
                                            <div>
                                                <button onClick={handleReset} className='h-12 w-11 bg-primary-color ml-2 rounded-lg flex justify-center items-center'>
                                                    <IoMdRefresh className='h-6 w-6' />
                                                </button>
                                            </div>
                                            :
                                            ""}
                                    </div>
                                </div>
                            </div>
                            <div className='border-b border-b-[#949494] mb-10'>
                                <div className='flex justify-between h-12 mb-9 relative location'>
                                    <div>
                                        <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Location</label>
                                        <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Location</p>
                                    </div>
                                    <FormDropdown
                                        name='location'
                                        optionButtonClass='xl:w-96 md:w-96 sm:w-64 border border-[#B6B6B6] rounded-lg p-5'
                                        editButton={true}
                                        selection={true}
                                        valueFromDb={itemDetailsById?.location || reportDetails?.location}
                                        dropdownValues={citiesInSerbia}
                                        handleData={handleChildDataLocation}
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
                                        className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
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
                                    className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
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
                                    className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
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
                                    className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-between mt-20'>
                            <div className='xl:w-4/12 md:w-2/5 sm:w-80 flex justify-between items-center mb-10'>
                                <div>
                                    <button
                                        className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-white rounded-lg text-lg cursor-grab'
                                        onClick={() => { window.history.back() }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type='submit'
                                        className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-primary-color rounded-lg text-lg cursor-grab'
                                    >
                                        Submit form
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
};
