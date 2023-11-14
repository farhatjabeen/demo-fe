import React, { useState } from 'react';
import { IoTriangleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import linksymbol from '../../assets/images/linksymbol.png';
import { AiFillCloseCircle } from "react-icons/ai";

export default function UserLogin({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');
  const [passwordBox, setPasswordBox] = useState(false);
  const [passwordContainer, setPasswordContainer] = useState(null);
  const [reEnterPasswordcContainer, setReEnterPasswordContainer] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [passwordHere, setPasswordHere] = useState('');


  const handleLoginPassword = () => {
    if (validateEmail(emailAddress)) {
      setPasswordBox(true);
      setErrorMessage(false);
    }
    else {
      setErrorMessage(!errorMessage);
    }
  }

  let currentName = emailAddress.split('@');

  const registerButton = () => {

  }

  let findUser;

  const loginButton = () => {

  }


  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  if(!isOpen) return null;

  return (
    <div >
      {/* className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-end'
      {isOpen && (
      <div className="fixed inset-0 z-50 bg-black backdrop-blur-sm overflow-hidden"></div>
      )}
      <div className={`fixed inset-0 flex justify-end xl:mt-40 xl:mr-12 md:mt-40 md:mr-16 sm:mt-40 z-50 ${isOpen ? '' : 'hidden'}`}>

        <div className="relative xl:w-2/5 xl:h-5/6 md:w-7/12 md:h-4/6 sm:w-7/12 bg-white flex flex-col items-center rounded-3xl shadow-lg xl:p-8 md-p-8 sm:p-5 "> */}
          <div className='h-28 w-11/12 flex flex-col justify-center'>
            <div className='flex'>
              <div className='xl:text-4xl md:text-3xl sm:text-2xl font-bold'>Login/Register</div>
              <div className='xl:ml-48 md:ml-40 sm:ml-28'><button onClick={onClose} className='border-none bg-white w-10 flex justify-center '><AiFillCloseCircle className='h-9 w-9 text-[#00B8B8]' /></button></div>

            </div>

            <div className='xl:text-xl md:text-lg sm:text-base font-normal text-[#757780] mt-2.5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit onsectetur</div>
          </div>

          <div className='mt-8 h-56 w-11/12'>
            {
              passwordBox ?
                <div>
                  {checkUser ?
                    <div>

                      <div>
                        <div className='text-sm font-medium text-[#757780] mb-1.5'>Enter Password</div>
                        <input type='password' value={passwordHere} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setPasswordHere(e.target.value)} />
                      </div>
                      <div>
                        {
                          errorMessage ?
                            <div className='text-sm text-[red] mt-2.5'>Enter a valid password</div>
                            :
                            null
                        }
                      </div>
                      <div className='w-full h-11 rounded-md mt-6 bg-[#00B8B8] text-white flex justify-center items-center text-sm font-medium border-none'>
                        <button onClick={loginButton} >LOGIN</button>
                      </div>
                    </div>

                    :
                    <div>
                      <div>
                        <div className=' text-sm font-medium text-[#757780] mb-1.5'>Enter Password</div>
                        <input type='password' value={passwordContainer} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setPasswordContainer(e.target.value)} />
                        <div className='text-sm font-medium text-[#757780] mt-2.5'>Re-enter Password</div>
                        <input type='password' value={reEnterPasswordcContainer} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setReEnterPasswordContainer(e.target.value)} />
                      </div>
                      <div>
                        {
                          errorMessage ?
                            <div className='text-sm text-[red] mt-2.5'>Enter matching password in both the fields</div>
                            :
                            null
                        }
                      </div>
                      <div className='w-full h-11 rounded-md mt-6 bg-[#00B8B8] text-white flex justify-center items-center text-sm font-medium border-none'>
                        <button variant='filled' onClick={registerButton} >REGISTER</button>
                      </div>
                    </div>
                  }
                </div>
                :
                <div>
                  <div className='text-sm font-medium text-[#757780] mb-1.5'>Email Address</div>
                  <div>
                    <input type='email' className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                  </div>

                  {
                    errorMessage ?
                      <div className='text-sm text-[red] mt-2.5'>Enter a valid email address</div>
                      :
                      null
                  }
                  {/* <div className='w-[440px] h-[44px] rounded-[6px] mt-[18px] bg-[#A7A9AC] text-white flex justify-center items-center text-sm font-medium border-none'> */}
                  <button className='w-full h-11 rounded-md mt-5 bg-[#A7A9AC] text-white flex justify-center items-center text-sm font-medium border-none' onClick={handleLoginPassword} >CONTINUE</button>
                  {/* </div> */}
                  <div className="flex items-center mt-8">
                    <hr className="flex-1 border border-t border-gray-300" />
                    <span className="mx-4 text-gray-500">or</span>
                    <hr className="flex-1 border border-t border-gray-300" />
                  </div>
                  <div className='flex items-center w-full h-6 mt-6'>
                    <div className='w-56 font-semibold xl:text-base md:text-base sm:text-xs'>Are you a business owner?</div>
                    <div className='flex items-center w-48 '>
                      <div className='mr-2.5  '><img src={linksymbol} alt='linksymbol' className='xl:h-4 xl:w-4 sm:h-3 sm:w-3' height='18px' width='18px' /></div>
                      <div><a href='#' className=' xl:text-base md:text-base sm:text-xs font-medium text-[#00B8B8]'>Sign in for business</a></div>
                    </div>
                  </div>
                </div>

            }
          </div>
          <IoTriangleSharp className='absolute top-[-24px] md:left-2/3 xl:left-96 h-7 w-7 text-white' />
        {/* </div>
      </div> */}
    </div >
  )
}
