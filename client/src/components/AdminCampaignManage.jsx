import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/useRegister.css';


const AdminCampaignManage = () => {
  const [campaigns, setCampaign] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/adminManageCampaign');
        setCampaign(response.data);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/admin/deleteCampaign/${campaignId}`);
        
        if (response.status === 200) {
          alert('Campaign deleted successfully');
          
          // Update the state correctly using previous state
          setCampaign(prevCampaigns => prevCampaigns.filter((campaign) => campaign._id !== campaignId));
        } else {
          alert('Failed to delete campaign');
        }
      } catch (error) {
        console.error('Error deleting campaign:', error);
        alert('An error occurred while deleting the campaign.');
      }
    }
  };
  

  // Function to update user status
  const updateCampaignStatus = async (campaignId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/updateCampaignStatus/${campaignId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        alert(`Campaign status updated to ${newStatus}`);
        
        // Update user state locally to reflect the change without reloading
        setCampaign((prevCampaigns) =>
          prevCampaigns.map((campaign) =>
            campaign._id === campaignId ? { ...campaign, status: newStatus } : campaign
          )
        );
      } else {
        alert("Failed to update campaign status");
      }
    } catch (err) {
      console.error("Error updating campaign status:", err.message);
      alert("An error occurred while updating campaign status");
    }
  };


  return (
    <div>
    <div id='campaignHead'>
      <h1><i>Manage Campaigns</i></h1>
    </div>
    <div className="container" id='mycampaign5'>
      {campaigns.map((campaign) => (
        <div key={campaign._id}>
          <div className="card mb-3" style={{ border: '1px solid #80CBC4' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`http://localhost:5000/${campaign.image}`} className="img-fluid rounded-start h-50" alt="document" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h1 className="card-title"><i>{campaign.title}</i></h1>
                  <p className="card-text"><i>Description: {campaign.description}</i></p>
                  <h5 className="card-title text-danger"><i>Target: {campaign.date}</i></h5>
                  <p className="card-text"><i>Account Holder Name: {campaign.accountName}</i></p>
                  <p className="card-text"><i>Account Number: {campaign.accountNumber}</i></p>
                  <p className="card-text"><i>IFSC Code: {campaign.ifsc}</i></p>
<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <h5 className="card-title text-danger">
    <i>Target: ₹{campaign.amount}</i>
  </h5>
  <h5 className="card-title text-success">
    <i>Collected: ₹{campaign.collected}</i>
  </h5>
  {campaign.collected < campaign.amount && (
    <h5 className="card-title text-primary">
      <i>Balance: ₹{campaign.amount - campaign.collected}</i>
    </h5>
  )}
</div>
                  <h5 className={`card-title ${campaign.status === "approved" ? "text-success" : campaign.status === "rejected" ? "text-danger" : "text-warning"}`}><i>Status: {campaign.status}</i></h5>
                  <div style={{ display: 'flex', justifyContent: "space-between", gap: "10px" }}>
                    <button 
                      className="btn btn-outline-success" 
                      onClick={() => updateCampaignStatus(campaign._id, "approved")}
                      disabled={campaign.status === "approved"}
                    >
                     <i> Approve</i>
                    </button>
                    <button 
                      className="btn btn-outline-danger" 
                      onClick={() => updateCampaignStatus(campaign._id, "rejected")}
                      disabled={campaign.status === "rejected"}
                    >
                     <i> Reject</i>
                    </button>
                  </div><br />
                  <div style={{display:'flex',justifyContent:'center'}}><div><button onClick={()=>{handleDelete(campaign._id)}} className='btn btn-outline-danger'>Delete</button></div></div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default AdminCampaignManage
