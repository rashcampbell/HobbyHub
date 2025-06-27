import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthClick = (e, route, action) => {
    e.preventDefault();
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

  return (
    <div className="fixed top-0 left-0 w-64 bg-teal-800 h-screen text-white p-4 z-40 overflow-y-auto">
      <h1 className="text-2xl mb-6 font-bold">HobbyHub</h1>
      <ul className="flex flex-col space-y-4">
        <li>
          <a href="/" className="text-lg hover:text-teal-300 transition">Home</a>
        </li>
        <li>
          <a href="/auth/dashboard" className="text-lg hover:text-teal-300 transition">Dashboard</a>
        </li>
        <li>
          <a
            href="/auth/create-group"
            onClick={(e) => handleAuthClick(e, '/auth/create-group', 'create a group')}
            className="text-lg hover:text-teal-300 transition"
          >
            Create Group
          </a>
        </li>
        <li>
          <a
            href="/auth/my-group"
            onClick={(e) => handleAuthClick(e, '/auth/my-group', 'view your groups')}
            className="text-lg hover:text-teal-300 transition"
          >
            My Group
          </a>
        </li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-6">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl mb-4">Counter App</h1>
            <h2 className="text-2xl mb-4">Count: {count}</h2>
            <button
              onClick={increment}
              className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Increment
            </button>
            <button
              onClick={decrement}
              className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
            >
              Decrement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;