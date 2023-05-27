import { MoreVertOutlined, DeleteOutlined, EditOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";
import c from "../img/c.svg";
import React, { useEffect, useState } from "react";
import axios from "axios";



const NavField = () => {
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [updateFilename, setUpdateFilename] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const user =  sessionStorage.getItem("email")
      console.log(user);
      const response = await axios.post("http://localhost:5000/files" , {user});
      console.log(response.data)
      setFiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/files/${fileId}`);
      fetchFiles(); // Fetch updated files after deletion
      showAlertMessage("File deleted successfully!", false);
    } catch (error) {
      console.error(error);
      showAlertMessage("An error occurred while deleting the file.", true);
    }
  };

  const handleUpdate = async (fileId, newFilename) => {
    try {
      await axios.put(`http://localhost:5000/files/${fileId}`, { filename: newFilename });
      fetchFiles(); // Fetch updated files after update
      showAlertMessage("File updated successfully!", false);
    } catch (error) {
      console.error(error);
      showAlertMessage("An error occurred while updating the file.", true);
    }
  };

  const handleCreate = async () => {
    const newFilename = prompt("Enter new filename:");
    if (newFilename) {
      const user =  sessionStorage.getItem("email")
      try {
        await axios.post("http://localhost:5000/files/create", { filename: newFilename , user });
        fetchFiles(); // Fetch updated files after creation
        showAlertMessage("File created successfully!", false);
      } catch (error) {
        console.error(error);
        showAlertMessage("An error occurred while creating the file.", true);
      }
    }
  };

  const showAlertMessage = (message, isError) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="w-11/12 h-3/5 flex flex-col gap-3 items-center">
      <div className="flex justify-between items-center h-10 w-full text-slate-500 px-4">
        <span className="select-none">EXPLORER</span>
        <div className="group hover:bg-[#19454e] px-1 rounded-md transition-colors" onClick={handleCreate}>
          <AddCircleOutlineOutlined className="group-hover:text-white transition-colors" />
        </div>
      </div>

      {files.map((file) => (
        <div
          key={file.file_id}
          className="flex gap-4 w-11/12 h-10 bg-[#7e3d61a3] justify-between items-center text-white px-2 rounded-2xl text-xl hover:bg-[#a14f7ca5] transition-colors select-none"
        >
          <div className="flex gap-4">
            <img src={c} alt="c.icon" height={25} width={25} />
            {file.filename}
          </div>
          <div className="group hover:bg-[#19454e] py-1 rounded-md transition-colors">
            <MoreVertOutlined className="group-hover:text-secondary transition-colors text-slate-500 float-right" />
            <div className="absolute hidden group-hover:flex flex-col gap-2 bg-light py-2 px-4 rounded shadow">
              <button
                className="flex items-center"
                onClick={() => {
                  const newFilename = prompt("renommage filename:", file.filename);
                  if (newFilename) handleUpdate(file.file_id, newFilename);
                }}
              >
                <EditOutlined className="mr-2" />
                
              </button>
              <button className="flex items-center"  onClick={() => {
                if (window.confirm('Êtes-vous sûr de vouloir supprimer ce file ?')) {
                  handleDelete(file.file_id);
                }
              }}>
                <DeleteOutlined className="mr-2" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {showAlert && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-4 bg-white shadow-md rounded-md ${alertMessage.includes("error") ? "text-red-500" : "text-green-500"} text-xl w-96 h-16`}>
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default NavField;
