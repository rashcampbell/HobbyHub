import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleBlogsClick = (e) => {
        e.preventDefault();
        const subscriptionSection = document.getElementById('subscription-services');
        if (subscriptionSection) {
            subscriptionSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    const handleFeaturesClick = (e) => {
        e.preventDefault();
        const benifitSection = document.getElementById('benifit-section');
        if (benifitSection) {
            benifitSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <footer className="bg-blue-200 text-gray-700 p-4 sm:p-6">
            <div className="flex flex-col items-center mb-4">
                <NavLink to="/" className="btn-ghost text-lg sm:text-xl text-blue-600 flex items-center mb-4 sm:mb-2">
                    <img src="https://i.postimg.cc/6qK6GcjC/b6028b7bb5448840e9c9b2a39d7992c3-removebg-preview.png" alt="logo-icon" className="h-10 w-10" />
                    HobbyHub
                </NavLink>
                <nav className="w-full">
                    <ul className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-center">
                        <li className="text-base sm:text-lg hover:text-blue-800 transition">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="text-base sm:text-lg hover:text-blue-800 transition">
                            <a href="#subscription-services" onClick={handleBlogsClick}>All Group</a>
                        </li>
                        <li className="text-base sm:text-lg hover:text-blue-800 transition">
                            <a href="#benifit-section" onClick={handleFeaturesClick}>Features</a>
                        </li>
                        <li className="text-base sm:text-lg hover:text-blue-800 transition">
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        <li className="text-base sm:text-lg hover:text-blue-800 transition">
                            <NavLink to="/terms">Terms and Conditions</NavLink>
                        </li>
                        <li className="text-base sm:text-lg hover:text-blue-800 transition">
                            <NavLink to="/privacy">Privacy Policy</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <aside className="text-center">
                <p className="text-xs sm:text-sm">© {new Date().getFullYear()} HobbyHub. All rights reserved.</p>
            </aside>
        </footer>
    );
};

export default Footer;