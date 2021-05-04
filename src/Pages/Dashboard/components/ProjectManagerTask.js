import Spinner from "../../_GlobalComponents/Spinner";
import { useTaskState } from "./StateContext";
import { remove, edit } from "../../../svgs";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import api from "../../../axios.config";
import "../css/ProjectManagerTask.css";

const ProjectManagerTask = ({ t, innerRef, style, title, id2List }) => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(t.description);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const [state, updateState] = useTaskState();

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

  const switchStatus = async (e) => {
    const currentStatus = e.target.innerText.toString();
    const itemsToRemoveFrom = id2List[t.status];
    const itemsToAddOn = id2List[currentStatus];
    const filtred = state[itemsToRemoveFrom].filter((task) => task.id !== t.id);
    t.status = currentStatus;
    try {
      setLoading(true);
      const res = await api.put(
        `/tasks/${t.id}`,
        {
          status: e.target.innerText,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setLoading(false);
    } catch (error) {
      return setLoading(false);
    }
    updateState({
      [itemsToAddOn]: [...state[itemsToAddOn], t],
      [itemsToRemoveFrom]: filtred,
    });
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.put(
        `/tasks/${t.id}`,
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      t.description = task;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setOpen(false);
  };

  const openUpdate = () => {
    setOpen(true);
  };

  const deleteTask = async () => {
    const itemsToRemoveFrom = state[id2List[t.status]];
    try {
      setLoading(true);
      await api.delete(`/tasks/${t.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    } catch (error) {
      return setLoading(false);
    }
    const filtred = itemsToRemoveFrom.filter((task) => task.id !== t.id);
    setLoading(false);
    updateState({ [id2List[t.status]]: filtred });
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleSubmit();
    }
  };

  return (
    <>
      {loading ? (
        <Spinner cx="20" cy="20" r="20" width="100%" height="100%" />
      ) : (
        <div className="project-manager-task" ref={innerRef} style={style}>
          {open ? (
            <form>
              <textarea
                type="text"
                name="task"
                id="task"
                rows={3}
                value={task}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              ></textarea>
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
            <div onClick={deleteTask}>{remove}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectManagerTask;
