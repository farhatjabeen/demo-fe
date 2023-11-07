import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import addressMan from '../../assets/images/location.png';

export default function SearchReport() {
    const [buttonActive, setButtonActive] = useState(true);
    const [searchValue, setSearchValue] = useState(true);
    const [reportValue, setReportValue] = useState(true);
    const [location, setLocation] = useState(true);
    const [searchKey, setSearchKey] = useState('');
    const [reportKey, setReportKey] = useState('');
    const [locationKey, setLocationKey] = useState('');
    const navigate = useNavigate();


    const handleSearchButton = () => {
        setButtonActive(!buttonActive);
    };

    const handleReportButton = () => {
        setButtonActive(!buttonActive);
    }

    const handleSearchKey = () => {
        if (searchKey && locationKey) {
            navigate(`/findMissingItem/${searchKey}/${locationKey}`);
        }
        if (!searchKey) {
            setSearchValue(false);
        }
        if (!locationKey) {
            setLocation(false);
        }
    }

    const handleReportKey = () => {
        if (reportKey && locationKey) {
            navigate(`/addMoreDetails/${reportKey}/${locationKey}`);
        }
        if (!reportKey) {
            setReportValue(false);
        }
        if (!locationKey) {
            setLocation(false);
        }
    }

    return (
        <div className='flex xl:flex-row md:flex-col sm:flex-col items-center'>

            <div className='xl:mt-20 xl:flex md:flex-col sm:flex-col items-center'>
                <div className='flex justify-center items-center p-2 bg-white border-solid xl:rounded-3xl xl:h-18 xl:w-96 md:rounded-2xl md:w-80 sm:h-14 sm:rounded-xl sm:w-72 border border-neutral-200'>
                    <button onClick={handleSearchButton} className='xl:h-14 xl:w-56 xl:rounded-2xl md:w-52 md:h-10 md:rounded-xl md:text-md xl:text-xl sm:rounded-lg sm:text-sm sm:h-10 sm:w-48 font-normal' style={{ backgroundColor: buttonActive ? '#266867' : 'white', color: buttonActive ? 'white' : 'black' }}>Search lost item</button>
                    <button onClick={handleReportButton} className='xl:h-14 xl:w-56 xl:rounded-2xl md:w-52 md:h-10 md:rounded-xl md:text-md xl:text-xl sm:rounded-lg sm:text-sm sm:h-10 sm:w-48 font-normal' style={{ backgroundColor: buttonActive ? 'white' : '#266867', color: buttonActive ? 'black' : 'white' }}>Report found item</button>
                </div>
                {
                    buttonActive ?
                        <div className='flex items-center mt-6 xl:h-20 xl:w-2xl xl:rounded-3xl md:h-16 md:w-11/12 md:rounded-2xl bg-white border border-neutral-200 border-solid'>
                            <input className={`placeholder:text-black placeholder:text-base xl:w-60 xl:h-16 p-4 xl:rounded-2xl md:h-12 md:w-44 md:rounded-xl ml-2.5 border border-solid ${searchValue ? 'border-neutral-200' : 'border-[#FF0000]'}`} type='text' placeholder='Search...' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                            <input className={`placeholder:text-black placeholder:text-base xl:w-60 xl:h-16 p-4 xl:rounded-2xl md:h-12 md:w-44 md:rounded-xl ml-2.5 border border-solid ${location ? 'border-neutral-200' : 'border-[#FF0000]'}`} type='text' placeholder='Location' value={locationKey} onChange={(e) => setLocationKey(e.target.value)} />
                            <button className='xl:w-52 xl:h-16 xl:rounded-2xl md:w-44 md:h-12 md:rounded-xl border border-solid border-neutral-200 ml-2.5 mr-2.5 xl:text-2xl md:text-lg font-semibold text-white bg-[#E8B810]' onClick={handleSearchKey}>Search</button>
                        </div>
                        :
                        <div className='flex items-center mt-6 xl:h-20 xl:w-2xl xl:rounded-3xl md:h-16 md:w-11/12 md:rounded-2xl bg-white border border-neutral-200 border-solid'>
                            <input className={`placeholder:text-black placeholder:text-base p-4 xl:w-60 xl:h-16 xl:rounded-2xl md:h-12 md:w-44 md:rounded-xl ml-2.5 border border-solid border-neutral-200 ${reportValue ? 'border-neutral-200' : 'border-[#FF0000]'}`} type='text' placeholder='Describe Item' value={reportKey} onChange={(e) => setReportKey(e.target.value)} />
                            <input className={`placeholder:text-black placeholder:text-base p-4 xl:w-60 xl:h-16 xl:rounded-2xl md:h-12 md:w-44 md:rounded-xl ml-2.5 border border-solid border-neutral-200 ${location ? 'border-neutral-200' : 'border-[#FF0000]'}`} type='text' placeholder='Location' value={locationKey} onChange={(e) => setLocationKey(e.target.value)} />
                            <button className='xl:w-52 xl:h-16 xl:rounded-2xl md:w-44 md:h-12 md:rounded-xl border border-solid border-neutral-200 ml-2.5 mr-2.5 xl:text-2xl md:text-lg font-semibold text-white bg-[#E8B810]' onClick={handleReportKey}>Continue</button>
                        </div>

                }
            </div>
            <div className='xl:ml-24'><img className='xl:h-11/12 md:h-11/12 md:w-11/12' src={addressMan} alt='addressMan' ></img></div>
        </div>
    )
}