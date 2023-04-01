import React from "react";
import "./Styles.css";
function Sidebar(){
    return(
     <div className="bg-white sidebar p-2">
        <div className="m-2">
            <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
            <span className="brand-name fs-4">Name</span>
        </div>
        <hr className="text-dark"></hr>
        <div className="list-group list-group-flush">
               <a className="list-group-item py-2" href="/content">
                <i className="bi bi-speedometer2 fs-5 me-3"></i>
                <span className="fs-5">Dashboard</span>
               </a>
               <a className="list-group-item py-2" href="/addbike">
                <i className="bi bi-house fs-4 me-3"></i>
                <span className="fs-5">Add Bikes</span>
               </a>
               <a className="list-group-item py-2" href="/viewbike">
                <i className="bi bi-house fs-4 me-3"></i>
                <span className="fs-5">View Bikes</span>
               </a>
               <a className="list-group-item py-2" href="/viewuser">
                <i className="bi bi-house fs-4 me-3"></i>
                <span className="fs-5">Available Users</span>
               </a>
               <a className="list-group-item py-2" href="/">
                <i className="bi bi-house fs-4 me-3"></i>
                <span className="fs-5">Logout</span>
               </a>
        </div>
     </div>
    )
}
export default Sidebar;