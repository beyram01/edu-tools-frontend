import React from "react";

// CSS File: Services.css

const Service = ({ svg, name, description }) => {
  return (
    <div className="tool">
      <div>{svg}</div>
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Service;
