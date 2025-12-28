import "../styles/home.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3>JobMarketplace</h3>
            <p>
              Connecting people with nearby part-time jobs.
              Work a few hours and earn easily.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p>Home</p>
            <p>About</p>
            <p>Help</p>
            <p>Careers</p>
          </div>

          <div>
            <h4>For Users</h4>
            <p>Find Jobs</p>
            <p>Post Jobs</p>
            <p>My Profile</p>
          </div>

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
