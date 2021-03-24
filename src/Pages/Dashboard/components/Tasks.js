import React from "react";
import { plus, remove } from "../../../svgs";
import "../css/Tasks.css";

const Tasks = ({ title }) => {
  return (
    <div className="tasks">
      <h4>{title}</h4>
      <div className="tasks-container">
        <div className="labels">
          <p className="label-name time">Time</p>
          <p className="label-name task">Task</p>
          <p className="label-name status">Status</p>
        </div>
        <div className="one-task">
          <div className="time">
            <p>12:30</p>
          </div>
          <div className="task">
            <p>Continue working on the website</p>
          </div>
          <div className="status">
            <input type="checkbox" name="finish" id="finish" />
            {remove}
          </div>
        </div>
        <div className="addTask">
          <div className="time"></div>
          <div className="task">{plus}</div>
          <div className="status"></div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
