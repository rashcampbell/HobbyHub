import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    section ? section.scrollIntoView({ behavior: 'smooth' }) : navigate('/');
  };

  return (
    <footer className="bg-blue-200 text-gray-700  p-4 sm:p-6">
      <div className="container p-10 mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <NavLink to="/" className="btn-ghost text-lg sm:text-xl text-blue-600 flex items-center mb-2">
            <img src="https://i.postimg.cc/6qK6GcjC/b6028b7bb5448840e9c9b2a39d7992c3-removebg-preview.png" alt="logo" className="h-12 w-12" />
            HobbyHub
          </NavLink>
          <p className="text-lg ml-4 text-gray-600 max-w-xs">
            Discover, join, and grow your passions with HobbyHub - where hobbies build communities.
          </p>
        </div>

        <nav className="w-full sm:w-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-center sm:text-left">
            <ul className="flex flex-col gap-2">
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <a href="#subscription-services" onClick={(e) => handleClick(e, 'subscription-services')}>
                  All Groups
                </a>
              </li>
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <a href="#benifit-section" onClick={(e) => handleClick(e, 'benifit-section')}>
                  Features
                </a>
              </li>
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <NavLink to="/terms">Terms</NavLink>
              </li>
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <NavLink to="/terms">Privacy Policy</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-800 transition">
              <FaFacebook size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-500 transition">
              <FaYoutube size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-500 transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-800 transition">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
      <aside className="text-center mt-6">
        <p className="text-xs sm:text-sm">© {new Date().getFullYear()} HobbyHub. All rights reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;