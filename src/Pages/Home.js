import React from "react";
import Navbar from "./Navbar";
import "./Homestyles.css";
import Cards from "./Cards";
import Hero from "./Hero";
import Footer from "./Footer";
function Home(){
    return(
        <>
             <Navbar></Navbar>
             <Hero 
            cName="hero"
            heroImg="https://images.unsplash.com/photo-1622185134994-3e87da0f1bb6?ixlib=rb-4.0.3& 
            ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            // title="Your Journey Your Story"
            text="Pickup your dates here"
            buttonText="Search"
            url="/"
            btnClass="show"
            >
      </Hero>
      <center><h4>Our Rental Vehicles</h4></center>
            <Cards></Cards>
            <Footer></Footer>
        </>
    )
}
export default Home;