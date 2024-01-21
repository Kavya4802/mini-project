import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./ADMIN/AppRoutes";// Import your admin routes
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import BookingBike from "./Pages/BookingBike";
import ViewBikes from "./Pages/ViewBikes";
import Payment from "./Pages/Payment";
import Terms from "./Pages/Termsofservice";
import Privacy from "./Pages/Privacypolicy";
import Cart from "./Pages/Cart";
import PasswordReset from "./Pages/PasswordReset";
import ForgotPassword from "./ForgotPassword";


function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/about" element={<About />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/bookingbike" element={<BookingBike />} />
        <Route path="/allbikes" element={<ViewBikes />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacypolicy" element={<Privacy />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:tokens" element={<ForgotPassword />}/>
        <Route path="/AppRoutes/*" element={<AppRoutes />} />

      </Routes>
    </Router>
  );
}

export default App;
