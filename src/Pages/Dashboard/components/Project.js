import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import TasksList from "./TasksList";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import api from "../../../axios.config";
import {
  StateContext,
  StateContextProvider,
  useTaskState,
} from "./StateContext";
import Spinner from "../../_GlobalComponents/Spinner";
import "../css/TasksList.css";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = (isDraggingOver) => ({
  border: `1px solid ${isDraggingOver ? "#bdbdbd" : "white"}`,
});

const Project = ({ title }) => {
  const titles = ["todo", "done", "onhold"];
  /*
  const [state, setState] = useState({
    todoItems: [],
    doneItems: [],
    onholdItems: [],
  });
*/
  const [state, updateState] = useTaskState();
  const [currentProject, setCurrentProject] = useState();
  const [loading, setLoading] = useState(true);

  const cleanTitle = title.split("-").join(" ");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(cleanTitle);
        const currentProject = await api.get(`/projects?Title=${cleanTitle}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCurrentProject(currentProject.data[0]);
        const todoTasks = currentProject.data[0].tasks.filter(
          (task) => task.status === "todo"
        );
        //.sort((a, b) => a.index - b.index);
        const doneTasks = currentProject.data[0].tasks.filter(
          (task) => task.status === "done"
        );
        //.sort((a, b) => a.index - b.index);
        const onHoldTasks = currentProject.data[0].tasks.filter(
          (task) => task.status === "onhold"
        );
        //.sort((a, b) => a.index - b.index);
        updateState({
          todoItems: todoTasks,
          doneItems: doneTasks,
          onholdItems: onHoldTasks,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const id2List = {
    todo: "todoItems",
    done: "doneItems",
    onhold: "onholdItems",
  };

  const getList = (id) => state[id2List[id]];
  /*
  const updateIndex = async (source, destination, items) => {
    let debug = [];
    if (source.droppableId === destination.droppableId) {
      let start, end;
      start =
        source.index > destination.index ? destination.index : source.index;
      end = source.index < destination.index ? destination.index : source.index;
      let betweenIndexes = [];
      for (let i = start; i <= end; i++) {
        betweenIndexes.push(i);
      }
      console.log(betweenIndexes);
      betweenIndexes.forEach(async (index) => {
        const task = items.filter((t) => t.index === index)[0];
        if (task) {
          if (source.index > destination.index) {
            if (index !== source.index) {
              await api.put(
                `/tasks/${task.id}`,
                {
                  index: task.index + 1,
                },
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );
            }
            debug.push({ [task.description]: index + 1 });
          } else if (source.index == destination.index) {
            return;
          } else {
            if (index !== destination.index) {
              await api.put(
                `/tasks/${task.id}`,
                {
                  index: task.index - 1,
                },
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );
            }
            debug.push({ [task.description]: index - 1 });
          }
        } else {
          console.log("task undefined");
        }
      });
    } else {
      const tasks = await api(
        `/tasks?status=${destination.droppableId}&&index_gte=${destination.index}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      debug.push({ tasks: tasks });
      if (tasks.data) {
        tasks.data.forEach(async (task) => {
          await api.put(
            "/tasks/" + task.id,
            { index: task.index + 1 },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
        });
      }
      const res = await api(`/tasks?status=${destination.droppableId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      return res.data.sort((a, b) => a.index - b.index);
    }
    console.log(debug);
  };
*/
  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    console.log(result);
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      console.log(items);

      let stat = "todoItems";

      if (source.droppableId === "done") {
        stat = "doneItems";
      }
      if (source.droppableId === "onhold") {
        stat = "onholdItems";
      }
      console.log(stat);
      // await updateIndex(source, destination, items);
      /*
      await api.put(
        `/tasks/${result.draggableId}`,
        {
          index: destination.index,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      
      const res = await api.get("/tasks?status=" + source.droppableId, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      */
      updateState({
        [stat]: items,
        //[id2List[source.droppableId]]: res.data,
      });
    } else {
      const afterMove = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      console.log(afterMove);
      let Changed = [];

      if (afterMove.todo) Changed.push("todo");
      if (afterMove.done) Changed.push("done");
      if (afterMove.onhold) Changed.push("onhold");
      console.log(Changed);

      const itemsToRemoveFrom = getList(source.droppableId);
      const itemsToAddOn = getList(destination.droppableId);
      const currentTask = itemsToRemoveFrom.filter(
        (task) => task.id === result.draggableId
      )[0];
      console.log(itemsToRemoveFrom, itemsToAddOn, currentTask);
      const filtred = itemsToRemoveFrom.filter(
        (task) => task.id !== result.draggableId
      );
      currentTask.status = destination.droppableId;

      try {
        setLoading(true);
        const res = await api.put(
          `/tasks/${result.draggableId}`,
          {
            status: destination.droppableId,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log(res);
        setLoading(false);
      } catch (error) {
        return setLoading(false);
      }
      //const arr = await updateIndex(source, destination, itemsToAddOn);

      updateState({
        [id2List[Changed[0]]]: afterMove[Changed[0]],
        [id2List[Changed[1]]]: afterMove[Changed[1]],
        [id2List[destination.droppableId]]: [...itemsToAddOn, currentTask],
        [id2List[source.droppableId]]: filtred,
        //[id2List[destination.droppableId]]: arr,
      });

      Changed = [];
    }
  };

  return (
    <>
      {loading ? (
        <Spinner cx="20" cy="20" r="20" width="100%" height="100%" />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <h5>{cleanTitle}</h5>
          <div className="droppable-container">
            {titles.map((title) => {
              return (
                <Droppable key={title} droppableId={title}>
                  {(provided, snapshot) => (
                    <>
                      <TasksList
                        innerRef={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        title={title}
                        currentProject={currentProject}
                        id2List={id2List}
                      />
                    </>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

export default Project;
