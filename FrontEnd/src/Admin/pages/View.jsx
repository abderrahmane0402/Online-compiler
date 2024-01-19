import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';

function View() {
  const [files, setFiles] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  let { id } = useParams();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Admin/file", { user: id + ".com" });
      setFiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (fileId) => {
    setFileIdToDelete(fileId);
    setDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/Admin/deleteF/${fileIdToDelete}`);
      if (response.status === 200) {
        fetchFiles(); // Refresh the file list after deletion
      }
      setDeleteConfirm(false);
    } catch (error) {
      console.error('An error occurred while deleting the file.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(false);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Admin/searchF?query=${searchQuery}`);
      if (response.status === 200) {
        setFiles(response.data);
      }
    } catch (error) {
      console.error('An error occurred while searching for files.');
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="max-w-4xl w-full bg-light border border-[#5c5cfe] shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-secondary border-b border-[#5c5cfe]">
          <h2 className="text-xl font-semibold text-[#5c5cfe] text-center">vos fichiers</h2>
        </div>
        <div className="py-4 px-6">
          {deleteConfirm && (
            <div className="delete-modal">
              <p>Are you sure you want to delete this file?</p>
              <div className="delete-buttons">
                <button className="btn btn-confirm-delete" onClick={handleDeleteConfirm}>
                  Confirm
                </button>
                <button className="btn btn-cancel-delete" onClick={handleDeleteCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="search-container">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="rechercher..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button className="btn btn-search search-button" onClick={handleSearch}>
                rechercher
              </button>
            </div>
          </div>
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-[#5c5cfe] text-white">
                <th className="py-3 text-center">Email</th>
                <th className="py-3 text-center">nom de fichier</th>
                <th className="py-3 text-center ">Contenu</th>
                <th className="py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {files &&
                files.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border-b border-[#5c5cfe]">{item.email}</td>
                    <td className="py-2 border-b border-[#5c5cfe]">{item.filename}</td>
                    <td className="py-2 border-b max-w-xs overflow-hidden text- border-[#5c5cfe]">{item.content.substring(0, 40)}</td>
                    <td className="py-2 border-b border-[#5c5cfe]">
                      <Link to={`editF/${item.file_id}`}>
                        <button className="btn btn-edit">modifier</button>
                      </Link>
                      <button className="btn btn-delete" onClick={() => handleDeleteClick(item.file_id)}>
                        supprimer
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default View;
