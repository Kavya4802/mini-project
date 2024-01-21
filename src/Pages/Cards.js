// Cards.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

        // Redirect to the payment page
        navigate(`/payment/${bikeId}`);
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
      <Row md={3}>
        {bikes.slice(0, 4).map((bike) => (
          <Col md={3} key={bike._id}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={`http://localhost:5000/images/${bike.picture}`}
                className="card-img"
              />
              <Card.Body>
                <Card.Title>{bike.brand}</Card.Title>
                <Card.Text>
                  <pre
                    style={{
                      display: "inline",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    ₹
                  </pre>
                  {bike.price}{" "}
                </Card.Text>
                <Button variant="primary" onClick={() => addToCart(bike._id)}>Book Now</Button>
                <Button
                  variant="primary"
                  style={{ marginLeft: "30px" }}
                  onClick={() => addToCart(bike._id)}
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <center>
        <Link to="/allbikes">
          <Button style={{ marginTop: "15px", marginBottom: "15px" }}>
            View All
          </Button>
        </Link>
      </center>
    </>
  );
}

export default Cards;
