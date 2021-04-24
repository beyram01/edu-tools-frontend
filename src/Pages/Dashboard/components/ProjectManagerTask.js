import React from "react";
import "../css/ProjectManagerTask.css";

const ProjectManagerTask = ({ desc, innerRef, style }) => {
  return (
    <div className="project-manager-task" ref={innerRef} style={style}>
      <p>{desc}</p>
    </div>
  );
};

export default ProjectManagerTask;
