import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { MdClose } from "react-icons/md";
import OurBrands from '../../components/ourBrands';
import DropdownMenu from '../../components/common/dropdown';
import TextInput from '../../components/common/textInput';
import useValidationResolver from '../../hooks/useValidationResolver';
import { businessSignUpSchema } from '../../validations';
import FormDropdown from '../../components/common/formDropdown';
import { categoryDetails, categoryDropdownValues } from '../../redux/reducers/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from '../../components/common/imageUpload';
import { businessUserRegister } from '../../redux/reducers/userSlice';

export default function BusinessSignUp() {
    const [files, setFiles] = useState();
    console.log(files, 'files')
    const [isUploaded, setIsUploaded] = useState(false);
    const resolver = useValidationResolver(businessSignUpSchema);
    const categoryValue = useSelector(categoryDetails);
    const categories = Object.values(categoryValue);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("");

    // const handleCategoryChange = (value) => {
    //     setSelectedCategory(value);
    // };
    console.log(selectedCategory, 'sct')

    const methods = useForm({
        defaultValues: {
            name: "",
            mobileNumber: "",
            emailMailId: "",
            password: "",
            companyName: "",
            companyCategory: "",
            company: ""
        },
        resolver
    });

    // useEffect(() => {
    //     methods.setValue("companyCategory", selectedCategory);
    // }, [selectedCategory, methods]);

    

    const handleFileUpload = (e) => {
        const selectedFiles = e.target.files;
        // if(selectedFiles){
        // }
        setFiles(() => {
            if (selectedFiles) {
                setIsUploaded(true);
                
            }
            return selectedFiles
        }
        );
    }

    // useEffect(() => {
    //     console.log(formData.getAll("imageFile"), 'formdata'); // Log FormData when files are uploaded
    // }, [formData]);

    // useEffect(() => {
    //     if (files) {
    //         // console.log(formData.getAll('imageFile'),'formdata')
    //         methods.setValue("company", formData);
    //     }
    // }, [files, formData, methods]);

    useEffect(() => {
        dispatch(categoryDropdownValues())
    }, [])

    const submitData = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log(files[0],"files ")
        formData.append("company", files[0]);
        formData.append('companyName','Starbucks');
        formData.append('companyCategory','Warehousing');
        formData.append('name','Dinesh');
        formData.append('mobileNumber','7265431234');
        formData.append('emailMailId','dineshkumar180370@gmail.com');
        formData.append('password','Dinesh@345');

        console.log(formData,'formdata')
        // methods.setValue("company", formData);
        // const values = methods.getValues();
        // console.log(values, 'values')
        // const company = {formData}
        dispatch(businessUserRegister(formData))
    };

    const handleChildData = (dataFromChild) => {
        setSelectedCategory(dataFromChild);

    };

    return (
        <>
            <div className=' md:flex  mx-20 my-10'>
                <div className='basis-8/12'>
                    <h1 className='text-4xl font-bold'>Transform your lost and found
                        <br></br> process with BTZ app</h1>
                    <div className='mt-20'>
                        <div className=" p-10 w-3/4 m-2 rounded-lg  shadow-lg shadow-light-blue">
                            <p>Spend 50-80% less time handling items and enquiries</p>
                        </div>
                        <div className=" p-10 w-3/4 my-10 ml-24 rounded-lg shadow-lg shadow-light-blue">
                            <p>Recoup the costs of handling lost property</p>
                        </div>
                        <div className=" p-10 w-3/4 m-2 rounded-lg shadow-lg shadow-light-blue">
                            <p>Generate positive feedback and reviews</p>
                        </div>
                    </div>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={(e) => submitData(e)}>
                        <div className="basis-5/12 p-8 m-6 bg-white rounded-xl">
                            <div className="mb-2">
                                <label htmlFor="fullName" className="block text-sm font-bold mb-2">Your Name</label>
                                <TextInput
                                    type="text"
                                    placeholder="Full name"
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
                            <div className="mb-2 w-full ">

                                <div className="block text-sm font-bold mb-4 w-full">
                                    Company Logo
                                </div>
                                {isUploaded ?
                                    <div className='flex flex-wrap w-96'>
                                        <div className='flex w-fit p-2 bg-white rounded-lg border border-primary-color mx-2 mb-2'>
                                            <div>{files[0].name}</div>
                                            <div className='flex items-center ml-2'><MdClose /></div>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                <ImageUpload
                                    name="company"
                                    designClass='flex justify-center bg-primary-color bg-green w-full py-3 rounded-xl'
                                    multiple={false}
                                    handleFileUpload={handleFileUpload}
                                />

                            </div>
                            <div className="mb-2 mt-4">
                                <label htmlFor="companyCategory" className="block text-sm font-bold mb-2">Company Category</label>
                                <FormDropdown
                                    name='companyCategory'
                                    optionButtonClass='border border-grey pl-2 w-full rounded-xl placeholder:text-sm py-3'
                                    dropdownValues={categories}
                                    editButton={true}
                                    handleData={handleChildData}
                                    selection={true}
                                />

                            </div>
                            <div className="flex ">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" className="w-4 h-4" style={{ accentColor: '#FF9900' }} />
                                    <p className='ml-2 text-xs'>I agree to the <Link class="underline decoration-1 text-[#FF9900]" to='/termsOfUse'> terms and conditions</Link>  of ilost Serbia</p>
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm"></label>
                            </div>
                            <button type='submit' className="bg-[#FF9900] w-full py-3 mt-2 rounded-lg">Continue</button>
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
