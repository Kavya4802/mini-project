import React from 'react';
import './Watermark.css';
import watermarkImage from "./watermark.png";

const Watermark = () => {
  return (
    <div className="watermark">
      <img src={watermarkImage} alt="Watermark" />
    </div>
  );
};

export default Watermark;
