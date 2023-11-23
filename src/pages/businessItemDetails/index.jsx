import React from 'react'
import keys from '../../assets/images/keys.png';
import BusinessTab from '../../components/businessTab';

export default function BusinessItemDetails() {
    const itemTitles = [{ query: "Item name", answer: "ASUS Vantage briefcase 15.6" }, { query: "Item Category", answer: "Briefcase" },
    { query: "Item description", answer: "Lorem ipsum" },
    { query: "Keywords", answer: "Automatically extract keywords from description, give freedom to add more" },
    { query: "Location identifiers", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." }];

    const personTitles = [{ query: "Name", answer: "Harish" },
    { query: "Phone number", answer: "78945623" },
    { query: "Mail id", answer: "harishresto@gail.com" }];

    return (
        <div className='flex flex-col items-center'>
            <div className='font-semibold text-3xl '>Item details</div>

            <div className='w-3/5 mt-20 flex space-x-8'>
                <div className='w-1/2 flex justify-end '><img className='h-96 w-fit' src={keys} alt='keys' /></div>
                <div className='w-1/2 h-96 flex flex-col space-y-8 '>
                    <img className='w-full h-44' src={keys} alt='keys' />
                    <img className='w-full h-44 ' src={keys} alt='keys' />
                </div>
            </div>

            <div className='my-20  w-full h-96 container '>
                <BusinessTab className="flex">
                    <div label="Item Description">
                        {itemTitles.map((items, i) => {
                            return (
                                <div key={i} className='xl:ml-32 md:ml-12 flex w-full'>
                                    <div className='xl:w-96 md:w-72 sm:w-48 p-2 text-[#455A64] xl:text-xl md:text-lg sm:text-base'>{items.query}</div>
                                    <div className='xl:w-72 md:w-60 sm:w-56 text-left xl:text-xl md:text-lg sm:text-base xl:font-semibold md:font-semibold sm:font-medium p-2'>{items.answer}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div label="Posted person details">
                        {personTitles.map((items, i) => {
                            return (
                                <div key={i} className='ml-32 flex w-full'>
                                    <div className='xl:w-96 p-2 text-[#455A64] xl:text-xl'>{items.query}</div>
                                    <div className='xl:w-72 text-left xl:text-xl xl:font-semibold p-2'>{items.answer}</div>
                                </div>
                            );
                        })}
                    </div>
                </BusinessTab>
            </div>

        </div>
    )
}
