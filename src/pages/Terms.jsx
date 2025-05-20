import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Terms = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div class="flex flex-col lg:flex-row gap-10 p-6 max-w-6xl mt-10 mx-auto">
                <div class="flex-1 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Your Name*" class="input input-bordered w-full" />
                        <input type="email" placeholder="Your Email*" class="input input-bordered w-full" />
                        <input type="tel" placeholder="Phone Number*" class="input input-bordered w-full" />
                        <select class="select select-bordered w-full">
                            <option disabled selected>Select Subject</option>
                            <option>Subscription</option>
                            <option>Sales</option>
                            <option>General Inquiry</option>
                        </select>
                    </div>
                    <textarea placeholder="Kindly Discribe Your Request *" class="textarea textarea-bordered w-full h-32"></textarea>
                    <button class="btn btn-active btn-success font-semibold py-2 px-6 rounded ">
                        SUBMIT REQUEST
                    </button>
                </div>

                <div class="w-full lg:w-1/3 space-y-6 text-sm text-gray-700">
                    <div>
                        <h3 class="font-bold text-gray-900">OUR HEADQUARTERS</h3>
                        <p><span class="font-semibold">Dhaka:</span> St. Cesar Calling Roma</p>
                        <p><span class="font-semibold">Rajshahi:</span> St. Diamond Calling Brussels</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900">REACH US 24/7 VIA PHONE</h3>
                        <p><span class="font-semibold">Dhaka:</span> +880-189-7382004</p>
                        <p><span class="font-semibold">Rajshahi:</span> +880-168-4094822</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900">MAIL US ANYTIME</h3>
                        <p><span class="font-semibold">Sales:</span> posterboy52@gmail.com</p>
                        <p><span class="font-semibold">Customers:</span> posterboy520807@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className='mt-16'>
            <Footer></Footer>
            </div>

        </div>
        
    );
};


export default Terms;