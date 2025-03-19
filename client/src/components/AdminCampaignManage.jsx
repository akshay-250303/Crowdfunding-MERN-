
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/useRegister.css';

const AdminCampaignManage = () => {
  const [campaigns, setCampaign] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/adminManageCampaign');
        setCampaign(response.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err.message);
      }
    };
    fetchData();
  }, []);

  // Function to show confirmation modal before deleting
  const confirmDelete = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCampaignId) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/deleteCampaign/${selectedCampaignId}`);

      if (response.status === 200) {
        setModalMessage('Campaign deleted successfully');
        setShowModal(true);
        setCampaign(prevCampaigns => prevCampaigns.filter((campaign) => campaign._id !== selectedCampaignId));
      } else {
        setModalMessage('Failed to delete campaign');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
      setModalMessage('An error occurred while deleting the campaign.');
      setShowModal(true);
    }

    setShowConfirmModal(false);
    setSelectedCampaignId(null);
  };

  // Function to update campaign status
  const updateCampaignStatus = async (campaignId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/updateCampaignStatus/${campaignId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setModalMessage(`Campaign status updated to ${newStatus}`);
        setShowModal(true);
        setCampaign((prevCampaigns) =>
          prevCampaigns.map((campaign) =>
            campaign._id === campaignId ? { ...campaign, status: newStatus } : campaign
          )
        );
      } else {
        setModalMessage("Failed to update campaign status");
        setShowModal(true);
      }
    } catch (err) {
      console.error("Error updating campaign status:", err.message);
      setModalMessage("An error occurred while updating campaign status");
      setShowModal(true);
    }
  };

  return (
    <div>
      <div id='campaignHead'>
        <h1><i>Manage Campaigns</i></h1>
      </div>
      <div className="container" id='mycampaign5'>
  {campaigns.map((campaign) => (
    <div key={campaign._id} className="campaign-card">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={`http://localhost:5000/${campaign.image}`} className="campaign-image" alt="Campaign" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{campaign.title}</h2>
              <p className="card-text">{campaign.description}</p>
              
              <div className="campaign-details">
  <h5 className="text-danger">Target: ₹{campaign.amount}</h5>
  <h5 className="text-success">Collected: ₹{campaign.collected}</h5>

  {campaign.collected >= campaign.amount ? (
    <h5 className="text-info"><i>Completed</i></h5>
  ) : (
    <h5 className="text-primary">Balance: ₹{campaign.amount - campaign.collected}</h5>
  )}
</div>


              <p className={`status-badge ${campaign.status}`}>Status: {campaign.status}</p>

              <div className="button-group">
                <button className="approve-btn" onClick={() => updateCampaignStatus(campaign._id, "approved")} disabled={campaign.status === "approved"}>Approve</button>
                <button className="reject-btn" onClick={() => updateCampaignStatus(campaign._id, "rejected")} disabled={campaign.status === "rejected"}>Reject</button>
                <button className="delete-btn" onClick={() => confirmDelete(campaign._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Confirmation Modal for Delete */}
      <div className={`modal fade ${showConfirmModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this campaign?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Campaign Status</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCampaignManage;
