import React, { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [email, setemail] = useState();
  const [username, setUsername] = useState();
  const [password, setpassword] = useState();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: sessionStorage.getItem("email") }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.rows.map((u) => {
          setemail(u.email);
          setUsername(u.username);
          setpassword(u.password);



        });
      });
  }, []);
  const updateProfile = () => {
    const updatedUser = { email, username, password };
    axios.put("http://localhost:5000/profile/update", updatedUser)
     .then((response) => {
      // Handle successful update
      console.log("Profile updated successfully");
      
      if (confirm("Profile updated successfully. Do you want to redirect to IDE?")) {
        window.location.href = "http://localhost:5173/ide"; // Redirect to the specified link
      }
     })    
      .catch((error) => {
        // Handle error
        console.error("Error updating profile", error);
        alert("Error updating profile"); // Display error alert
      });
  };
  
  return (
    <div className=" flex justify-center items-center h-screen bg-[#501F3A]">
      <div className="max-w-xl w-full  mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md bg-white">
        <img
          src="https://us.123rf.com/450wm/alekseyvanin/alekseyvanin1704/alekseyvanin170403663/76699411-vecteur-d-ic%C3%B4ne-utilisateur-illustration-de-logo-solide-de-profil-pictogramme-isol%C3%A9-sur-blanc.jpg"
          alt="Profile"
          style={{ width: "250px", height: "250px" }}
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold mb-4 flex flex-col justify-center items-center">
          Profil de l'utilisateur
        </h1>
        <br />
        <div className="flex flex-col mb-2">
          <label className="font-bold">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            className="border border-[#501F3A] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e)=> setemail(e.target.value)}
            className="border border-[#501F3A] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold">Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
            className="border border-[#501F3A] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-[#501F3A] text-black border border-[#501F3A] rounded px-4 py-2 mt-4 hover:bg-white hover:text-[#501F3A]"
            onClick={updateProfile}
          >
            Update Profile
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default ProfilePage;
