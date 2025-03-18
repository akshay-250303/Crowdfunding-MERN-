import React,{useState,useEffect,useRef} from 'react'
import '../styles/Login.css'
import logo from '../assets/reg_login/mainLogo.png'
import { Link,useNavigate } from 'react-router-dom';
import footer from '../assets/reg_login/footerLogo1.png'
import { FaFacebook,FaInstagramSquare,FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import axios from 'axios'


function Login() {
const [formData,setFormData] = useState({
  email:'',
  password:''
});


      const Navigate = useNavigate();

      const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }
    


      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login/login", formData, {
                headers: { "Content-Type": "application/json" },
            });
    
            const data = response.data; // Axios automatically parses JSON response
            sessionStorage.setItem("userId", data.userId);
    
            switch (data.userStatus) {
                case "processing":
                    alert("Waiting for Admin's Approval");
                    break;
                case "rejected":
                    alert("Admin Rejected Your Account");
                    break;
                case "approved":
                    Navigate(data.userType === "user" ? "/userhome" : "/admin");
                    break;
                default:
                    alert("Unexpected user status");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "An error occurred");
        }
    };
      

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
          <Link class="nav-link " aria-current="page" to='/' id='navlink'><i>Home</i> </Link>
        </li>

        <li class="nav-item">
          <Link class="nav-link active" to='/login' id='navlink'> <i>Login</i></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to='/register' id='navlink'> <i>Register</i></Link>
        </li>
      </ul>

    </div></div>
  </div>
</nav>
{/* main content  */}
<div id='main'>
    <div id='login'>
<div id='loginHead'><div><h3><i>LOGIN</i></h3></div></div>
            <form onSubmit={handleSubmit}>
              <label id='head'><i>Email:</i></label><br />  <input type="email" placeholder='Enter Your Email' name='email' class='form-control' value={formData.email} onChange={handleChange} required/><br />
              <label  id='head'><i>Password:</i></label><br />  <input type="password" placeholder='Enter Your Password' name='password' class='form-control' value={formData.password} onChange={handleChange} required/><br />
              <div style={{display:'flex',justifyContent:'flex-end'}}><div><Link id='password'><i>Forgot Password</i></Link></div></div><br />
            <button class='btn btn-lg' id='button' type='submit'><i>Login</i></button><br /><br />
           <div style={{display:'flex',color:'white'}}> <p><i>Don't have an account?</i> </p> &nbsp;<Link id='password' to="/register"><i> Sign Up</i></Link></div>
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
  )
}

export default Login
