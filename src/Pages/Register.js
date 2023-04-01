import React,{useState} from "react";
import {Row,Col,Form,Input} from 'antd';
import {Link} from 'react-router-dom';
function Register(){
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
            alert("registered succesfully");
             console.log(data,"UserRegister");
        })
    }
    return(
        <div className="login">
           <Row gutter={16}>
            <Col lg={16} style={{position:'relative'}}>
             {/* <img src="https://images.unsplash.com/photo-1656420731047-3eb41c9d1dee?ixlib=rb-4.0.3&i
             xid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80" alt=""></img> */}
            </Col>
            <Col lg={8} className='text-left p-45'>
                <Form layout='vertical' className="login-form p-5">
                <h1>Register</h1>
                <hr></hr>
                    <Form.Item name='name' label='Name' rules={[{required:true}]} onChange={(e)=>{
                        setName(e.target.value);
             }}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='email' label='Email' rules={[{required:true}]} onChange={(e)=>{
                        setEmail(e.target.value);
             }}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='password' label='Password' rules={[{required:true}]} onChange={(e)=>{
                        setPwd(e.target.value);
             }}>
                        <input type="password"></input>
                    </Form.Item>
                <Form.Item name='no' label='Number' rules={[{required:true}]} onChange={(e)=>{
                        setNo(e.target.value);
             }}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='add' label='Address' rules={[{required:true}]} onChange={(e)=>{
                        setAdd(e.target.value);
             }}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='city' label='city' rules={[{required:true}]} onChange={(e)=>{
                        setCity(e.target.value);
             }}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='pincode' label='Pincode' rules={[{required:true}]} onChange={(e)=>{
                        setPin(e.target.value);
             }}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='aadhar' label='Aadhar' rules={[{required:true}]} onChange={(e)=>{
                        setAadhar(e.target.value);
             }}>
                    <input type="file"></input>
                    </Form.Item>
                    <Form.Item name='license' label='License' rules={[{required:true}]} onChange={(e)=>{
                        setLicense(e.target.value);
             }}>
                    <input type="file"></input>
                    </Form.Item>
                      
                    <button className="btn1" onClick={handleClick}>Submit</button>
                    <br></br>
                    <br></br>
                    <p style={{color:"white"}}>Already registered?<span><Link to="/login">Login</Link></span></p>
                </Form>
            </Col>
           </Row>
          
        </div>
    )
}
export default Register;