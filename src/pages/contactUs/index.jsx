import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import contactUsImage from '../../assets/images/contactus.png';
import { useDispatch } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import { FormProvider, useForm } from 'react-hook-form';
import { contactUsSchema } from '../../validations';
import TextInput from '../../components/common/textInput';

export default function ContactUs() {
    const dispatch = useDispatch();
    const resolver = useValidationResolver(contactUsSchema);
    console.log(resolver, "resolver");

    const methods = useForm({
        defaultValues: {
            emailMailId: "",
            subject: "",
            message: ""
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
    return (
        <div className='flex flex-col items-center'>
            <div className='font-bold text-4xl mb-5'>Contact Us</div>
            <div className='sm:h-96 md:h-60 xl:h-64 sm:w-2/3 md:w-5/6 xl:w-3/5 rounded-3xl bg-white flex flex-col items-center justify-center '>
                <div className='sm:mb-10 md:mb-0 md:mt-5 xl:mt-0 font-medium text-2xl'>Feel free to get in touch with us</div>
                <div className='sm:h-56 xl:h-28 xl:w-11/12 sm:mt-0 md:mt-0 xl:mt-8 flex md:flex-row sm:flex-col sm:items-center'>
                    <div className='sm:h-32 sm:w-80 md:w-80 xl:w-11/12 rounded-2xl flex flex-col justify-center items-center bg-[#F3F3F3]'>
                        <div className='flex justify-between'>
                            <div className='w-8 flex items-center'><FaPhoneAlt style={{ color: "#00b8b8", height: '23.95px', width: '23.95px' }} /></div>
                            <div className='font-medium text-2xl'>Call Us</div>
                        </div>
                        <div className='font-normal text-xl underline underline-offset-4'>+12345657890</div>
                    </div>
                    <div className='sm:h-32 sm:w-80 md:w-80 xl:w-11/12 sm:ml-0 sm:mt-6 md:mt-0 md:ml-5 sm:mt-0 xl:ml-7 h-28 rounded-2xl flex flex-col justify-center items-center bg-[#F3F3F3]'>
                        <div className='flex justify-between'>
                            <div className='w-8 flex items-center'><FaEnvelope style={{ color: "#00b8b8", height: '23.95px', width: '23.95px' }} /></div>
                            <div className='font-medium text-2xl'>Email Us</div>
                        </div>
                        <div className='font-normal text-xl underline underline-offset-4'>info@ilost.com</div>
                    </div>
                </div>
            </div>

            <div className='xl:w-11/12 sm:flex-col sm:items-center md:flex-row flex justify-between mt-16'>
                <div><img className='xl:h-[500px] xl:w-[500px]' src={contactUsImage} alt='contactUsImage' /></div>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(submitData)}>
                        <div>
                            <div className='sm:flex sm:justify-center md:justify-start font-semibold text-3xl'>Get in Touch</div>
                            <div className='sm:w-[500px] xl:w-[600px] mt-7 flex flex-col sm:items-center xl:items-end'>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your email"
                                    name="emailMailId"
                                    className='w-full mb-4 h-14 rounded-lg border bg-inherit p-4'
                                    autoComplete="off"
                                    required
                                />
                                {/* <input className='w-full mb-4 h-14 rounded-lg border bg-inherit p-4' type="email" placeholder='Enter your email' /> */}
                                <TextInput
                                    type="text"
                                    placeholder="Subject"
                                    name="subject"
                                    className='w-full mb-4 h-14 rounded-lg border bg-inherit p-4'
                                    autoComplete="off"
                                    required
                                />
                                {/* <input className='w-full mb-4 h-14 rounded-lg border bg-inherit p-4' type="text" placeholder='Subject' /> */}
                                <TextInput
                                    type="text"
                                    placeholder="Message"
                                    name="message"
                                    className='w-full mb-4 h-14 rounded-lg border bg-inherit p-4'
                                    autoComplete="off"
                                    required
                                />
                                {/* <input className='w-full mb-4 h-52 rounded-lg border bg-inherit p-4' type="text" placeholder='Message' /> */}
                                <button className='h-14 w-44 rounded-lg bg-primary-color sm:mb-5' type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div >
    )
}
