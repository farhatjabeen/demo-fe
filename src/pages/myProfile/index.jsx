import React, { useState } from 'react'
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import { addMoreDetailsSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/common/textInput';
import { userData, userDetails, userProfileData } from '../../redux/reducers/userSlice';

export default function MyProfile() {
    const [editButton, setEditButton] = useState(false);
    const [isPassword,setIsPassword] = useState(false);
    console.log(isPassword,'ispass')

    const dispatch = useDispatch();
    const resolver = useValidationResolver(addMoreDetailsSchema);
    const fetchUserDetails = useSelector(userData);
    console.log(fetchUserDetails,'fud')
    const methods = useForm({
        defaultValues: {
            emailMailId: fetchUserDetails?.emailMailId || "",
            mobileNumber: fetchUserDetails?.mobileNumber || "",
            name: fetchUserDetails?.name || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword:""
        },
        resolver
    });

    const submitData = async (e) => {
        try {
            e.preventDefault();
            const name = methods.getValues().name;
            const emailMailId = methods.getValues().emailMailId;
            const mobileNumber = methods.getValues().mobileNumber;
            const currentPassword = methods.getValues().currentPassword;
            const itemDetails = methods.getValues();
            if(currentPassword){
                dispatch(userProfileData(itemDetails));
            } else{
                dispatch(userProfileData({name,emailMailId,mobileNumber}))
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
                {editButton ? null : <div><button className='w-24 h-10 rounded-xl bg-primary-color border-none text-sm flex justify-center items-center cursor-grab' onClick={handleEditButton}> Edit <FaPenToSquare style={{ marginLeft: "5px" }} /></button> </div>}
            </div>



            <FormProvider {...methods}>
                <form onSubmit={(e)=>submitData(e)} className='flex justify-around w-full'>
                    <div className='w-full px-24'>
                        <div className='mb-20'>
                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Name</label>
                                    <div className='font-medium text-xs'>Your Name</div>
                                </div>

                                <TextInput
                                    type="text"
                                    placeholder="Enter your Name"
                                    name="name"
                                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                    autoComplete="off"
                                    disable={!editButton}

                                />

                            </div>

                            <div className='flex justify-between mb-9'>

                                <div>
                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Mobile Number</label>
                                    <div className='font-medium text-xs'>Your Mobile Number</div>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Number"
                                    name="mobileNumber"
                                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                    autoComplete="off"
                                    required
                                    disable={!editButton}

                                />
                            </div>

                            <div className='flex justify-between mb-9'>
                                <div>
                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-[13px]'>Mail ID</label>
                                    <div className='font-medium text-xs'>Your Mail ID</div>
                                </div>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Email address"
                                    name="emailMailId"
                                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                    autoComplete="off"
                                    required
                                    disable={!editButton}
                                />

                            </div>

                            <div>
                                <div className='font-bold text-2xl pt-[30px] pb-[60px]'>
                                    Change Password
                                </div>
                                <div className='flex justify-between mb-9'>

                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Enter Current password</label>
                                    <TextInput
                                        type="password"
                                        placeholder="Current password"
                                        name="currentPassword"
                                        className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        autoComplete="off"
                                        disable={!editButton}
                                    />
                                    {/* <input
                                        className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl  ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        type="password" name='currentpassword' value={currentPassword} disabled={!editButton} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Enter your current password' /> */}
                                </div>

                                <div className='flex justify-between mb-9'>
                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Enter New password</label>
                                    <TextInput
                                        type="text"
                                        placeholder="New password"
                                        name="newPassword"
                                        className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        autoComplete="off"
                                        disable={!editButton}
                                    />
                                </div>

                                <div className='flex justify-between'>
                                    <label className='xl:text-lg md:text-base sm:text-sm font-bold mt-3.5'>Re - Enter New password</label>
                                    <TextInput
                                        type="text"
                                        placeholder="New password"
                                        name="confirmPassword"
                                        className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-[#B6B6B6] rounded-xl ${editButton ? 'bg-white' : 'bg-[#E0E0E0]'}`}
                                        autoComplete="off"
                                        disable={!editButton}
                                    />
                                </div>
                            </div>

                        </div>

                        {editButton ?
                            <div className='xl:w-4/12 md:w-7/12 sm:w-10/12 flex xl:ml-80 md:ml-32 sm:ml-12 mb-10 justify-between'>

                                <div>
                                    <button onClick={handleEditButton} className='w-44 h-14 border border-[solid] border-[#B6B6B6] bg-white rounded-xl text-lg cursor-grab'>
                                        Cancel
                                    </button>
                                </div> 
                                <div>
                                    <button type='submit' className='w-44 h-14 border border-[solid] border-primary-color bg-primary-color rounded-xl text-lg cursor-grab'>
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
