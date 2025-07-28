import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account permanently?')) return;

    try {
      await axios.delete('/api/profile', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      localStorage.removeItem('token');
      alert('Account deleted successfully');
      navigate('/register');
    } catch (err) {
      alert('Something went wrong');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-red-600">⚠️ Delete Your Account</h1>
      <p className="mb-4">This action is <strong>permanent</strong> and cannot be undone.</p>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete My Account
      </button>
    </div>
  );
};

export default DeleteAccount;
