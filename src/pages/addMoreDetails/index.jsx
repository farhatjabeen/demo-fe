import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import useValidationResolver from '../../hooks/useValidationResolver';
import { addMoreDetailsSchema, loginSchema } from '../../validations';
import { FormProvider, set, useForm } from 'react-hook-form';
import { loginUser } from '../../redux/reducers/userSlice';
import TextInput from '../../components/common/textInput';
import TextAreaInput from '../../components/common/textAreaInput';
import { IoMdRefresh } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function AddMoreDetails() {
    const [itemname, setItemname] = useState('');
    const [location, setLocation] = useState('');
    const [files, setFiles] = useState();
    const [isUploaded, setIsUploaded] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [newreport, setNewreport] = useState({
        category: '',
        description: '',
        keywords: '',
        locationidentifier: '',
        name: '',
        mobilenumber: '',
        mail: '',
        date: '',
        time: '',
        reporterid: ''
    })

    // const navigate = useNavigate();
    const reportDetails = useParams();

    // const dispatch = useDispatch();
    const resolver = useValidationResolver(addMoreDetailsSchema);

    const methods = useForm({
        defaultValues: {
            emailMail: "",
            mobileNumber: "",
            name: "",
            location: "",
            landmark: "",
            itemDescription: "",
            itemCategory: "",
            itemName: "",
            keywords: ""
        },
        resolver
    });

    const submitData = async (data) => {
        // try {
        //     dispatch(loginUser(data))
        // } catch (error) {
        //     console.log("submitData errors", error)
        // }
    };

    const handleReset = (e) => {
        setFiles();
        setIsUploaded(false);
    }

    const handleAdd = (e) => {

    }
    const handleFileUpload = (e) => {

        const selectedFiles = e.target.files;
        setFiles(selectedFiles);
        if (files !== null) {
            setIsUploaded(true);
            if (selectedFiles.length === 1) {
                setIsReset(true);
            }
            if (selectedFiles.length > 1) {
                setIsReset(false);
            }
        }
    }
    useEffect(() => {
        // handleFileUpload();
    }, [files]);

    console.log(files, 'files');

    useEffect(() => {
        if (!itemname) {
            setItemname(reportDetails.itemName);
        }
        if (!location) {
            setLocation(reportDetails.location);
        }
    }, []);

    const handleName = () => {

    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewreport({ ...newreport, [name]: value });
    };
    const dayjs = require('dayjs');
    const handleSubmit = (e) => {

        const date = new Date();
        const formattedDate = dayjs(date).format('DD[th] MMMM YYYY');
        const formattedTime = dayjs(date).format('hh : mm A');
        e.preventDefault();
        console.log(newreport, 'newreport');

    };
    return (
        <div className='flex justify-center items-center flex-col md:container md:mx-auto'>
            <div className='flex w-full justify-center p-6'>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16'>Add More details</div>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submitData)} className='flex justify-around w-full'>
                    <div className='w-full px-24'>
                        <div>
                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='font-bold text-lg'>Item Name</label>
                                    <p className='font-medium text-sm'>Item Name</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Type Name"
                                    name="itemName"
                                    className='h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5 w-96'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='font-bold text-lg'>Item Category</label>
                                    <p className='font-medium text-sm'>Item Category</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Select Category"
                                    name="itemCategory"
                                    className='h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5 w-96'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='font-bold text-lg'>Item Description</label>
                                    <p className='font-medium text-sm'>Item Description</p>
                                </div>
                                <TextAreaInput
                                    rows="4"
                                    placeholder="Type desc"
                                    name="itemDescription"
                                    className='border border-[#B6B6B6] rounded-lg p-5 w-96'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between h-12 mb-16'>
                                <div>
                                    <label className='font-bold text-lg'>Keywords</label>
                                    <p className='font-medium text-sm'>Keywords</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Keywords"
                                    name="keywords"
                                    className='h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5 w-96'
                                    autoComplete="off"
                                    required
                                    value={newreport.keywords}
                                    onChange={handleInputChange}
                                />
                                {/* <input className='h-20 sm:h-16 border border-[#B6B6B6] rounded-lg p-5  w-24' 
                                type='text' name='keywords' value={newreport.keywords} onChange={handleInputChange} placeholder='Keywords' /> */}

                            </div>

                            <div className='flex justify-between h-12 mb-9 relative'>
                                <div>
                                    <label className='font-bold text-lg'>Upload Images</label>
                                    <p className='font-medium text-sm'>Upload Images</p>
                                </div>
                                <div className="flex items-center">
                                    <label
                                        htmlFor="fileInput"
                                        className={`${isUploaded ? "w-80 h-14 sm:h-12 bg-white rounded-lg border border-primary-color text-sm flex items-center justify-center cursor-pointer" : "w-96 h-14 sm:h-12 rounded-lg bg-primary-color flex items-center justify-center cursor-pointer"}`}
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        id="fileInput"
                                        className="hidden"
                                        multiple
                                        onChange={handleFileUpload}

                                    />
                                    {isUploaded ?

                                        <div>
                                            <button className='h-12 w-11 bg-primary-color ml-2 rounded-lg flex justify-center items-center'
                                                onClick={isReset ? handleReset : handleAdd}>
                                                {
                                                    isReset ? <IoMdRefresh className='h-6 w-6' /> : <div>
                                                        <label
                                                            htmlFor="fileInputt"
                                                        >
                                                            <IoMdAddCircleOutline className='h-6 w-6' />
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            id="fileInputt"
                                                            className="hidden"
                                                            multiple

                                                        />
                                                    </div>
                                                }
                                            </button>
                                        </div>
                                        :
                                        ""}
                                </div>
                                {/* <input type='file' placeholder='Upload Image' className='w-96 h-14 sm:h-12 rounded-lg bg-primary-color' /> */}
                            </div>
                            <div className='border-b border-b-[#949494] mb-10'>
                                <div className='flex justify-between h-12 mb-9 relative location'>
                                    <div>
                                        <label className='font-bold text-lg'>Location</label>
                                        <p className='font-medium text-sm'>Location</p>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="Type Address"
                                        name="location"
                                        className='w-96 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                        autoComplete="off"
                                        required
                                    />

                                </div>

                                <div className='flex justify-between h-12 mb-9 relative'>
                                    <div>
                                        <label className='font-bold text-lg'>Location Identifiers</label>
                                        <p className='font-medium text-sm'>Location Identifiers</p>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="Landmarks of the location"
                                        name="landmark"
                                        className='w-96 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative location'>
                                <div>
                                    <label className='font-bold text-lg'>Your Name</label>
                                    <p className='font-medium text-xs'>Your Name</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Name"
                                    name="name"
                                    className='w-96 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                    autoComplete="off"
                                />
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative'>
                                <div>
                                    <label className='font-bold text-lg'>Your Phone Number</label>
                                    <p className='font-medium text-xs'>Your Phone Number</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Number"
                                    name="mobileNumber"
                                    className='w-96 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative'>
                                <div>
                                    <label className='font-bold text-lg'>Your Mail address</label>
                                    <p className='font-medium text-xs'>Your Mail address</p>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Email address"
                                    name="emailMail"
                                    className='w-96 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-between mt-20'>
                            <div className='xl:w-4/12 md:w-2/5 sm:w-80 flex justify-between items-center mb-10'>
                                <div><button className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-white rounded-lg text-lg cursor-grab' onClick={() => { window.history.back() }}>Cancel</button></div>
                                <div><button type='submit' className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-primary-color rounded-lg text-lg cursor-grab' >Submit form</button></div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
