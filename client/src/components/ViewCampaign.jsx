
import React, { useState, useEffect } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/Main/mainLogo.png';
import footer from '../assets/Main/footerLogo1.png';
import { FaFacebook, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import '../styles/useRegister.css';

const ViewCampaign = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  console.log("Extracted campaignId:", campaignId); // Debugging
  const userId = sessionStorage.getItem('userId');
    const [campaign, setCampaign] = useState(null);
const [modalMessage, setModalMessage] = useState('');
const [showModal, setShowModal] = useState(false);
const [errors, setErrors] = useState({});



  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/userViewCampaign/${campaignId}`);
        setCampaign(response.data);
      } catch (err) {
        console.error("Error fetching campaign details:", err.message);
      }
    };

    if (campaignId) fetchCampaign();
  }, [campaignId]);

  const [formData, setFormData] = useState({
    userId: userId,
    campaignId: campaignId,
    donorAccountName: '',
    donorAccountNumber: '',
    donorAccountifsc: '',
    donorAmount: '',
  });
  
  if (!campaign) {
    return <h2 className="text-center">Loading campaign details...</h2>;
  }
  
  const validateForm = () => {
    let errors = {};
    if (!formData.donorAccountName.trim()) errors.donorAccountName = "Account holder name is required";
    if (!formData.donorAccountNumber) errors.donorAccountNumber = "Account number is required";
    else if (formData.donorAccountNumber.length < 9) errors.donorAccountNumber = "Account number must be at least 9 digits";
    if (!formData.donorAccountifsc.trim()) errors.donorAccountifsc = "IFSC code is required";
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(formData.donorAccountifsc)) errors.donorAccountifsc = "Invalid IFSC code format";
    if (!formData.donorAmount) errors.donorAmount = "Donation amount is required";
    else if (formData.donorAmount <= 0) errors.donorAmount = "Amount must be greater than zero";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

const handlChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};



const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const response = await fetch("http://localhost:5000/api/users/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Server Response:", data);
    setModalMessage("Transaction Successful!");
    setShowModal(true);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" id="nav">
        <div className="container-fluid">
        <div> <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" height={85} /></a><span style={{color:'white',fontSize:'30px'}}> <b>Idea Bank</b>  <sub><small>Instant Money</small></sub></span></div>
          
<div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/userhome" id="navlink">
                  <i>Home</i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="#" id="navlink">
                  <i>View Campaign</i>
                </Link>
              </li>
            </ul>
          </div></div>
        </div>
      </nav>

      {/* Campaign Details */}
      <div id="campaignHead">
        <h1>
          <i>View Campaign</i>
        </h1>
      </div>
      <div className="container" id="register">
        <div className="card mb-3" id="cardReg">
          <div className="row g-0">
            <div className="col-md-5">
              <div className="card">
                <img src={`http://localhost:5000/${campaign.image}`} className="card-img-top" alt="Campaign" />
                <div className="card-body">
                  <h1 className="card-title">{campaign.title}</h1>
                  <p className="card-text">{campaign.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 className="card-title text-danger">Target: ₹{campaign.amount}</h5>
                    <h5 className="card-title text-success">Collected: ₹{campaign.collected}</h5>
                    <h5 className="card-title text-primary">Balance: ₹{campaign.amount - campaign.collected}</h5>
                  </div>
                  <p className="card-text">
                    <small className="text-danger">
                      End Date: <b>{campaign.date}</b>
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h6 className="text-center">
                  <i>Bank Details</i>
                </h6>
                <br />
                <form onSubmit={handleSubmit}>
                <label style={{ color: '#80CBC4' }}>Account Holder Name:</label>
                <input type="text" name='donorAccountName' value={formData.donorAccountName} onChange={handlChange} placeholder="Enter Account holder name" className="form-control" required />
                {errors.donorAccountName && <small className="text-danger">{errors.donorAccountName}</small>}

                <br />
                <label style={{ color: '#80CBC4' }}>Account Number:</label>
                <input type="number" name='donorAccountNumber' value={formData.donorAccountNumber} onChange={handlChange} placeholder="Enter Account number" className="form-control" required />
                {errors.donorAccountNumber && <small className="text-danger">{errors.donorAccountNumber}</small>}

                <br />
                <label style={{ color: '#80CBC4' }}>IFSC Code:</label>
                <input type="text" name='donorAccountifsc' value={formData.donorAccountifsc} onChange={handlChange} placeholder="Enter IFSC Code" className="form-control" required />
                {errors.donorAccountifsc && <small className="text-danger">{errors.donorAccountifsc}</small>}

                <br />
                <label style={{ color: '#80CBC4' }}>Amount to Donate:</label>
                <input type="number" name='donorAmount' value={formData.donorAmount} onChange={handlChange} placeholder="Enter Amount to Donate" className="form-control" required/>
                {errors.donorAmount && <small className="text-danger">{errors.donorAmount}</small>}

                <br />
                <button className="btn btn-lg" type='submit' style={{ color: 'white', backgroundColor: '#FFB433', width: '100%' }}>
                  Donate Now
                </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bootstrap Modal */}
<div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Transaction Status</h5>
        <button type="button" className="btn-close" onClick={() => { setShowModal(false); navigate('/addcampaign'); }}></button>
      </div>
      <div className="modal-body">
        <p>{modalMessage}</p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={() => { setShowModal(false);}}>Close</button>
        <button className="btn btn-primary" onClick={() => { setShowModal(false); navigate('/userhome'); }}>OK</button>
      </div>
    </div>
  </div>
</div>


      {/* Footer */}
      <div id="footer"className="container-fluid">
        <div className="row">
          <div className="col-lg-3 text-center">
            <img src={footer} alt="footer" height={150} style={{ marginTop: '10px' }} />
            <hr />
            <div id="icon">
              <FaFacebook className="social-icon" />
              <FaSquareXTwitter className="social-icon" />
              <FaInstagramSquare className="social-icon" />
              <FaLinkedin className="social-icon" />
            </div>
          </div>
          <div className="col-lg-2" id="flexfooter">
            <h3>Causes</h3>
            <div>Medical crowdfunding</div>
            <div>Cancer crowdfunding</div>
            <div>Education crowdfunding</div>
          </div>
          <div className="col-lg-2" id="flexfooter">
            <h3>How it Works?</h3>
            <div>Fundraising for NGOs</div>
            <div>Fundraising Tips</div>
          </div>
          <div className="col-lg-2" id="flexfooter">
            <h3>About Us</h3>
            <div>Team Idea Bank</div>
            <div>Success Stories</div>
          </div>
          <div className="col-lg-3" id="flexfooter">
            <h3>Support</h3>
            <div>FAQs & Help Center</div>
            <div>Trust & Safety</div>
          </div>
        </div>
        <hr />
        <div className="text-center pb-3">&copy; Idea Bank Crowdfunding 2025</div>
      </div>
    </div>
  );
};

export default ViewCampaign;
