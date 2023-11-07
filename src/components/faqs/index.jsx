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
        <div className='xl:w-[1519px] md:w-screen sm:w-screen bg-white mb-32'>
            <div className='xl:text-3xl sm:text-2xl font-bold flex justify-center pt-8'>Frequently asked questions</div>
            <div className='xl:font-normal flex justify-center xl:text-2xl sm:text-xl pt-4 text-[#667085]'>Everything you need to know about the product and billing.</div>
            <div className='flex xl:flex-row md:flex-col md:items-center sm:flex-col sm:items-center justify-center mt-10'>

                <div className='mt-10 xl:w-4/6 md:w-[800px] sm:w-[600px] md:flex md:flex-col sm:w-full sm:flex sm:flex-col'>
                    {questions.map((items, idx) => {
                        return (
                            <div className={plusMinus === idx ? 'xl:h-20 xl:w-4/5 mb-6 border-solid border-b border-[#EAECF0]' : 'xl:h-14 xl:w-4/5 mb-6 border-solid border-b border-[#EAECF0]'} >
                                <div className='flex justify-between '>
                                    <div className='xl:text-xl md:text-base sm:text-sm font-medium text-[#101828]' key={idx}>{items.questions}</div>
                                    <div><button onClick={() => handlePlusMinusIcon(idx)}>{plusMinus === idx ? <FiMinusCircle style={{ color: "#E8B810", height: "25px", width: "25px" }} /> : <FiPlusCircle style={{ color: "#E8B810", height: "25px", width: "25px" }} />}</button></div>
                                </div>
                                <div>
                                    <div className='text-base text-[#667085] font-normal mt-2'>
                                        {plusMinus === idx ? <div>{items.answers}</div> : null}
                                    </div>
                                </div>
                            </div>
                        );

                    })}
                </div>
                <div className='xl:h-96 md:h-11/12 mt-10'>
                    <img className='bg-[#00B7D0] xl:h-96 xl:w-96 md:h-11/12 md:w-11/12 mix-blend-darken' src={faqImage} alt='faqImage' />
                </div>
            </div>
        </div>
    )
}
