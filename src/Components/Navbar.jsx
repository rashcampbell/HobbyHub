import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Success", "Logged Out successful!", "success");
        navigate('/auth/login');
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

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

  const handleFaqClick = (e) => {
    e.preventDefault();
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleCreateGroupClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/auth/create-group');
    } else {
      navigate('/auth/login');
    }
  };

  const handleMyGroupClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/auth/my-group');
    } else {
      navigate('/auth/login');
    }
  };

  const links = (
    <>
      <li className="text-lg hover:text-blue-800 transition">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 border-b-2 border-blue-600' : ''
          }
        >
          Home
        </NavLink>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <a href="#subscription-services" onClick={handleBlogsClick}>
          All Groups
        </a>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <a href="#create-group" onClick={handleCreateGroupClick}>
          Create Group
        </a>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <a href="#my-group" onClick={handleMyGroupClick}>
          My Group
        </a>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <a href="#benifit-section" onClick={handleFeaturesClick}>
          Features
        </a>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <a href="#faq-section" onClick={handleFaqClick}>
          FAQ
        </a>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 border-b-2 border-blue-600' : ''
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gray-50 mx-auto px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl text-blue-600 flex items-center gap-2">
          <img
            src="https://i.postimg.cc/jdZtt4Wk/30bf59fcf30274d7525c91f52464825f.jpg"
            alt="logo-icon"
            className="h-10 w-10 rounded-full"
          />
          HobbyHub
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end space-x-6">
        {loading ? (
          <div className="loading loading-spinner text-primary"></div>
        ) : user ? (
          <>
            <div className="group relative">
              <NavLink to="/profile">
                <img
                  src={
                    user.photoURL ||
                    'https://i.ibb.co/WvJPwjkh/b41b784be9a6392773515b32217b39eb.jpg'
                  }
                  alt="User profile"
                  className="h-10 w-10 rounded-full"
                />
              </NavLink>
              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded py-1 px-2 -top-4 right-6 transform -translate-x-1/2">
                {user.displayName || 'User'}
              </span>
            </div>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/auth/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;