import React from 'react';
import { GoLock } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AdminChangePasswordSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import TextInput from "../../components/common/textInput";
import adminPasswordimage from '../../assets/images/adminPasswordimage.png'

const Settings = () => {
    const navigate = useNavigate();

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
        navigate('/admin/signin');
        // try {
        //   dispatch(loginUser(data))
        // } catch (error) {
        //   console.log("submitData errors", error)
        // }
    };
    return (
        <div className="ml-10">
            <h1 className='text-black font-bold text-4xl mt-10'>
                Settings
            </h1>
            <div className='flex mt-24 border-b pb-4  mx-10'>
                <GoLock size={24} color='blue' />
                <p className='text-black font-bold ml-10 text-2xl'>Reset Password</p>
            </div>


            <div className='bg-[#F1FFFF] p-10 my-10 mr-10 ml-24 rounded-lg text-xl'>
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

            <div className=" ml-24 flex ">
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
                                autoComplete="off"
                                placeholder="currentPassword"
                                className="w-full py-4 px-3 border border-gray rounded-md"
                                required
                            />
                        </div>
                        <div className="mt-2">
                        <label>New Password</label>
                            <TextInput
                                type="password"
                                name="newPassword"
                                autoComplete="off"
                                placeholder="newPassword"
                                className="w-full py-4 px-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <label>Confirm Password</label>
                            <TextInput
                                type="password"
                                name="confirmPassword"
                                placeholder="confirmPassword"
                                autoComplete="off"
                                className="w-full py-4 px-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mt-14">
                            <button
                                type="submit"
                                className="w-full bg-light-green  text-white font-bold py-4 rounded-md focus:outline-none focus:ring focus:light-green"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </FormProvider>
                </div>

                <div>
                    <img src={adminPasswordimage} className=' mt-40 ' />
                </div>
            </div>
        </div>
    )
}

export default Settings