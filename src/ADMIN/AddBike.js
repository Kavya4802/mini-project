import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Navbar from '../Pages/Navbar';
import "./Styles.css";
import Sidebar from './Sidebar';
function AddBike(){
       const[brand,setBrand]=useState("");
       const[model,setModel]=useState("");
       const[price,setPrice]=useState("");
       const[status,setStatus]=useState("");
       const[picture,setPicture]=useState({myFile:"",bikeImg:null});
    
       function handleClick(e){
        e.preventDefault();
        const formData = new FormData()
        formData.append('bikeImg', picture.bikeImg)
        formData.append('formData', JSON.stringify({
          brand,
          model,
          price,
          status
          
      }))
      axios.post("http://localhost:5000/addbike", formData, {
          }).then(res => {
              console.log(res)
              alert("bike added succesfully")
          })
        // fetch("http://localhost:5000/addbike",{
        //     method:"POST",
        //     crossDomain:true,
        //     headers:{
        //         "Content-Type":"application/json",
        //         Accept:"application/json",
        //         "Access-control-Allow-Origin":"*"
        //     },
        //     body:JSON.stringify({
        //         brand,
        //         model,
        //         price,
        //         picture: picture.myFile
        //     }),
        // }).then((res)=>res.json())
        // .then((data)=>{
        //     // alert("inserted in database succesfully");
        //      console.log(data,"BikesInfo");
        // })

        }
      
       async function handleFileUpload(e){
             const file=e.target.files[0];
             const base64=await convertToBase64(file);
             setPicture({myFile:base64,bikeImg:e.target.files[0]})
        }
    return(
     <>
      <div className="row">
          <div className="col-2 bg-white vh-100">
            <Sidebar></Sidebar>
          </div>
          <div className="col">
          <div className="hero">
       <img
          src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
            xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="bike-img"
        ></img>
        <div className="hero-text">
        <h3>Add Bikes here</h3>
        <br></br>
           <Form className="custom-form">
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="1">
          Brand
        </Form.Label>
        <Col sm="3">
          <Form.Control type="text" placeholder='Enter Bike Brand' name="brand" onChange={(e)=>{
                  setBrand(e.target.value);
          }} style={{ width: "250px" }} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="1">
        Model
        </Form.Label>
        <Col sm="3">
          <Form.Control type="text" placeholder="Enter Bike Model" name="model" onChange={(e)=>{
                  setModel(e.target.value);
          }} style={{ width: "250px" }} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="1">
          Bike Rent
        </Form.Label>
        <Col sm="3">
          <Form.Control type="text" placeholder="Enter Bike Rent" name="price" onChange={(e)=>{
                  setPrice(e.target.value);
          }} style={{ width: "250px" }} />
        </Col>
      </Form.Group> 
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="1">
        Status
        </Form.Label>
        <Col sm="3">
          <Form.Control type="text" placeholder="Enter Status" name="status" onChange={(e)=>{
                  setStatus(e.target.value);
          }} style={{ width: "250px" }} />
        </Col>
      </Form.Group>
      {/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="1">
          Availability
        </Form.Label>
        <Col sm="3">
        <Form.Select>
      <option>Open this select menu</option>
      <option value="1">Available</option>
      <option value="2">Not Available</option>
    </Form.Select>
        </Col>
      </Form.Group> */}
      
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="1">
          Picture
        </Form.Label>
        <Col sm="3">
        <input type="file" onChange={handleFileUpload} />
        </Col>
      </Form.Group>
    </Form>
    <Button variant="dark" onClick={handleClick}>Submit</Button>
        </div>
        </div>
          </div>
        </div>
      
        </>
    )
}
export default AddBike;
function convertToBase64(file){
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
      resolve(fileReader.result)
    };
    fileReader.onerror=(error)=>{
      reject(error)
    }
  })
}
