import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import addressMan from '../../assets/images/location.png';
import useValidationResolver from '../../hooks/useValidationResolver';
import { searchSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../common/textInput';

export default function SearchReport() {
    const [buttonActive, setButtonActive] = useState(true);
    const navigate = useNavigate();
    const resolver = useValidationResolver(searchSchema);

    const methods = useForm({
        defaultValues: {
            itemName: "",
            location: ""
        },
        resolver
    })
    const submitData = async () => {
        try {
            const itemName = methods.getValues().itemName;
            const location = methods.getValues().location;

            if (buttonActive) {
                navigate(`/findMissingItem/${itemName}/${location}`);
            }else{
                navigate(`/addmoredetails/${itemName}/${location}`);
            }

        } catch (error) {
            console.log("submitData errors", error)
        }
    };

    const handleSearchButton = () => {
        setButtonActive(!buttonActive);
    };

    const handleReportButton = () => {
        setButtonActive(!buttonActive);
    }

    // const handleReportKey = () => {
    //     if (reportKey && locationKey) {
    //         navigate(`/addMoreDetails/${reportKey}/${locationKey}`);
    //     }
    // }

    return (
        <div className='flex  xl:pl-3 xl:justify-center xl:flex-row md:flex-col sm:flex-col md:items-center sm:items-center'>

            <div className='xl:mt-20 xl:mb-20 flex xl:items-start md:flex-col sm:flex-col items-center'>
                <div className='flex sm:items-center p-2 bg-white border-solid xl:rounded-3xl xl:h-1/5 xl:w-96 md:rounded-2xl md:h-14 md:w-80 sm:h-12 sm:rounded-2xl sm:w-64 border border-[#B6B6B6]'>
                    <button onClick={handleSearchButton} className='xl:h-14 xl:w-56 xl:rounded-2xl md:w-52 md:h-10 md:rounded-xl md:text-md xl:text-xl sm:rounded-xl sm:text-sm sm:h-9 sm:w-44 font-normal' style={{ backgroundColor: buttonActive ? '#266867' : 'white', color: buttonActive ? 'white' : 'black' }}>Search lost item</button>
                    <button onClick={handleReportButton} className='xl:h-14 xl:w-56 xl:rounded-2xl md:w-52 md:h-10 md:rounded-xl md:text-md xl:text-xl sm:rounded-xl sm:text-sm sm:h-9 sm:w-44 font-normal' style={{ backgroundColor: buttonActive ? 'white' : '#266867', color: buttonActive ? 'black' : 'white' }}>Report found item</button>
                </div>
                {
                    buttonActive ?
                        <div className='flex items-center mt-6 xl:h-fit xl:py-2 xl:w-xl xl:rounded-3xl md:h-16 md:w-xl md:rounded-2xl sm:w-xl sm:h-14 sm:rounded-2xl bg-white border border-[#B6B6B6] border-solid'>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(submitData)} className='w-full'>
                                    <div className='flex'>
                                        <TextInput
                                            type="text"
                                            placeholder="Search..."
                                            name="itemName"
                                            className={`placeholder:text-black placeholder:text-base xl:w-60 xl:h-16 p-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-[#B6B6B6]`}
                                            autoComplete="off"
                                            required
                                            
                                        />
                                        
                                        <TextInput
                                            type="text"
                                            placeholder="Location"
                                            name="location"
                                            className={`placeholder:text-black placeholder:text-base xl:w-60 xl:h-16 p-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-[#B6B6B6]`}
                                            autoComplete="off"
                                            required
                                            
                                        />
                                        <button
                                            type='submit'
                                            className='xl:w-52 xl:h-16 xl:rounded-2xl xl:text-2xl md:w-38 md:h-12 md:rounded-xl md:text-lg sm:h-10 sm:w-32 sm:rounded-xl font-semibold text-white bg-primary-color border border-solid border-[#B6B6B6] mx-2.5'
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                        :
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(submitData)}>
                                <div className='flex items-center mt-6 xl:h-20 xl:w-2xl xl:rounded-3xl md:h-16 md:w-xl md:rounded-2xl sm:w-xl sm:h-14 sm:rounded-2xl bg-white border border-[#B6B6B6] border-solid'>
                                    <TextInput
                                        type="text"
                                        placeholder="Describe Item"
                                        name="itemName"
                                        className={`placeholder:text-black placeholder:text-ba se xl:w-60 xl:h-16 p-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-[#B6B6B6]`}
                                        autoComplete="off"
                                        required
                                        
                                    />
                                   <TextInput
                                        type="text"
                                        placeholder="Location"
                                        name="location"
                                        className={`placeholder:text-black placeholder:text-base xl:w-60 xl:h-16 p-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-[#B6B6B6]`}
                                        autoComplete="off"
                                        required
                                        
                                    />
                                    <button
                                        type='submit'
                                        className='xl:w-52 xl:h-16 xl:rounded-2xl xl:text-2xl md:w-38 md:h-12 md:rounded-xl md:text-lg sm:h-10 sm:w-32 sm:rounded-xl border border-solid border-[#B6B6B6] mx-2.5 font-semibold text-white bg-primary-color'
                                    >
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                }
            </div>
            <div className='xl:ml-24 flex justify-center'><img className='xl:h-full md:h-11/12 md:w-11/12 sm:h-10/12 sm:w-10/12' src={addressMan} alt='addressMan' ></img></div>
        </div>
    )
}