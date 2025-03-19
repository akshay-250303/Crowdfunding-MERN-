import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logo from '../assets/Main/mainLogo.png'
import footer from '../assets/Main/footerLogo1.png'
import { FaFacebook,FaInstagramSquare,FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import '../styles/useRegister.css'
import axios from 'axios';


const MyCampaign = () => {
  const userId = sessionStorage.getItem('userId')
  const [campaigns, setCampaign] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/userViewOwnCampaign/${userId}`);
        setCampaign(response.data);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchData();
  }, []);





  return (
    <div>
      {/* navbar */}
<nav class="navbar navbar-expand-lg navbar-dark" id='nav'>
  <div class="container-fluid" >
   <div> <a class="navbar-brand" href="#"><img src={logo} alt="logo" height={85} /></a><span style={{color:'white',fontSize:'30px'}}> <b><i>Idea Bank</i></b>  <sub><small><i>Instant Money</i></small></sub></span></div>

   <div> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link " aria-current="page" to="/userhome" id='navlink'><i>Home</i> </Link>
              </li>
              <li class="nav-item ">
                <Link class="nav-link active" to="/myCampaign" id='navlink' > <i>My Campaigns</i></Link>
              </li>
              <li class="nav-item ">
                <Link class="nav-link" to="/addcampaign" id='navlink'> <i>Add Campaign</i></Link>
              </li>
      </ul>

    </div></div>
  </div>
</nav>

{/* main content */}

{/* campaigns  */}
<div id='campaignHead' ><h1><i>My Campaigns</i></h1></div>
<div class="container" id='mycampaign'>
{
  campaigns.map((campaign)=>(
    <div key={campaign._id}>
      <div class="card mb-3" id='cardReg'>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={`http://localhost:5000/${campaign.image}`} className="img-fluid rounded-start h-100" alt="campaign Image" />
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h1 className="card-title"> <i>{campaign.title}</i> </h1>
                  <p className="card-text"><i>Description: {campaign.description}</i></p>
                  <h5 className="card-title text-danger"><i>Date: {campaign.date}</i></h5>
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
</div>                  <h5 className={`card-title ${campaign.status === "approved" ? "text-success" : campaign.status === "rejected" ? "text-danger" : "text-warning"}`}><i>Admin Status: {campaign.status}</i></h5>
                  <h5 className={`card-title ${campaign.amount - campaign.collected <= 0 ? "text-success" : "text-warning"}`}><i>Campaign Status: {campaign.amount - campaign.collected <= 0 ? "Completed" : "On Process"}</i></h5>

      </div>
    </div>
  </div>
</div>
    </div>
  ))
}
</div><hr />

{/* footer  */}
<div id='footer' className="container-fluid">
  <div class='row'>
    <div class='col-lg-3'> <center>
    <img src={footer} alt="" height={150} style={{marginTop:'10px'}}/>
    <hr />
    <div id='icon'>
      <div><FaFacebook style={{color:'black',width:'30px',height:'30px'}}/></div><div><FaSquareXTwitter style={{color:'black',width:'30px',height:'30px'}} /></div><div><FaInstagramSquare style={{color:'black',width:'30px',height:'30px'}} /></div><div><FaLinkedin style={{color:'black',width:'30px',height:'30px'}} /></div>
    </div>
    </center>
      
    </div>
    <div class='col-lg-2' id='flexfooter'>
      <h3><i>Causes</i></h3>
        <div><i>Medical crowdfunding</i></div>
        <div><i>Cancer crowdfunding</i></div>
        <div><i>Transplant crowdfunding</i></div>
        <div><i>Education crowdfunding</i></div>
        <div><i>Sports crowdfunding</i></div>
      </div>
    <div class='col-lg-2' id='flexfooter'>
            <h3><i>How it works?</i></h3>
      
        <div><i>Fundraising for NGOs</i></div>
        <div><i>Sponser a Child</i></div>
        <div><i>Fundraising Tips</i></div>
        <div><i>What is crowdfunding?</i></div>
        <div><i>Corporates</i></div>
      </div>
    <div class='col-lg-2' id='flexfooter'>
           <h3><i>About Us</i></h3>
        <div><i>Team Idea Bank</i></div>
        <div><i>In The News</i></div>
        <div><i>Web Stories</i></div>
        <div><i>Careers</i></div>
        <div><i>Success Stories</i></div>
      </div>
    <div class='col-lg-3' id='flexfooter'>
            <h3><i>Support</i></h3>
        <div><i>Medical finance</i></div>
        <div><i>FAQs & Help Center</i></div>
        <div><i>Fundraiser Video</i></div>
        <div><i>Trust & Safety</i></div>
        <div><i>Plans & Pricing</i></div>
      </div>
  </div>
  <hr />
  <div class='text-center pb-3'><i>&copy;ideabankcrowdfunding2025</i></div>
</div>
    </div>
  )
}

export default MyCampaign
