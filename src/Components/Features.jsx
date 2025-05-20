import React from 'react';
import Marquee from 'react-fast-marquee'; 

const steps = [
  {
    id: 1,
    title: 'Choose Your Plan',
    description: 'In every box, you will receive 5 full-size beauty items. Every box has a thecrate average value $175.',
    imageUrl: 'https://i.postimg.cc/1t6fdv1K/d8fc99427c300f4ebb3899eacec8c3fe.jpg',
  },
  {
    id: 2,
    title: 'Get Your Crate Box',
    description: 'Your monthly beauty treats will mix of prestige and niche brands. Discover what works for you.',
    imageUrl: 'https://i.postimg.cc/zDyrqyy9/2eaf9c8a660f8c3f5c16b7e8221f25ba.jpg',
  },
  {
    id: 3,
    title: 'Join Our Community',
    description: 'Become an official Crate, with over 300,000 members worldwide & Receive reward points.',
    imageUrl: 'https://i.postimg.cc/K8JqK5VQ/24fc42a5b0ae66758512c4f08458dad6.jpg',
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-semibold text-center mb-4 text-gray-800">
          Here's How It Works
        </h2>
        <p className='text-center font-semibold mb-10 text-xl'>New boxes Released Monthly</p>

        <Marquee speed={50} pauseOnHover gradient={false}>
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center mx-10 w-80" 
            >
              <div className="mb-4">
                <img
                  src={step.imageUrl}
                  alt={step.title}
                  className="h-48 w-auto object-contain rounded-xl"
                />
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-700">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Features;
