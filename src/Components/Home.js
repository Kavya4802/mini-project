import React from "react";
import Hero from "./Hero";
function Home(){
    return(
         <div>
            <Hero 
            cName="hero"
            heroImg="https://images.unsplash.com/photo-1673520587276-77478c8f0151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB
            8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            title="Your Journey Your Story"
            text="Choose Your Favourite Destination"
            buttonText="Travel Plan"
            url="/"
            btnClass="show"
            >
      </Hero>
        </div>
    )
}
export default Home;