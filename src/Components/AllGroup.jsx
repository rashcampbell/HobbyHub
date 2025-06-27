import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const AllGroup = () => {
  const [groupsData, setGroupsData] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('https://assignment-ten-server-olive.vercel.app/groups');
        if (response.data.success) {
          setGroupsData(response.data.data);
        } else {
          console.error('Failed to fetch groups:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        Swal.fire('Error', 'Failed to load groups. Please try again.', 'error');
      }
    };

    fetchGroups();
  }, [user]);

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
    <div className="p-4 sm:p-6 md:p-10 lg:p-20">
      <p className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4">
        Featured Groups Section
      </p>
      <p className="text-base sm:text-lg md:text-xl text-center mb-6 sm:mb-8">
        Join your favorite group
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 h-auto p-2">
        {groupsData.map((group) => (
          <div
            key={group._id}
            className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full flex flex-col h-auto min-h-[400px] sm:min-h-[450px]"
          >
            <img
              src={group.imageUrl}
              alt={group.groupName}
              className="w-full h-40 sm:h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-base sm:text-lg md:text-xl text-black font-bold mb-2 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {group.groupName}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-1 line-clamp-1">
              {group.hobbyCategory}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1 line-clamp-1">
              Location: {group.meetingLocation}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">
              Max Members: {group.maxMembers}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 font-bold hover:text-red-500 mb-4 sm:mb-6 line-clamp-1">
              Start Date: {group.startDate}
            </p>
            <div className="mt-auto">
              <button
                className="geneva btn btn-soft btn-primary w-full text-sm sm:text-base py-2"
                onClick={() => handleViewMore(group._id)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGroup;