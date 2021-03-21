import React from "react";
import "../css/Encyclopedia.css";

const Encyclopedia = () => {
  return (
    <div className="encyclopedia">
      <h4>Encyclopedia</h4>
      <form action="">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="What do you want to learn Today?"
        />
        <button type="submit">Search</button>
      </form>
      <div className="result"></div>
    </div>
  );
};

export default Encyclopedia;
