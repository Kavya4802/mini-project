import React,{useState} from "react";
import "./Signupstyles.css";
import {Link} from "react-router-dom";
function Signup(){
    const [name,setName]=useState(" ");
    const [email,setEmail]=useState(" ");
    const [pwd,setPwd]=useState(" ");
    const [no,setNo]=useState(" ");
    const [add,setAdd]=useState(" ");
    const [city,setCity]=useState(" ");
    const [pincode,setPin]=useState(" ");
    const [aadhar,setAadhar]=useState();
    const [license,setLicense]=useState();
    function handleClick(e){
        e.preventDefault();
        fetch("http://localhost:5000/register",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                name,
                email,
                pwd,
                no,
                add,
                city,
                pincode,
                aadhar,
                license
            }),
        }).then((res)=>res.json())
        .then((data)=>{
             console.log(data,"UserRegister");
        })
    }
    return (
        <div className="main-signup">
            <div className="signup-img">
                <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFy
                Y2h8NHx8YmlrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt=""></img>
            </div>
            <div className="signup">
            <form>
           Enter your name<br></br><input type="text" placeholder="Enter full name" onChange={(e)=>{
                        setName(e.target.value);
             }}></input>
             <br></br>
             Enter your email<br></br> <input type="email" placeholder="Enter email"  onChange={(e)=>{
                        setEmail(e.target.value);
             }}></input>
             <br></br>
             Enter your password<br></br> <input type="password" placeholder="Enter password"  onChange={(e)=>{
                        setPwd(e.target.value);
             }}></input>
             <br></br>
             Enter your phone number<br></br> <input type="text" placeholder="Enter mobile number"  onChange={(e)=>{
                        setNo(e.target.value);
             }}></input>
             <br></br>
             Address<br></br><input type="text" placeholder="Address" onChange={(e)=>{
                        setAdd(e.target.value);
             }}></input>
             <br></br>
             City<br></br><input type="text" placeholder="City" onChange={(e)=>{
                        setCity(e.target.value);
             }}></input>
             <br></br>
             Pincode<br></br><input type="text" placeholder="Pincode" onChange={(e)=>{
                        setPin(e.target.value);
             }}></input>
             <br></br>
             AadharCard<br></br><input type="file" onChange={(e)=>{
                        setAadhar(e.target.value);
             }}></input>
             <br></br>
             License<br></br><input type="file" onChange={(e)=>{
                        setLicense(e.target.value);
             }}></input>
             <br></br>
             <br></br>
             <input type="Submit" onClick={handleClick}></input>
             <br></br>
             <p>Already registered?<span><Link to="/login">Login</Link></span></p>
             </form>
            </div>
        </div>
    )
}
export default Signup;