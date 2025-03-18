import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/useRegister.css';

const AdminUsermanage = () => {
  const [users, setUsers] = useState([]);

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
        alert(`User status updated to ${newStatus}`);
        
        // Update user state locally to reflect the change without reloading
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
      } else {
        alert("Failed to update user status");
      }
    } catch (err) {
      console.error("Error updating user status:", err.message);
      alert("An error occurred while updating user status");
    }
  };

  return (
    <div>
      <div id='campaignHead'>
        <h1><i>Manage Users</i></h1>
      </div>
      <div className="container" id='campaing'>
        {users.map((user) => (
          <div key={user._id}>
            <div className="card mb-3" style={{ border: '1px solid #80CBC4' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={`http://localhost:5000/${user.document}`} className="img-fluid rounded-start h-100" alt="Legal document" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h1 className="card-title"><i>{user.name}</i></h1>
                    <h5 className="card-title"><i>Email: {user.email}</i></h5>
                    <h5 className="card-title"><i>Contact: {user.contact}</i></h5>
                    <h5 className={`card-title ${user.status === "approved" ? "text-success" : user.status === "rejected" ? "text-danger" : "text-warning"}`}>
  Status: {user.status}
</h5>
                    <div style={{ display: 'flex', justifyContent: "center", gap: "10px" }}>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsermanage;
