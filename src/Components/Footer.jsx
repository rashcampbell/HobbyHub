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
        <footer className="bg-blue-200 text-gray-700 p-4">
            <div className="flex justify-center mb-2">
                <NavLink to="/" className="btn btn-ghost text-xl text-blue-600 flex items-center gap-2">
                    <img src="https://i.postimg.cc/jdZtt4Wk/30bf59fcf30274d7525c91f52464825f.jpg" alt="logo-icon" className="h-6 w-6 text-blue-600" />
                    HobbyHub
                </NavLink>
            </div>
            <nav className="flex justify-center gap-6 mb-2">
                <ul className="flex gap-6">
                    <li className="text-lg hover:text-blue-800 transition">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="text-lg hover:text-blue-800 transition">
                        <a href="#subscription-services" onClick={handleBlogsClick}>All Group</a>
                    </li>
                    <li className="text-lg hover:text-blue-800 transition">
                        <a href="#benifit-section" onClick={handleFeaturesClick}>Features</a>
                    </li>
                    <li className="text-lg hover:text-blue-800 transition">
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                    <li className="text-lg hover:text-blue-800 transition">
                        <NavLink to="/terms">Terms and Conditions</NavLink>
                    </li>
                    <li className="text-lg hover:text-blue-800 transition">
                        <NavLink to="/privacy">Privacy Policy</NavLink>
                    </li>
                </ul>
            </nav>
            <aside className="text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} HobbyHub. All rights reserved.</p>
            </aside>
        </footer>
    );
};

export default Footer;
