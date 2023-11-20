import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import useValidationResolver from '../../hooks/useValidationResolver';
import { addMoreDetailsSchema, loginSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { loginUser } from '../../redux/reducers/userSlice';
import TextInput from '../../components/common/textInput';
import TextAreaInput from '../../components/common/textAreaInput';

export default function AddMoreDetails() {
    const [itemname, setItemname] = useState('');
    const [location, setLocation] = useState('');
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

    const navigate = useNavigate();
    const reportDetails = useParams();

    const dispatch = useDispatch();
    const resolver = useValidationResolver(addMoreDetailsSchema);
    console.log(resolver, "resolver");

    const methods = useForm({
        defaultValues: {
            emailMail: "",
            mobileNumber: "",
            name: "",
            location: "",
            landmark: "",
            itemDescription: "",
            itemCategory: "",
            itemName: ""
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
                                    <div className='font-medium text-sm'>Keywords</div>
                                </div>
                                <input className='h-20 sm:h-16 border border-[#B6B6B6] rounded-lg p-5  w-24' 
                                type='text' name='keywords' value={newreport.keywords} onChange={handleInputChange} placeholder='Keywords' />

                            </div>

                            <div className='flex justify-between h-12 mb-9 relative'>
                                <div>
                                    <label className='font-bold text-lg'>Upload Images</label>
                                    <div className='font-medium text-sm'>Upload Images</div>
                                </div>
                                <button className='w-2/4 h-14 sm:h-12 rounded-lg bg-primary-color'>Upload Image</button>

                            </div>
                            <div className='border-b border-b-[#949494] mb-10'>
                                <div className='flex justify-between h-12 mb-9 relative location'>
                                    <div>
                                        <label className='font-bold text-lg'>Location</label>
                                        <div className='font-medium text-sm'>Location</div>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="Type Address"
                                        name="location"
                                        className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                        autoComplete="off"
                                        required
                                    />

                                </div>

                                <div className='flex justify-between h-12 mb-9 relative'>
                                    <div>
                                        <label className='font-bold text-lg'>Location Identifiers</label>
                                        <div className='font-medium text-sm'>Location Identifiers</div>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="Landmarks of the location"
                                        name="landmark"
                                        className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative location'>
                                <div>
                                    <label className='font-bold text-lg'>Your Name</label>
                                    <div className='font-medium text-xs'>Your Name</div>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Name"
                                    name="name"
                                    className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                    autoComplete="off"
                                />
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative'>
                                <div>
                                    <label className='font-bold text-lg'>Your Phone Number</label>
                                    <div className='font-medium text-xs'>Your Phone Number</div>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Number"
                                    name="mobileNumber"
                                    className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='flex justify-between h-12 mb-9 relative'>
                                <div>
                                    <label className='font-bold text-lg'>Your Mail address</label>
                                    <div className='font-medium text-xs'>Your Mail address</div>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Email address"
                                    name="emailMail"
                                    className='w-2/4 h-14 sm:h-12 border border-[#B6B6B6] rounded-lg p-5'
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>
                        <div className='xl:w-3/12 md:w-2/5 sm:w-80 flex justify-between mb-10'>
                            <div><button className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-white rounded-lg text-lg cursor-grab' onClick={() => { window.history.back() }}>Cancel</button></div>
                            <div><button type='submit' className='xl:w-44 xl:h-14 md:w-40 md:h-14 sm:w-36 sm:h-12 border border-[#B6B6B6] bg-primary-color rounded-lg text-lg cursor-grab' >Submit form</button></div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}