import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logo from '../assets/Main/mainLogo.png'
import footer from '../assets/Main/footerLogo1.png'
import { FaDonate,FaFacebook,FaInstagramSquare,FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import axios from 'axios';

const Addcampaign = () => {
  const userId = sessionStorage.getItem('userId');
 const navigate = useNavigate();

        const [formData,setFormData] = useState({
          userid:userId,
          title:'',
          description:'',
          date:'',
          amount:'',
          collected:0,
          image:'',
          accountName:'',
          accountNumber:'',
          ifsc:'',
          status:'processing'
      
      
        });

const [modalMessage, setModalMessage] = useState('');
const [showModal, setShowModal] = useState(false);
const [errors, setErrors] = useState({});

const validate = () => {
  let tempErrors = {};
  if (!formData.title.trim()) tempErrors.title = "Title is required";
  if (!formData.description.trim()) tempErrors.description = "Description is required";
  if (!formData.date) tempErrors.date = "Target Date is required";
  if (!formData.amount || formData.amount <= 0) tempErrors.amount = "Enter a valid amount";
  if (!formData.accountName.trim()) tempErrors.accountName = "Account holder name is required";
  if (!formData.accountNumber || formData.accountNumber.length < 9) tempErrors.accountNumber = "Enter a valid account number";
  if (!formData.ifsc.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) tempErrors.ifsc = "Enter a valid IFSC code";
  if (!formData.image) tempErrors.image = "Please upload a campaign image";
  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0;
};


        const handleDocumentChange = (event) => {
          if (event.target.files.length > 0) {
              setFormData({ ...formData, image: event.target.files[0] });
          }
      };
      
      const handlChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
      
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
    
        try {
          const response = await axios.post("http://localhost:5000/api/users/addcampaign", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" }
          });
    
          if (response.status === 200) {
            setModalMessage("Waiting for Admin's Approval");
            setShowModal(true);
          }
        } catch (error) {
          setModalMessage(error.message || "An error occurred");
          setShowModal(true);
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
                <Link class="nav-link " aria-current="page" to="/userhome" id='navlink'><i>Home</i> </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/myCampaign" id='navlink' > <i>My Campaigns</i></Link>
              </li>
              <li class="nav-item ">
                <Link class="nav-link active" to="/addcampaign" id='navlink'> <i>Add Campaign</i></Link>
              </li>
      
            </ul>
      
          </div></div>
        </div>
      </nav>

      {/* main content  */}
            <div id="register" className="container">
              <div className="card mb-3" id="cardReg">
                <form onSubmit={handleSubmit}>
                  <div className="card-header text-center">
                    <h5 id="head"><i>ADD CAMPAIGN</i></h5>
                  </div>
      
                  <div className="row g-0">

      
                    <div className="col-md-6">
                      <div className="card-body">
                      <h6 class='text-center'><i>Campaign Details</i></h6><br />

                        <label htmlFor="name" style={{ color: "#80CBC4" }}>
                        <i>Title: </i><span className="text-danger">*</span>
                        </label>
                        <input type="text" placeholder="Enter Campaign Title" name='title' value={formData.title} onChange={handlChange} className="form-control" required />
                        {errors.title && <small className='text-danger'>{errors.title}</small>}
                        <br />
      
                        <label htmlFor="" style={{ color: "#80CBC4" }}>
                        <i> Description:</i> <span className="text-danger">*</span>
                        </label>
                        <textarea name="description" value={formData.description} onChange={handlChange} id="" placeholder='Enter Campaign Description' class="form-control" required></textarea>
                        {errors.description && <small className='text-danger'>{errors.description}</small>}

                        <br />
      
                        <label htmlFor="" style={{ color: "#80CBC4" }}>
                        <i> Target Date:</i> <span className="text-danger">*</span>
                        </label>
                        <input type="date" placeholder="Enter target Date" className="form-control" name='date' value={formData.date} onChange={handlChange} required />
                        {errors.date && <small className='text-danger'>{errors.date}</small>}

                        <br />
      
                        <label htmlFor="" style={{ color: "#80CBC4" }}>
                        <i>  Target Amount:</i> <span className="text-danger">*</span>
                        </label>
                        <input type="number" name='amount' value={formData.amount} onChange={handlChange} placeholder="Enter Target Amount" className="form-control" required />
                        {errors.amount && <small className='text-danger'>{errors.amount}</small>}


                        <br />
      
                        <label htmlFor="legalDoc" style={{ color: "#80CBC4" }}>
                        <i>Campaign Related Image:</i> <span className="text-danger">*</span>
                        </label>
                        <input type="file" id="legalDoc" name='image'onChange={handleDocumentChange} className="form-control" required />
                        {errors.image && <small className='text-danger'>{errors.image}</small>}


                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div class="card-body">
                        <h6 class='text-center'><i>Bank Details</i></h6><br />
                      <label htmlFor="" style={{ color: "#80CBC4" }}>
                      <i>  Account Holder Name:</i> <span className="text-danger">*</span>
                        </label>
                        <input type="text" placeholder="Enter Account Holder Name" name='accountName'value={formData.accountName} onChange={handlChange} className="form-control" required />
                        {errors.accountName && <small className='text-danger'>{errors.accountName}</small>}

                        <br />
      
                        <label htmlFor="" style={{ color: "#80CBC4" }}>
                        <i> Account Number:</i> <span className="text-danger">*</span>
                        </label>
                        <input type="number" name="accountNumber"value={formData.accountNumber} onChange={handlChange} id="" placeholder="Enter Account Number" required class="form-control"/>
                        {errors.accountNumber && <small className='text-danger'>{errors.accountNumber}</small>}

                        <br />
      
                        <label htmlFor="" style={{ color: "#80CBC4" }}>
                        <i> IFSC Code: </i><span className="text-danger">*</span>
                        </label>
                        <input type="text" placeholder="Enter IFSC Code" name='ifsc'value={formData.ifsc} onChange={handlChange} className="form-control" required />
                        {errors.ifsc && <small className='text-danger'>{errors.ifsc}</small>}

                        <br />
                      </div>

                    </div>
                  </div>
                  <div class="card-footer text-end">
                  <button className="btn btn-lg" type='submit' style={{ color: "white", backgroundColor: "#FFB433", width: "100%" }}>
                  <i> Add Campaign</i>
                        </button>
                  </div>
                </form>
              </div>
            </div>

{/* Bootstrap Modal */}
<div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Campaign Status</h5>
        <button type="button" className="btn-close" onClick={() => { setShowModal(false); navigate('/addcampaign'); }}></button>
      </div>
      <div className="modal-body">
        <p>{modalMessage}</p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={() => { setShowModal(false); navigate('/addcampaign'); }}>Close</button>
        <button className="btn btn-primary" onClick={() => { setShowModal(false); navigate('/myCampaign'); }}>OK</button>
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
    </div>
  )
}

export default Addcampaign


