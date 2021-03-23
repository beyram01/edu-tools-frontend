import React from "react";
import "./Spinner.css";
const Spinner = (props) => {
  const {
    cx,
    cy,
    r,
    width,
    height,
    color,
    spinnerWidth,
    spinnerHeight,
    strokeWidth,
    transform,
    strokeDasharray,
    strokeDashoffset,
  } = props;

  const spinnerContainerStyle = {
    width,
    height,
  };

  const spinnerStyle = {
    width: spinnerWidth,
    height: spinnerHeight,
  };

  const circleStyle = {
    stroke: color,
    strokeWidth,
    transform,
    strokeDasharray,
    strokeDashoffset,
  };

  return (
    <div className="spinner-container" style={spinnerContainerStyle}>
      <svg id="spinner" style={spinnerStyle}>
        <circle cx={cx} cy={cy} r={r} style={circleStyle}></circle>
      </svg>
    </div>
  );
};

export default Spinner;
