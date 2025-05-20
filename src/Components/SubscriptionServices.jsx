import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const SubscriptionServices = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => setSubscriptionData(data))
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
      <p className="text-4xl text-center font-bold mb-4">Subscription Box Blog</p>
      <p className="text-xl text-center">Subscribe to our month Family crates</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto p-4">
        {subscriptionData.map(service => (
          <div key={service.id} className="bg-white shadow-lg mx-auto rounded-lg p-6">
            <img src={service.thumbnail} alt={service.name} className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors duration-200">{service.name}</h3>
            <p className="text-gray-500 mb-1">{service.tech_category}</p>
            <p className="text-xl font-bold mb-1">${service.price}</p>
            <p className="text-gray-500 mb-1">{service.frequency}</p>
            <p className="text-sm text-gray-600 mb-1">{service.description}</p>
            <p className="text-gray-500 font-bold mb-2 hover:text-orange-500 transition-colors duration-200">
              Rating: {service.ratings} ({service.number_of_reviews} reviews)
            </p>
            <button
              className="geneva btn btn-soft btn-primary"
              onClick={() => handleViewMore(service.id)}
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionServices;