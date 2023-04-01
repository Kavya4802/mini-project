import React,{useState} from "react";
import {Row,Col,Form,Input} from 'antd';
import {Link} from 'react-router-dom';
import "./Loginstyles.css";
function Login(){
    const [email,setEmail]=useState(" ");
    const [pwd,setPwd]=useState(" ");
    function handleClick(e){
        e.preventDefault();
        fetch("http://localhost:5000/login",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                email,
                pwd,
            }),
        }).then((res)=>res.json())
        .then((data)=>{
             console.log(data,"userRegister");
             if(data.status==="ok"){
                alert("login succesful");
                window.localStorage.setItem("token",data.data);
                window.location.href="./ADMIN/Dashboard" 
             }
          });
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
                <h1>Login</h1>
                <hr></hr>
                    <Form.Item name='username' label='Username' rules={[{required:true}]}  onChange={(e)=>{
                        setEmail(e.target.value);
             }}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='password' label='Password' rules={[{required:true}]}  onChange={(e)=>{
                        setPwd(e.target.value);
             }}>
                        <input type="password"></input>
                    </Form.Item>    
                    <button className="btn1" onClick={handleClick}>Login</button>
                    <br></br>
                    <p style={{color:"white"}}>Cant Login? Try-<span><Link to="/register">Signup</Link></span></p>
                </Form>
            </Col>
           </Row>
        </div>
     )
}
export default Login;