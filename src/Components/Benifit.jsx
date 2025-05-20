import React from 'react';

const Benifit = () => {
        const benefits = [
            "100% Satisfaction Guarantee",
            "Stay Up-To-Date Through Newsletter",
            "Member Pricing Discounts",
            "100% Satisfaction Guarantee", 
            "Stay Up-To-Date Through Newsletter", 
            "Award-Winning Crate Community",
            "Stay Up-To-Date Through Newsletter", 
        ];

    return (
        <section className="flex flex-col md:flex-row items-center p-30 bg-gray-100"> 
            <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
                <img
                    src='https://i.postimg.cc/43FWPbzP/446b84ea63918e815bee76614b8eae04.jpg'
                    alt="Crate with vegetables"
                    className="rounded-lg shadow-lg w-3/4 h-auto object-cover" 
                />
            </div>

            <div className="md:w-1/2">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    TheCrate's Member Benefits
                </h2>
                <p className="text-gray-600 mb-6">
                    There are many variations of passages lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour randomised.
                </p>

                <ul className="space-y-2 mb-6">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {benefit}
                        </li>
                    ))}
                </ul>

                <button className="btn btn-outline btn-info font-bold py-3 px-6 ">
                    SUBSCRIBE NOW
                </button>
            </div>
        </section>
    );
};

export default Benifit;