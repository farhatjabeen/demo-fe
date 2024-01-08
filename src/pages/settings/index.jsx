import React, { useState } from 'react';
import { GoLock } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AdminChangePasswordSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import TextInput from "../../components/common/textInput";
import adminPasswordimage from '../../assets/images/adminPasswordimage.png'
import { adminResetPassword } from "../../redux/reducers/userSlice";
import  OTPVerificationModal  from '../../components/OTPModal'
const Settings = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isOTPOpen, setIsOTPOpen] = useState(false);
    const dispatch = useDispatch();
    const resolver = useValidationResolver(AdminChangePasswordSchema);
    const methods = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        resolver
    });
    const submitData = async (data) => {
        try {
            setIsOTPOpen(true);
            // const reset = dispatch(adminResetPassword(data))
            // if (reset) {
            //     navigate('/admin/signin');
            // }
            // else {
            //     console.log("Password reset failed");
            // }
        } catch (error) {
            console.log("submitData errors", error)
        }
    };
    const handleOTPVerification = async (otp) => {
        try {
            console.log("Verifying OTP:", otp);
            setIsOTPOpen(false);
        } catch (error) {
            console.log("OTP verification error", error);
        }
    };
    return (
        <div className="ml-10">
            <h1 className='text-black font-bold text-4xl mt-10'>
                Settings
            </h1>
            <div className='flex mt-24 border-b border-grey pb-4  mr-10'>
                <GoLock size={24} color='blue' />
                <p className='text-black font-bold ml-10 text-2xl'>Reset Password</p>
            </div>


            <div className='bg-[#F1FFFF] p-10 my-10 mr-10 ml-10 rounded-lg text-xl'>
                <div>
                    <p className='font-bold pb-6'>Passwords must contain :</p>
                    <ul className='list-disc ml-4 flex text-primary-color'>
                        <li className='w-4/12'>
                            <p className='text-black'> At least 6 characters</p>
                        </li>
                        <li className='w-4/12 pb-4'>
                            <p className='text-black'> At least 1 Upper case letter (A-Z)</p>
                        </li>
                    </ul>
                    <ul className='list-disc ml-4 flex text-primary-color'>
                        <li className='w-4/12'>
                            <p className='text-black'> At least 1 Lower case letter (a-z)</p>
                        </li>
                        <li className='w-4/12'>
                            <p className='text-black'> At least 1 number (0-9)</p>
                        </li>
                    </ul>

                </div>
            </div>

            <div className=" ml-10 flex ">
                <div>
                    <p className=" font-bold pt-4">
                        Enter your new password below, we’re just being extra safe your password.
                    </p>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(submitData)}>
                            <div className="mt-6 pt-2">
                                <label>Current Password</label>
                                <TextInput
                                    type="password"
                                    name="currentPassword"
                                    eyeClass='absolute top-4 left-3/4 ml-24'
                                    autoComplete="off"
                                    placeholder="currentPassword"
                                    className="w-full py-4 px-3 border border-gray-300 rounded-md"
                                    required
                                    showPassword={showPassword}
                                    setShowPassword={() => setShowPassword(!showPassword)}
                                />
                            </div>
                            <div className="mt-2">
                                <label>New Password</label>
                                <TextInput
                                    type="password"
                                    name="newPassword"
                                    eyeClass='absolute top-4 left-3/4 ml-24'
                                    autoComplete="off"
                                    placeholder="newPassword"
                                    className="w-full py-4 px-3 border border-gray-300 rounded-md"
                                    required
                                    showPassword={showNewPassword}
                                    setShowPassword={() => setShowNewPassword(!showNewPassword)}

                                />
                            </div>
                            <div className="mt-2">
                                <label>Confirm Password</label>
                                <TextInput
                                    type="password"
                                    name="confirmPassword"
                                    eyeClass='absolute top-4 left-3/4 ml-24'
                                    placeholder="confirmPassword"
                                    autoComplete="off"
                                    className="w-full py-4 px-3 border border-gray-300 rounded-md"
                                    required
                                    showPassword={showConfirmPassword}
                                    setShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}

                                />
                            </div>
                            <div className="mt-14">
                                <button
                                    type="submit"
                                    className="cursor-pointer w-full bg-primary-color  text-white font-bold py-4 rounded-md "
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                    <OTPVerificationModal
                        isOpen={isOTPOpen}
                        onCancel={() => setIsOTPOpen(false)}
                        onVerify={handleOTPVerification}
                    />
                </div>

                <div>
                    <img src={adminPasswordimage} className=' mt-40 ' />
                </div>
            </div>
        </div>
    )
}

export default Settings