import React from 'react'
import adminPasswordimage from '../../assets/images/adminPasswordimage.png'
import PasswordView from '../../components/passwordView'
const Password = () => {
    return (
        <>
            <div className='flex w-full'>
                <div className='bg-[#F1FFFF] p-40 h-screen w-1/2 '>
                    <div>
                        <p className='font-bold pb-4'>Passwords must contain :</p>
                        <ul className='list-disc ml-4 text-primary-color'>
                            <li>
                                <p className='text-black'> At least 6 characters</p>
                            </li>
                            <li>
                                <p className='text-black'> At least 1 Upper case letter (A-Z)</p>
                            </li>
                            <li>
                                <p className='text-black'> At least 1 Lower case letter (a-z)</p>
                            </li>
                            <li>
                                <p className='text-black'> At least 1 number (0-9)</p>
                            </li>
                        </ul>

                    </div>
                    <div>
                        <img src={adminPasswordimage} className='w-96  mt-20' />
                    </div>
                </div>
                <div className='w-1/2 h-screen'>
                    <PasswordView  />
                </div>
            </div>
        </>
    )
}

export default Password