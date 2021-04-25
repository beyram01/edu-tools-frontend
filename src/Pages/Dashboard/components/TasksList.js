import React, { useState } from "react";
import ProjectManagerTask from "./ProjectManagerTask";
import { Draggable } from "react-beautiful-dnd";
import { plus } from "../../../svgs";
import "../css/TasksList.css";

const getItemStyle = (isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
});

const TasksList = ({ title, state, innerRef, id2List, style }) => {
  const [openNewTask, setOpenNewTask] = useState(false);

  const redColor = "#FF4A4A";
  const greenColor = "#79FF4A";
  const yellowColor = "#FFD74A";

  const bigStatusStyle = {
    backgroundColor:
      title === "todo" ? redColor : title === "done" ? greenColor : yellowColor,
  };

  const handleOpenNewTask = () => {
    setOpenNewTask(true);
  };
  const closeNewTask = () => {
    setOpenNewTask(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save task to db
  };
  return (
    <div className="task-container">
      <h6>
        <span className="big-status" style={bigStatusStyle}></span>
        {title}
      </h6>
      <div className="project-manager-tasks" ref={innerRef} style={style}>
        {state[id2List[title]] &&
          state[id2List[title]].map((t, index) => (
            <Draggable key={`${t.id}`} draggableId={`${t.id}`} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <ProjectManagerTask
                    desc={t.desc}
                    title={title}
                    style={getItemStyle(snapshot.isDragging)}
                  />
                </div>
              )}
            </Draggable>
          ))}
        {title === "todo" && (
          <div className="project-manager-new-task">
            {openNewTask ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Task"
                />
                <div className="new-task-btns">
                  <button type="submit">Add Task</button>
                  <button onClick={closeNewTask}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="open-new-task" onClick={handleOpenNewTask}>
                {plus} New Task
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksList;
