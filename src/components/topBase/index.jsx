import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import addressman from '../../assets/images/AddressMan.png';

export default function TopBase() {
    const[buttonactive,setButtonactive]=useState(true);
    const[searchkey,setSearchkey] = useState('');
    const navigate = useNavigate();

    
    const handlesearchbutton =()=>{
        setButtonactive(!buttonactive);
    };
    
    const handlereportbutton=()=>{
        setButtonactive(!buttonactive);
    }

    const handlesearchkey = () =>{
        localStorage.setItem("searchkey",searchkey);
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
                    <div className='flex items-center p-[7px] bg-white border-solid rounded-[20px] h-[75px] w-[440px] border border-neutral-200 border-solid'>
                        <button onClick={handlesearchbutton} className='h-[59px] w-[220px] rounded-[16px] text-[24px] font-normal' style={{backgroundColor: buttonactive? '#266867':'white',color:buttonactive? 'white':'black'}}>Search lost item</button>
                        <button onClick={handlereportbutton} className='h-[59px] w-[220px] rounded-[16px] text-[24px] font-normal' style={{backgroundColor: buttonactive? 'white':'#266867',color:buttonactive? 'black':'white'}}>Report found item</button>
                    </div>
                    {  
                        buttonactive ? 
                        <div className='flex items-center mt-[25px] h-[82px] w-[760px] rounded-[24px] bg-white border border-neutral-200 border-solid'>
                            <input className=' placeholder:text-black placeholder:text-xl placeholder:pl-[20px] w-[494px] h-[60px] rounded-[16px] ml-[10px] border border-solid border-neutral-200' type='text' placeholder='Search...' value={searchkey} onChange={(e)=>setSearchkey(e.target.value)}/>
                            <button className='w-[230px] h-[60px] rounded-[16px] border border-solid border-neutral-200 ml-[10px] mr-[10px] text-2xl font-semibold text-white bg-[#E8B810]' onClick={handlesearchkey}>Search</button>
                        </div>
                        :
                        <div className='flex items-center mt-[25px] h-[82px] w-[760px] rounded-[24px] bg-white border border-neutral-200 border-solid'>
                            <input className='placeholder:text-black placeholder:text-xl placeholder:pl-[20px] w-[494px] h-[60px] rounded-[16px] ml-[10px] border border-solid border-neutral-200' type='text' placeholder='Report...'/>
                            <button className='searchbox'>Report</button>
                        </div>
                    
                    }
                </div>
                <div className=' mt-0 ml-[85px] mt-[0px]'><img className='' src={addressman} alt='addressman' height='450px'></img></div>
    </div>
  )
}