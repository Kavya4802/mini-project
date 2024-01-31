import React from "react";
import Navbar from "./Navbar";
import "./Homestyles.css";
import Cards from "./Cards";
// import Hero from "./Hero";

import "react-datetime/css/react-datetime.css";
import Footer from "./Footer";
import { useState,useEffect } from "react";

// import Cart from "./Cart";
function Home() {
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
  return (
    <>
      <Navbar user={user}/>
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
            xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="bike-img"
        ></img>
        
      </div>
      <center>
        <h4>Our Rental Vehicles</h4>
      </center>
      <Cards user={user} />
      {/* <BotpressWebchat></BotpressWebchat> */}
      <Footer></Footer>
    </>
  );
}
export default Home;
