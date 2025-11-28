import React from "react";

function Navbar({ userName, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">Appointment Scheduler</span>

        <div className="d-flex align-items-center">
          <span className="text-white me-3">
            Welcome, {userName || "User"}
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
