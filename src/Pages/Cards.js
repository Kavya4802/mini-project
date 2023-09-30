/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Button from 'react-bootstrap/Button';
import {Row,Col,Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
// import { useEffect,useState } from "react";

// const upload=require('./middleware/multer.js');
function Cards(){
  const [bikes, setBikes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/getbikes')
          .then(response => response.json())
          .then(data => {
            if (data.status === 'ok') {
              setBikes(data.bikes);
              console.log(data.bikes);
            } else {
              console.log('Error fetching bikes');
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
   return (
    <>
    <Row md={3}>
        {bikes.slice(0, 4).map(bike => (
    <Col md={3} key={bike._id}>
        <Card className="card">
            <Card.Img variant="top" src={`http://localhost:5000/images/${bike.picture}`} className="card-img" />
            <Card.Body>
                <Card.Title>{bike.brand}</Card.Title>
                <Card.Text><pre style={{display:"inline",fontSize: "24px",fontWeight:"bold"}}>₹</pre>{bike.price} </Card.Text>
                <Link to={`/register/${bike._id}`}>
                    <Button variant="primary">Book Now</Button>
                </Link>
            </Card.Body>
        </Card>
    </Col>
   
))}
</Row>
    <center> <Link to="/allbikes">
      <Button style={{marginTop:"15px",marginBottom:"15px"}}>View All</Button>
    </Link> </center>
    </>
   )
}
export default Cards;