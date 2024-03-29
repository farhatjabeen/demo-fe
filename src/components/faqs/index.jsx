import React, { useState } from 'react'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import faqImage from '../../assets/images/faqlogo.png'

export default function Faq({ questions }) {
  const [plusMinus, setPlusMinus] = useState(null)

  const handlePlusMinusIcon = (index) => {
    if (plusMinus === index) {
      return setPlusMinus(null)
    }
    setPlusMinus(index)
  }
  return (
    <div className=" bg-white mb-32">
      <div className="xl:text-4xl text-black-dark sm:text-2xl font-bold flex justify-center pt-8">
        <p>Frequently asked questions</p>
      </div>
      <div className="xl:font-normal flex justify-center xl:text-xl sm:text-xl pt-6 text-shaded-blue">
        <p>Everything you need to know about the product and billing.</p>
      </div>
      <div
        className="relative flex justify-end xl:flex-row md:flex-col md:items-center w-full xl:pr-14 
            xl:py-14 sm:flex-col sm:items-center mt-10"
      >
        <div
          className="md:ml-20 mt-4 xl:absolute xl:w-3/6 xl:top-10 xl:left-0 
                md:w-2/3 sm:w-3/4 xl:end-1/3 xl:mr-40 md:flex md:flex-col sm:flex sm:flex-col"
        >
          {questions.map((items, idx) => {
            return (
              <div
                className={`${plusMinus === idx ? 'xl:h-20' : 'xl:h-14'} 
                            mb-6 border-solid border-b border-back-dark`}
                key={idx}
              >
                <div className="flex justify-between ">
                  <div
                    className="xl:text-xl md:text-base sm:text-sm font-medium text-black-dark"
                    key={idx}
                  >
                    {items.questions}
                  </div>
                  <div>
                    <button className="cursor-pointer" onClick={() => handlePlusMinusIcon(idx)}>
                      {plusMinus === idx ? (
                        <FiMinusCircle
                          style={{ color: '#E8B810', height: '25px', width: '25px' }}
                        />
                      ) : (
                        <FiPlusCircle style={{ color: '#E8B810', height: '25px', width: '25px' }} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="pb-2">
                  <div className="text-base text-shaded-blue font-normal mt-2">
                    {plusMinus === idx ? <div>{items.answers}</div> : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="xl:w-1/3 xl:h-96 md:w-full md:h-11/12 md:flex md:justify-center">
          <img
            className=" xl:h-full xl:w-full md:h-11/12 md:w-3/5 "
            src={faqImage}
            alt="faqImage"
          />
        </div>
      </div>
    </div>
  )
}
