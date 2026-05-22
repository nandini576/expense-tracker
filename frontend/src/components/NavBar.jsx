import React, { useContext } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {

  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <nav className="navbar">

      {/* LEFT SIDE */}
      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        Expense Tracker
      </div>

      {/* RIGHT SIDE */}

      <div className="navbar-right">

        {!user ? (
          <>
            <button
              className="nav-btn signup-btn"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>

            <button
              className="nav-btn signin-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            <div className="profile-section">

              <div className="profile-icon">
                👤
              </div>

              <span className="username">
                {user.name}
              </span>

            </div>

            <button
              className="nav-btn logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default NavBar;