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
import { goToTop } from '../../utils/helper';

export default function EditBusinessDetails() {
    const [filesFromDb, setFilesFromDb] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const [files, setFiles] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(" ");
    const [selectedLocation, setSelectedLocation] = useState(" ");
    const [cloudinaryId, setCloudinaryId] = useState([]);
    const [itemImage, setItemImage] = useState([]);
    const [isImage, setIsImage] = useState(true);


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
        goToTop();
        setIsLoader(true);
        dispatch(viewItemById(id)).then(() => {
            setIsLoader(false);
        });
    }, [id]);

    const itemDetails = useSelector(viewDetails);

    useEffect(() => {
        if (itemDetails?.cloudinary_id) {
            setFilesFromDb(itemDetails?.cloudinary_id);
        }
    }, [itemDetails.cloudinary_id]);

    useEffect(() => {
        if (itemImage?.length) {
            setIsImage(true)
        }
    }, [itemImage])

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
        if (files && files?.length > 0) {
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
            const inputString = methods.getValues().keywords;
            console.log(JSON.stringify(inputString), "inputString")

            methods.setValue('keywords', inputString.replace(/^"(.*)"$/, '$1').split(','));
            methods.setValue('itemImage', itemImage)
            methods.setValue('cloudinary_id', cloudinaryId)
            methods.setValue('itemCategory', selectedCategory)
            methods.setValue('location', selectedLocation)
            const dataNow = methods.getValues();
            if (itemImage?.length) {
                setIsImage(true)
                const updateNow = await dispatch(businessUpdateItems(id, dataNow));
                if (updateNow) {
                    navigate('/allItems');
                }
            } else {
                setIsImage(false)
            }
        } catch (error) {
            console.error('Update failed:', error);
        }
    };


    return (
        <div className='flex justify-center items-center flex-col md:container md:mx-auto'>
            <div className='flex w-full justify-center p-6'>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16'>Edit details</div>
            </div>
            {isLoader ? <p className='font-bold p-24 flex justify-center w-full text-md'>Loading...</p>
                :
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
                                            additionalClass='h-12 pt-1 pb-1'
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
                                                {itemImage?.map((items, i) => (
                                                    <div>
                                                        <div key={i} className=' mb-2 mr-2 w-fit px-2 pt-2 pb-1 bg-white rounded-lg border border-primary-color'>
                                                            <div className='flex'>
                                                                <img className='w-20 h-20' src={items} alt={i}></img>
                                                                <div className='flex items-center ml-2' onClick={() => handleRemoveFile(i)}><MdClose /></div>
                                                            </div>
                                                            <div className='flex justify-center'>{i + 1}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}

                                        <div className="flex justify-center items-center">
                                            <ImageUpload
                                                name="itemImage"
                                                designClass=
                                                "xl:w-80 md:w-96 sm:w-64 h-14 sm:h-12 xl:mr-2 rounded-lg bg-primary-color flex items-center justify-center cursor-pointer"
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
                                        {
                                            isImage ?
                                                ""
                                                :
                                                <p className='ml-1 text-red'>Images required</p>
                                        }
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
                                                additionalClass='h-12 pt-1 pb-1'
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
                                    <div><button className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-greys bg-white rounded-lg text-lg cursor-pointer' onClick={(e) => {
                                        window.history.back()
                                        e.preventDefault()
                                    }}>Cancel</button></div>
                                    <div><button type='submit' onClick={() => itemImage?.length ? setIsImage(true) : setIsImage(false)} className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-greys bg-primary-color rounded-lg text-lg cursor-pointer' >Edit Form</button></div>                            </div>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            }
        </div>
    )
};
