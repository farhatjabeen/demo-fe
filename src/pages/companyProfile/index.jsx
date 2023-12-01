import React, { useState, useEffect } from 'react'
import { FaPenToSquare } from "react-icons/fa6";
import FormDropdown from '../../components/formDropdown';
import { useDispatch, useSelector } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/common/textInput';
import { companyProfile } from '../../validations';
import { companyProfileData, editCompanyProfileData, userProfile } from '../../redux/reducers/userSlice';
import { locationDetails, locationDropdownValues } from '../../redux/reducers/itemsSlice';

export default function CompanyProfile() {

    const profileData = useSelector(userProfile);
    console.log(profileData,"pd");

    const [editButton, setEditButton] = useState(false);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    // const [businessCompanyName, setBusinessCompanyName] = useState(profileData.companyName);
    // console.log(businessCompanyName,"cn")
    // const [mobileNumber, setMobileNumber] = useState('');
    // const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [dbPassword, setDbPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [select, setSelect] = useState(false);
    const companyCategories = ["General Partnership", "Sole Proprietorship", "Nonprofit Organization", "Corporation", "Limited Partnership", "Limited Liability Company", "Cooperative"];
    // const citiesInSerbia = ["Belgrade", "Novi Sad", "Niš", "Kragujevac", "Subotica", "Čačak", "Kraljevo", "Užice", "Zrenjanin", "Pančevo"];

    const cities = useSelector(locationDetails);
    const citiesInSerbia = Object.values(cities);
    // console.log(citiesInSerbias,'cis')

    const handleEditButton = () => {
        setEditButton(!editButton);
        setSelect(!select);
    }

    const dispatch = useDispatch();
    const resolver = useValidationResolver(companyProfile);
    // const locationDetails = useSelector()

    useEffect(() => {
        dispatch(companyProfileData())
        dispatch(locationDropdownValues())
    }, [])

    // const methods = useForm({
    //     defaultValues: {
    //         companyName: `${profileData.companyName}`,
    //         companyCategory: `${profileData.companyCategory}`,
    //         companyLocation: `${profileData.location}`,
    //         name: `${profileData.name}`,
    //         mobileNumber: `${profileData.mobileNumber}`,
    //         emailMailId: `${profileData.emailMailId}`,
    //         password: "",
    //         newPassword: "",
    //         confirmPassword: ""
    //     },
    //     resolver
    // });

    const methods = useForm({
        defaultValues: {
            companyName: "",
            companyCategory: "",
            companyLocation: "",
            name: "",
            mobileNumber: "",
            emailMailId: "",
            password: "",
            newPassword: "",
            confirmPassword: ""
        },
        resolver
    });

    const submitData = (data) => {
        try {
            console.log("submit Data", data)
            dispatch(editCompanyProfileData(methods.getValues()))
        } catch (error) {
            console.log("submitData errors", error)
        }
    };

    const handlePassword = (e) => {
        const rPass = e.target.value;
        setReEnterPassword(rPass);
        if (dbPassword === currentPassword) {
            if (reEnterPassword === newPassword) {
                setAllowSubmit(true);
            }
        }
    }

    const handleSubmit = () => {
        setEditButton(false);
    }

    return (
        <div className='flex justify-center items-center flex-col md:container md:mx-auto'>
            <div className='flex w-full justify-center p-6'>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16 mr-4'>Company Profile</div>
                {editButton ? null : <div><button className='w-24 h-10 rounded-xl bg-primary-color border-none text-sm flex justify-center items-center cursor-grab' onClick={handleEditButton}> Edit <FaPenToSquare style={{ marginLeft: "5px" }} /></button> </div>}
            </div>
            <FormProvider {...methods}>
                <form onSubmit={(e) => { e.preventDefault(); submitData() }} className='flex justify-around w-full'>
                    <div className='w-full px-24'>
                        <div className='mb-20'>
                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Company Name</label>
                                    <div className='font-medium text-xs'>Company Name</div>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Company Name"
                                    name="companyName"
                                    className={`xl:w-96 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                    autoComplete="off"
                                    disable={!editButton}
                                />
                                {/* <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='text' name='username' value={name} disabled={!editButton} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' /> */}

                            </div>

                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Company Category</label>
                                    <div className='font-medium text-xs'>Company Category</div>
                                </div>
                                <FormDropdown editButton={editButton} selectt={select} dropdownValues={companyCategories} />
                                {/* <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="tel" name='mobilenumber' value={mobileNumber} disabled={!editButton} onChange={(e) => setMobileNumber(e.target.value)} placeholder='Enter your Number' /> */}
                            </div>

                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='xl:text-lg sm:text-base font-bold mt-[13px]'>Company Location</label>
                                    <div className='font-medium text-xs'>Company Location</div>
                                </div>
                                {/* <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='email' name='email' value={email} disabled={!editButton} onChange={(e) => setEmail(e.target.value)} placeholder='abc@xyz.com' /> */}
                                <FormDropdown editButton={editButton} selectt={select} dropdownValues={citiesInSerbia} />
                            </div>

                            <div className='border-b border-b-solid border-b-[#949494] mt-12'>
                                <div className='flex justify-between mb-9'>
                                    <div>
                                        <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Name</label>
                                        <div className='font-medium text-xs'>Your Name</div>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="Enter your Name"
                                        name="name"
                                        className={`xl:w-96 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        autoComplete="off"
                                        disable={!editButton}
                                    />
                                    {/* <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='text' name='username' value={name} disabled={!editButton} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' /> */}
                                </div>

                                <div className='flex justify-between mb-9'>
                                    <div>
                                        <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Mobile Number</label>
                                        <div className='font-medium text-xs'>Your Mobile Number</div>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="Enter your Number"
                                        name="mobileNumber"
                                        className={`xl:w-96 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        autoComplete="off"
                                        required
                                        disable={!editButton}
                                    />
                                    {/* <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="tel" name='mobilenumber' value={mobileNumber} disabled={!editButton} onChange={(e) => setMobileNumber(e.target.value)} placeholder='Enter your Number' /> */}
                                </div>

                                <div className='flex justify-between mb-9'>
                                    <div>
                                        <label className='xl:text-lg sm:text-base font-bold mt-[13px]'>Mail ID</label>
                                        <div className='font-medium text-xs'>Your Mail ID</div>
                                    </div>
                                    <TextInput
                                        type="text"
                                        placeholder="abc@xyz.com"
                                        name="emailMailId"
                                        className={`xl:w-96 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        autoComplete="off"
                                        required
                                        disable={!editButton}
                                    />
                                    {/* <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='email' name='email' value={email} disabled={!editButton} onChange={(e) => setEmail(e.target.value)} placeholder='abc@xyz.com' /> */}
                                </div>
                            </div>

                            <div>
                                <div className='font-bold text-2xl mt-12 mb-12'>
                                    Change Password
                                </div>
                                <div className='flex justify-between mb-9'>
                                    <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Enter Current password</label>
                                    <input className={`xl:w-96 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl  ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="password" name='currentpassword' value={currentPassword} disabled={!editButton} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Enter your current password' />
                                </div>
                                <div className='flex justify-between mb-9'>
                                    <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Enter New password</label>
                                    <TextInput
                                        type="text"
                                        placeholder="New password"
                                        name="newPassword"
                                        className={`xl:w-96 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        autoComplete="off"
                                        required
                                        disable={!editButton}
                                    />
                                    {/* <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='text' name='newPassword' value={newPassword} disabled={!editButton} onChange={(e) => setNewPassword(e.target.value)} placeholder='New password' /> */}
                                </div>
                                <div className='flex justify-between'>
                                    <label className='xl:text-lg sm:text-base font-bold mt-3.5'>Re - Enter New password</label>
                                    <TextInput
                                        type="text"
                                        placeholder="New password"
                                        name="confirmPassword"
                                        className={`xl:w-96 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        autoComplete="off"
                                        required
                                        disable={!editButton}
                                    />
                                    {/* <input className={`xl:w-5/12 sm:w-6/12 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="password" name='reenterpassword' value={reEnterPassword} disabled={!editButton} onChange={handlePassword} placeholder='New password' /> */}
                                </div>
                            </div>
                        </div>

                        {editButton ?
                            <div className='flex flex-col items-center justify-between'>
                                <div className='xl:w-4/12 md:w-5/12 sm:w-6/12 flex justify-between mb-10'>
                                    <div>
                                        <button onClick={handleEditButton} className='xl:w-44 md:w-44 sm:w-36 xl:h-14 md:h-14 sm:h-12 border border-[solid] border-[#B6B6B6] bg-white rounded-xl xl:text-lg md:text-lg sm:text-base cursor-grab'>
                                            Cancel
                                        </button>
                                    </div>
                                    <div>
                                        <button type='submit' disabled={allowSubmit} className='xl:w-44 md:w-44 sm:w-36 xl:h-14 md:h-14 sm:h-12 border border-[solid] border-primary-color bg-primary-color rounded-xl xl:text-lg md:text-lg sm:text-base cursor-grab'>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            null}
                    </div>
                </form>
            </FormProvider>
        </div>
    )
};
