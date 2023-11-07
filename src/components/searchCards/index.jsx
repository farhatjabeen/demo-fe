import React from 'react'
import { FaMap, FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router'

export default function SearchCards(props) {
    const navigate = useNavigate();
    return (
        <div className='mt-[20px] h-[438.75px] w-[320.75px] flex flex-col items-center relative'>

            <div>
                <img src={props.keys} className='rounded-[18px]' alt='keys' height='280px' width='280px' />
            </div>
            <div className='absolute bg-white w-[280px] h-[214px] top-[165px] rounded-[18px] flex justify-center items-center'>
                <div className='w-[240px] h-[180px] mt-[20px]' key={props.idx}>
                    <div className='font-bold text-2xl'>{props.itemName}</div>
                    <div className='h-[66px] w-[133px] mt-[12px]'>
                        <div className=' w-[150px] flex'><FaMap style={{ color: "#00b8b8", margin: '3px' }} />  <h1 className='ml-[5px] font-medium text-sm' >{props.location}</h1></div>
                        <div className=' w-[150px] flex'><FaCalendar style={{ color: "#00b8b8", margin: '3px' }} /> <h1 className='ml-[5px] font-medium text-sm' >{props.date}</h1></div>
                        <div className='text-sm w-[150px] flex'><FaClock style={{ color: "#00b8b8", margin: '3px' }} /> <h1 className='ml-[5px] font-medium text-sm' >{props.time}</h1></div>
                    </div>
                    <div className='flex justify-between'>
                        <div ><button className='h-[42.75px] w-[120px] rounded-[7.5px] bg-[#E8B810] border-none text-sm font-normal mt-[26px]'>Contact</button></div>
                        <div className='mt-[30px] h-[32px] w-[120px] flex justify-center items-center text-sm font-normal' >
                            <button onClick={() => navigate(`/viewItem/${props.itemId}`)}>View item</button>
                            <FaArrowRight className=' ml-[5px]' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
