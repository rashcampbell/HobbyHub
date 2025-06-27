import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    section ? section.scrollIntoView({ behavior: 'smooth' }) : navigate('/');
  };

  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <NavLink to="/" className="flex items-center mb-4">
              <img
                src="https://i.postimg.cc/6qK6GcjC/b6028b7bb5448840e9c9b2a39d7992c3-removebg-preview.png"
                alt="HobbyHub Logo"
                className="h-14 w-14"
              />
              <span className="text-2xl font-bold text-white">HobbyHub</span>
            </NavLink>
            <p className="text-gray-400 text-sm max-w-xs">
              Connect, explore, and grow your passions with HobbyHub – where communities thrive through shared interests.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:justify-start">
            <div className="grid grid-cols-2 gap-6 sm:gap-12">
              <ul className="flex flex-col gap-3">
                <li>
                  <NavLink
                    to="/"
                    className="text-sm font-medium hover:text-blue-400 transition-colors duration-200"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <a
                    href="#subscription-services"
                    onClick={(e) => handleClick(e, 'subscription-services')}
                    className="text-sm font-medium hover:text-blue-400 transition-colors duration-200"
                  >
                    All Groups
                  </a>
                </li>
                <li>
                  <a
                    href="#benifit-section"
                    onClick={(e) => handleClick(e, 'benifit-section')}
                    className="text-sm font-medium hover:text-blue-400 transition-colors duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#contact-section"
                    onClick={(e) => handleClick(e, 'contact-section')}
                    className="text-sm font-medium hover:text-blue-400 transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li>
                  <NavLink
                    to="/terms"
                    className="text-sm font-medium hover:text-blue-400 transition-colors duration-200"
                  >
                    Terms
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/terms"
                    className="text-sm font-medium hover:text-blue-400 transition-colors duration-200"
                  >
                    Privacy Policy
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/MostakimHosennnn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.youtube.com/@PosterBoy3369"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://www.instagram.com/posterboy3369/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@posterboy3369"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} HobbyHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;