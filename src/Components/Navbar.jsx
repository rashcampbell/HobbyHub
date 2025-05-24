import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply theme to the document and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme between light and dark
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

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
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to create a group!',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/auth/login');
      });
    }
  };

  const handleMyGroupClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/auth/my-group');
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to view your groups!',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/auth/login');
      });
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
        <NavLink
          to="/auth/create-group"
          onClick={handleCreateGroupClick}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 border-b-2 border-blue-600' : ''
          }
        >
          Create Group
        </NavLink>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <NavLink
          to="/auth/my-group"
          onClick={handleMyGroupClick}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 border-b-2 border-blue-600' : ''
          }
        >
          My Group
        </NavLink>
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
    <div className="navbar bg-base-100 mx-auto px-8 md:px-12 lg:px-16 xl:px-24">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
        <label className="swap swap-rotate ml-8">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === 'dark'}
            onChange={handleThemeToggle}
          />
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;