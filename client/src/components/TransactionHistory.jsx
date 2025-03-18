import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Main/mainLogo.png'
import footer from '../assets/Main/footerLogo1.png'
import user from "../assets/reg_login/user.jpg";
import { FaFacebook,FaInstagramSquare,FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import axios from "axios";


const TransactionHistory = () => {
  const userId = sessionStorage.getItem('userId')
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!userId) return; // Ensure userId exists before making the API call
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/history/${userId}`);
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching Transactions:", err.message);
      }
    };
  
    fetchData();
  }, [userId]); // Added userId as a dependency
  

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
              <li class="nav-item">
                <Link class="nav-link active" to="/history" id='navlink' > <i>Transaction History</i></Link>
              </li>

    </ul>

  </div></div>
</div>
</nav>

{/* main content */}

{/* transaction History  */}
<div id='campaignHead' ><h1><i>My Transaction History</i></h1></div>
<div class="container" style={{minHeight:'410px'}}>
    
<table class="table table-warning table-hover table-bordered ">
  <thead>
    <tr class="table-active ">
      <th scope="col" class="text-center " ><i>Transaction Id</i></th>
      <th scope="col" class="text-center "><i>Campaign Name</i></th>
      <th scope="col" class="text-center "><i>Date</i></th>
      <th scope="col" class="text-center "><i>Amount</i></th>
    </tr>
  </thead>
  <tbody>
  {
  transactions.map((transaction)=>(

<tr key={transaction._id}>
<td scope="row" class="text-center "><i>{transaction._id}</i></td>
<td className="text-center"><i>{transaction.campaignId?.title || "N/A"}</i></td>
      <td class="text-center"><i>{new Date(transaction.createdAt).toLocaleDateString()}</i></td>      
      <td class="text-center "><i>₹{transaction.donorAmount}</i></td>
    </tr>
  ))
}

  </tbody>
</table>
</div>

{/* footer  */}
 <div id='footer'>
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

export default TransactionHistory
