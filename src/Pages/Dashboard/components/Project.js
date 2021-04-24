import React, { useState, useEffect } from "react";

import TasksList from "./TasksList";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

import "../css/TasksList.css";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

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

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
});

const data = [
  {
    todo: [
      {
        id: 1,
        desc: "Drag Me from todo 1",
        title: "todo",
      },
      {
        id: 2,
        desc: "Drag Me from todo 2",
        title: "todo",
      },
      {
        id: 3,
        desc: "Drag Me from todo 3",
        title: "todo",
      },
    ],
  },
  {
    done: [
      {
        id: 4,
        desc: "Drag Me from done 1",
        title: "done",
      },
      {
        id: 5,
        desc: "Drag Me from done 2",
        title: "done",
      },
      {
        id: 6,
        desc: "Drag Me from done 3",
        title: "done",
      },
    ],
  },
  {
    onhold: [
      {
        id: 7,
        desc: "Drag Me from onhold 1",
        title: "onhold",
      },
      {
        id: 8,
        desc: "Drag Me from onhold 2",
        title: "onhold",
      },
      {
        id: 9,
        desc: "Drag Me from onhold 3",
        title: "onhold",
      },
      {
        id: 10,
        desc: "Drag Me from onhold 3",
        title: "onhold",
      },
      {
        id: 11,
        desc: "Drag Me from onhold 3",
        title: "onhold",
      },
      {
        id: 12,
        desc: "Drag Me from onhold 3",
        title: "onhold",
      },
      {
        id: 13,
        desc: "Drag Me from onhold 3",
        title: "onhold",
      },
    ],
  },
];

const Project = ({ title }) => {
  const titles = ["todo", "done", "onhold"];

  const [state, setState] = useState({
    todoItems: data[0].todo,
    doneItems: data[1].done,
    onholdItems: data[2].onhold,
  });
  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  const id2List = {
    todo: "todoItems",
    done: "doneItems",
    onhold: "onholdItems",
  };

  const getList = (id) => state[id2List[id]];

  const handleDragEnd = (result) => {
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
      setState({ ...state, [stat]: items });
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      console.log(result);
      let Changed = [];

      if (result.todo) Changed.push("todo");
      if (result.done) Changed.push("done");
      if (result.onhold) Changed.push("onhold");
      console.log(Changed);

      setState({
        ...state,
        [id2List[Changed[0]]]: result[Changed[0]],
        [id2List[Changed[1]]]: result[Changed[1]],
      });

      Changed = [];
    }
  };

  return (
    <>
      {winReady && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <h5>{title}</h5>
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
                        state={state}
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
