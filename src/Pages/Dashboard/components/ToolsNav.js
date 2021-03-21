import React, { useState } from "react";
import { avatar, translator, arrow, encyclopedia } from "../../../svgs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/ToolsNav.css";

const ToolsNav = () => {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const username = useSelector((state) => state.user.username);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? "tools-nav tools-nav-open" : "tools-nav"}>
      <div
        className={open ? "controller controller-switch" : "controller"}
        onClick={handleClick}
      >
        {arrow}
      </div>
      <div className="user">
        {avatar}
        <p className="username">{username}</p>
      </div>
      <div className="tools-nav-links">
        <a
          href="/dashboard/translator"
          className="tools-nav-link"
          id="translator"
          style={
            params.tool === "translator"
              ? {
                  backgroundColor: "var(--dark-pirple)",
                }
              : {}
          }
        >
          {translator}
          <p>Translator</p>
        </a>
        <a
          href="/dashboard/encyclopedia"
          className="tools-nav-link"
          style={
            params.tool === "encyclopedia"
              ? {
                  backgroundColor: "var(--dark-pirple)",
                }
              : {}
          }
        >
          {encyclopedia}
          <p>Encyclopedia</p>
        </a>
        <a href="#" className="tools-nav-link">
          {translator}
          <p>Translator</p>
        </a>
        <a href="#" className="tools-nav-link">
          {translator}
          <p>Translator</p>
        </a>
      </div>
    </div>
  );
};

export default ToolsNav;
