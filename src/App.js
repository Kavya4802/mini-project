import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import BookingBike from "./Pages/BookingBike";
import About from "./Pages/About";
import Viewbikes from "./Pages/ViewBikes";
import Dashboard from "./ADMIN/Dashboard";
import Payment from "./Pages/Payment";
import Terms from "./Pages/Termsofservice";
import Privacy from "./Pages/Privacypolicy";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
function App(){
    return(
        <div className="App">
          {/* <Dashboard></Dashboard> */}
            <Router>
              <Routes>
              <Route path="/" exact element={<Home/>}></Route>
              <Route path="/about" exact element={<About/>}></Route>
              <Route path="/login/:id" element={<Login/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/register/:id" element={<Register/>}></Route>
              <Route path="/bookingbike" element={<BookingBike/>}></Route>
              <Route path="/allbikes" element={<Viewbikes/>}></Route>
              <Route path="/payment/:id" element={<Payment/>}></Route>
              <Route path="/terms" element={<Terms/>}></Route>
              <Route path="/privacypolicy" element={<Privacy/>}></Route>
              {/* <Route path="/ADMIN/Dashboard" element={<Dashboard/>}></Route> */}
              </Routes>
            </Router> 
        </div>
    )
}
export default App;