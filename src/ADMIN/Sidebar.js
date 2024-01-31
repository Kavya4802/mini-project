import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <i className="sidebar-icon"></i>
        <span className="sidebar-title">Name</span>
      </div>
      <hr className="sidebar-divider"></hr>
      <div className="sidebar-links">
        <Link to="/Dashboard" className="sidebar-link">
          <i className="sidebar-icon"></i>
          <span className="sidebar-link-text">Dashboard</span>
        </Link>
        <Link to="/addbike" className="sidebar-link">
          <i className="sidebar-icon"></i>
          <span className="sidebar-link-text">Add Bikes</span>
        </Link>
        <Link to="/viewbike" className="sidebar-link">
          <i className="sidebar-icon"></i>
          <span className="sidebar-link-text">View Bikes</span>
        </Link>
        <Link to="/viewuser" className="sidebar-link">
          <i className="sidebar-icon"></i>
          <span className="sidebar-link-text">Available Users</span>
        </Link>
        <Link to="/" className="sidebar-link">
          <i className="sidebar-icon"></i>
          <span className="sidebar-link-text">Logout</span>
        </Link>
      </div>
    </div>
  );
  
}

export default Sidebar;