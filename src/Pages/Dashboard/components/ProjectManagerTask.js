import React, { useState } from "react";
import { remove, edit } from "../../../svgs";
import "../css/ProjectManagerTask.css";

const ProjectManagerTask = ({ desc, innerRef, style, title }) => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(desc);

  const redColor = "#FF4A4A";
  const greenColor = "#79FF4A";
  const yellowColor = "#FFD74A";

  const setBtnsContent = () => {
    return title === "todo"
      ? ["done", "onhold"]
      : title === "done"
      ? ["todo", "onhold"]
      : ["todo", "done"];
  };
  const BtnsContent = setBtnsContent();

  const statusStyle = (index) => {
    return {
      backgroundColor:
        BtnsContent[index] === "todo"
          ? redColor
          : BtnsContent[index] === "done"
          ? greenColor
          : yellowColor,
    };
  };

  const switchStatus = (e) => {
    {
      /* Change The status of the current Task */
    }
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const openUpdate = () => {
    setOpen(true);
  };

  return (
    <div className="project-manager-task" ref={innerRef} style={style}>
      {open ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            id="task"
            value={task}
            onChange={handleChange}
          />
        </form>
      ) : (
        <div>
          <p>{task}</p>
          <div onClick={openUpdate}>{edit}</div>
        </div>
      )}
      <hr />
      <div className="controls">
        <div className="controls-btns">
          <div>
            <button onClick={switchStatus}>
              {" "}
              <span className="status" style={statusStyle(0)}></span>
              {BtnsContent[0]}
            </button>
          </div>
          <div>
            <button onClick={switchStatus}>
              <span className="status" style={statusStyle(1)}></span>
              {BtnsContent[1]}
            </button>
          </div>
        </div>
        {remove}
      </div>
    </div>
  );
};

export default ProjectManagerTask;
