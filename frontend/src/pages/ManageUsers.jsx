import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
    },
    {
      id: 2,
      name: "David Smith",
      email: "david@example.com",
      role: "Restaurant",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Customer",
    },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="manage-users-page">
      <Navbar />

      <div className="manage-users-container">
        <div className="manage-users-header">
          <h1>
            <i className="fa-solid fa-users"></i>
            Manage Users
          </h1>

          <p>View and manage all users.</p>
        </div>

        <div className="users-list">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <h2>{user.name}</h2>

              <p>{user.email}</p>

              <span>{user.role}</span>

              <button
                className="delete-user-btn"
                onClick={() => deleteUser(user.id)}
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ManageUsers;