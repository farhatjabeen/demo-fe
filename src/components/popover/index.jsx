import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from 'react';
import { IoTriangleSharp } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { Popover, Transition } from "@headlessui/react";
import linkSymbol from '../../assets/images/linksymbol.png';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import { checkGeneralUserEmail, generalForgotPassword, clearUserData, generalUserLogin, generalUserRegister, mailId } from '../../redux/reducers/userSlice';
import { generalUserLoginSchema, generalUserMailSchema, generalUserRegisterSchema, loginSchema } from '../../validations';
import TextInput from '../common/textInput';

const PopoverComponent = () => {

    const [passwordBox, setPasswordBox] = useState(false);
    const navigate = useNavigate();
    const mailIdFromApi = useSelector(mailId);
    const [showPassword, setShowPassword] = useState(false)
    const [showRegisterPassword, setShowRegisterPassword] = useState(false)
    const [showRegisterNewPassword, setShowRegisterNewPassword] = useState(false)
    const dispatch = useDispatch();
    const resolver = useValidationResolver(generalUserMailSchema);
    const resolverForLogin = useValidationResolver(generalUserLoginSchema);
    const resolverForRegister = useValidationResolver(generalUserRegisterSchema);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const validateEmail = (inputEmail) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(inputEmail);
    };

    useEffect(()=>{
        setPasswordBox(false);
        setIsEmailValid(false);
        setPasswordMatch(true);
        methods.reset({
            emailMailId: "",
            password: ""
        })
        methodsForRegister.reset({
            newPassword: "",
            password: ""
        })
        methodsForLogin.reset({
            password:""
        })
    },[navigate])

    const methods = useForm({
        defaultValues: {
            emailMailId: ""
        },
        resolver
    });

    const methodsForLogin = useForm({
        defaultValues: {
            password: ""
        },
        resolverForLogin
    });

    const methodsForRegister = useForm({
        defaultValues: {
            newPassword: "",
            password: ""
        }, 
        resolverForRegister
    });

    const handleEmailChange = (e) => {
        console.log("hi from email change")
        const isValid = validateEmail(e.target.value);
        setIsEmailValid(isValid);
        console.log('Email:', mailId, 'isValid:', isValid);
    };

    useEffect(()=>{
        
    },[methods])

    const handleContinue = async (data) => {
        try {
            const emailMailId = methods.getValues().emailMailId;
            const login = await dispatch(checkGeneralUserEmail({emailMailId}));
            if (login) {
                setPasswordBox(true);
            }
        } catch (error) {
            console.log("submitData errors", error)
        }
    };

    const registerButton = async () => {
        try {
            const password = methodsForRegister.getValues().password;
            const newPassword = methodsForRegister.getValues().newPassword;
            const emailMailId = mailIdFromApi.emailMailId;

            if(password === newPassword){
                setPasswordMatch(true);
                const registerSuccessful = await dispatch(generalUserRegister({ emailMailId, password }));
                console.log(registerSuccessful,"regsucc")
                if (registerSuccessful) {
                    navigate('/');
                    Popover.close();
                }
            }else{
                setPasswordMatch(false);
            }
            
        } catch (error) {
            console.log("submitData errors", error)
        }
    }

    const handleLogin = async () => {
        try {
            const password = methodsForLogin.getValues().password;
            const emailMailId = mailIdFromApi.emailMailId;
            const loginSuccessful = await dispatch(generalUserLogin({ emailMailId, password }));
            console.log("loginSuccessful",loginSuccessful)
            if (loginSuccessful) {
                navigate('/');
                Popover.close();
            }

        } catch (error) {
            console.log("submitData errors", error)
        }
    };

    const handleClose = () => {
        setPasswordBox(false);
        setIsEmailValid(false);
        setPasswordMatch(true);
        methods.reset({
            emailMailId: "",
            password: ""
        })
        methodsForRegister.reset({
            newPassword: "",
            password: ""
        })
        methodsForLogin.reset({
            password:""
        })
    }
    const handleForgot = async () => {
        try {
            await methods.trigger('emailMailId');

            if (methods.formState.errors.emailMailId) {
                console.log('Email is not valid');
                return;
            }
            const emailMailId = methods.getValues().emailMailId;
            dispatch(generalForgotPassword({ emailMailId }));
        } catch (error) {
            console.log('handleForgot error', error);
        }
    };

    return (
        <div>
            <Popover>
                {({ open }) => (
                    <div>
                        <Popover.Button>
                            <div className="cursor-pointer flex justify-center items-center xl:w-72 xl:h-14 xl:text-2xl md:w-52 md:h-14 md:text-lg sm:w-36 sm:h-12 sm:text-sm font-bold bg-primary-color text-white rounded-full xl:mx-1">
                                Login / Register
                            </div>
                        </Popover.Button>
                        <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1">
                            <Popover.Panel className='fixed z-50 inset-y-0 sm:mr-20 right-0 bg-white rounded-3xl px-10 pb-6 w-max h-max xl:mt-40 md:mt-40 xl:mr:20 md:mr-28 sm:mt-36'>
                                <div className='pt-7 w-96'>
                                    {
                                        passwordBox && mailIdFromApi?.status ?
                                            <div>
                                                {mailIdFromApi?.isAlreadyRegistered ?
                                                    <div className='mb-5'>
                                                        <div className="xl:w-full md:w-full sm:w-full">
                                                            <div className=' xl:w-full md:w-full sm:w-full flex flex-col justify-center'>
                                                                <div className=' xl:text-4xl md:text-3xl sm:text-xl text-light-black font-bold'>Enter Password</div>
                                                                <div className='pb-14 xl:text-lg md:text-lg sm:text-sm font-normal text-[#757780] pt-1'>
                                                                    Lorem ipsum dolor sit amet, consectetur<br></br> adipiscing elit onsectetur
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='relative'>
                                                            <FormProvider {...methodsForLogin}>
                                                            <form onSubmit={methodsForLogin.handleSubmit(handleLogin)}>
                                                                    <div >
                                                                        <div className='text-sm font-medium text-[#757780] mb-1.5'>Enter Password</div>
                                                                        <TextInput
                                                                            type='password'
                                                                            name='password'
                                                                            eyeClass='absolute top-3 left-3/4 ml-16'
                                                                            className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]'
                                                                            autoComplete="off"
                                                                            showPassword={showPassword}
                                                                            required
                                                                            setShowPassword={() => setShowPassword(!showPassword)}
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        type='submit'
                                                                        className='cursor-pointer w-full h-11 rounded-md mt-12 bg-[#00B8B8] text-white flex justify-center items-center text-sm font-medium border-none'>
                                                                        LOGIN
                                                                    </button>
                                                                </form>
                                                            </FormProvider>
                                                            <div className='absolute top-20 right-2.5'>
                                                                <button
                                                                    onClick={handleForgot}
                                                                    className='cursor-pointer text-light-grey text-xs font-light'>
                                                                    Forgot Password?
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='mb-5'>
                                                        <div className="xl:w-full md:w-full sm:w-full">
                                                            <div className=' xl:w-full md:w-full sm:w-full flex flex-col justify-center'>
                                                                <div className=' xl:text-4xl md:text-3xl sm:text-xl text-light-black font-extrabold'>Enter Password</div>
                                                                <div className='pb-14 xl:text   -xl md:text-lg sm:text-sm font-normal text-[#757780] pt-1'>
                                                                    Lorem ipsum dolor sit amet, consectetur<br></br> adipiscing elit onsectetur
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <FormProvider {...methodsForRegister}>
                                                            {/* <form onSubmit={(e) => registerButton(e)}> */}
                                                                <form onSubmit={methodsForRegister.handleSubmit(registerButton)}>
                                                                <div>
                                                                    <div className=' text-sm font-medium text-[#757780] mb-1.5'>Enter Password</div>
                                                                    <TextInput
                                                                        type='password'
                                                                        name="newPassword"
                                                                        className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]'
                                                                        autoComplete="off"
                                                                        required
                                                                        eyeClass='absolute top-3 left-3/4 ml-16'
                                                                        showPassword={showRegisterNewPassword}
                                                                        setShowPassword={() => setShowRegisterNewPassword(!showRegisterNewPassword)}
                                                                    />
                                                                    <div className='text-sm font-medium text-[#757780] mt-2.5'>Re-enter Password</div>
                                                                    <TextInput
                                                                        type='password'
                                                                        name='password'
                                                                        eyeClass='absolute top-3 left-3/4 ml-16'
                                                                        className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]'
                                                                        autoComplete="off"
                                                                        showPassword={showRegisterPassword}
                                                                        required
                                                                        setShowPassword={() => setShowRegisterPassword(!showRegisterPassword)}
                                                                    />
                                                                    {passwordMatch ? ""
                                                                    :
                                                                    <p className='text-sm'>Passwords does not match</p>
                                                                    }
                                                                </div>
                                                                <button
                                                                    type='submit'
                                                                    className='cursor-pointer w-full h-11 rounded-md mt-6 bg-[#00B8B8] text-white flex justify-center items-center text-sm font-medium border-none'
                                                                >
                                                                    REGISTER
                                                                </button>
                                                            </form>
                                                        </FormProvider>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <div>
                                                <div className="xl:w-full md:w-full sm:w-full">
                                                    <div className=' xl:w-full md:w-full sm:w-full flex flex-col justify-center'>
                                                        <div className=' xl:text-4xl md:text-3xl sm:text-xl text-light-black font-bold'>Login/Register</div>
                                                        <div className='pb-12 xl:text-xl md:text-lg sm:text-sm font-normal text-[#757780] pt-1'>
                                                            Lorem ipsum dolor sit amet, consectetur<br></br> adipiscing elit onsectetur
                                                        </div>
                                                    </div>
                                                </div>
                                                <FormProvider {...methods}>
                                                    <form onSubmit={methods.handleSubmit(handleContinue)}>
                                                        <div className='xl:text-sm md:text-sm sm:text-xs font-medium text-[#757780] mb-1.5'>Email Address</div>
                                                        <div>
                                                            <TextInput
                                                                type='email'
                                                                name="emailMailId"
                                                                className='w-full rounded-lg xl:h-12 md:h-11 sm:h-10 p-4 font-medium text-base bg-[#E8EDF1]'
                                                                autoComplete="off"
                                                                required
                                                                onChange={(e) => {
                                                                    handleEmailChange(e)
                                                                }}
                                                            />
                                                        </div>
                                                        <button
                                                            type='submit'
                                                            className={`cursor-pointer w-full xl:h-11 md:h-11 sm:h-9 rounded-md mt-5 ${isEmailValid ? 'bg-[#00B8B8]' : 'bg-[#A7A9AC]'}  text-white flex justify-center items-center xl:text-sm md:text-sm sm:text-xs font-medium border-none`}>
                                                            CONTINUE
                                                        </button>
                                                        <div className="flex items-center mt-8">
                                                            <hr className="flex-1 border border-t border-light-grey" />
                                                            <span className="mx-4 text-gray-500 xl:text-base md:text-sm sm:text-xs">or</span>
                                                            <hr className="flex-1 border border-t border-light-grey" />
                                                        </div>
                                                        <div className='flex items-center justify-between w-full h-6 mt-2'>
                                                            <div className='w-fit font-semibold xl:text-sm md:text-xs sm:text-xs'>Are you a business owner?</div>
                                                            <div className='flex items-center w-fit '>
                                                                <div className='flex items-center xl:mr-2.5 md:mr-1.5 sm:mr-1'>
                                                                    <img src={linkSymbol} alt='linksymbol' className='xl:h-3 xl:w-3 sm:h-3 sm:w-3' />
                                                                </div>
                                                                <Popover.Button
                                                                    onClick={() => navigate('/businessSignIn')}
                                                                    className='cursor-pointer xl:text-base md:text-sm sm:text-xs font-semibold text-[#00B8B8]'>
                                                                    Sign in for business
                                                                </Popover.Button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </FormProvider>
                                            </div>
                                    }
                                </div>
                                <div className="w-full flex justify-end xl:pr-20 md:pr-14 sm:pr-16">
                                    <IoTriangleSharp className='absolute xl:-top-6 md:-top-5 sm:-top-4 xl:h-7 xl:w-7 md:h-6 md:w-6 sm:h-5 sm:w-5 text-white' />
                                </div>
                                <div className="w-full flex justify-end pr-3 xl:ml-9 md:ml-8 sm:ml-5">
                                    <Popover.Button onClick={handleClose} className='absolute top-4 border-none bg-white space-x-end'>
                                        <AiFillCloseCircle className='cursor-pointer xl:h-9 xl:w-9 md:h-8 md:w-8 sm:h-7 sm:w-7 text-[#00B8B8]' />
                                    </Popover.Button>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </div>
                )
                }
            </Popover >
        </div >
    )
}


export default PopoverComponent;
