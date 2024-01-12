import React, { useEffect, useState } from 'react'
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import { myProfileSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/common/textInput';
import { generalUserData, generalUserDetails, userData, userProfileData } from '../../redux/reducers/userSlice';

export default function MyProfile() {
    const [editButton, setEditButton] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showRegisterPassword, setShowRegisterPassword] = useState(false)
    const [currentPasswordEntered, setCurrentPasswordEntered] = useState(false)
    const resolver = useValidationResolver(myProfileSchema);

    const dispatch = useDispatch();
    // const existingData = useSelector(userData);
    // console.log(existingData,'existingdata')
    const fetchUserDetails = useSelector(generalUserData);



    const methods = useForm({
        defaultValues: {
            emailMailId: fetchUserDetails?.emailMailId || "",
            mobileNumber: `${fetchUserDetails?.mobileNumber}` || "",
            name: fetchUserDetails?.name || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        resolver,
    });

    // const methodsForPassword = useForm({
    //     defaultValues: {
    //         emailMailId: fetchUserDetails?.emailMailId || "",
    //         mobileNumber: `${fetchUserDetails?.mobileNumber}` || "",
    //         name: fetchUserDetails?.name || "",
    //         currentPassword: "",
    //         newPassword: "",
    //         confirmPassword: ""
    //     },
    //     resolverForPassword,
    // });

    useEffect(() => {
        const getUser = dispatch(generalUserDetails());

        getUser?.then((res) => {
            console.log(res, "respi")
            methods.reset({
                emailMailId: res?.data?.emailMailId || "",
                mobileNumber: `${res?.data?.mobileNumber}` || "",
                name: res?.data?.name || ""
            })
        })


    }, [])

    useEffect(() => {
        if (methods.getValues().currentPassword) {
            setCurrentPasswordEntered(true)
        } else {
            setCurrentPasswordEntered(false)
        }
    }, [methods])

    const submitData = async (data) => {
        try {
            const name = methods.getValues().name;
            const emailMailId = methods.getValues().emailMailId;
            const mobileNumber = methods.getValues().mobileNumber;
            const currentPassword = methods.getValues().currentPassword;
            const newPassword = methods.getValues().newPassword;
            const retypePassword = methods.getValues().confirmPassword;

            // const itemDetails = methods.getValues();

            if (currentPassword) {
                if (newPassword && retypePassword) {
                    const changePassword = await dispatch(userProfileData(data));
                    console.log(changePassword, "changePassword")
                }
                else {
                    setCurrentPasswordEntered(true)
                }

            } else {
                setCurrentPasswordEntered(false)
                dispatch(userProfileData({ name, emailMailId, mobileNumber }));
            }

        } catch (error) {
            console.log("submitData errors", error)
        }
    };

    const handleEditButton = () => {
        setEditButton(!editButton);
    }

    return (
        <div className='flex justify-center items-center flex-col md:container md:mx-auto'>
            <div className='flex w-full justify-center p-6'>
                <div className='font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16 mr-4'>My Profile</div>
                {editButton ? null : <div><button className='cursor-pointer w-24 h-10 rounded-xl bg-primary-color border-none text-sm flex justify-center items-center' onClick={handleEditButton}> Edit <FaPenToSquare style={{ marginLeft: "5px" }} /></button> </div>}
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submitData)} className='flex justify-around w-full'>
                    <div className='w-full px-24'>
                        <div className='mb-20'>
                            <div className='flex justify-between'>
                                <div>
                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Name</label>
                                    <div className='font-medium text-xs'>Your Name</div>
                                </div>

                                <TextInput
                                    type="text"
                                    placeholder="Enter your Name"
                                    name="name"
                                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl ${editButton ? 'bg-white' : 'bg-grey88'}`}
                                    autoComplete="off"
                                    disable={!editButton}
                                />

                            </div>

                            <div className='flex justify-between mt-9'>

                                <div>
                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Mobile Number</label>
                                    <div className='font-medium text-xs'>Your Mobile Number</div>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Number"
                                    name="mobileNumber"
                                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl ${editButton ? 'bg-white' : 'bg-grey88'}`}
                                    autoComplete="off"
                                    required
                                    disable={!editButton}

                                />
                            </div>

                            <div className='flex justify-between mt-9'>
                                <div>
                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-[13px]'>Mail ID</label>
                                    <div className='font-medium text-xs'>Your Mail ID</div>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Email address"
                                    name="emailMailId"
                                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl ${editButton ? 'bg-white' : 'bg-grey88'}`}
                                    autoComplete="off"
                                    required
                                    disable={!editButton}
                                />

                            </div>

                            <div>
                                <div className='font-bold text-2xl pt-[30px] pb-[60px]'>
                                    Change Password
                                </div>
                                <div className='flex justify-between mt-9'>

                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Enter Current password</label>
                                    <TextInput
                                        type="password"
                                        placeholder="Current password"
                                        eyeClass='absolute bottom-3 left-80 pl-5'
                                        name="currentPassword"
                                        className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl ${editButton ? 'bg-white' : 'bg-grey88'}`}
                                        autoComplete="off"
                                        disable={!editButton}
                                        showPassword={showRegisterPassword}
                                        setShowPassword={() => setShowRegisterPassword(!showRegisterPassword)}
                                    />
                                </div>

                                <div className='relative'>
                                    <div className='flex justify-between mt-9'>
                                        <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Enter New password</label>
                                        <TextInput
                                            type="password"
                                            placeholder="New password"
                                            name="newPassword"
                                            className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl ${editButton ? 'bg-white' : 'bg-grey88'}`}
                                            autoComplete="off"
                                            disable={!editButton}
                                            eyeClass='absolute bottom-3 left-80 pl-5'
                                            showPassword={showNewPassword}
                                            setShowPassword={() => setShowNewPassword(!showNewPassword)}
                                        />
                                    </div>
                                    {currentPasswordEntered ?
                                        <p className='flex justify-end pr-52 text-red'>New Password required</p>
                                        :
                                        ""}
                                </div>

                                <div>
                                    <div className='flex justify-between mt-9'>
                                        <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Re - Enter New password</label>
                                        <TextInput
                                            type="password"
                                            placeholder="New password"
                                            eyeClass='absolute bottom-3 left-80 pl-5'
                                            name="confirmPassword"
                                            className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl ${editButton ? 'bg-white' : 'bg-grey88'}`}
                                            autoComplete="off"
                                            disable={!editButton}
                                            showPassword={showPassword}
                                            setShowPassword={() => setShowPassword(!showPassword)}
                                        />
                                    </div>
                                    {currentPasswordEntered ?
                                        <p className='flex justify-end pr-36 mr-2 text-red'>Password confirmation required</p>
                                        :
                                        ""}
                                </div>
                            </div>

                        </div>

                        {editButton ?
                            <div className='w-full flex mb-10 justify-center'>

                                <div>
                                    <button onClick={handleEditButton} className='cursor-pointer w-44 h-14 border border-[solid] border-greys bg-white rounded-xl text-lg'>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button type='submit' className='cursor-pointer w-44 h-14 ml-5 border border-[solid] border-primary-color bg-primary-color rounded-xl text-lg'>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                            :
                            null}
                    </div>
                </form>
            </FormProvider>

        </div>
    )
}
