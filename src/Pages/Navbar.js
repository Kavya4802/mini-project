import React, { useState } from "react";
import Menuitems from "./MenuItems";
import "./Navbarstyles.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import DropDown from "../Components/DropDown";
function Navbar({userc}) {
  const [icon, setIcon] = useState(false);
  const [hide, setHide] = useState("menu");
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        // Make an API request to get the user's cart count
        const response = await fetch(`http://localhost:5000/getcartcount/${user.email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user's token
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setCartCount(data.cartCount);
          
        } else {
          console.error("Error fetching cart count");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Fetch cart count when the component mounts
    fetchCartCount();
  }, [user]); // Add user to the dependency array
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/getusers", {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setUser(data.user);
            
          } else {
            console.log("Error fetching user details");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCartCount(0);
    setOpenProfile(false);
  };
  //  function printCartCount(){
  //   console.log("naa cart lo:",cartCount);
  //  }
  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.o" />
      <nav className="navbar">
        <h1>Nearme Bikes</h1>
        <div className="menu-icons">
          {icon ? (
            <i
              onClick={() => {
                setIcon(false);
                setHide("menu");
              }}
              className="fas fa-times"
            ></i>
          ) : (
            <i
              onClick={() => {
                setIcon(true);
                setHide("menu active");
              }}
              className="fas fa-bars"
            ></i>
          )}
        </div>
        <ul className={hide}>
          {Menuitems.map((items, index) => (
            <li key={index}>
              {items.title === "Signup" && user ? (
                <span
                  className="nav-links"
                  onClick={() => setOpenProfile((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                >
                  Hi, {user.name}
                </span>
              ) : (
                <Link className={items.className} to={items.route}>
                  <i className={items.icon}></i>
                  {items.title}
                </Link>
              )}
            </li>
          ))}
          <li>
          <Link to="/cart" style={{textDecoration:"none"}}>
              <div>
                <i className="fas fa-shopping-cart"></i>
               <span className="cart-badge">{cartCount}</span>
              </div>
            </Link>
          </li>
        </ul>

        {openProfile && <DropDown onLogout={handleLogout} />}
      </nav>
    </div>
  );
}
export default Navbar;
 
  // return (
  //   <div>
  //     <h1>{user.email}</h1>
  //     {cartItems.map((item) => (
  //       <div key={item.id}>
  //         <p>{item.name}</p>
  //         {/* Add more details about the item */}
  //       </div>
  //     ))}
  //   </div>
  // );