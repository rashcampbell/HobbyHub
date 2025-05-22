import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/MyProvider'; // Import AuthContext

const AllGroupDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Access logged-in user from AuthContext
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    // Check if the user has already joined this group
    const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups') || '[]');
    if (joinedGroups.includes(parseInt(id))) {
      setHasJoined(true);
    }

    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => {
        const selectedGroup = data.find(item => item.id === parseInt(id));
        if (selectedGroup) {
          setGroup(selectedGroup);
        } else {
          setError('Group not found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading group details:', error);
        setError('Error loading group details');
        setLoading(false);
      });
  }, [id]);

  const handleJoinGroup = () => {
    if (hasJoined) {
      Swal.fire({
        icon: 'warning',
        title: 'Already Joined',
        text: 'You have already joined this group!',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Mark the group as joined
    setHasJoined(true);
    const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups') || '[]');
    joinedGroups.push(parseInt(id));
    localStorage.setItem('joinedGroups', JSON.stringify(joinedGroups));

    // Show success alert
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: `You have successfully joined ${group.name}!`,
      confirmButtonText: 'OK',
    });
  };

  const handleLeaveGroup = () => {
    // Remove the group from joinedGroups in localStorage
    const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups') || '[]');
    const updatedGroups = joinedGroups.filter(groupId => groupId !== parseInt(id));
    localStorage.setItem('joinedGroups', JSON.stringify(updatedGroups));
    setHasJoined(false);

    // Show success alert for leaving
    Swal.fire({
      icon: 'success',
      title: 'Left Group',
      text: `You have successfully left ${group.name}!`,
      confirmButtonText: 'OK',
    });
  };

  const handleFeedbackSubmit = () => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please log in to submit feedback.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!feedback.trim()) {
      setFeedbackError('Feedback cannot be empty');
      return;
    }

    setFeedbacks([
      ...feedbacks,
      {
        feedback,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || 'https://via.placeholder.com/40', // Fallback image
        id: Date.now(),
      },
    ]);
    setFeedback('');
    setFeedbackError('');
    Swal.fire({
      icon: 'success',
      title: 'Feedback Submitted',
      text: 'Your feedback has been added successfully!',
      confirmButtonText: 'OK',
    });
  };

  const isGroupActive = () => {
    if (!group) return false;
    const today = new Date();
    const startDate = new Date(group.start_date);
    return startDate >= today;
  };

  if (loading) return <div className="p-24 text-center">Loading...</div>;
  if (error) return <div className="p-24 text-center text-red-500">{error}</div>;

  return (
    <div className="p-24 max-w-4xl mx-auto">
      <div className="bg-gray-100 p-6 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Group Details</h1>
        <p className="text-gray-600 mt-2">Discover more about this group</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">{group.name}</h2>
      <img
        src={group.image}
        alt={group.name}
        className="w-full max-h-92 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-500 mb-2">
        <strong>Category:</strong> {group.category}
      </p>
      <p className="text-gray-500 mb-2">
        <strong>Description:</strong> {group.description}
      </p>
      <p className="text-gray-500 mb-2">
        <strong>Location:</strong> {group.location}
      </p>
      <p className="text-gray-500 mb-2">
        <strong>Max Members:</strong> {group.max_members}
      </p>
      <p className="text-gray-500 mb-6">
        <strong>Start Date:</strong> {group.start_date}
      </p>

      {/* Join Button or Inactive Message */}
      {isGroupActive() ? (
        <div className="mb-8 flex space-x-4">
          <button
            onClick={handleJoinGroup}
            className={`px-4 py-2 rounded-md text-white ${
              hasJoined ? 'bg-gray-400 cursor-not-allowed' : 'btn btn-success'
            }`}
            disabled={hasJoined}
          >
            {hasJoined ? 'Already Joined' : 'Join Group'}
          </button>
          {hasJoined && (
            <button
              onClick={handleLeaveGroup}
              className="btn btn-active btn-error"
            >
              Leave Now Group
            </button>
          )}
        </div>
      ) : (
        <p className="text-red-600 font-semibold mb-8">
          This group is no longer active.
        </p>
      )}

      <div className="mb-8">
        <Link to="/">
          <button className="btn btn-info mb-4">
            Back to Home
          </button>
        </Link>
        <h3 className="text-xl font-semibold mb-4">Add Your Feedback</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="4"
              placeholder="Write your feedback here..."
            />
          </div>
          {feedbackError && (
            <p className="text-red-500 text-sm">{feedbackError}</p>
          )}
          <button
            onClick={handleFeedbackSubmit}
            className="btn btn-active btn-primary"
          >
            Submit Feedback
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Feedback</h3>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((fb) => (
              <li key={fb.id} className="border-b pb-4 flex items-start space-x-4">
                <img
                  src={fb.userPhoto}
                  alt={fb.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{fb.userName}</p>
                  <p className="text-gray-600">{fb.feedback}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllGroupDetails;