// Wrapper.js
import React from "react";
import "./Wrapper.css";
import Watermark from "./Watermark";

const Wrapper = ({ children }) => {
  return (
    <div className="App">
      {children}
      <Watermark />
    </div>
  );
};

export default Wrapper;
