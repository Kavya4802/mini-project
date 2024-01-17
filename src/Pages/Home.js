import React from "react";
import Navbar from "./Navbar";
import "./Homestyles.css";
import Cards from "./Cards";
// import Hero from "./Hero";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Footer from "./Footer";
import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BotpressWebchat from "./BotPress";
// import Cart from "./Cart";
function Home() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/getusers", {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setUser(data.user);
          } else {
            console.log("Error fetching user details");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const handleDateChange = (date) => {
    setStartDate(date);
  };
  const endDateChange = (date) => {
    setEndDate(date);
  };
  return (
    <>
      <Navbar user={user}/>
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
            xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="bike-img"
        ></img>
        <div className="hero-text">
          <h3>Pickup your dates</h3>
          <div
            className="form-container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              className="form-input"
              style={{ display: "flex", flexDirection: "column" }}
            >
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
              <div
                class="end-date-container"
                style={{ display: "flex", alignItems: "center" }}
              >
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
      <center>
        <h4>Our Rental Vehicles</h4>
      </center>
      <Cards user={user} />
      <BotpressWebchat></BotpressWebchat>
      <Footer></Footer>
    </>
  );
}
export default Home;
