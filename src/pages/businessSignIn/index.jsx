import React, { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import TextInput from "../../components/common/textInput";
import useValidationResolver from '../../hooks/useValidationResolver';
import { loginSchema } from '../../validations';
import { loginUser } from '../../redux/reducers/userSlice';

export default function BusinessSignIn() {

    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch();
    const resolver = useValidationResolver(loginSchema);
    console.log(resolver,"resolver");
    const methods = useForm({
        defaultValues: {
            emailMailId: "",
            password: ""
        },
        resolver
    });
console.log(methods,"methods");
    const submitData = async (data) => {
        try {
            dispatch(loginUser(data))
        } catch (error) {
            console.log("submitData errors", error)
        }
    };
    return (
        <div className='flex justify-center mb-28'>
            <div className='bg-white xl:w-2/6 md:w-3/5 sm:w-4/5 border-[#878787] border rounded-lg p-8'>
                <h1 className='font-light text-2xl'>Welcome!</h1>
                <h2 className='font-medium text-3xl mt-5 mb-10'>Sign in to your business</h2>
                <div className='flex flex-col justify-center '>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(submitData)}>
                            <div className='flex flex-col'>
                                <label className='font-normal text-base'>Email address</label>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your Email address"
                                    name="emailMailId"
                                    className='h-14 w-full border border-[#282828] rounded-md placeholder:text-sm p-4 my-3'
                                    autoComplete="off"
                                    required
                                />
                                <label className='font-normal text-base mt-8'>Password</label>
                                <TextInput
                                    type="password"
                                    placeholder="Enter your Password"
                                    name="password"
                                    className='h-14 w-full border border-[#282828] rounded-md placeholder:text-sm p-4 my-3'
                                    autoComplete="off"
                                    showPassword={showPassword}
                                    required
                                    setShowPassword={() => setShowPassword(!showPassword)}
                                />
                                <div className='flex justify-between mt-3'>
                                    <div className='flex justify-between w-24'>
                                        <input type='checkbox' />
                                        <div className='text-xs text-[#4D4D4D] font-light'>Remember me</div>
                                    </div>
                                    <div className='text-xs text-[#4D4D4D] font-light'>
                                        Forgot Password?
                                    </div>
                                </div>
                                <button
                                    className='bg-primary-color w-full h-14 rounded-md mt-8'
                                    type="submit"
                                >Login
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <div className='text-[#7D7D7D] font-light mt-14 flex justify-center'>
                    Don't have an Account&nbsp;? <span className='text-[#000000] font-semibold'>&nbsp;Get more info</span>
                </div>
            </div>
        </div >
    )
}
