// File: client/src/components/FormRatings.jsx

import React, { useState } from "react";
import axios from "axios";

const FormRatings = ({ formId }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://your-backend-url.com/api/forms/feedback", {
        formId,
        rating,
        feedback,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit feedback ❌");
    }
  };

  return (
    <div className="p-4 border rounded shadow mt-6 bg-white">
      <h3 className="text-lg font-bold mb-2">Rate this Form</h3>

      {submitted ? (
        <p className="text-green-600">Thanks for your feedback! ✅</p>
      ) : (
        <>
          <div className="flex space-x-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Leave a comment (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </>
      )}
    </div>
  );
};

export default FormRatings;
import FormRatings from "../components/FormRatings";
<FormRatings formId={form._id} />
