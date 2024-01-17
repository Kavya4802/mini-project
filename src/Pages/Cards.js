/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Button from "react-bootstrap/Button";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Cards({user}) {
  const [cartCount, setCartCount] = useState(0);
  const [bikes, setBikes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/getbikes")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setBikes(data.bikes);
          // console.log(data.bikes);
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
      const response = await fetch(`http://localhost:5000/addtocart/${bikeId}/${user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user's token
        },
      });
  
      if (response.ok) {
        setCartCount(cartCount + 1);
        alert("Added to cart successfully");
      } else {
        alert("Sorry!Couldnt add to cart");
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
                <Link to={`/register/${bike._id}`}>
                  <Button variant="primary">Book Now</Button>
                </Link>
                {/* <Link to={`/register/${bike._id}`}> */}
                <Button variant="primary" style={{ marginLeft: "30px" }} onClick={() => addToCart(bike._id)}>
                  Add to cart
                </Button>
                {/* </Link> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <center>
        {" "}
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
