import { Link } from "react-router-dom";
import "../styles/home.css";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { user } = useAuth();

  const isLoggedIn = Boolean(user);
  const role = user?.role;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          {/* BRAND */}
          <div>
            <h3>JobMarketplace</h3>
            <p>
              Connecting people with nearby part-time jobs.
              Work a few hours and earn easily.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4>Quick Links</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/help" className="footer-link">Help</Link>

            {!isLoggedIn && (
              <>
                <Link to="/login" className="footer-link">Login</Link>
                <Link to="/register" className="footer-link">Register</Link>
              </>
            )}

            {isLoggedIn && (
              <Link to="/profile" className="footer-link">Profile</Link>
            )}
          </div>

          {/* ROLE-BASED USER LINKS */}
          {isLoggedIn && role === "JOB_SEEKER" && (
            <div>
              <h4>For Job Seekers</h4>
              <Link to="/jobs" className="footer-link">Find Jobs</Link>
              <Link to="/applications" className="footer-link">My Applications</Link>
            </div>
          )}

          {isLoggedIn && role === "JOB_PROVIDER" && (
            <div>
              <h4>For Job Providers</h4>
              <Link to="/post-job" className="footer-link">Post Job</Link>
              <Link to="/my-jobs" className="footer-link">My Jobs</Link>
            </div>
          )}

          {/* SUPPORT */}
          <div>
            <h4>Support</h4>
            <p>Email: support@jobmarketplace.com</p>
            <p>Phone: +91 9837224704</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2025 JobMarketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
