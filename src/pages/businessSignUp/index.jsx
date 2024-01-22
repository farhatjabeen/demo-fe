import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { MdClose } from "react-icons/md";
import OurBrands from '../../components/ourBrands';
import TextInput from '../../components/common/textInput';
import useValidationResolver from '../../hooks/useValidationResolver';
import { businessSignUpSchema } from '../../validations';
import FormDropdown from '../../components/common/formDropdown';
import { categoryDetails, categoryDropdownValues, fileUploadAPI } from '../../redux/reducers/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '../../components/toast';
import { businessUserRegister } from '../../redux/reducers/userSlice';

export default function BusinessSignUp() {
    const [imageFiles, setImageFiles] = useState();
    const [isUploaded, setIsUploaded] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isCleared, setIsCleared] = useState(false);
    const [isTerms, setIsTerms] = useState(false)
    const [isImage, setIsImage] = useState(true);
    const resolver = useValidationResolver(businessSignUpSchema);
    const categoryValue = useSelector(categoryDetails);
    const categories = categoryValue ? Object.values(categoryValue) : [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cloudinaryId, setCloudinaryId] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    console.log(companyLogo, "companyLogo")
    console.log(cloudinaryId, "cloudinaryId")
    console.log(imageFiles, "imageFiles")
    const methods = useForm({
        defaultValues: {
            name: "",
            mobileNumber: "",
            emailMailId: "",
            password: "",
            companyName: "",
            companyCategory: "",
            companylogo: "",
            cloudinary_id: ""
        },
        resolver
    });
    // window.onbeforeunload = sessionStorage.setItem("enteredData",null);
    useEffect(() => {
        dispatch(categoryDropdownValues())
        const values = sessionStorage.getItem("enteredData")
        
        console.log(values,'values')
        if (values ) {
            methods.reset(JSON.parse(values))
            if(methods.getValues().companylogo?.length>0){
                setIsUploaded(true)
                setIsTerms(true);
            }
            console.log(methods.getValues(),'methodss')
        }
        if(methods.getValues().companylogo){
            setIsImage(true)
        }
    }, [])


    const handleFileUpload = (e) => {
        const selectedFiles = e.target.files;
        console.log(selectedFiles, "selectedFiles")
        setImageFiles(() => {
            if (selectedFiles) {
                setIsUploaded(true);
                setIsImage(true)
            }
            return selectedFiles
        });
    }


    useEffect(() => {
        try {
            if (imageFiles && imageFiles[0]) {
                setIsImage(true)
                let formData = new FormData();
                formData.append("company", imageFiles[0]);
                if (imageFiles && imageFiles[0]) {
                    const imageResponse = dispatch(fileUploadAPI(formData));

                    imageResponse
                        .then((res) => {
                            console.log("responseFromFile", res.data.companylogo)
                            setCompanyLogo(res.data.companylogo);
                            setCloudinaryId(res.data.cloudinary_id);

                        })
                }

            }
        } catch (error) {
            console.log("submitData errors", error)
        }
    }, [imageFiles]);


    const submitData = async () => {
        methods.setValue("companylogo", methods.getValues().companylogo ? methods.getValues().companylogo : companyLogo);
        methods.setValue("cloudinary_id", methods.getValues().cloudinary_id ? methods.getValues().cloudinary_id : cloudinaryId);
        const companylogo = methods.getValues("companylogo");
        console.log(companylogo,"companylogo2")
        const dataNow = methods.getValues();
        if (companyLogo || methods.getValues().companylogo) {
            setIsImage(true)
            if (isChecked) {
                // const registering = dispatch(businessUserRegister({ name, mobileNumber, emailMailId, password, companyName, companyCategory, companylogo, cloudinary_id }))

                const registered = await dispatch(businessUserRegister(dataNow))
                if (registered) {
                    setImageFiles('');
                    setIsImage(true)
                    setIsCleared(true);
                    setIsChecked(false);
                    methods.reset({
                        name: "",
                        mobileNumber: "",
                        emailMailId: "",
                        password: "",
                        companyName: "",
                        companyCategory: "",
                    })
                }
            } else {
                Toast({ type: "error", message: "Please accept the terms and conditions" })
            }
        }
        else{
            setIsImage(false)
        }
        };

        const handleImageDelete = () =>{
            setImageFiles('');
            setCloudinaryId("")
            setCompanyLogo("")
            methods.setValue("companylogo", null);
        methods.setValue("cloudinary_id", null);
        
        }

        const handleTerms = () => {
            methods.setValue('companylogo',companyLogo)
            sessionStorage.setItem("enteredData", JSON.stringify(methods.getValues()))
            navigate('/termsOfUse')
        }

        return (
            <Fragment>
                <div className='md:flex mx-20 my-10 '>
                    <div className='xl:w-7/12 md:w-12/12'>
                        <h1 className='text-3xl font-bold'>Transform your lost and found
                            <br></br> process with BTZapp</h1>
                        <div className='mt-20'>
                            <div className=" p-10 w-3/4 m-4 rounded-lg bg-white shadow-lg shadow-shadow-color">
                                <p>Spend 50-80% less time handling items and enquiries</p>
                            </div>
                            <div className=" p-10 w-3/4 my-10 ml-24 bg-white rounded-lg shadow-lg shadow-shadow-color">
                                <p>Recoup the costs of handling lost property</p>
                            </div>
                            <div className=" p-10 w-3/4 m-4 rounded-lg bg-white shadow-lg shadow-shadow-color">
                                <p>Generate positive feedback and reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className='xl:w-5/12 md:12/12'>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(submitData)}>
                                <div className="p-8 m-6 bg-white rounded-xl">
                                    <div className="mb-2">
                                        <label htmlFor="fullName" className="block text-sm font-bold mb-2">Your Name</label>
                                        <TextInput
                                            type="text"
                                            placeholder="Full name"
                                            name="name"
                                            id="fullName"
                                            className='border pl-2 w-full rounded-xl placeholder:text-sm py-2'
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
                                            className='border pl-2 w-full rounded-xl placeholder:text-sm py-2'
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
                                            className='border pl-2 w-full rounded-xl placeholder:text-sm py-2'
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
                                        <TextInput
                                            type="password"
                                            placeholder="Glorpus Galaxies"
                                            name="password"
                                            id="fullName"
                                            className='border pl-2 w-full rounded-xl placeholder:text-sm py-2'
                                            autoComplete="off"
                                            eyeClass='absolute bottom-2 right-8 ml-16'
                                            required
                                            showPassword={showPassword}
                                            setShowPassword={() => setShowPassword(!showPassword)}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="companyName" className="block  text-sm font-bold mb-2">Company Name</label>
                                        <TextInput
                                            type="text"
                                            placeholder="Glorpus Galaxies"
                                            name= "companyName"
                                            id="fullName"
                                            className='border pl-2 w-full rounded-xl placeholder:text-sm py-2'
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2 w-full">
                                        <div className="block text-sm font-bold mb-2 w-full">
                                            Company Logo
                                        </div>

                                        <div className="mb-2 w-full">

                                            {isUploaded ?
                                            methods.getValues().companylogo || companyLogo ?
                                                <div className='flex flex-wrap w-96'>
                                                    <div className='flex w-fit p-2 bg-white rounded-lg border border-primary-color mx-2 mb-2'>
                                                        <div>{isTerms ? methods.getValues().companylogo : companyLogo}</div>
                                                        <div className='flex items-center ml-2' onClick={handleImageDelete}><MdClose /></div>
                                                    </div>
                                                </div>
                                                :""
                                                :
                                                null
                                            }
                                            <label
                                                htmlFor={methods.getValues().companylogo ? "company" : "companylogo"}
                                                className='flex justify-center bg-primary-color w-full py-3 rounded-xl'
                                            >
                                                Upload Image
                                            </label>
                                            <input
                                                id="companylogo"
                                                type='file'
                                                accept=".jpg, .jpeg, .png"
                                                multiple={false}
                                                className='hidden'
                                                onChange={handleFileUpload}
                                            />
                                            {isImage ?
                                                ""
                                                :
                                                <p className='text-red'>Company logo required</p>
                                            }
                                        </div>
                                        <div className="mb-2 mt-4">
                                            <label htmlFor="companyCategory" className="block text-sm font-bold mb-2">Company Category</label>
                                            <FormDropdown
                                                name='companyCategory'
                                                optionButtonClass='border border-grey pl-2 w-full rounded-xl placeholder:text-sm py-3'
                                                dropdownValues={categories}
                                                editButton={true}
                                                isBusinesSignUp={true}
                                                firstOptionName="Select Category"
                                                iscleared={isCleared}
                                                valueFromDb={methods.getValues().companyCategory ? methods.getValues().companyCategory : ""}
                                            />
                                        </div>
                                        {/* <div className="flex ">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" onChange={() => setIsChecked(!isChecked)} className="w-4 h-4" style={{ accentColor: '#FF9900' }} />
                                        <p className='ml-2 text-xs'>I agree to the <Link class="underline decoration-1 text-oranges" to='/termsOfUse'> terms and conditions</Link>  of ilost Serbia</p>
                                    </div>
                                    <ImageUpload
                                        name="company"
                                        designClass='flex justify-center bg-primary-color w-full py-3 rounded-xl'
                                        multiple={false}
                                        handleFileUpload={handleFileUpload}
                                    />
                                </div> */}
                                        {/* <div className="mb-2 mt-4">
                                    <label htmlFor="companyCategory" className="block text-sm font-bold mb-2">Company Category</label>
                                    <FormDropdown
                                        name='companyCategory'
                                        optionButtonClass='border border-grey pl-2 w-full rounded-xl placeholder:text-sm py-3'
                                        dropdownValues={categories}
                                        editButton={true}
                                        selection={true}
                                        isCleared={isCleared}
                                    />
                                </div> */}
                                        <div >
                                            <div className="flex items-center h-5">
                                                <input id="remember" type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="w-4 h-4" style={{ accentColor: '#FF9900' }} />
                                                <p className='ml-2 text-xs'>I agree to the <button class="underline decoration-1 text-oranges" onClick={handleTerms}> terms and conditions</button>  of ilost Serbia</p>
                                            </div>
                                            <button type='submit' onClick={() => imageFiles || methods.getValues().companylogo ? setIsImage(true) : setIsImage(false)} className="cursor-pointer bg-oranges w-full py-3 mt-2 rounded-lg">Continue</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </FormProvider>
                    </div>

                </div>
                <div className='mb-20 '>
                    <OurBrands
                        asTrustedBy
                    />
                </div>
            </Fragment>
        )
    };
