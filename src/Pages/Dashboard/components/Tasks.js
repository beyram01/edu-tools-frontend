import React, { useState, useEffect } from "react";
import api from "../../../axios.config";
import { useSelector } from "react-redux";
import { plus, remove, edit } from "../../../svgs";
import Spinner from "../../_GlobalComponents/Spinner";
import "../css/Tasks.css";

const Tasks = ({ title, width, unfinishidEvents, filterDate }) => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [minute, setMinute] = useState("00");
  const [hour, setHour] = useState("00");
  const [description, setDescription] = useState("");
  const [specifiecEvents, setSpecifiecEvents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.user);

  const filterTitle = () => {
    const [day, month, year] = title.split("-");
    const { fDay, fMonth, fYear } = filterDate(day, month, year);
    return { fDay, fMonth, fYear };
  };

  useEffect(() => {
    const { fDay, fMonth, fYear } = filterTitle();
    const todaysTasks = unfinishidEvents.filter(
      (event) => event.day === `${fYear}-${fMonth}-${fDay}`
    );
    setSpecifiecEvents(todaysTasks);
  }, [unfinishidEvents]);

  const openNewTask = () => {
    setOpenAddTask(true);
  };
  const closeNewTask = () => {
    setOpenAddTask(false);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "minute") {
      setMinute(value);
    } else if (name === "task") {
      setDescription(value);
    } else {
      setHour(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!description) throw new Error("description is required");
      const { fDay, fMonth, fYear } = filterTitle();
      const User = await api("/users/me", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = {
        description,
        day: new Date(fYear, fMonth - 1, fDay),
        time: `${hour}:${minute}`,
        users_permissions_user: User.data.id,
      };
      const res = await api.post("/events", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSpecifiecEvents([...specifiecEvents, res.data]);
      setDescription("");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="tasks">
      <h4>{title}</h4>
      <div className="tasks-container">
        <div className="labels">
          <p className="label-name time">Time</p>
          <p className="label-name task">Task</p>
          <p className="label-name status">Status</p>
        </div>
        {specifiecEvents.map((event) => {
          const time = /\d\d:\d\d/g.exec(event.time);
          return (
            <div className="one-task" key={event.id}>
              <div className="time">
                <p>{time}</p>
              </div>
              <div className="task">
                <p>{event.description}</p>
              </div>
              <div className="status">
                <input type="checkbox" name="finish" id="finish" />
                {edit}
                {remove}
              </div>
            </div>
          );
        })}
        <div
          className="addTask"
          style={
            width < 850
              ? openAddTask
                ? { flexDirection: "column" }
                : { flexDirection: "row" }
              : { flexDirection: "row" }
          }
        >
          {openAddTask ? (
            <>
              <div className="new-time">
                <input
                  type="number"
                  name="hour"
                  id="hour"
                  value={hour}
                  onChange={handleChange}
                  min="00"
                  max="23"
                />
                <div>:</div>
                <input
                  type="number"
                  name="minute"
                  id="minute"
                  value={minute}
                  onChange={handleChange}
                  min="00"
                  max="59"
                />
              </div>
              <div className="new-task">
                {/*error*/}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="task"
                    id="task"
                    placeholder="What are you going to do Today?"
                    value={description}
                    onChange={handleChange}
                  />
                  <div>
                    <button onClick={closeNewTask}>Cancel</button>
                    <button type="submit" id="submit">
                      {loading ? (
                        <Spinner
                          cx="10"
                          cy="10"
                          r="10"
                          width="100%"
                          height="100%"
                          color="#ffffff"
                          spinnerWidth="25px"
                          spinnerHeight="25px"
                          strokeWidth="2px"
                          transform="translate(2px, 2px)"
                          strokeDasharray="80"
                          strokeDashoffset="80"
                        />
                      ) : (
                        "Add Task"
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="new-status"></div>
            </>
          ) : (
            <>
              <div className="time"></div>
              <div className="task" onClick={openNewTask}>
                {plus}
              </div>
              <div className="status"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
