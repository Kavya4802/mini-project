import React from "react";
import Navbar from "../Pages/Navbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <>
      <div className="container-fluid bg-secondary min-vh-100">
        <div className="row">
          <div className="col-2 bg-white vh-100">
            <Sidebar></Sidebar>
          </div>
          <div className="col">
            {/* Your content goes here */}
            <h1>Main Content</h1>
            <p>This is your main content area next to the Sidebar.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
