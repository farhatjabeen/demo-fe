import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useValidationResolver from '../../hooks/useValidationResolver';
import { addMoreDetailsSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/common/textInput';
import TextAreaInput from '../../components/common/textAreaInput';
import { IoMdRefresh } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { itemDropdown, itemDropdownValues, viewDetails, viewItemById, businessUpdateItems, filesUploadAPI, locationDropdownValues, locationDetails } from '../../redux/reducers/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from '../../components/common/imageUpload';
import DropdownMenu from '../../components/common/dropdown';

export default function EditBusinessDetails() {
    const [filesFromDb, setFilesFromDb] = useState([]);
    const [files, setFiles] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(" ");
    const [selectedLocation, setSelectedLocation] = useState(" ");
    const [cloudinaryId, setCloudinaryId] = useState([]);
    const [itemImage, setItemImage] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const resolver = useValidationResolver(addMoreDetailsSchema);
    const items = useSelector(itemDropdown);
    const itemCategories = items ? Object.values(items) : [];
    const locations = useSelector(locationDetails);
    const locationCategory = locations ? Object.values(locations) : [];


    const methods = useForm({
        defaultValues: {
            itemName: "",
            itemCategory: "",
            itemDescription: "",
            emailMailId: "",
            mobileNumber: "",
            userName: "",
            location: "",
            locationIdentifiers: "",
            keywords: "",
            itemImage: "",
            cloudinary_id: "",

        },
        resolver
    });
    useEffect(() => {
        dispatch(viewItemById(id))
    }, [id])
    const itemDetails = useSelector(viewDetails);

    useEffect(() => {
        if (itemDetails?.cloudinary_id) {
            setFilesFromDb(itemDetails?.cloudinary_id);
        }
    }, [itemDetails.cloudinary_id]);

    useEffect(() => {
        setSelectedLocation(itemDetails.location)
        dispatch(locationDropdownValues());
    }, [itemDetails.location]);

    useEffect(() => {
        setSelectedCategory(itemDetails.itemCategory)
        dispatch(itemDropdownValues())
    }, [itemDetails.itemCategory])
    useEffect(() => {
        if (itemDetails) {
            setItemImage(itemDetails?.itemImage)
            setCloudinaryId(itemDetails?.cloudinary_id)

            methods.reset({
                itemName: itemDetails?.itemName || "",
                itemDescription: itemDetails?.itemDescription || "",
                itemCategory: itemDetails?.itemCategory || "",
                emailMailId: itemDetails?.emailMailId || "",
                mobileNumber: itemDetails?.mobileNumber || "",
                userName: itemDetails?.userName || "",
                location: itemDetails?.location || "",
                locationIdentifiers: itemDetails?.locationIdentifiers || "",
                keywords: `${itemDetails?.keywords}` || "",
                itemImage: itemImage || "",
                cloudinary_id: cloudinaryId || ""
            });
        }
    }, [itemDetails]);

    const handleReset = (e) => {
        e.preventDefault();
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
    const handleRemoveFile = (indexToRemove) => {
        setItemImage((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
        setCloudinaryId((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    };

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
                location: selectedLocation,
            };
            methods.setValue('itemImage', itemImage)
            methods.setValue('cloudinary_id', cloudinaryId)
            await dispatch(businessUpdateItems(id, updatedData));
            navigate('/allItems');
        } catch (error) {
            console.error('Update failed:', error);
        }
    };


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
                                    placeholder="Keywords"
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
                                    {isUploaded || itemDetails?.itemImage ? (
                                        <div className='flex flex-wrap w-96'>
                                            {cloudinaryId?.map((file, i) => (
                                                <div key={i} className='flex w-fit p-2 bg-white rounded-lg border border-primary-color my-2 mr-2'>
                                                    <div>{file}</div>
                                                    <div className='flex items-center ml-2 cursor-pointer' onClick={() => handleRemoveFile(i)}><MdClose /></div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}

                                    <div className="flex justify-center items-center">
                                        <ImageUpload
                                            name="itemImage"
                                            designClass={
                                                `${isUploaded || itemDetails?.itemImage
                                                    ?
                                                    "xl:w-80 md:w-80 sm:64 xl:mr-2 h-14 sm:h-12 bg-white rounded-lg border border-primary-color text-sm flex items-center justify-center cursor-pointer"
                                                    :
                                                    "xl:w-96 md:w-96 sm:w-64 h-14 sm:h-12 rounded-lg bg-primary-color flex items-center justify-center cursor-pointer"
                                                }`
                                            }
                                            multiple={true}
                                            handleFileUpload={handleFileUpload}
                                        />

                                        {itemDetails?.itemImage || isUploaded ?
                                            <div>
                                                <button onClick={(e) => handleReset(e)} className='cursor-pointer h-12 w-11 bg-primary-color ml-2 rounded-lg flex justify-center items-center'>
                                                    <IoMdRefresh className='h-6 w-6' />
                                                </button>
                                            </div>
                                            :
                                            ""}
                                    </div>
                                </div>
                            </div>
                            <div className='border-b border-b-gray58 mb-10'>
                                <div className='flex justify-between h-12 mb-9 relative location'>
                                    <div>
                                        <label className='font-bold xl:text-lg md:text-lg sm:text-base'>Location</label>
                                        <p className='font-medium xl:text-sm md:text-sm sm:text-xs'>Location</p>
                                    </div>

                                    <div className='w-96'>
                                        <DropdownMenu
                                            dropdownValues={locationCategory}
                                            value={selectedLocation}
                                            onChange={setSelectedLocation}
                                        />
                                    </div>
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
                                <div><button className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-greys bg-white rounded-lg text-lg cursor-pointer' onClick={() => { window.history.back() }}>Cancel</button></div>
                                <div><button type='submit' className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-greys bg-primary-color rounded-lg text-lg cursor-pointer' >Edit Form</button></div>                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
};
