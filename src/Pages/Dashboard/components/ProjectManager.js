import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Project from "./Project";

import { remove, plus } from "../../../svgs";
import "../css/ProjectManager.css";

const ProjectManager = () => {
  const [AddProject, setAddProject] = useState(false);

  const { title } = useParams();

  const openAddProject = () => {
    setAddProject(true);
  };

  const closeAddProject = () => {
    setAddProject(false);
  };

  return (
    <>
      <div className="project-manager">
        {title ? (
          <>
            <Project title={title} />
          </>
        ) : (
          <>
            <h4>Project Manager</h4>
            <div className="projects-manager-body">
              <h5>Projects</h5>
              <div className="projects-container">
                <div className="projects">
                  <a href="/dashboard/project-manager/Edu-tools-website">
                    <div className="project">
                      <p>Edu-tools website</p>
                      <div>{remove}</div>
                    </div>
                  </a>
                  <a href="/dashboard/project-manager/Edu-tools-website">
                    <div className="project">
                      <p>Edu-tools website</p>
                      <div>{remove}</div>
                    </div>
                  </a>
                </div>
                {AddProject ? (
                  <div className="add-project">
                    <form>
                      <h6>New Project</h6>
                      <input
                        type="text"
                        name="project"
                        id="project"
                        placeholder="Project Name"
                      />
                      <div className="btns">
                        <button type="submit" id="submit">
                          Create Project
                        </button>
                        <div className="cancel-btn" onClick={closeAddProject}>
                          Cancel
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="add-project" onClick={openAddProject}>
                    <div>{plus}</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProjectManager;
