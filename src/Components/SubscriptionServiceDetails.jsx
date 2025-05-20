import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SubscriptionServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => {
        const selectedService = data.find(item => item.id === parseInt(id));
        if (selectedService) {
          setService(selectedService);
        } else {
          setError('Service not found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading service details:', error);
        setError('Error loading service details');
        setLoading(false);
      });
  }, [id]);

  const handleReviewSubmit = () => {
    if (!review.trim()) {
      setReviewError('Review cannot be empty');
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setReviewError('Rating must be between 1 and 5');
      return;
    }

    setReviews([...reviews, { review, rating: parseInt(rating), id: Date.now() }]);
    setReview('');
    setRating('');
    setReviewError('');
  };

  if (loading) {
    return <div className="p-24 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-24 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-24 max-w-4xl mx-auto">
      <div className="bg-gray-100 p-6 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">SubscriptionServiceDetails</h1>
        <p className="text-gray-600 mt-2">Discover the Best Subscription Services Tailored for You</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
      <img
        src={service.thumbnail}
        alt={service.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-500 mb-2">
        <strong>Category:</strong> {service.tech_category}
      </p>
      <p className="text-xl font-bold mb-2">
        <strong>Price:</strong> ${service.price}
      </p>
      <p className="text-gray-500 mb-2">
        <strong>Frequency:</strong> {service.frequency}
      </p>
      <p className="text-gray-600 mb-6">
        <strong>Description:</strong> {service.description}
      </p>
      <div className="mb-6">
        <p className="text-gray-600 mb-2">
          <strong>Ratings:</strong> {service.ratings} / 5
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Number of Reviews:</strong> {service.number_of_reviews}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Subscription Benefits:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-600">
          {service.subscription_benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <Link to="/">
          <button className="btn btn-secondary bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 mb-4">
            Back to Home
          </button>
        </Link>
        <h3 className="text-xl font-semibold mb-4">Add a Review</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="4"
              placeholder="Write your review here..."
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating (1-5)
            </label>
            <input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter rating"
            />
          </div>
          {reviewError && (
            <p className="text-red-500 text-sm">{reviewError}</p>
          )}
          <button
            onClick={handleReviewSubmit}
            className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((rev) => (
              <li key={rev.id} className="border-b pb-4">
                <p className="text-gray-600">{rev.review}</p>
                <p className="text-yellow-500">
                  {'★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SubscriptionServiceDetails;