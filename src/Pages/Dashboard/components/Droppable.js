import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskContainer from "./TaskContainer";

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? "green" : undefined,
    marginBottom: "1rem",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;
