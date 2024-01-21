import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

function Sidebar() {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">Name</span>
      </div>
      <hr className="text-dark"></hr>
      <div className="list-group list-group-flush">
        <Link to="/content" className="list-group-item py-2">
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          <span className="fs-5">Dashboard</span>
        </Link>
        <Link to="/AddBike" className="list-group-item py-2">
          <i className="bi bi-house fs-4 me-3"></i>
          <span className="fs-5">Add Bikes</span>
        </Link>
        <Link to="/ViewBike" className="list-group-item py-2">
          <i className="bi bi-house fs-4 me-3"></i>
          <span className="fs-5">View Bikes</span>
        </Link>
        {/* Add similar Link components for other routes */}
        <Link to="/viewuser" className="list-group-item py-2">
        <i className="bi bi-house fs-4 me-3"></i>
        <span className="fs-5">Available Users</span>
        </Link>

        <Link to="/" className="list-group-item py-2">
          <i className="bi bi-house fs-4 me-3"></i>
          <span className="fs-5">Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
