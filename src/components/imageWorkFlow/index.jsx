import React from 'react'
import doodleBackground from '../../assets/images/doodle.png';

export default function ImageWorkFlow() {
    return (
        <div className='xl:w-[1519px] md:w-screen sm:w-screen'>
            <div className='bg-[#D8FFFF] bg-no-repeat'>
                <img className='opacity-5 w-full h-3/5' src={doodleBackground} alt='doodlebackground' ></img>
            </div>
        </div>
    )
}
