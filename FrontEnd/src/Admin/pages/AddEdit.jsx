import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const initialState = {
  username: '',
  email: '',
  password: '',
};

function AddEdit() {
  const [state, setState] = useState(initialState);
  const { username, email, password } = state;
 

  async function addContact(data) {
    try {
      const response = await axios.post('http://localhost:5000/Admin/create', data);
      if (response.status === 200) {
        toast.success(response.data);
      }
    } catch (error) {
      toast.error('An error occurred while creating the user.');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error('Please provide a value for each input field.');
    } else {
      addContact(state);
      window.location.href = '/Admin'; // Rediriger vers la page "home"
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
      <div>
        <a href="/">
          <h3 className="text-4xl font-bold text-[#5c5cfe]">Ajouter User</h3>
        </a>
      </div>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 undefined">
              nom complet
            </label>
            <div className="flex flex-col items-start">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter name..."
                onChange={handleInputChange}
                value={username}
                className="block w-full mt-1 wissalInput border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined">
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email..."
                onChange={handleInputChange}
                value={email}
                className="block w-full mt-1 wissalInput border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 undefined">
              mot de passe
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password..."
                onChange={handleInputChange}
                value={password}
                className="block w-full mt-1 wissalInput border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <input type="submit" value="ajouter" />
        </form>
      </div>
    </div>
  );
}

export default AddEdit;
