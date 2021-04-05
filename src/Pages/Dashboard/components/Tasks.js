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
  const [updateDiv, setUpdateDiv] = useState("");
  const [updatedData, setUpdatedData] = useState({
    hour: "",
    minute: "",
    description: "",
  });

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
    setError("");
    const name = e.target.name;
    const value = e.target.value;
    if (name === "minute") {
      if (value > 59) return setMinute(59);
      return setMinute(value);
    } else if (name === "task") {
      setDescription(value);
    } else {
      if (value > 23) return setHour(23);
      setHour(value);
    }
  };

  const handleUpdate = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const openUpdateDiv = (event) => {
    const [hour, minute] = event.time.split(":");
    setUpdateDiv(event.id);
    setUpdatedData({
      ...updatedData,
      description: event.description,
      hour: hour,
      minute: minute,
    });
  };

  const updateTask = async (e, taskId) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        description: updatedData.description,
        time: `${updatedData.hour}:${updatedData.minute}`,
      };
      const res = await api.put(`/events/${taskId}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res);
      let filterEvents = specifiecEvents.filter((event) => event.id !== taskId);
      filterEvents.push(res.data);
      setSpecifiecEvents(filterEvents);
      setUpdateDiv("");
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const res = await api.delete(`/events/${taskId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const filteredEvents = specifiecEvents.filter(
        (ev) => ev.id !== res.data.id
      );
      setSpecifiecEvents(filteredEvents);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
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
      setHour("00");
      setMinute("00");
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
          return (
            <div className="one-task" key={event.id}>
              {updateDiv === event.id ? (
                <>
                  <div className="new-time update-time">
                    <input
                      type="number"
                      name="hour"
                      value={updatedData.hour}
                      onChange={handleUpdate}
                      min="00"
                      max="23"
                    />
                    <div>:</div>
                    <input
                      type="number"
                      name="minute"
                      value={updatedData.minute}
                      onChange={handleUpdate}
                      min="00"
                      max="59"
                    />
                  </div>
                  <div className="new-task">
                    <form onSubmit={(e) => updateTask(e, event.id)}>
                      <input
                        type="text"
                        name="description"
                        placeholder="What are you going to do Today?"
                        value={updatedData.description}
                        onChange={handleUpdate}
                      />
                      <div>
                        <button onClick={() => setUpdateDiv("")}>Cancel</button>
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
                            "Update Task"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="new-status"></div>
                </>
              ) : (
                <>
                  <div className="time">
                    <p>{event.time}</p>
                  </div>
                  <div className="task">
                    <p>{event.description}</p>
                  </div>
                  <div className="status">
                    <div onClick={() => openUpdateDiv(event)}>{edit}</div>
                    <div onClick={() => deleteTask(event.id)}>{remove}</div>
                  </div>
                </>
              )}
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
