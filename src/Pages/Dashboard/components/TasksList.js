import React, { useState } from "react";
import ProjectManagerTask from "./ProjectManagerTask";
import { Draggable } from "react-beautiful-dnd";
import { useTaskState } from "./StateContext";
import { useSelector } from "react-redux";
import api from "../../../axios.config";
import { plus } from "../../../svgs";
import "../css/TasksList.css";

const getItemStyle = (isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: "white",
});

const TasksList = ({ title, innerRef, id2List, style, currentProject }) => {
  const [openNewTask, setOpenNewTask] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [state, updateState] = useTaskState();

  const user = useSelector((state) => state.user);

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

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post(
        "/tasks",
        {
          description: description,
          status: "todo",
          project: currentProject.id,
          index: state.todoItems.length,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      updateState({ todoItems: [...state.todoItems, res.data] });
      setDescription("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    e.target.scrollIntoView();
  };
  return (
    <div className="task-container">
      <h6>
        <span className="big-status" style={bigStatusStyle}></span>
        {title}
      </h6>
      <div className="project-manager-tasks" ref={innerRef} style={style}>
        {state[id2List[title]] &&
          state[id2List[title]].map((t, index) => {
            return (
              <Draggable key={`${t.id}`} draggableId={`${t.id}`} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ProjectManagerTask
                        t={t}
                        state={state}
                        title={title}
                        id2List={id2List}
                        style={getItemStyle(snapshot.isDragging)}
                      />
                    </div>
                  );
                }}
              </Draggable>
            );
          })}
        {title === "todo" && (
          <div className="project-manager-new-task">
            {openNewTask ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={description}
                  name="description"
                  id="description"
                  placeholder="Task"
                  onChange={handleChange}
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
