import React,{useState} from 'react'
import footer from '../assets/reg_login/footerLogo1.png'
import AdminUsermanage from './AdminUserManage';
import AdminCampaignManage from './AdminCampaignManage';
import {useNavigate} from 'react-router-dom';


const AdminHome = () => {
    const [activePage, setActivePage] = useState("Dashboard");
    const Navigate = useNavigate();

    const handleClick =()=>{
      Navigate('/')
    }

    return (
      <div className="d-flex ">
        {/* Sidebar */}
        <nav className=" text-white p-3 " style={{ width: "250px",backgroundColor:'#80CBC4' }}>
          <h4 className="mb-4"><img src={footer} alt="" height={100}/></h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className={`nav-link text-white btn btn-link ${activePage === "Dashboard" ? "bg-dark" : ""}`} onClick={() => setActivePage("Dashboard")} style={{fontSize:'30px'}}><i>Dashboard</i> </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link text-white btn btn-link ${activePage === "Users" ? "bg-dark" : ""}`} onClick={() => setActivePage("Users")} style={{fontSize:'30px'}}><i>Users</i></button>
            </li>
            <li className="nav-item">
              <button className={`nav-link text-white btn btn-link ${activePage === "Campaigns" ? "bg-dark" : ""}`} onClick={() => setActivePage("Campaigns")} style={{fontSize:'30px'}}><i>Campaigns</i></button>
            </li>

          </ul>
        </nav>
        
  
        <div className="flex-grow-1">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light p-3"  style={{backgroundColor:'#B4EBE6' }}>
            <div className="container-fluid">
              <span className="navbar-brand"><i>{activePage}</i></span>
              <button className="btn btn-outline-danger" onClick={handleClick}><i>Logout</i></button>
            </div>
          </nav>
  
          {/* Main Content */}
          <div className="p-4"   style={{minHeight:'801px' }}>
          {activePage === "Dashboard" && (
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',paddingTop:'250px'}}>
              <h1 className="text-2xl font-bold  text-center" style={{fontSize:"50px",fontFamily:"serif",color:"#FFB433"}}><i>WELCOME</i></h1>
              <h3 className="text-2xl text-center " style={{fontSize:"50px",fontFamily:"serif",color:"#FFB433"}}><i>ADMIN HOME</i></h3>

            </div>
          )}
            {activePage === "Users" && (
            <div style={{padding:"20px"}}>
             <AdminUsermanage/>
            </div>
          )}
            {activePage === "Campaigns" && (
            <div style={{padding:"20px"}}>
              <AdminCampaignManage/>
            </div>
          )}

          </div>
                    {/* Navbar2 */}
                    <nav className="navbar navbar-expand-lg navbar-light p-3"  style={{backgroundColor:'#B4EBE6' }}>
            <div className="container-fluid d-flex justify-content-center">
            <div class='text-center pb-3'><i>&copy;ideabankcrowdfunding2025</i></div>

            </div>
          </nav>
        </div>

      </div>
    );
}

export default AdminHome
