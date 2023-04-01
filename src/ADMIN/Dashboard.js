import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import AdNav from "./AdNav";
import Main from "./Main";
import Sidebar from "./Sidebar";
function Dashboard(){
    return(
        <>
        <div className="container-fluid bg-secondary min-vh-100">
        <div className="row">
             <div className="col-2 bg-white vh-100">
             <Sidebar></Sidebar>
             </div>
             <div className="col">
                <Main></Main>
             </div>
        </div>
        </div>
        </>
    )
}
export default Dashboard;