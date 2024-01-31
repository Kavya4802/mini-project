// Cards.js

import React, { useState, useEffect } from "react";
import "./Card.css";
import {  useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Cards({ user }) {
  const [cartCount, setCartCount] = useState(0);
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/getbikes")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setBikes(data.bikes);
        } else {
          console.log("Error fetching bikes");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const BookNowClick = (bikeId) => {
    try {
      if (!user) {
        // If not logged in, redirect to the login page
        navigate("/login", { state: { source: "bookNow" } });
  
        // Save the current path to local storage
        localStorage.setItem("redirectPath", `/payment/${bikeId}`);
      } else {
        // If logged in, redirect to the payment page
        navigate(`/payment/${bikeId}`);
      }
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  
  const addToCart = async (bikeId) => {
    try {
      if (!user) {
        // If not logged in, redirect to the login page
        navigate("/login");

        // Save the current path to local storage
        localStorage.setItem("redirectPath", `/payment/${bikeId}`);
        return;
      }

      const response = await fetch(`http://localhost:5000/addtocart/${bikeId}/${user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setCartCount(cartCount + 1);
        alert("Added to cart successfully");

        // // Redirect to the payment page
        // navigate(`/`);
      } else {
        alert("Sorry! Couldn't add to cart");
        const errorData = await response.json();
        console.error("Error adding item to cart:", errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Row md={3} xs={1}>
  {bikes.slice(0, 4).map((bike) => (
    <Col md={3} key={bike._id}>
      <Card className="card">
        <Card.Img
          variant="top"
          src={`http://localhost:5000/images/${bike.picture}`}
          className="card-img"
          alt={bike.brand}
        />
        <Card.Body>
          <div className="card-header">
            <Card.Title>{bike.brand}</Card.Title>
            <Card.Text className="card-price">
              <span className="currency-symbol">₹</span>
              {bike.price}
            </Card.Text>
          </div>
          <div className="card-buttons">
            <Button variant="primary" className="book-now-button" onClick={() => BookNowClick(bike._id)}>Book Now</Button>
            <Button variant="primary" className="add-to-cart" onClick={() => addToCart(bike._id)}>Add to Cart</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</>
  );
}

export default Cards;
