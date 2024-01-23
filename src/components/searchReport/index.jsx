import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import addressMan from '../../assets/images/location.png';
import useValidationResolver from '../../hooks/useValidationResolver';
import { reportSchema, searchSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../common/textInput';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../redux/reducers/userSlice';
import { Toast } from '../toast';
// import { Switch } from '@headlessui/react';
import FormDropdown from '../common/formDropdown';
import { locationDetails, locationDropdownValues } from '../../redux/reducers/itemsSlice';

export default function SearchReport() {
    const [buttonActive, setButtonActive] = useState(true);

    const cities = useSelector(locationDetails);
    const citiesInSerbia = cities ? Object.values(cities) : [];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const resolver = useValidationResolver(buttonActive ? searchSchema : reportSchema);
    const isUser = useSelector(userData)
    const methods = useForm({
        defaultValues: {
            itemName: "",
            location: "",
            locations:""
        },
        resolver
    });

    useEffect(() => {
        dispatch(locationDropdownValues())
    }, [dispatch]);

    const submitData = async () => {
        try {
            const itemName = methods.getValues().itemName;
            if (buttonActive) {
                navigate(`/findMissingItem/${itemName}/${methods.getValues().location}`);
            } else {
                if (isUser) {
                    navigate(`/addMoreDetails/${itemName}/${methods.getValues().locations}`);
                } else {
                    Toast({ type: "error", message: "Login Required" })
                }
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

    const [toggleState, setToggleState] = useState('search');

    const handleToggle = () => {
        setToggleState((prevState) => (prevState === 'search' ? 'report' : 'search'));
    };

    return (
        <div className='flex xl:w-11/12 xl:justify-between xl:flex-row md:flex-col sm:flex-col md:items-center sm:items-center'>

            <div className='xl:my-20 flex xl:items-start md:flex-col sm:flex-col items-center'>
                <div className='flex sm:items-center p-2 bg-white border-solid xl:rounded-2xl xl:h-1/5 xl:w-fit md:rounded-3xl md:h-14 md:w-80 sm:h-12 sm:rounded-2xl sm:w-64 border border-greys border-opacity-50'>
                    <button onClick={handleSearchButton} className='cursor-pointer xl:h-14 xl:w-64 xl:rounded-xl md:w-52 md:h-10 md:rounded-2xl md:text-md xl:text-xl sm:rounded-xl sm:text-sm sm:h-9 sm:w-44 font-normal' style={{ backgroundColor: buttonActive ? '#266867' : 'white', color: buttonActive ? 'white' : 'black' }}>Search lost item</button>
                    <button onClick={handleReportButton} className='cursor-pointer xl:h-14 xl:w-64 xl:rounded-xl md:w-52 md:h-10 md:rounded-2xl md:text-md xl:text-xl sm:rounded-xl sm:text-sm sm:h-9 sm:w-44 font-normal' style={{ backgroundColor: buttonActive ? 'white' : '#266867', color: buttonActive ? 'black' : 'white' }}>Report found item</button>
                </div>

                {/* <Switch
                    checked={buttonActive}
                    onChange={setButtonActive}
                    className={`${buttonActive ? 'bg-white' : 'bg-teal-700'}
          relative inline-flex xl:rounded-2xl xl:px-2 xl:h-1/5 xl:w-6/12 md:rounded-3xl md:h-14 md:w-80 sm:h-12 sm:rounded-2xl sm:w-64 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >

                    <span

                        className={`${buttonActive ? 'translate-x-64 content' : 'translate-x-0'}
            pointer-events-none inline-block xl:h-14 xl:w-64 xl:rounded-xl md:w-52 md:h-10 md:rounded-2xl md:text-md xl:text-xl sm:rounded-xl sm:text-sm sm:h-9 sm:w-44 transform rounded-full bg-green shadow-lg ring-0 transition duration-200 ease-in-out`}
                    >
                        <div>{buttonActive ? "Report" : "Search"}</div>
                    </span>
                </Switch> */}
                {
                    buttonActive ?
                        <div className='flex items-center mt-6 xl:h-fit xl:py-2 xl:w-xl xl:rounded-3xl md:h-16 md:w-xl md:rounded-2xl sm:w-xl sm:h-14 sm:rounded-2xl bg-white border border-greys border-solid border-opacity-50'>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(submitData)} className='w-full'>
                                    <div className='flex'>
                                        <TextInput
                                            type="text"
                                            placeholder="Search..."
                                            name="itemName"
                                            className={`placeholder:text-black placeholder:text-base xl:w-80 xl:h-20 p-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-greys`}
                                            autoComplete="off"
                                            required
                                            isSearchReport="true"
                                            errorClass="absolute xl:bottom-7 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1"
                                        />

                                        <FormDropdown
                                            placeholder="Location"
                                            name="location"
                                            editButton={true}
                                            optionButtonClass={`placeholder:text-black placeholder:text-base xl:w-80 xl:h-20 py-4 pl-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-greys`}
                                            autoComplete="off"
                                            required
                                            firstOptionName="Location"
                                            isSearchReport="true"
                                            dropdownValues={citiesInSerbia}
                                            errorClass="absolute xl:bottom-7 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1"
                                        />
                                        <button
                                            type='submit'
                                            className='cursor-pointer xl:w-52 xl:h-20 xl:rounded-2xl xl:text-2xl md:w-38 md:h-12 md:rounded-xl md:text-lg sm:h-10 sm:w-32 sm:rounded-xl font-semibold text-white bg-primary-color border border-solid border-greys mx-2.5'
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                        :
                        <div className='flex items-center mt-6 xl:h-fit xl:py-2 xl:w-xl xl:rounded-3xl md:h-16 md:w-xl md:rounded-2xl sm:w-xl sm:h-14 sm:rounded-2xl bg-white border border-greys border-solid border-opacity-50'>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(submitData)}>
                                    <div className='flex'>
                                        <TextInput
                                            type="text"
                                            placeholder="Describe Item"
                                            name="itemName"
                                            className={`placeholder:text-black placeholder:text-ba se xl:w-80 xl:h-20 p-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-greys`}
                                            autoComplete="off"
                                            required
                                            isSearchReport="true"
                                            errorClass="absolute xl:bottom-7 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1"
                                        />
                                        <FormDropdown
                                            placeholder="Location"
                                            name="locations"
                                            editButton={true}
                                            optionButtonClass={`placeholder:text-black placeholder:text-base xl:w-80 xl:h-20 p-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-greys`}
                                            autoComplete="off"
                                            required
                                            firstOptionName="Location"
                                            isSearchReport="true"
                                            dropdownValues={citiesInSerbia}
                                            errorClass="absolute xl:bottom-7 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1"
                                        />
                                        <button
                                            type='submit'
                                            className='cursor-pointer xl:w-52 xl:h-20 xl:rounded-2xl xl:text-2xl md:w-38 md:h-12 md:rounded-xl md:text-lg sm:h-10 sm:w-32 sm:rounded-xl font-semibold text-white bg-primary-color border border-solid border-greys mx-2.5'
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                }
            </div>
            <div className='h-full w-full xl:pl-8'><img className='xl:h-full xl:w-full md:h-11/12 md:w-11/12 sm:h-10/12 sm:w-10/12' src={addressMan} alt='addressMan' ></img></div>
        </div>
    )
};
