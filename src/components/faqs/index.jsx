import React, { useState } from 'react'
import { FiPlusCircle,FiMinusCircle } from "react-icons/fi";
import faqImage from '../../assets/images/faqlogo.png';

export default function Faq({questions}) {
    const [plusMinus,setPlusMinus]=useState(null);

  const handlePlusMinusIcon = (index) =>{
    if(plusMinus===index){
        return setPlusMinus(null);
    }
    setPlusMinus(index);
}
  return (
    <div className='h-[630px] w-[1519px] bg-white mb-[120px]'>
                  <div className='text-3xl font-bold flex justify-center pt-8'>Frequently asked questions</div>
            <div className='font-normal flex justify-center text-2xl pt-4 text-[#667085]'>Everything you need to know about the product and billing.</div>
        <div className='flex justify-center mt-10'>
                        
            <div className='mt-10 w-2/3 pl-10'>
            {questions.map((items,idx)=>{
                            return(
                                <div className={plusMinus===idx?'h-[86px] w-[768px] mb-[24px] border-solid border-b-[1px] border-[rgb(113, 112, 112,0.08)] mb-[24px]':'h-[55px] w-[768px] mb-[24px] border-solid border-b-[1px] border-[rgb(113, 112, 112,0.08)]'} >
                                    <div className='flex justify-between items-center'>
                                        <div className='text-xl font-medium text-[#101828]' key={idx}>{items.questions}</div>
                                        <div><button onClick={()=>handlePlusMinusIcon(idx)}>{plusMinus===idx?<FiMinusCircle style={{color:"#E8B810",height:"25px",width:"25px"}} />:<FiPlusCircle style={{color:"#E8B810",height:"25px",width:"25px"}} />}</button></div>
                                        </div>
                                        <div>
                                            <div className='text-base text-[#667085] font-normal mt-[8px]'>
                                            {plusMinus===idx?<div>{items.answers}</div>:null}  
                                        </div>
                                        </div>
                                </div>
                            );
                        
                        })}
            </div>
            <div className=' h-[395px] mt-[40px]'>
                    <img className='bg-[#00B7D0] h-[395px] w-[395px] mix-blend-darken' src={faqImage} alt='faqImage' />
                </div>
        </div>                     
    </div>
  )
}
