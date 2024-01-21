// Payment.js

import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import "./Paymentstyles.css";
// import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";


const Payment = () => {
  
 async function displayRazorPay(){
     const data=await fetch("http://localhost:5000/razorpay",{
      method:"POST"
     }).then((response)=>response.json())
     console.log(data)
     const options={
      key:"rzp_test_6YWgCz8B9XBA7M",
      currency:data.currency,
      amount:data.amount,
      description:"Wallet Transaction",
      order_id:data.id,
      handler:function(response){
        alert("PAYMENT ID:"+response.razorpay_payment_id)
        alert("ORDER ID:"+response.razorpay_order_id)
      },
      prefill:{
        name:"KAVYA",
        email:"hello@123.com",
        contact:"7883738988"
      }
     };
     const paymentObject=new window.Razorpay(options)
     paymentObject.open()
  }
  const loadScript=(src)=>{
    return new Promise((resolve)=>{
    const script=document.createElement('script')
    script.src=src
    script.onload=()=>{
      resolve(true)
    }
    script.onerror=()=>{
      resolve(false)
    }
    document.body.appendChild(script)
    })
  }
  // const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const [bikeData, setBikeData] = useState([]);
    useEffect(()=>{
      loadScript("https://checkout.razorpay.com/v1/checkout.js")
    },[])
  useEffect(() => {
    fetch(`http://localhost:5000/bikes/${id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data); // add this line
        setBikeData(data);
      })
      .catch(error => console.error(error));
  },[id]);

  // if (!bikeData) {
  //   return <div>Loading...</div>;
  // }
    return (
    <div className="payment-page">
      <div className="image-section">
        <img src={`http://localhost:5000/images/${bikeData.picture}`}  alt="Product Image"></img>
      </div>
      <div>
    </div>
      <div className="details-section">
        <h2>{bikeData.brand}</h2>
        <h3>{bikeData.price}</h3>
        <button className="paynow-button" onClick={displayRazorPay}>Pay Now</button>
      </div>
      
      {/* <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)} 
    /> */}
    </div>
    
  );
};

export default Payment;
