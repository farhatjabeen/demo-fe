import React, {  useState } from 'react';
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
    if(validateEmail(emailAddress)){
      setPasswordBox(true);
      setErrorMessage(false);
  }
  else{
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
  
  return (
    <div>
      {isOpen && (
    <div className="fixed inset-0 z-50 bg-black opacity-50 overflow-hidden"></div>
  )}
      <div  className={`fixed inset-0 xl:ml-[880px] xl:mt-[165px] z-50 ${isOpen ? '' : 'hidden'}`}>

        <div className="bg-white flex flex-col items-center rounded-3xl shadow-lg p-8 w-[531px] h-[470px]">
          <div className='h-[109px] w-[430px] flex flex-col justify-center'>
            <div className='h-[47px] w-[265px] text-4xl font-bold'>Login/Register</div>
            <div className='h-[62px] w-[430px] text-[19.5px] font-normal text-[#757780] mt-[10px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit onsectetur</div>
          </div>

          <div className='mt-[31px] h-[221px] w-[440px]'>
            {
              passwordBox ?
                <div>
                  {checkUser ?
                    <div>

                      <div>
                        <div className='text-sm font-medium text-[#757780] mb-[5px]'>Enter Password</div>
                        <input type='password' value={passwordHere} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setPasswordHere(e.target.value)} />
                      </div>
                      <div>
                        {
                          errorMessage ?
                            <div className='text-sm text-[red] mt-[9px]'>Enter a valid password</div>
                            :
                            null
                        }
                      </div>
                      <div className='w-[440px] h-[44px] rounded-[6px] mt-[25px] bg-[#00B8B8] text-white flex justify-center items-center text-sm font-medium border-none'>
                        <button onClick={loginButton} >LOGIN</button>
                      </div>
                    </div>

                    :
                    <div>
                      <div>
                        <div className='text-sm font-medium text-[#757780] mb-[5px]'>Enter Password</div>
                        <input type='password' value={passwordContainer} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setPasswordContainer(e.target.value)} />
                        <div className='text-sm font-medium text-[#757780] mt-[9px]'>Re-enter Password</div>
                        <input type='password' value={reEnterPasswordcContainer} className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' onChange={(e) => setReEnterPasswordContainer(e.target.value)} />
                      </div>
                      <div>
                        {
                          errorMessage ?
                            <div className='text-sm text-[red] mt-[9px]'>Enter matching password in both the fields</div>
                            :
                            null
                        }
                      </div>
                      <div className='w-[440px] h-[44px] rounded-[6px] mt-[25px] bg-[#00B8B8] text-white flex justify-center items-center text-sm font-medium border-none'>
                        <button variant='filled' onClick={registerButton} >REGISTER</button>
                      </div>
                    </div>
                  }
                </div>
                :
                <div>
                  <div className='text-sm font-medium text-[#757780] mb-[5px]'>Email Address</div>
                  <div>
                    <input type='email' className='w-full rounded-lg h-12 p-4 font-medium text-base bg-[#E8EDF1]' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                  </div>

                  {
                    errorMessage ?
                      <div className='text-sm text-[red] mt-[9px]'>Enter a valid email address</div>
                      :
                      null
                  }
                  {/* <div className='w-[440px] h-[44px] rounded-[6px] mt-[18px] bg-[#A7A9AC] text-white flex justify-center items-center text-sm font-medium border-none'> */}
                  <button className='w-full h-[44px] rounded-[6px] mt-[18px] bg-[#A7A9AC] text-white flex justify-center items-center text-sm font-medium border-none' onClick={handleLoginPassword} >CONTINUE</button>
                  {/* </div> */}
                  {/* <div className='mt-[30px]'><img src={orimage} alt='orimage' width='440px' height='17px' /></div> */}
                  <div className="flex items-center mt-[30px]">
                    <hr className="flex-1 border border-t border-gray-300" />
                    <span className="mx-4 text-gray-500">or</span>
                    <hr className="flex-1 border border-t border-gray-300" />
                  </div>
                  <div className='flex w-full h-[22px] mt-[25px]'>
                    <div className='w-56 h-[22px] font-semibold text-base'>Are you a business owner?</div>
                    <div className='flex w-48 h-[20px] '>
                      <div className='mr-[10px] flex justify-center items-center'><img src={linksymbol} alt='linksymbol' height='18px' width='18px' /></div>
                      <div><a href='#' className='h-5 w-48 text-base font-medium text-[#00B8B8]'>Sign in for business</a></div>
                    </div>
                  </div>
                </div>

            }



          </div>

          <div className='absolute xl:top-[20px] xl:left-[470px]'><button onClick={onClose} className='border-none bg-white w-[40px] flex justify-center'><AiFillCloseCircle className='h-9 w-9 text-[#00B8B8]' /></button></div>
          <div className=''></div>


          <IoTriangleSharp className='absolute top-[-24px] left-[460px] h-7 w-7 text-white' />
        </div>
      </div>
    </div >
  )
}
