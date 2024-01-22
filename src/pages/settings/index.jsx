import React, { useState } from 'react';
import { GoLock } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AdminChangePasswordSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import TextInput from "../../components/common/textInput";
import adminPasswordimage from '../../assets/images/adminPasswordimage.png'
import { adminChangePassword } from "../../redux/reducers/userSlice";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Settings = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [show, setShow] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            const reset = await dispatch(adminChangePassword(data))
            if (reset) {
                navigate('/admin/signin');
            }
            else {
                console.log("Password reset failed");
            }
        } catch (error) {
            console.log("submitData errors", error)
        }
    };
    return (
        <div className="ml-10">
            <h1 className='text-black font-bold text-4xl mt-10'>
                Settings
            </h1>
            <div className='flex justify-between mt-24 border-b border-grey pb-4  mr-10'>
                <div className='flex'>
                <GoLock size={24} color='blue' />
                <p className='text-black font-bold ml-10 text-2xl'>Reset Password</p>
                </div>
                <div>
                {/* <button onClick={() => setShow(!show)}>
                    {show ?
                        <IoIosArrowDown />
                        :
                        <IoIosArrowUp />
                    }
                </button> */}
                </div>
            </div>

            <div  className={`${show ? "" : "hidden"}`}>
                <div className="bg-light-cyan p-10 my-10 mr-10 ml-10 rounded-lg text-xl">
                    <div>
                        <p className='font-bold pb-6'>Passwords must contain :</p>
                        <ul className='list-disc ml-4 flex text-primary-color'>
                            <li className='w-4/12'>
                                <p className='text-black'> At least 8 characters</p>
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
                                        placeholder="Enter Current Password"
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
                                        placeholder="Enter New Password"
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
                                        placeholder="Enter Confirm Password"
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
                    </div>
                    <div>
                        <img src={adminPasswordimage} alt='admin' className=' mt-40 ' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings