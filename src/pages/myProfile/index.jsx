import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenToSquare } from "react-icons/fa6";

export default function MyProfile() {
    const [editbutton, Seteditbutton] = useState(false);

    const [name, setName] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [email, setEmailid] = useState('');
    const [currentpassword, setCurrentpassword] = useState('');
    const [dbpassword, setDbpassword] = useState('');
    const [reenterpassword, setReenterpassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [allowsubmit, setAllowsubmit] = useState(false);

    const handlepassword = (e) => {
        const rpass = e.target.value;
        setReenterpassword(rpass);
        if (dbpassword === currentpassword) {
            if (reenterpassword === newPassword) {
                setAllowsubmit(true);
            }
        }
    }

    const handlesubmit = () => {
        // axios.put(`https://64dc7b7ce64a8525a0f68ee2.mockapi.io/newfields/` + cid, {
        //     mobilenumber: mobilenumber, email: email, name: name, password: reenterpassword
        // });
        Seteditbutton(false);
    }

    // useEffect(() => {
    //     getdatafromapi()
    // }, [])

    // const getdatafromapi = () => {
    //     axios.get(`https://64dc7b7ce64a8525a0f68ee2.mockapi.io/newfields` + cid)
    //         .then(res => setDbpassword(res.data.password))
    //         .catch(err => console.log(err));
    // }

    const handleeditbutton = () => {
        Seteditbutton(!editbutton);
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mb-[50px]'>
                <div className='font-bold text-4xl mr-[20px]'>My Profile</div>
                {editbutton ? null : <div><button className='w-[92px] h-[38px] rounded-[12px] bg-[#E8B810] border-none text-[13.5px] flex justify-center items-center cursor-grab' onClick={handleeditbutton}> Edit <FaPenToSquare style={{marginLeft:"5px"}} /></button> </div>}
            </div>

            <div className='h-[551.5px] w-[1060px] mb-[130px]'>

                <div className='border-b border-b-solid border-b-[#949494]'>
                    <div className='flex justify-between h-[51.75px] mb-[35px]'>
                        <div>
                            <label className='text-lg font-bold mt-[13px]'>Name</label>
                            <div className='font-medium text-[13px]'>Your Name</div>
                        </div>

                        <input className={`w-[480px] h-[51.75px] border-[0.75px] border-solid border-[#B6B6B6] rounded-[12px] ${editbutton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='text' name='username' value={name} disabled={!editbutton} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' />

                    </div>

                    <div className='flex justify-between h-[51.75px] mb-[35px]'>

                        <div>
                            <label className='text-lg font-bold mt-[13px]'>Mobile Number</label>
                            <div className='font-medium text-[13px]'>Your Mobile Number</div>
                        </div>
                        <input className={`w-[480px] h-[51.75px] border-[0.75px] border-solid border-[#B6B6B6] rounded-[12px] ${editbutton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="tel" name='mobilenumber' value={mobilenumber} disabled={!editbutton} onChange={(e) => setMobilenumber(e.target.value)} placeholder='Enter your Number' />
                    </div>

                    <div className='flex justify-between h-[51.75px] mb-[35px]'>
                        <div>
                            <label className='text-lg font-bold mt-[13px]'>Mail ID</label>
                            <div className='font-medium text-[13px]'>Your Mail ID</div>
                        </div>
                        <input className={`w-[480px] h-[51.75px] border-[0.75px] border-solid border-[#B6B6B6] rounded-[12px] ${editbutton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='email' name='email' value={email} disabled={!editbutton} onChange={(e) => setEmailid(e.target.value)} placeholder='abc@xyz.com' />

                    </div>
                </div>

                <div>
                    <div className='font-bold text-2xl pt-[30px] pb-[60px]'>
                        Change Password
                    </div>
                    <div className='flex justify-between h-[51.75px] mb-[35px]'>

                        <label className='text-lg font-bold mt-[13px]'>Enter Current password</label>
                        <input className={`w-[480px] h-[51.75px] border-[0.75px] border-solid border-[#B6B6B6] rounded-[12px]  ${editbutton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="password" name='currentpassword' value={currentpassword} disabled={!editbutton} onChange={(e) => setCurrentpassword(e.target.value)} placeholder='Enter your current password' />
                    </div>

                    <div className='flex justify-between h-[51.75px] mb-[35px]'>
                        <label className='text-lg font-bold mt-[13px]'>Enter New password</label>
                        <input className={`w-[480px] h-[51.75px] border-[0.75px] border-solid border-[#B6B6B6] rounded-[12px] ${editbutton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type='text' name='newPassword' value={newPassword} disabled={!editbutton} onChange={(e) => setNewPassword(e.target.value)} placeholder='New password' />
                    </div>

                    <div className='flex justify-between h-[51.75px] mb-[35px]'>
                        <label className='text-lg font-bold mt-[13px]'>Re - Enter New password</label>
                        <input className={`w-[480px] h-[51.75px] border-[0.75px] border-solid border-[#B6B6B6] rounded-[12px] ${editbutton ? 'bg-white' : 'bg-[#E0E0E0]'}`} type="password" name='reenterpassword' value={reenterpassword} disabled={!editbutton} onChange={handlepassword} placeholder='New password' />
                    </div>
                </div>

            </div>

            {editbutton ?
                <div className='w-[360px] flex justify-between'>
                    <div><button onClick={handleeditbutton} className='w-[173.41px] h-[57px] border-[0.8px] border-[solid] border-[#B6B6B6] bg-white rounded-[10px] text-lg cursor-grab'>Cancel</button></div>
                    <div><button disabled={allowsubmit} onClick={handlesubmit} className='w-[173.41px] h-[57px] border-[0.8px] border-[solid] border-[#E8B810] bg-[#E8B810] rounded-[10px] text-lg cursor-grab'>Save Changes</button></div>
                </div>
                :
                null}
        </div>
    )
}
