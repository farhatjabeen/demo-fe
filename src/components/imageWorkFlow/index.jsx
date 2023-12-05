import React from 'react'
import doodleBackground from '../../assets/images/doodle.png';
import homepageGif from '../../assets/videos/homepageGif.gif';
import workFlow from '../../assets/images/workFlow.png';

export default function ImageWorkFlow() {
    return (
        <div className='w-full'>
            <div className='bg-[#D8FFFF] w-full bg-no-repeat'>
                <img className='w-full' height="243" src={workFlow} alt='doodleBackground' ></img>
            </div>
        </div>
    )
}
