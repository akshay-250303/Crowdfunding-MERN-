import React, { useState, useEffect } from "react";
import "../styles/useRegister.css";
import logo from "../assets/reg_login/mainLogo.png";
import { Link } from "react-router-dom";
import footer from "../assets/reg_login/footerLogo1.png";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import user from "../assets/reg_login/user.jpg";
import axios from 'axios';

const UserRegister = () => {
  const [profileImage, setProfileImage] = useState(user);






  const [formData,setFormData] = useState({
    profileImage:'',
    username:'',
    contact:'',
    email:'',
    password:'',
    document:'',
    status:'processing',
    userType:'user',


  });
  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];

        // Update profile image preview
        setProfileImage(URL.createObjectURL(file));

        // Update formData correctly
        setFormData((prevFormData) => ({
            ...prevFormData,
            profileImage: file
        }));
    }
};


const handleDocumentChange = (event) => {
    if (event.target.files.length > 0) {
        setFormData({ ...formData, document: event.target.files[0] });
    }
};

const handlChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};



const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("profileImage", formData.profileImage);
  formDataToSend.append("name", formData.username);
  formDataToSend.append("contact", formData.contact);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("password", formData.password);
  formDataToSend.append("document", formData.document);
  formDataToSend.append("status", "processing");
  formDataToSend.append("userType", "user");

  try {
      const response = await axios.post("http://localhost:5000/api/users/register", formDataToSend, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      if (response.status === 200) {
          alert("Wait For Admin's Approval");
      }
  } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
  }
};

  


  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" id="nav">
        <div className="container-fluid">
   <div> <a class="navbar-brand" href="#"><img src={logo} alt="logo" height={85} /></a><span style={{color:'white',fontSize:'30px'}}> <b><i>Idea Bank</i></b>  <sub><small><i>Instant Money</i></small></sub></span></div>


          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/" id="navlink">
                    <i>Home</i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" id="navlink">
                    <i>Login</i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/register" id="navlink">
                    <i>Register</i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div id="register" className="container">
        <div className="card mb-3" id="cardReg">
          <form onSubmit={handleSubmit}>
            <div className="card-header text-center">
              <h5 id="head"><i>REGISTER</i></h5>
            </div>

            <div className="row g-0">
              <div className="col-md-5 pt-5 ">
                <div style={{ display: "grid", placeItems: "center"  }}>
                 <div style={{height:'300px'}}><img src={profileImage} alt="" id="user" /></div> 
                </div>
               <div> <label htmlFor="profilePic" style={{ color: "#80CBC4" }}>
               <i> Profile Picture:</i>
                </label></div>
               <div><input
  type="file"
  id="profilePic"
  name="profileImage"
  className="form-control"
  onChange={handleImageChange}
  accept="image/*"
/>
</div>
                <br />
              </div>

              <div className="col-md-7">
                <div className="card-body">
                  <label htmlFor="name" style={{ color: "#80CBC4" }}>
                  <i>Name: </i><span className="text-danger">*</span>
                  </label>
                  <input type="text" placeholder="Enter Your Name" name="username" className="form-control" value={formData.username} onChange={handlChange} required />
                  <br />

                  <label htmlFor="contact" style={{ color: "#80CBC4" }}>
                  <i>Contact:</i> <span className="text-danger">*</span>
                  </label>
                  <input type="number" placeholder="Enter Your Contact Number" name="contact" className="form-control"  value={formData.contact} onChange={handlChange} required />
                  <br />

                  <label htmlFor="email" style={{ color: "#80CBC4" }}>
                  <i>  Email: </i><span className="text-danger">*</span>
                  </label>
                  <input type="email" placeholder="Enter Your Email" className="form-control" name="email"  value={formData.email} onChange={handlChange} required />
                  <br />

                  <label htmlFor="password" style={{ color: "#80CBC4" }}>
                  <i> Password: </i><span className="text-danger">*</span>
                  </label>
                  <input type="password" placeholder="Enter Your Password" className="form-control" name="password" value={formData.password} onChange={handlChange} required />
                  <br />

                  <label htmlFor="legalDoc" style={{ color: "#80CBC4" }}>
                  <i>Upload any legal document:</i> <span className="text-danger">*</span>
                  </label>
                  <input type="file" id="legalDoc" className="form-control" name="document" onChange={handleDocumentChange} required />
                  <br />

                  <div>
                    <input type="checkbox" id="terms" className="form-check-input" required /> &nbsp;
                    <label htmlFor="terms">
                    <i> I agree to the{" "}
                      <a href="#" target="_blank" style={{ color: "#80CBC4", textDecoration: "none" }}>
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" style={{ color: "#80CBC4", textDecoration: "none" }} target="_blank">
                        Privacy Policy
                      </a>
                      .</i>
                    </label>
                  </div>
                  <br />

                  <button type="submit" className="btn btn-lg" style={{ color: "white", backgroundColor: "#FFB433", width: "100%" }}>
                  <i>Register</i>
                  </button>
                  <br />
                </div>
              </div>
            </div>
            <div class="card-footer text-end">
            <div style={{ display: "flex", color: "black", justifyContent: "flex-end" }}>
            <i> <p>Already have an account? </p></i> &nbsp;
                    <Link id="password" to="/login">
                    <i>Sign In</i>
                    </Link>
                  </div>
            </div>
          </form>
        </div>
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
  );
};

export default UserRegister;