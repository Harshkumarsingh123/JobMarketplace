import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllRead } = useNotifications();

  const [open, setOpen] = useState(false);

  const isLoggedIn = Boolean(user);
  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate("/")}>
          JobMarketplace
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>

          {!isLoggedIn && <Link to="/login">Login</Link>}

          {isLoggedIn && (
            <>
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

              <Link to="/profile">Profile</Link>

              {/* 🔔 NOTIFICATION BELL */}
              <div className="notification-wrapper">
                <span
                  className="bell"
                  onClick={() => {
                    setOpen(!open);
                    markAllRead();
                  }}
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="badge">{unreadCount}</span>
                  )}
                </span>

                {open && (
                  <div className="notification-dropdown">
                    {notifications.length === 0 && (
                      <p className="empty">No notifications</p>
                    )}

                    {notifications.map((n, i) => (
                      <div key={i} className="notification-item">
                        {n.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
