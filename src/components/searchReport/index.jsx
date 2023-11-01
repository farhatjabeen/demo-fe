import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import addressMan from '../../assets/images/AddressMan.png';

export default function SearchReport() {
    const [buttonActive, setButtonActive] = useState(true);
    const [searchKey, setSearchKey] = useState('');
    const navigate = useNavigate();


    const handleSearchButton = () => {
        setButtonActive(!buttonActive);
    };

    const handleReportButton = () => {
        setButtonActive(!buttonActive);
    }

    const handleSearchKey = () => {
        console.log(`/findMissingItem/${searchKey}`,'sk');
        navigate(`/findMissingItem/${searchKey}`);
    }
    return (
        <div className='flex'>
            {/* <div>
                    {
                        {loginbutton} ? 
                        <Dialog open={loginbutton} style={{ marginLeft: '48%', marginTop:'5%', backgroundColor: 'transparent'}} PaperProps={{style:{height:'500px', width:'540px',display:'flex', alignItems:'center', justifyContent:'center'}}} className='logindialogboxactive'>
                            <Loginorregister orimage={orimage} linksymbol={linksymbol} handleloginbutton={handleloginbutton} xcircle={xcircle} ></Loginorregister>
                        </Dialog>
                        :
                        null
                    }
        </div> */}

            <div className='ml-[70px] mt-[80px]'>
                <div className='flex justify-center items-center p-[7px] bg-white border-solid rounded-[20px] sm:h-[48px] lg:h-[56px] xl:h-[75px] sm:w-[250px] lg:w-[330px] xl:w-[440px] border border-neutral-200 border-solid'>
                    <button onClick={handleSearchButton} className=' sm:h-[35px] lg:h-[45px] xl:h-[59px] sm:w-[130px] lg:w-[165px] xl:w-[220px] rounded-[16px] sm:text-sm lg:text-lg xl:text-xl font-normal' style={{ backgroundColor: buttonActive ? '#266867' : 'white', color: buttonActive ? 'white' : 'black' }}>Search lost item</button>
                    <button onClick={handleReportButton} className='sm:h-[35px] lg:h-[45px] xl:h-[59px] sm:w-[135px] lg:w-[165px] xl:w-[220px] rounded-[16px] sm:text-sm lg:text-lg xl:text-xl font-normal' style={{ backgroundColor: buttonActive ? 'white' : '#266867', color: buttonActive ? 'black' : 'white' }}>Report found item</button>
                </div>
                {
                    buttonActive ?
                        <div className='flex items-center mt-[25px] h-[82px] w-[760px] rounded-[24px] bg-white border border-neutral-200 border-solid'>
                            <input className=' placeholder:text-black placeholder:text-xl placeholder:pl-[20px] w-[494px] h-[60px] rounded-[16px] ml-[10px] border border-solid border-neutral-200' type='text' placeholder='Search...' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                            <button className='w-[230px] h-[60px] rounded-[16px] border border-solid border-neutral-200 ml-[10px] mr-[10px] text-2xl font-semibold text-white bg-[#E8B810]' onClick={handleSearchKey}>Search</button>
                        </div>
                        :
                        <div className='flex items-center mt-[25px] h-[82px] w-[760px] rounded-[24px] bg-white border border-neutral-200 border-solid'>
                            <input className='placeholder:text-black placeholder:text-xl placeholder:pl-[20px] w-[494px] h-[60px] rounded-[16px] ml-[10px] border border-solid border-neutral-200' type='text' placeholder='Report...' />
                            <button className='w-[230px] h-[60px] rounded-[16px] border border-solid border-neutral-200 ml-[10px] mr-[10px] text-2xl font-semibold text-white bg-[#E8B810]'>Report</button>
                        </div>

                }
            </div>
            <div className=' mt-0 ml-[85px] mt-[0px]'><img className='xl:h-[450px]' src={addressMan} alt='addressman' ></img></div>
        </div>
    )
}