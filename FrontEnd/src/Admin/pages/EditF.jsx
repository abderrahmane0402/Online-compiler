import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AddEdit.css";

function EditF() {
  const [email, setemail] = useState();
  const [filename, setfilename] = useState();
  const [content, setcontent] = useState();

  let { file_id } = useParams();
  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    const response = await axios.post("http://localhost:5000/Admin/readF", {
      file_id,
    });
    console.log(response.data);
    response.data.rows.map((u) => {
      setemail(u.email);
      setfilename(u.filename);
      setcontent(u.content);
    });
  }

  const handleUpdate = () => {
    axios
      .put("http://localhost:5000/Admin/updateF", {
        email,
        filename,
        content,
        file_id,
      })
      .then((response) => {
        // Handle successful update
        console.log("Profile updated successfully");

        if (
          confirm(
            "Profile updated successfully. Do you want to redirect to home?"
          )
        ) {
          //   window.location.href = "/admin/view"; // Redirect to the specified link
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
            <h3 className="text-4xl font-bold text-[#5c5cfe]">modifier le File</h3>
          </a>
        </div>
        <div className="flex justify-end">
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    style={{ width: '250px' }}
                    className="block w-full mt-1 wissalInput border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="filename"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  nom de fichier
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    id="filename"
                    name="filename"
                    value={filename}
                    onChange={(e) => setfilename(e.target.value)}
                    style={{ width: '250px' }}
                    className="block mt-1 border-gray-300 wissalInput rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="mt-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  contenu
                </label>
                <div className="flex flex-col items-start">
                  <textarea
                    rows="15"
                    cols="200"
                    type="text"
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                    className="block w-full mt-1 border border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <input
                  type="submit"
                  value="modifier"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditF;
