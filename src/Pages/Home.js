import React from "react";
import Navbar from "./Navbar";
import "./Homestyles.css";
import Cards from "./Cards";
import Hero from "./Hero";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Footer from "./Footer";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleDateChange = (date) => {
    setStartDate(date);
  };
  const endDateChange = (date) => {
    setEndDate(date);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
            xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="bike-img"
        ></img>
        <div className="hero-text">
          <h3>Pickup your dates</h3>
          <div className="form-container" style={{ display: "flex", justifyContent: "space-between"}}>
            <div className="form-input" style={{ display: "flex", flexDirection: "column" }}>
              {/* <p style={{ margin: "0px" }}>start date</p> */}
              <Datetime
                value={startDate}
                inputProps={{ placeholder: "START DATE&TIME" }}
                dateFormat="DD/MM/YYYY"
                onChange={handleDateChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {/* <p style={{ margin: "0px" }}>end date</p> */}
              <div  class="end-date-container" style={{ display: "flex", alignItems: "center" }}>
                <Datetime
                  value={endDate}
                  inputProps={{ placeholder: "END DATE&TIME" }}
                  onChange={endDateChange}
                  dateFormat="DD/MM/YYYY"
                  style={{ marginRight: "10px" }}
                />
                <Link to="/allbikes">
                  <Button className="search-button">Search</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Hero 
            cName="hero"
            heroImg="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
            xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            title="Unleash the adventure at your doorstep with our online bike rentals."
            // text="Pickup your dates here"
            // buttonText="Search"
            url="/"
            // btnClass="show"
            >
      </Hero> */}
      <center>
        <h4>Our Rental Vehicles</h4>
      </center>
      <Cards></Cards>
      <Footer></Footer>
    </>
  );
}
export default Home;
