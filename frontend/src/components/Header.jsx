import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // SINGLE SOURCE OF TRUTH

  const isLoggedIn = Boolean(user);
  const role = user?.role;

  const handleLogout = () => {
    logout();               // updates state + removes token
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate("/")}>
          JobMarketplace
        </div>

        <nav className="nav">
          {/* PUBLIC */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>

          {/* BEFORE LOGIN */}
          {!isLoggedIn && <Link to="/login">Login</Link>}

          {/* AFTER LOGIN */}
          {isLoggedIn && (
            <>
              {/* ROLE BASED */}
              {role === "JOB_SEEKER" && (
                <>
                  <Link to="/jobs">Find Jobs</Link>
                  <Link to="/applications">My Applications</Link>
                </>
              )}

              {role === "JOB_PROVIDER" && (
                <>
                  <Link to="/post-job">Post Job</Link>
                  <Link to="/my-jobs">My Jobs</Link>
                </>
              )}

              {/* COMMON */}
              <Link to="/profile">Profile</Link>
              {/* <span className="welcome-text">Hi</span> */}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
