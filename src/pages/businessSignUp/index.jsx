import React, { useState } from 'react'
import OurBrands from '../../components/ourBrands';
import DropdownMenu from '../../components/common/dropdown';
import useValidationResolver from '../../hooks/useValidationResolver';
import { businessSignUpSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../../components/common/textInput';
import { useNavigate } from 'react-router-dom';

export default function BusinessSignUp() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = ['Private', 'Public', 'One person'];
    const resolver = useValidationResolver(businessSignUpSchema);
    const navigate = useNavigate();
    const methods = useForm({
        defaultValues: {
            name: "",
            mobileNumber: "",
            emailMailId: "",
            password: "",
            companyName: "",
            companyCategory: ""
        },
        resolver
    });

    const submitData = async (data) => {
        return true
    };

    return (
        <>
            <div className=' md:flex  mx-20 my-10'>
                <div className='basis-8/12'>
                    <h1 className='text-4xl font-bold'>Transform your lost and found
                        <br></br> process with BTZ app</h1>
                    <div className='mt-20'>
                        <div className=" p-10 w-3/4 m-2 rounded-lg  shadow-lg shadow-blue">
                            <p>Spend 50-80% less time handling items and enquiries</p>
                        </div>
                        <div className=" p-10 w-3/4 my-10 ml-24 rounded-lg shadow-lg shadow-cyan-100">
                            <p>Recoup the costs of handling lost property</p>
                        </div>
                        <div className=" p-10 w-3/4 m-2 rounded-lg shadow-lg shadow-cyan-100">
                            <p>Generate positive feedback and reviews</p>
                        </div>
                    </div>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(submitData)}>
                        <div className="basis-5/12 p-8 m-6 bg-white rounded-xl">
                            <div className="mb-2">
                                <label htmlFor="fullName" className="block text-sm font-bold mb-2">Your Name</label>
                                <TextInput
                                    type="text"
                                    placeholder="Full Name"
                                    name="name"
                                    id="fullName"
                                    className='border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2'
                                    autoComplete="off"
                                    required
                                />

                            </div>

                            <div className="mb-2">
                                <label htmlFor="mobileNumber" className="block text-sm font-bold mb-2">Mobile Number</label>
                                <TextInput
                                    type="text"
                                    placeholder="1234567890"
                                    name="mobileNumber"
                                    id="fullName"
                                    className='border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2'
                                    autoComplete="off"
                                    required
                                />

                            </div>

                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-bold mb-2">Email Address</label>
                                <TextInput
                                    type="text"
                                    placeholder="abc@xyz.com"
                                    name="emailMailId"
                                    id="fullName"
                                    className='border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2'
                                    autoComplete="off"
                                    required
                                />

                            </div>

                            <div className="mb-2">
                                <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
                                <TextInput
                                    type="text"
                                    placeholder="Glorpus Galaxies"
                                    name="password"
                                    id="fullName"
                                    className='border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2'
                                    autoComplete="off"
                                    required
                                />

                            </div>

                            <div className="mb-2">
                                <label htmlFor="companyName" className="block  text-sm font-bold mb-2">Company Name</label>
                                <TextInput
                                    type="text"
                                    placeholder="Glorpus Galaxies"
                                    name="companyName"
                                    id="fullName"
                                    className='border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2'
                                    autoComplete="off"
                                    required
                                />

                            </div>
                            <div className="mb-2">
                                <label htmlFor="companyLogo" className="block text-sm font-bold mb-2">Company Logo</label>
                                <button className="bg-primary-color w-full py-2 rounded-xl">Upload Image</button>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="companyCategory" className="block text-sm font-bold mb-2">Company Category</label>
                                <DropdownMenu
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={(category) => setSelectedCategory(category)} />
                            </div>
                            <div className="flex ">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" className="w-4 h-4" style={{ accentColor: '#FF9900' }} />
                                    <p className='ml-2 text-xs'>I agree to the <button class="underline decoration-1 text-[#FF9900]" onClick={navigate('/termsOfUse')}> terms and conditions</button>  of ilost Serbia</p>
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm"></label>
                            </div>
                            <button className="bg-[#FF9900] w-full py-3  mt-2 rounded-lg">Continue</button>
                        </div>
                    </form>
                </FormProvider>
            </div>

            <div className='mb-20'>
                <OurBrands
                    asTrustedBy
                />
            </div>
        </>
    )
}
