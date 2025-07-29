import React, { useState } from 'react';
import axios from 'axios';

const FeedbackModal = ({ formId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(
        '/api/feedback',
        {
          formId,
          rating,
          comment
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );
      alert('Feedback submitted!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Rate this Form</h2>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          placeholder="Leave a comment..."
          className="w-full p-2 border rounded mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
