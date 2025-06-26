import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // To track current route
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeLink, setActiveLink] = useState(''); // To track active link

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.body.style.paddingTop = '80px';
    // Set active link based on initial route
    if (location.pathname === '/') {
      setActiveLink('Home');
    }
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, [theme, location.pathname]);

  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire('Success', 'Logged Out successful!', 'success');
        navigate('/auth/login');
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  const handleSectionClick = (e, sectionId, route = '/', text) => {
    e.preventDefault();
    setActiveLink(text); // Set the clicked link as active
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(route);
    }
  };

  const handleAuthClick = (e, route, action, text) => {
    e.preventDefault();
    setActiveLink(text); // Set the clicked link as active
    if (user) {
      navigate(route);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: `Please log in to ${action}!`,
        confirmButtonText: 'Go to Login',
      }).then(() => navigate('/auth/login'));
    }
  };

  const handleNavLinkClick = (text) => {
    setActiveLink(text); // Set the clicked NavLink as active
  };

  const links = [
    { to: '/', text: 'Home' },
    {
      href: '#subscription-services',
      text: 'All Groups',
      onClick: (e) => handleSectionClick(e, 'subscription-services', '/', 'All Groups'),
    },
    ...(user
      ? [
          {
            to: '/auth/create-group',
            text: 'Create Group',
            onClick: (e) => handleAuthClick(e, '/auth/create-group', 'create a group', 'Create Group'),
          },
          {
            to: '/auth/my-group',
            text: 'My Group',
            onClick: (e) => handleAuthClick(e, '/auth/my-group', 'view your groups', 'My Group'),
          },
        ]
      : []),
    {
      href: '#benifit-section',
      text: 'Features',
      onClick: (e) => handleSectionClick(e, 'benifit-section', '/', 'Features'),
    },
    {
      href: '#faq-section',
      text: 'FAQ',
      onClick: (e) => handleSectionClick(e, 'faq-section', '/', 'FAQ'),
    },
    { to: '/contact', text: 'Contact' },
  ];

  return (
    <div className="navbar bg-base-100 fixed top-0 w-full z-50 mx-auto px-8 md:px-12 lg:px-16 xl:px-24 shadow-md">
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links.map(({ to, href, text, onClick }, i) => (
              <li key={i} className="text-lg hover:text-blue-800 transition">
                {to ? (
                  <NavLink
                    to={to}
                    onClick={() => handleNavLinkClick(text)}
                    className={activeLink === text ? 'text-blue-600 border-b-2 border-blue-600' : ''}
                  >
                    {text}
                  </NavLink>
                ) : (
                  <a href={href} onClick={onClick} className={activeLink === text ? 'text-blue-600 border-b-2 border-blue-600' : ''}>
                    {text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <NavLink to="/" className="text-xl text-blue-600 flex items-center" onClick={() => handleNavLinkClick('Home')}>
          <img
            src="https://i.postimg.cc/6qK6GcjC/b6028b7bb5448840e9c9b2a39d7992c3-removebg-preview.png"
            alt="logo-icon"
            className="h-12 w-12 rounded-full"
          />
          HobbyHub
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map(({ to, href, text, onClick }, i) => (
            <li key={i} className="text-lg hover:text-blue-800 transition">
              {to ? (
                <NavLink
                  to={to}
                  onClick={() => handleNavLinkClick(text)}
                  className={activeLink === text ? 'text-blue-600 border-b-2 border-blue-600' : ''}
                >
                  {text}
                </NavLink>
              ) : (
                <a href={href} onClick={onClick} className={activeLink === text ? 'text-blue-600 border-b-2 border-blue-600' : ''}>
                  {text}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-6">
        {loading ? (
          <div className="loading loading-spinner text-primary"></div>
        ) : user ? (
          <>
            <div className="group relative">
              <NavLink to="/profile" onClick={() => handleNavLinkClick('Profile')}>
                <img
                  src={user.photoURL || 'https://i.ibb.co/WvJPwjkh/b41b784be9a6392773515b32217b39eb.jpg'}
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
          <NavLink
            to="/auth/login"
            className="btn btn-primary"
            onClick={() => handleNavLinkClick('Login')}
          >
            Login
          </NavLink>
        )}
        <label className="swap swap-rotate">
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
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;