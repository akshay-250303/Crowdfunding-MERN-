import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/useRegister.css';

const AdminUserManage = () => {
  const [users, setUsers] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/adminManageUser');
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchData();
  }, []);

  // Function to update user status
  const updateUserStatus = async (userId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/updateUserStatus/${userId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setModalMessage(`User status updated to ${newStatus}`);
        setShowModal(true);

        // Update user state locally to reflect the change without reloading
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
      } else {
        setModalMessage("Failed to update user status");
        setShowModal(true);
      }
    } catch (err) {
      console.error("Error updating user status:", err.message);
      setModalMessage("An error occurred while updating user status");
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary"><i>Manage Users</i></h1>
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm rounded-lg border-0">
              <div className="card-header bg-primary text-white text-center">
                <h4 className="mb-0">{user.name}</h4>
              </div>
              <img
                src={`http://localhost:5000/${user.document}`}
                className="card-img-top"
                alt="Legal document"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Contact:</strong> {user.contact}</p>
                <h5 className={`badge ${user.status === "approved" ? "bg-success" : user.status === "rejected" ? "bg-danger" : "bg-warning"}`}>
                  {user.status}
                </h5>
                <div className="mt-3 d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => updateUserStatus(user._id, "approved")}
                    disabled={user.status === "approved"}
                  >
                    <i>Approve</i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => updateUserStatus(user._id, "rejected")}
                    disabled={user.status === "rejected"}
                  >
                    <i>Reject</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">User Status Update</h5>
              <button type="button" className="btn-close" onClick={() => { setShowModal(false); }}></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => { setShowModal(false); }}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManage;
