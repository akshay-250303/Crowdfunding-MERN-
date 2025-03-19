import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "../styles/Main.css"
import nav1 from '../assets/Main/nav1.jpg'
import nav2 from '../assets/Main/nav2.png'
import nav3 from '../assets/Main/nav3.jpg'
import logo from '../assets/Main/mainLogo.png'
import aboutus from '../assets/Main/about.jpg'
import footer from '../assets/Main/footerLogo1.png'
import defaultUserImage from "../assets/reg_login/user.jpg";
import Marquee from "react-fast-marquee";
import { FaDonate,FaFacebook,FaInstagramSquare,FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import axios from 'axios';


const UserHome = () => {
  const userId = sessionStorage.getItem("userId");
  console.log(userId)
  const [user, setUser] = useState(null);
  const [campaigns, setCampaign] = useState([]);
    const [donors, setDonor] = useState([]);
  

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/userViewCampaignToDonate`);
        setCampaign(response.data);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/donors`);
        setDonor(response.data);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchData();
  }, []);

  const Navigate = useNavigate();
  const handleClick = (id) =>{
    Navigate(`/viewCampaign/${id}`)
  }
  
  return  (
    <div>
      {!user ? (
        <h2 className="text-center">Loading user profile...</h2>
      ) : (<div>
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
          <a class="nav-link active" aria-current="page" href="#" id='navlink'><i>Home</i> </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#aboutus" id='navlink'> <i>About</i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#campaignHead" id='navlink'> <i>Campaigns</i></a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#contactHead" id='navlink'> <i>Contact</i></a>
        </li>
        <li class="nav-item dropdown-center">
          <a class="nav-link dropdown-toggle" href="#"  id='navlink' role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i>{user.name}</i> <img src={user.profileImage ? `http://localhost:5000/${user.profileImage}` : defaultUserImage} alt="" style={{height:'30px',width:'30px',borderRadius:'50%'}}/> 
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item " to="/myCampaign"><i><b>My Campaign</b></i></Link></li>
            <li><Link class="dropdown-item" to="/history" ><i><b>Transaction History</b></i></Link></li>
            <li><hr class="dropdown-divider" /></li>
            <li><Link class="dropdown-item" to="/profile"><i><b>Profile</b></i></Link></li>
            <li><Link class="dropdown-item" to="/"><i><b>Logout</b></i></Link></li>
          </ul>
        </li>
      </ul>

    </div></div>
  </div>
</nav>
<div>
<Marquee speed={100} pauseOnHover={true}>{donors.map((donor)=>(<h3 style={{marginInline:'100px'}} key={donor._id}><i> {donor.userId?.name || "N/A"} donated ₹{donor.donorAmount} to our campaign!</i></h3>))}</Marquee>

</div>
{/* carousel */}
<div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active"  data-bs-interval="5000">
      <img src={nav1} class="d-block w-100" height={840}  alt="..." />
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src={nav2} class="d-block w-100" height={840} alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src={nav3} class="d-block w-100" height={840} alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
{/* about us */}
<div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
<div id='aboutus'><h1><i>About Us</i></h1></div>
<div class="row" >
  <div class="col-lg-6" style={{padding:'40px'}}>
      <div ><center><img src={aboutus} alt="" height={500} width={400} id='aboutimg'/></center></div>
    </div>
  <div class="col-lg-6" style={{padding:'40px',fontSize:'20px'}}><center>
        <p><i>Welcome to Idea Bank, the ultimate crowdfunding platform where innovative ideas meet passionate supporters. Our mission is to empower dreamers, creators, and entrepreneurs by providing them with a space to bring their ideas to life through the support of a like-minded community.</i></p>
        <p><i>At Idea Bank, we believe that every great idea deserves a chance. Whether you're launching a groundbreaking startup, creating an artistic masterpiece, or funding a social cause, our platform connects you with backers who share your vision.</i></p>
        </center>
        <h3 id='aboutus'><i>Why Choose Idea Bank?</i></h3>    
        <ul type="none" style={{display:'flex',justifyContent:"flex-start",
          flexDirection:'column'
        }}>
          <li>✅<i> Empower Innovation – Turn your ideas into reality with the help of a supportive community.</i></li>
          <li>✅<i> Secure & Transparent – We ensure a safe and trustworthy crowdfunding experience for both creators and backers.</i></li>
          <li>✅<i> Global Reach – Share your project with a worldwide audience and gain support from anywhere.</i></li>
          <li>✅<i> Easy-to-Use – Our platform is designed to make fundraising simple, effective, and rewarding.</i></li>
        </ul>
</div>
</div><hr />
{/* campaigns  */}
<div id='campaignHead' ><h1><i>Our Campaigns</i></h1></div>
<div class="container" id='campaing'>
{
  campaigns.map((campaign)=>(
    <div key={campaign._id}>
      <div class="card mb-3" style={{maxWidth:'540px',border:'1px solid #80CBC4'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={`http://localhost:5000/${campaign.image}`} class="img-fluid rounded-start h-100" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title"><i>{campaign.title}</i></h3>
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
</div>        <p class="card-text"><b class="text-body-secondary text-danger"><i>End Date: <span class="text-danger">{campaign.date}</span></i></b></p>
        <button class="btn btn-outline-primary" onClick={()=>handleClick(campaign._id)} disabled={campaign.collected >= campaign.amount}><i>Donate</i> <FaDonate /></button><span className='text-success m-2'><b><i>{campaign.collected >= campaign.amount ? 'Completed' : ''}</i></b></span>
      </div>
    </div>
  </div>
</div>
    </div>
  ))
}
</div><hr />
{/* contact us  */}
<div id='contactHead'><h1><i>Contact Us</i></h1></div>
<div class="container">
<div class="card mb-3 w-100 " id='cotact' >
  <div class="row g-0">
    <div class="col-md-5 p-2" >
    <h3 id='aboutus'><i>Get in Touch</i></h3>
    <p><i>Have questions or need support? We’re here to help! Whether you're a backer, creator, or just exploring crowdfunding, feel free to reach out.</i></p>
    <ul type='none'>
      <li>💡 <i>Need assistance with launching a campaign?</i></li>
      <li>💰 <i>Have questions about pledging or withdrawals?</i></li>
      <li>📢 <i>Want to collaborate or give feedback?</i></li>
    </ul>
    <p><i>We're happy to connect and support you every step of the way!</i></p>
    <p><i>Follow us on social media for updates and success stories!</i></p>
    <div id='icon'>
      <div><FaFacebook style={{color:'blue',width:'50px',height:'50px'}}/></div><div><FaSquareXTwitter style={{color:'black',width:'50px',height:'50px'}} /></div><div><FaInstagramSquare style={{color:'magenta',width:'50px',height:'50px'}} /></div><div><FaLinkedin style={{color:'blue',width:'50px',height:'50px'}} /></div>
    </div>
    </div>
    <div class="col-md-7">
      <div class="card-body " id='input'>
        <input type="text" class="form-control" placeholder='Enter Your Name' required />
        <input type="text" class="form-control" placeholder='Enter Your Email' required />
        <input type="text" class="form-control" placeholder='Enter Your subject' required />
        <textarea name="" id="" style={{height:'150px'}} class="form-control"placeholder='Enter Your Message' required ></textarea>
        <div><center><button type='submit' class="btn btn-outline-success"><i>Submit</i></button></center></div>
      </div>
    </div>
  </div>
</div>
</div>

</div>
{/* footer  */}
<div id='footer'className="container-fluid">
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

    </div>      )}
    </div>
  );
}


export default UserHome;
