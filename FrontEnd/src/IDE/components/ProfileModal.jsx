import React, { useState } from "react";
import axios from "axios";

const ProfileModal = ({ user, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the user profile
    axios
      .put("http://localhost:5000/profile", updatedUser)
      .then((response) => {
        // Handle the response as needed
        console.log(response.data);
        onClose(); // Close the modal
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="max-w-xl w-full mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label className="font-bold">Username:</label>
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleInputChange}
              className="border border-[#501F3A] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-bold">Email:</label>
            <input
              type="text"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              className="border border-[#501F3A] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-bold">Password:</label>
            <input
              type="password"
              name="password"
              value={updatedUser.password}
              onChange={handleInputChange}
              className="border border-[#501F3A] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#501F3A] text-white rounded px-4 py-2 mt-4 hover:bg-white hover:text-[#501F3A]"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="ml-2 bg-[#501F3A] text-white rounded px-4 py-2 mt-4 hover:bg-white hover:text-[#501F3A]"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
