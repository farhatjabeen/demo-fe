import React from 'react'
import doodleBackground from '../../assets/images/doodle.png';

export default function ImageWorkFlow() {
    return (
        <div >
            <div className='h-[583px] bg-[#D8FFFF] bg-no-repeat'   >
                <img className='opacity-5 w-full h-[580px]' src={doodleBackground} alt='doodlebackground' ></img>
            </div>
        </div>
    )
}
