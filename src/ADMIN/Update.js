import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import "./AddBike.css";
function Update() {
  const { bikeId } = useParams();
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
  const [bike, setBike] = useState({
    brand: "",
    model: "",
    price: "",
    picture: "",
  });

  const handleChange = (e) => {
    setBike({
      ...bike,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    setBike({
      ...bike,
      picture: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("brand", bike.brand);
      formData.append("model", bike.model);
      formData.append("price", bike.price);
      formData.append("picture", bike.picture);
  
      const response = await axios.put(
        `http://localhost:5000/bikesinfo/${bikeId}`,
        formData
      );
        if (!response.data.error) {
        alert("Bike updated successfully!");
      } else {
        alert("Error updating bike");
      }
    } catch (error) {
      console.error("Error updating bike:", error);
    }
  }
    return (
      <>
      <AdminNavbar></AdminNavbar>
        <div className="addbike-form">
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="1" style={{fontSize:"15px"}}>
              Brand
            </Form.Label>
            <Col sm="3">
              <Form.Control style={{width:"350px",marginLeft:"28px"}}
                type="text"
                placeholder="Enter brand"
                name="brand"
                value={bike.brand}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1" style={{fontSize:"15px"}}>
              Model
            </Form.Label>
            <Col sm="3">
              <Form.Control style={{width:"350px",marginLeft:"28px"}}
                type="text"
                placeholder="Enter Bike Model"
                name="model"
                value={bike.model}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1" style={{fontSize:"15px"}}>
              Bike Rent
            </Form.Label>
            <Col sm="3">
              <Form.Control style={{width:"350px",marginLeft:"28px"}}
                type="text"
                placeholder="Enter Bike Rent"
                name="price"
                value={bike.price}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1" style={{fontSize:"15px"}}>
              Picture
            </Form.Label>
            <Col sm="3" >
              <input type="file" onChange={handleFileUpload} style={{width:"350px",marginLeft:"28px"}} />
            </Col>
          </Form.Group>
          <Button type="submit" variant="dark">
            Update
          </Button>
        </Form>
            </div>
            <AdminFooter></AdminFooter>
      </>
        
    );
  };
export default Update;
