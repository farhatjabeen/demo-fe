import React from 'react'
import { FaMap, FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router';
import keys from '../../assets/images/keys.png';

export default function SearchCards(props) {
    const navigate = useNavigate();
    return (
        <div className='mt-12 h-96 w-80 flex flex-col items-center relative'>

            <div>
                <img src={`${props.imageName}`} className='rounded-2xl xl:h-56 xl:w-72 md:h-48 md:w-56 sm:h-44 sm:w-52' alt='keys' />
            </div>
            <div className='absolute bg-white xl:w-72 xl:h-56 md:h-48 md:w-56 sm:h-44 sm:w-52 border border-[#D8FFFF] xl:top-44 md:top-40 sm:top-36 rounded-2xl flex justify-center items-center'>
                <div className='xl:h-44 xl:w-60 md:w-48 md:h-40 sm:w-44 sm:h-36  xl:mt-5' key={props.idx}>
                    <div className='font-bold xl:text-2xl md:text-xl sm:text-xl'>{props.itemName}</div>
                    <div className='h-16 mt-3'>
                        <div className='flex sm:items-center'>
                            <FaMap style={{ color: "#00b8b8", margin: '3px' }} />
                            <h1 className='ml-1.5 font-medium xl:text-base md:text-sm sm:text-xs' >{props.location}</h1>
                        </div>
                        <div className='flex sm:items-center'>
                            <FaCalendar style={{ color: "#00b8b8", margin: '3px' }} />
                            <h1 className='ml-1.5 font-medium xl:text-base md:text-sm sm:text-xs' >{props.date}</h1>
                        </div>
                        <div className='flex sm:items-center'>
                            <FaClock style={{ color: "#00b8b8", margin: '3px' }} />
                            <h1 className='ml-1.5 font-medium xl:text-base md:text-sm sm:text-xs' >{props.time}</h1>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div >
                            <button onClick={() => navigate(`/claimItem/${props.itemId}`)} className='xl:h-10 xl:w-32 md:h-8 md:w-24 sm:h-8 sm:w-20 rounded-lg bg-primary-color border-none text-sm font-normal xl:mt-7 md:mt-5 sm:mt-2'>
                                Contact
                            </button>
                        </div>
                        <div className='xl:mt-8 md:mt-6 sm:mt-2 flex justify-center items-center text-sm font-normal' >
                            <button onClick={() => navigate(`/businessitemdetails/${props.itemId}`)}>View item</button>
                            <FaArrowRight className=' ml-1.5' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
