
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Main/mainLogo.png";
import footer from "../assets/Main/footerLogo1.png";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import axios from "axios";

const TransactionHistory = () => {
  const userId = sessionStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!userId) return; // Ensure userId exists before making the API call

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/history/${userId}`
        );
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching Transactions:", err.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" id="nav">
        <div className="container-fluid">
          <div>
            <a className="navbar-brand" href="#">
              <img src={logo} alt="logo" height={85} />
            </a>
            <span style={{ color: "white", fontSize: "30px" }}>
              <b>
                <i>Idea Bank</i>
              </b>{" "}
              <sub>
                <small>
                  <i>Instant Money</i>
                </small>
              </sub>
            </span>
          </div>

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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/userhome" id="navlink">
                  <i>Home</i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/history" id="navlink">
                  <i>Transaction History</i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div id="campaignHead">
        <h1>
          <i>My Transaction History</i>
        </h1>
      </div>
      <div className="container" style={{ minHeight: "410px" }}>
        {transactions.length > 0 ? (
          <table className="table table-hover table-striped table-bordered">
            <thead>
              <tr className="table-dark text-center">
                <th>
                  <i>Transaction ID</i>
                </th>
                <th>
                  <i>Campaign Name</i>
                </th>
                <th>
                  <i>Date</i>
                </th>
                <th>
                  <i>Amount</i>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="text-center">
                    <i>{transaction._id}</i>
                  </td>
                  <td className="text-center">
                    <i>{transaction.campaignId?.title || "N/A"}</i>
                  </td>
                  <td className="text-center">
                    <i>{new Date(transaction.createdAt).toLocaleDateString()}</i>
                  </td>
                  <td className="text-center text-success">
                    <i>₹{transaction.donorAmount}</i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <h4 className="text-muted">
              <i>No transactions found</i>
            </h4>
          </div>
        )}
      </div>

      {/* Footer */}
      <div id="footer" className="container-fluid">
        <div className="row">
          <div className="col-lg-3 text-center">
            <img
              src={footer}
              alt=""
              height={150}
              style={{ marginTop: "10px" }}
            />
            <hr />
            <div id="icon" className="d-flex justify-content-center gap-3">
              <FaFacebook style={{ color: "black", width: "30px", height: "30px" }} />
              <FaSquareXTwitter style={{ color: "black", width: "30px", height: "30px" }} />
              <FaInstagramSquare style={{ color: "black", width: "30px", height: "30px" }} />
              <FaLinkedin style={{ color: "black", width: "30px", height: "30px" }} />
            </div>
          </div>
          <div className="col-lg-2" id="flexfooter">
            <h3>
              <i>Causes</i>
            </h3>
            <div><i>Medical crowdfunding</i></div>
            <div><i>Cancer crowdfunding</i></div>
            <div><i>Transplant crowdfunding</i></div>
            <div><i>Education crowdfunding</i></div>
            <div><i>Sports crowdfunding</i></div>
          </div>
          <div className="col-lg-2" id="flexfooter">
            <h3>
              <i>How it works?</i>
            </h3>
            <div><i>Fundraising for NGOs</i></div>
            <div><i>Sponsor a Child</i></div>
            <div><i>Fundraising Tips</i></div>
            <div><i>What is crowdfunding?</i></div>
            <div><i>Corporates</i></div>
          </div>
          <div className="col-lg-2" id="flexfooter">
            <h3>
              <i>About Us</i>
            </h3>
            <div><i>Team Idea Bank</i></div>
            <div><i>In The News</i></div>
            <div><i>Web Stories</i></div>
            <div><i>Careers</i></div>
            <div><i>Success Stories</i></div>
          </div>
          <div className="col-lg-3" id="flexfooter">
            <h3>
              <i>Support</i>
            </h3>
            <div><i>Medical finance</i></div>
            <div><i>FAQs & Help Center</i></div>
            <div><i>Fundraiser Video</i></div>
            <div><i>Trust & Safety</i></div>
            <div><i>Plans & Pricing</i></div>
          </div>
        </div>
        <hr />
        <div className="text-center pb-3">
          <i>&copy; IdeaBank Crowdfunding 2025</i>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
