import React,{useState} from "react";
import Menuitems from "./MenuItems";
import "./Navbarstyles.css";
import {Link} from "react-router-dom";
function Navbar(){
    const [icon,setIcon]=useState(false);
    const [hide,setHide]=useState("menu");
        return(
            <div>
                <nav className="navbar">
                    <h1>Title</h1>
                    <div className="menu-icons">
                    {icon?<i onClick={()=>{
                        setIcon(false)
                        setHide("menu")
                    }} className="fas fa-times"></i>:<i onClick={()=>{
                        setIcon(true)
                        setHide("menu active")
                    }} className="fas fa-bars"></i>}
                    
                      </div>
                    <ul className={hide}>
                        {Menuitems.map((items,index)=>{
                            return(
                                <li key={index}>
                                <Link className={items.className} to={items.route}>
                                <i className={items.icon}></i>
                                {items.title}
                            </Link> 
                                </li>
                                );
                          })}
                    </ul>
                    
                </nav>
            </div>
        )
       
}
export default Navbar;