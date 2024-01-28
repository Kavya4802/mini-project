// Payment.js
import './Termsstyles.css';
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import "./Paymentstyles.css";
// import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Datetime from "react-datetime";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Payment = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const[user,setUser]=useState([]);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  // Function to toggle the visibility of the terms and conditions popup
  const toggleTermsPopup = () => {
    setShowTermsPopup(!showTermsPopup);
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/getusers", {
            headers: {
              Authorization: token,
            },
          });
          const data = await response.json();
  
          if (data.status === "ok") {
            setUser(data.user);
          } else {
            console.log("Error fetching user details");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setUser(null);
      }
    };
  
    fetchUserDetails();
  }, []);
  const handleAcceptTermsChange = () => {
    setAcceptTerms(!acceptTerms);
  };
    const handleDateChange = (date) => {
    setStartDate(date);
  };
  const endDateChange = (date) => {
    setEndDate(date);
  };
  function toggleTerms(){
    toggleTermsPopup();
  }
 async function displayRazorPay(){
  toggleTermsPopup();
  const durationPrice = calculateTotalPrice(); 
     const data=await fetch("http://localhost:5000/razorpay",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        bikeId: id,
        totalPrice: durationPrice.totalPrice,
       })
     }).then((response)=>response.json())
    //  console.log(data)
     const options={
      key:"rzp_test_6YWgCz8B9XBA7M",
      currency:data.currency,
      amount:data.amount,
      description:"Wallet Transaction",
      order_id:data.id,
      handler:async function(response){
        alert("PAYMENT ID:"+response.razorpay_payment_id)
        alert("ORDER ID:"+response.razorpay_order_id);
       const saveTransactionData = {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        userName: user.name, // Assuming user is available in the component state
        amount: durationPrice.totalPrice, 
        phoneNumber:user.no,
        startDate: startDate.toISOString(), // Convert to ISO format for consistency
        endDate: endDate.toISOString(), 
        bikeId: bikeData._id,
        bikeName:bikeData.brand
      };
      try {
        await fetch("http://localhost:5000/save-transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveTransactionData),
        });
      } catch (error) {
        console.error('Error saving transaction:', error);
        // Handle the error as needed
      }
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
  const calculateTotalPrice = () => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    if (isNaN(startDateTime) || isNaN(endDateTime)) {
      return { durationInHours: 0, totalPrice: 0 };
    }
    // Calculate the duration in hours
    const durationInHours = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60));
  
    // Set a minimum booking duration of 12 hours
    const minBookingDuration = 12;
  
    // Calculate the total price based on the conditions
    const totalPrice = durationInHours < minBookingDuration
      ? Math.ceil(bikeData.price / 24) * minBookingDuration
      : durationInHours * Math.ceil(bikeData.price / 24);
  
    return { durationInHours, totalPrice };
  };
  return (
    <div className="payment-page">
      <div className="details-container">
        <div className="image-section">
          <img
            src={`http://localhost:5000/images/${bikeData.picture}`}
            alt="Product Image"
          ></img>
        </div>
        <div className="details-section">
          <h2>{bikeData.brand}</h2>
          {user && (
            <>
              <p>Booking by: {user.name}</p>
              <p>Phonenumber: {user.no}</p>
            </>
          )}
          <h3>
          <pre
                    style={{
                      display: "inline",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    ₹
                  </pre>
          {Math.ceil((bikeData.price)/24)}/per hour
          </h3>
          <button className="paynow-button" onClick={toggleTerms}>
            Pay Now
          </button>
        </div>
      </div>
      <div className="form-container">
        <h3>Pickup your dates</h3>
        <div className="form-input">
          <Datetime
            value={startDate}
            inputProps={{ placeholder: "START DATE&TIME" }}
            dateFormat="DD/MM/YYYY"
            onChange={handleDateChange}
          />
        </div>
        <div>
          <div
            className="end-date-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Datetime
              value={endDate}
              inputProps={{ placeholder: "END DATE&TIME" }}
              onChange={endDateChange}
              dateFormat="DD/MM/YYYY"
              style={{ marginRight: "10px" }}
            />
            <Link>
              <Button className="search-button">Book</Button>
            </Link>
          </div>
          <h3>
  <pre
    style={{
      display: "inline",
      fontSize: "24px",
      fontWeight: "bold",
    }}
  >
    ₹
  </pre>
  {calculateTotalPrice().totalPrice}/ Total
  <p>you booked the bike for {calculateTotalPrice().durationInHours} hrs</p>
  {calculateTotalPrice().durationInHours < 12 ? ' (Minimum 12hr booking required)' : ''}
</h3> 
     {showTermsPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Terms and Conditions</h2>
            {/* Add your terms and conditions content here */}
            <ul>
              <li>A ride cannot commence until and unless the required documents are uploaded and verified. 
              Cancellation policy will apply if proper documents are not uploaded for verification.</li>
              <li>Rental package does not include Fuel, Toll, State Permits or Taxes.</li>
            </ul>
            <div className="accept-terms-container">
              <label>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={handleAcceptTermsChange}
                />
                I accept the Terms and Conditions
              </label>
            </div>
            <div className="button-container">
              <button
                className={`proceed-button ${acceptTerms ? 'green' : 'grey'}`}
                onClick={displayRazorPay}
                disabled={!acceptTerms}
              >
                Proceed
              </button>
              <button className="close-button" onClick={toggleTermsPopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

        </div>
      </div>
    </div>
  );
  
  
  
  
};

export default Payment;
