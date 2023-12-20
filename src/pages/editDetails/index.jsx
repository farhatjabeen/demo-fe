import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useValidationResolver from '../../hooks/useValidationResolver';
import { addMoreDetailsSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/common/textInput';
import TextAreaInput from '../../components/common/textAreaInput';
import { IoMdRefresh } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRef } from 'react';
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { itemDropdown, itemDropdownValues, viewDetails, viewItemById, businessUpdateItems } from '../../redux/reducers/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from '../../components/common/imageUpload';
import DropdownMenu from '../../components/common/dropdown';

export default function EditBusinessDetails() {
    const [itemName, setItemName] = useState('');
    const [location, setLocation] = useState('');
    const [files, setFiles] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [updatedData, setUpdatedData] = useState([]);
    const dispatch = useDispatch();
    const items = useSelector(itemDropdown);
    const itemCategories = Object.values(items);
    const [selectedCategory, setSelectedCategory] = useState(" ");
    const itemDetails = useSelector(viewDetails);
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const reportDetails = useParams();
    const resolver = useValidationResolver(addMoreDetailsSchema);

    const methods = useForm({
        defaultValues: {
            itemName: "",
            itemCategory: "",
            itemDescription: "",
            emailMail: "",
            mobileNumber: "",
            name: "",
            location: "",
            landmark: "",
            keywords: "",
            imageUpload: ""
        },
        resolver
    });
    useEffect(() => {
        dispatch(viewItemById(reportDetails.id))
    }, [reportDetails.id])
    useEffect(() => {
        if (itemDetails) {
            methods.reset({
                itemName: itemDetails.itemName,
                itemDescription: itemDetails.itemDescription,
                itemCategory: itemDetails.itemCategory,
                emailMail: itemDetails.emailMailId,
                mobileNumber: itemDetails.mobileNumber,
                name: itemDetails.userName,
                location: itemDetails.location,
                landmark: itemDetails.locationIdentifiers,
                keywords: itemDetails.keywords,
                imageUpload: itemDetails.itemImage
            });
        }
    }, [itemDetails]);
    useEffect(() => {
        setSelectedCategory(itemDetails.itemCategory)
        dispatch(itemDropdownValues())
    }, [itemDetails.itemCategory])
    const submitData = async (data) => {
        try {
            dispatch(businessUpdateItems(reportDetails, data));
            setUpdatedData(data);
            navigate('/allItems');
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    const handleReset = (e) => {
        setFiles([]);
        setIsUploaded(false);
    }

    const handleAddImages = (e) => {
        fileInputRef.current.click();
    }
    const handleFileUpload = (e) => {

        const selectedFiles = e.target.files;
        setFiles((prevFiles) => {
            const newFiles = prevFiles ? [...prevFiles, ...selectedFiles] : selectedFiles;
            if (selectedFiles) {
                setIsUploaded(true);
                setIsReset(newFiles.length === 1 ? true : false);
            }
            return newFiles;
        });
    }

    useEffect(() => {
        if (!itemName) {
            setItemName(reportDetails.itemName);
        }
        if (!location) {
            setLocation(reportDetails.location);
        }
    }, []);


    return (
        <div className='flex justify-center items-center flex-col md:container md:mx-auto'>
            <div className='flex w-full justify-center p-6'>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16'>Edit details</div>
            </div>

            <FormProvider {...methods}>
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
                                <div className='w-96'>
                                    <DropdownMenu
                                        dropdownValues={itemCategories}
                                        value={selectedCategory}
                                        onChange={setSelectedCategory}
                                    />
                                </div>
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
                                    {isUploaded ?
                                        <div className='flex flex-wrap w-96'>
                                            {files.map((items, i) => {
                                                return (
                                                    <div key={i} className='flex w-fit p-2 bg-white rounded-lg border border-primary-color m-2'>
                                                        <div>{items.name}</div>
                                                        <div className='flex items-center ml-2'><MdClose /></div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        :
                                        null
                                    }

                                    
                                </div>
                            </div>
                            <div className='border-b border-b-[#949494] mb-10'>
                                <div className='flex justify-between h-12 mb-9 relative location'>
                                    <div>
                                        <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Location</label>
                                        <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Location</p>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="Type Address"
                                        name="location"
                                        className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                        autoComplete="off"
                                        required
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
                                        name="landmark"
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
                                    name="name"
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
                                    name="emailMail"
                                    className='xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-between mt-20'>
                            <div className='xl:w-4/12 md:w-2/5 sm:w-80 flex justify-between items-center mb-10'>
                                <div><button className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-white rounded-lg text-lg cursor-grab' onClick={() => { window.history.back() }}>Cancel</button></div>
                                <div><button type='submit' onClick={submitData}  className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-primary-color rounded-lg text-lg cursor-grab' >Submit the changes</button></div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
};