import React from 'react'
import doodleBackground from '../../assets/images/doodle.png';
import homepageGif from '../../assets/videos/homepageGif.gif';

export default function ImageWorkFlow() {
    return (
        <div className='w-full'>
            <div className='bg-[#D8FFFF] w-full bg-no-repeat'>
                <iframe className='w-96' height="243" src={homepageGif} alt='doodleBackground' ></iframe>
            </div>
        </div>
    )
}
