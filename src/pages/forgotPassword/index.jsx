import React, { useState } from 'react';
import { useNavigate } from 'react-router'
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import TextInput from "../../components/common/textInput";
import useValidationResolver from '../../hooks/useValidationResolver';
import { businessUserForgotSchema } from '../../validations';
import { businessResetPassword } from '../../redux/reducers/userSlice';

export default function ForgotPassword() {

    const [createShowPassword, setCreateShowPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch();
    const resolver = useValidationResolver(businessUserForgotSchema);
    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
        resolver
    });

    const submitData = (data) => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            const reset = dispatch(businessResetPassword(data,token));
            if (reset) {
                navigate('/businessSignin')
            }
            else {
                console.log("Password reset failed");
            }
        } catch (error) {
            console.log("submitData errors", error)
        }
    };
    return (
        <div className='flex justify-center mb-28'>
            <div className='bg-white xl:w-2/6 md:w-3/5 sm:w-4/5 border-[#878787] border rounded-lg p-8'>
                <h2 className='font-medium text-3xl mt-5 mb-10'>Reset Password</h2>
                <h2 className='font-medium text-xl mt-5 mb-10'>Create a strong, secure password for your account.
                </h2>
                <div className='flex flex-col justify-center '>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(submitData)}>
                            <div className='flex flex-col'>
                                <label className='font-normal text-base'>Create New Password</label>
                                <TextInput
                                    type="password"
                                    placeholder="Enter your new Password"
                                    name="newPassword"
                                    className='h-14 w-full border border-[#282828] rounded-md placeholder:text-sm p-4 my-3'
                                    autoComplete="off"
                                    required
                                    showPassword={createShowPassword}
                                    setShowPassword={() => setCreateShowPassword(!createShowPassword)}

                                />
                                <label className='font-normal text-base mt-8'> Confirm Password</label>
                                <TextInput
                                    type="password"
                                    placeholder="Confirm your Password"
                                    name="confirmPassword"
                                    className='h-14 w-full border border-[#282828] rounded-md placeholder:text-sm p-4 my-3'
                                    autoComplete="off"
                                    showPassword={showPassword}
                                    required
                                    setShowPassword={() => setShowPassword(!showPassword)}
                                />
                                <button
                                    className='bg-primary-color w-full h-14 rounded-md mt-8'
                                    type="submit"
                                >Save Password
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div >
    )
}
