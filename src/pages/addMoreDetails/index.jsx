import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useValidationResolver from '../../hooks/useValidationResolver';
import { addMoreDetailsSchema } from '../../validations';
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

export default function AddMoreDetails() {
    const [newItemId, setNewItemId] = useState('');
    const [files, setFiles] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(itemDropdown);
    const itemCategories = Object.values(items);
    const cities = useSelector(locationDetails);
    const citiesInSerbia = Object.values(cities);
    const [cloudinaryId, setCloudinaryId] = useState([]);
    const [itemImage, setItemImage] = useState([]);
    const userDetails = useSelector(userData);
    const itemDetailsById = useSelector(searchDetailsById);
    const reportDetails = useParams();


    useEffect(() => {
        dispatch(locationDropdownValues())
        dispatch(itemDropdownValues())
        if (reportDetails.id) {
            dispatch(searchItemById(reportDetails.id))
        }
        if (reportDetails.newItem) {
            methods.setValue("itemName", reportDetails.newItem)
            setIsCancelled(true);
            setIsUploaded(false)
        }

    }, []);

    useEffect(() => {
        if (itemDetailsById && reportDetails.id) {
            
            setItemImage(itemDetailsById?.itemImage);
            setCloudinaryId(itemDetailsById?.cloudinary_id);
            methods.reset({
                emailMailId: itemDetailsById?.emailMailId || "",
                mobileNumber: itemDetailsById?.mobileNumber != undefined ? `${itemDetailsById?.mobileNumber}` : "",
                userName: itemDetailsById?.userName || "",
                location: itemDetailsById?.location || "",
                locationIdentifiers: itemDetailsById?.locationIdentifiers || "",
                itemDescription: itemDetailsById?.itemDescription || "",
                itemCategory: itemDetailsById?.itemCategory || "",
                itemName: itemDetailsById?.itemName || "",
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

    useEffect(() => {
        if (newItemId) {
            navigate(`/querypublished/${newItemId}`)
        }
    }, [newItemId])



    const submitData = async (data) => {
        try {
            const inputString = methods.getValues().keywords;
            methods.setValue('keywords', inputString.split(' ').filter(keyword => keyword.trim() !== ''));
            console.log("from submit form");

            if (userDetails?.role === 'BUSINESS' && !reportDetails.id) {
                methods.setValue("itemImage", itemImage?.map(item => item));
                methods.setValue("cloudinary_id", cloudinaryId?.map(item => item));
                const inputString = methods.getValues().keywords;
                methods.setValue('keywords', inputString.split(' ').filter(keyword => keyword.trim() !== ''));
                const datas = methods.getValues()
                dispatch(businessAddMoreDetails(datas));
                navigate('/allitems')
            }

            if (userDetails?.role === 'USER' && !reportDetails.id) {
                methods.setValue("itemImage", itemImage);
                methods.setValue("cloudinary_id", cloudinaryId);
               
                const addItem = dispatch(userAddMoreDetails(data));
                console.log('itemadded', addItem)
                addItem?.then((res) => {
                    setNewItemId(res.data._id)
                })
            } else {
                setItemImage((prevFiles) => {
                    return prevFiles || itemDetailsById?.itemImage ? [...prevFiles, ...itemDetailsById?.itemImage] : itemDetailsById?.itemImage
                })
                setCloudinaryId((prevFiles) => {
                    return prevFiles || itemDetailsById?.cloudinary_id ? [...prevFiles, ...itemDetailsById?.cloudinary_id] : itemDetailsById?.cloudinary_id
                })
                methods.setValue("itemImage", itemImage?.map(item => item));
                methods.setValue("cloudinary_id", cloudinaryId?.map(item => item));

                const dataNow = methods.getValues();
                const isEdited = dispatch(userEditItemDetails(reportDetails.id, dataNow))
                setItemImage([]);
                setCloudinaryId([]);
                isEdited && (navigate('/mylistings'))
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
        setFiles((prevFiles) => {
            const newFiles = prevFiles ? [...prevFiles, ...selectedFiles] : selectedFiles;
            if (newFiles) {
                setIsUploaded(true);
            }
            return newFiles;
        });
    }

    const handleFileDelete = (index) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleDbFileDelete = (index) => {
        console.log(index, "hi from delete")
        setItemImage((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
        setCloudinaryId((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    useEffect(() => {
        if (files && files?.length > 0) {
            let formData = new FormData();
            files?.map((items, i) => {
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
                    if (itemDetailsById?.itemImage&&reportDetails.id) {
                        setItemImage((filesInside) => filesInside ? [...filesInside, ...itemDetailsById?.itemImage] : itemDetailsById?.itemImage)
                        setCloudinaryId((filesInside) => filesInside ? [...filesInside, ...itemDetailsById?.cloudinary_id] : itemDetailsById?.cloudinary_id)
                    }
                })
        }

    }, [files])

    const handleCancel = () => {
        dispatch(clearItemData())
        setIsUploaded(false)
        
        window.history.back();
    }

    console.log(itemImage, "itemimage");
    console.log(cloudinaryId, 'cloudi')
    return (
        <div className='flex justify-center items-center flex-col md:container md:mx-auto'>
            <div className='flex w-full justify-center p-6'>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16'>Add More details</div>
            </div>

            <FormProvider {...methods}>
                {/* <form onSubmit={(e) => submitData(e)} className='flex justify-around w-full'> */}
                <form onSubmit={methods.handleSubmit(submitData)} className='flex justify-around w-full'>
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
                                    valueFromDb={isCancelled ? "" : itemDetailsById?.itemCategory}
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
                                                        {cloudinaryId?.map((items, i) => {
                                                            return (
                                                                <div key={i} className='flex w-fit p-2 bg-white rounded-lg border border-primary-color my-2 mr-2'>
                                                                    <div>{items}</div>
                                                                    <div className='flex items-center ml-2' onClick={() => handleDbFileDelete(i)}><MdClose /></div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    :
                                                    ""
                                            }
                                            {/* {files
                                                ?
                                                <div>
                                                    {
                                                        files?.map((items, i) => {
                                                            return (
                                                                <div key={i} className='flex w-fit p-2 bg-white rounded-lg border border-primary-color my-2 mr-2'>
                                                                    <div>{items.name}</div>
                                                                    <div className='flex items-center ml-2' onClick={() => handleFileDelete(i)}><MdClose /></div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                                :
                                                ""
                                            } */}

                                        </div>
                                        :
                                        null
                                    }

                                    <div className="flex justify-center items-center">
                                        <ImageUpload
                                            name="imageUploads"
                                            designClass={cloudinaryId?.length > 0 || isUploaded ?
                                                "xl:w-80 md:w-96 sm:w-64 h-14 sm:h-12 rounded-lg bg-primary-color flex items-center justify-center cursor-pointer"
                                                :
                                                "xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 rounded-lg bg-primary-color flex items-center justify-center cursor-pointer"}
                                            multiple={true}
                                            handleFileUpload={handleFileUpload}
                                        />

                                        {cloudinaryId?.length > 0 || isUploaded ?
                                            <div>
                                                <button onClick={handleReset} className='h-12 w-11 bg-primary-color ml-3 rounded-lg flex justify-center items-center'>
                                                    <IoMdRefresh className='h-6 w-6' />
                                                </button>
                                            </div>
                                            :
                                            ""}
                                    </div>
                                </div>
                            </div>
                            <div className='border-b border-b-[#949494] mb-10'>
                                <div className='flex justify-between mb-9 relative location'>
                                    <div>
                                        <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Location</label>
                                        <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Location</p>
                                    </div>
                                    <FormDropdown
                                        name='location'
                                        optionButtonClass={`flex w-96 h-12 items-center justify-between rounded-lg bg-white px-4 border border-solid border-[#B6B6B6]`}
                                        editButton={true}
                                        selection={true}
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
                                        className='cursor-default xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-white rounded-lg text-lg cursor-grab'
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type='submit'
                                        className='cursor-default xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-primary-color rounded-lg text-lg cursor-grab'
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
