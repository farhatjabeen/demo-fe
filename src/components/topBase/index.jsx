import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import locateMe from '../../assets/images/location.png';

export default function TopBase() {
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
        localStorage.setItem("searchKey", searchKey);
        navigate('/findMissingItem');
    }
    return (
        <div className='flex '>
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
                <div className='flex items-center p-[7px] bg-white border-solid rounded-[20px] h-[75px] w-[440px] border border-neutral-200'>
                    <button onClick={handleSearchButton} className='h-[59px] w-[220px] rounded-[16px] text-[24px] font-normal' style={{ backgroundColor: buttonActive ? '#266867' : 'white', color: buttonActive ? 'white' : 'black' }}>
                        Search lost item
                    </button>
                    <button onClick={handleReportButton} className='h-[59px] w-[220px] rounded-[16px] text-[24px] font-normal' style={{ backgroundColor: buttonActive ? 'white' : '#266867', color: buttonActive ? 'black' : 'white' }}>
                        Report found item
                    </button>
                </div>
                {
                    buttonActive ?
                        <div className='flex items-center mt-[25px] h-[82px] w-[760px] rounded-[24px] bg-white border border-neutral-200 border-solid'>
                            <input className=' placeholder:text-black placeholder:text-xl placeholder:pl-[20px] w-[494px] h-[60px] rounded-[16px] ml-[10px] border border-solid border-neutral-200' type='text' placeholder='Search...' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                            <button className='w-[230px] h-[60px] rounded-[16px] border border-solid border-neutral-200 ml-[10px] mr-[10px] text-2xl font-semibold text-white bg-[#E8B810]' onClick={handleSearchKey}>
                                Search
                            </button>
                        </div>
                        :
                        <div className='flex items-center mt-[25px] h-[82px] w-[760px] rounded-[24px] bg-white border border-neutral-200 border-solid'>
                            <input className='placeholder:text-black placeholder:text-xl placeholder:pl-[20px] w-[494px] h-[60px] rounded-[16px] ml-[10px] border border-solid border-neutral-200' type='text' placeholder='Report...' />
                            <button className='searchbox'>Report</button>
                        </div>

                }
            </div>
            <div className=' mt-0 ml-[85px]'><img className='' src={locateMe} alt='locateMe' height='450px'></img></div>
        </div>
    )
}