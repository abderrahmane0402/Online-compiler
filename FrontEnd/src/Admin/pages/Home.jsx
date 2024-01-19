import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/Admin/admin');
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const handleDeleteClick = (email) => {
    setEmailToDelete(email);
    setDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/Admin/delete/${emailToDelete}`);
      if (response.status === 200) {
        getUsers(); // Refresh the user list after deletion
      }
      setDeleteConfirm(false);
    } catch (error) {
      console.error('An error occurred while deleting the user.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(false);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Admin/search?query=${searchQuery}`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('An error occurred while searching for users.');
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
   
<div className="flex flex-col items-center  min-h-screen pt-7 sm:justify-start sm:pt-0 bg-gray-50 ">
    <div style={{ marginTop: '100px' }}>
      {deleteConfirm && (
        <div className="delete-modal">
          <p>Are you sure you want to delete this user?</p>
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
          className="search-input wissalInput"
          placeholder="rechercher..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="btn btn-search search-button" onClick={handleSearch}>
            rechercher
        </button>
      </div>
    </div>
   


      <table className="styled-table">
        <thead>
          <tr className='bg-[#5c5cfe]'>
            <th style={{ textAlign: 'center' }}>Num</th>
            <th style={{ textAlign: 'center' }}>nom complet</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>mot de passe</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>
                    <Link to={`edit/${item.email.split(".")[0]}`}>
                      <button className="btn btn-edit">modifier</button>
                    </Link>
                    <button className="btn btn-delete" onClick={() => handleDeleteClick(item.email)}>
                      supprimer
                    </button>
                    <Link to={`view/${item.email.split(".")[0]}`}>
                      <button className="btn btn-view">File</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
    </div>
   
  );
}

export default Home;
