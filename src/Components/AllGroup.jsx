import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const AllGroup = () => {
  const [groupsData, setGroupsData] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => setGroupsData(data))
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const handleViewMore = (id) => {
    if (!user) {
      Swal.fire({
        title: 'Please Log In',
        text: 'You need to log in first to view more details.',
        icon: 'warning',
        confirmButtonText: 'Go to Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/auth/login?redirect=/auth/services/${id}`);
        }
      });
    } else {
      navigate(`/auth/services/${id}`);
    }
  };

  return (
    <div className="p-20">
      <p className="text-4xl text-center font-bold mb-4">Featured Groups Section</p>
      <p className="text-xl text-center mb-8">Join your favorite group</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto p-4">
        {groupsData.map(group => (
          <div key={group.id} className="bg-white shadow-lg mx-auto rounded-lg p-6">
            <img src={group.image} alt={group.name} className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors duration-200">{group.name}</h3>
            <p className="text-gray-500 mb-1">{group.category}</p>
            <p className="text-sm text-gray-600 mb-1">{group.description}</p>
            <p className="text-sm text-gray-500 mb-1">Location: {group.location}</p>
            <p className="text-sm text-gray-500 mb-1">Max Members: {group.max_members}</p>
            <p className="text-sm text-gray-500 mb-2">Start Date: {group.start_date}</p>
            <button
              className="geneva btn btn-soft btn-primary"
              onClick={() => handleViewMore(group.id)}
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGroup;
