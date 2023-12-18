import React, { useState } from 'react'
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import faqImage from '../../assets/images/faqlogo.png';

export default function Faq({ questions }) {
    const [plusMinus, setPlusMinus] = useState(null);

    const handlePlusMinusIcon = (index) => {
        if (plusMinus === index) {
            return setPlusMinus(null);
        }
        setPlusMinus(index);
    }
    return (
        <div className=' bg-white mb-32'>
            <div className='xl:text-3xl sm:text-2xl font-bold flex justify-center pt-8'>Frequently asked questions</div>
            <div className='xl:font-normal flex justify-center xl:text-2xl sm:text-xl pt-4 text-[#667085]'>Everything you need to know about the product and billing.</div>
            <div className='relative flex justify-start xl:flex-row md:flex-col md:items-center w-full sm:flex-col sm:items-center mt-10'>

                <div className='md:ml-20 mt-4 xl:w-1/2 md:w-2/3 sm:w-3/4 xl:end-1/3 xl:mr-40 md:flex md:flex-col sm:flex sm:flex-col'>
                    {questions.map((items, idx) => {
                        return (
                            <div className={`${plusMinus === idx ? "xl:h-20" : "xl:h-14"} mb-6 border-solid border-b border-[#EAECF0]`} key={idx}>
                                <div className='flex justify-between '>
                                    <div className='xl:text-xl md:text-base sm:text-sm font-medium text-[#101828]' key={idx}>{items.questions}</div>
                                    <div>
                                        <button onClick={() => handlePlusMinusIcon(idx)}>
                                            {plusMinus === idx ?
                                                <FiMinusCircle style={{ color: "#E8B810", height: "25px", width: "25px" }} />
                                                :
                                                <FiPlusCircle style={{ color: "#E8B810", height: "25px", width: "25px" }} />}
                                        </button>
                                    </div>
                                </div>
                                <div className='pb-2'>
                                    <div className='text-base text-[#667085] font-normal mt-2'>
                                        {plusMinus === idx ? <div>{items.answers}</div> : null}
                                    </div>
                                </div>
                            </div>
                        );

                    })}
                </div>
                <div className='xl:absolute bg-green xl:top-4 xl:right-20 xl:w-1/3 xl:h-96 md:w-full md:h-11/12 md:flex md:justify-center'>
                    <img className=' xl:h-full xl:w-full md:h-11/12 md:w-3/5 ' src={faqImage} alt='faqImage' />
                </div>
            </div>
        </div>
    )
}
