import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/MyProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyGroup = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch groups for the logged-in user
  useEffect(() => {
    if (user) {
      const fetchGroups = async () => {
        try {
          const response = await axios.get('http://localhost:3000/groups', {
            params: { email: user.email }
          });
          if (response.data.success) {
            setGroups(response.data.data);
          } else {
            Swal.fire('Error', response.data.message || 'Failed to fetch groups', 'error');
          }
        } catch (error) {
          console.error('Error fetching groups:', error);
          Swal.fire('Error', 'Failed to fetch groups. Please try again.', 'error');
        } finally {
          setIsLoading(false);
        }
      };
      fetchGroups();
    }
  }, [user]);

  // Handle delete group
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/groups/${id}`);
        if (response.data.success) {
          setGroups(groups.filter(group => group._id !== id));
          Swal.fire('Deleted!', 'Group has been deleted.', 'success');
        } else {
          Swal.fire('Error', response.data.message || 'Failed to delete group', 'error');
        }
      } catch (error) {
        console.error('Error deleting group:', error);
        Swal.fire('Error', 'Failed to delete group. Please try again.', 'error');
      }
    }
  };

  // Handle update
  const handleUpdate = (id) => {
    navigate(`/auth/updateGroup/${id}`);
  };

  // Show loading state
  if (loading || isLoading) {
    return <div className="loading loading-spinner text-primary"></div>;
  }

  // Ensure user is authenticated
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My Groups
      </h1>
      {groups.length === 0 ? (
        <p className="text-center text-gray-600">No groups found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-center">Image</th>
                <th className="p-3">Group Name</th>
                <th className="p-3">Hobby Category</th>
                <th className="p-3">Description</th>
                <th className="p-3">Meeting Location</th>
                <th className="p-3">Max Members</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={group.imageUrl}
                      alt={group.groupName}
                      className="w-24 h-24 object-cover rounded"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
                    />
                  </td>
                  <td className="p-3">{group.groupName}</td>
                  <td className="p-3">{group.hobbyCategory}</td>
                  <td className="p-3">{group.description}</td>
                  <td className="p-3">{group.meetingLocation}</td>
                  <td className="p-3">{group.maxMembers}</td>
                  <td className="p-3">
                    {new Date(group.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleUpdate(group._id)}
                      className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="btn btn-sm btn-error bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGroup;