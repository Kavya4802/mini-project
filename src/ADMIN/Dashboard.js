import React from "react";


import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <>
      <div className="container-fluid bg-secondary min-vh-100">
        <div className="row">
          <div className="col-2 bg-white vh-100">
            <Sidebar></Sidebar>
          </div>
         
            
           
          </div>
        </div>
      
    </>
  );
}

export default Dashboard;
