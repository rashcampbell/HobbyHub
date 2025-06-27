import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formData.name && formData.email && formData.subject && formData.message;

    if (isValid) {
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-10 py-10 sm:px-6 lg:px-12">
      <div className="flex flex-col w-full mx-auto p-10 overflow-hidden sm:flex-row">
        {/* Left Side - Description Section */}
        <div className="p-6 sm:p-8 lg:p-10  w-full sm:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-3xl font-bold mt-2 ">Get in Touch</h1>
          <p className="mt-4 text-sm sm:text-base">
            Have questions or need support? Feel free to reach out to us anytime—we're here to help you.
Let's connect and make your experience even better!.
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="p-6 sm:p-8 lg:p-10 w-full sm:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Your Subject"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 text-sm sm:text-base h-32 sm:h-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;