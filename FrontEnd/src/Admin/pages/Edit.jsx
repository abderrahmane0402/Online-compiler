import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AddEdit.css";

function Edit() {
  const [email, setemail] = useState();
  const [username, setUsername] = useState();
  const [password, setpassword] = useState();
  let { id } = useParams();
  useEffect(() => {
    getInfo();
  }, []);
  async function getInfo() {
    const response = await axios.post("http://localhost:5000/Admin/read", {
      email: id + ".com",
    });
    console.log(response.data);
    response.data.rows.map((u) => {
      setemail(u.email);
      setUsername(u.username);
      setpassword(u.password);
    });
  }
  const handleUpdate = () => {
    axios
      .put("http://localhost:5000/Admin/update", { username, password, email })
      .then((response) => {
        // Handle successful update
        console.log("Profile updated successfully");

        if (
          confirm(
            "Profile updated successfully. Do you want to redirect to Home?"
          )
        ) {
          window.location.href = "/Admin"; // Redirect to the specified link
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating profile", error);
        alert("Error updating profile"); // Display error alert
      });
  };
  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-[#5c5cfe]">modifier User</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleUpdate();
            }}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                nom complet
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full wissalInput mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="block w-full mt-1 wissalInput border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                mot de passe
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="block w-full mt-1 wissalInput border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <input type="submit" value="modifier" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
