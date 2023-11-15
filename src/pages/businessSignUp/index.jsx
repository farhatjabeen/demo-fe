import React, { useState } from 'react'
import OurBrands from '../../components/ourBrands';
import DropdownMenu from '../../components/common/dropdown';

export default function BusinessSignUp() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = ['Private', 'Public', 'One person'];
    return (
        <>
            <div className=' flex  mx-20 my-10'>
                <div className='basis-8/12'>
                    <h1 className='text-4xl font-bold'>Transform your lost and found
                        <br></br> process with BTZ app</h1>
                    <div className='mt-20'>
                        <div className=" p-10 w-3/4 m-2 rounded-lg  shadow-lg shadow-blue">
                            <p>Spend 50-80% less time handling items and enquiries</p>
                        </div>
                        <div className=" p-10 w-3/4 my-10 ml-24 rounded-lg shadow-lg shadow-cyan-100">
                            <p>Recoup the costs of handling lost property</p>
                        </div>
                        <div className=" p-10 w-3/4 m-2 rounded-lg shadow-lg shadow-cyan-100">
                            <p>Generate positive feedback and reviews</p>
                        </div>
                    </div>
                </div>
                <div className="basis-5/12 p-8 m-6 bg-white rounded-xl">
                    <div className="mb-2">
                        <label for="fullName" className="block text-sm font-bold mb-2">Your Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Full Name"
                            className="border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2"
                        />
                    </div>

                    <div className="mb-2">
                        <label for="mobileNumber" className="block text-sm font-bold mb-2">Mobile Number</label>
                        <input
                            type="text"
                            placeholder="1234567890"
                            className="border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2"
                        />
                    </div>

                    <div className="mb-2">
                        <label for="email" className="block text-sm font-bold mb-2">Email Address</label>
                        <input
                            type="text"
                            placeholder="abc@xyz.com"
                            className="border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2"
                        />
                    </div>

                    <div className="mb-2">
                        <label for="password" className="block text-sm font-bold mb-2">Password</label>
                        <input
                            type="text"
                            placeholder="Galaxies"
                            className="border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2"
                        />
                    </div>

                    <div className="mb-2">
                        <label for="companyName" className="block  text-sm font-bold mb-2">Company Name</label>
                        <input
                            type="text"
                            placeholder="Glorious"
                            className="border pl-2 w-full rounded-xl text-grey placeholder:text-sm py-2"
                        />
                    </div>
                    <div className="mb-2">
                        <label for="companyLogo" className="block text-sm font-bold mb-2">Company Logo</label>
                        <button className="bg-primary-color w-full py-2 rounded-xl">Upload Image</button>
                    </div>
                    <div className="mb-2">
                        <label for="companyCategory" className="block text-sm font-bold mb-2">Company Category</label>
                        <DropdownMenu
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={(category) => setSelectedCategory(category)} />
                    </div>
                    <div className="flex ">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" className="w-4 h-4"style={{accentColor:'#FF9900'}} />
                        </div>
                        <label for="remember" className="ms-2 text-sm">I agree to the <span class="underline decoration-1 text-[#FF9900]"> terms and conditions</span>  of ilost Serbia</label>
                    </div>
                    <button className="bg-[#FF9900] w-full py-3  mt-2 rounded-lg">Continue</button>
                </div>

            </div>
            <div className='mb-20'>
                <OurBrands
                    asTrustedBy
                />
            </div>
        </>
    )
}
