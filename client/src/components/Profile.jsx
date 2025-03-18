import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Main/mainLogo.png";
import footer from "../assets/Main/footerLogo1.png";
import defaultUserImage from "../assets/reg_login/user.jpg";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Profile = () => {
  const userId = sessionStorage.getItem("userId");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/userProfile/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user details:", err.message);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  if (!user) {
    return <h2 className="text-center">Loading user profile...</h2>;
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" id="nav">
        <div className="container-fluid">
   <div> <a class="navbar-brand" href="#"><img src={logo} alt="logo" height={85} /></a><span style={{color:'white',fontSize:'30px'}}> <b><i>Idea Bank</i></b>  <sub><small><i>Instant Money</i></small></sub></span></div>


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
                  <Link className="nav-link active" to="/profile" id="navlink">
                    <i>My Profile</i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div id="register1" className="container">
        <div className="card mb-3" id="cardReg">
          <div className="card-header text-center">
            <h5 id="head"><i>PROFILE</i></h5>
          </div>

          <div className="row g-0">
            <div className="col-md-5 pt-5">
              <div style={{ display: "grid", placeItems: "center" }}>
                <div style={{ height: "300px" }}>
                  <img
                    src={user.profileImage ? `http://localhost:5000/${user.profileImage}` : defaultUserImage}
                    alt="User"
                    id="user"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-7" style={{padding:'10px'}}>
              <div className="card-body p-5" style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <label htmlFor="name" style={{ color: "#80CBC4" }}>
                  <i>Name: <span className="text-dark">{user.name}</span></i>
                  </label>
                </div>
                <br />
                <div>
                  <label htmlFor="contact" style={{ color: "#80CBC4" }}>
                  <i> Contact: <span className="text-dark">{user.contact}</span></i>
                  </label>
                </div>
                <br />
                <div>
                  <label htmlFor="email" style={{ color: "#80CBC4" }}>
                  <i>Email: <span className="text-dark">{user.email}</span></i>
                  </label>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
  );
};

export default Profile;
