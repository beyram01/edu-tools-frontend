import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Project from "./Project";
import api from "../../../axios.config";
import { useSelector } from "react-redux";
import { StateContextProvider } from "./StateContext";

import Spinner from "../../_GlobalComponents/Spinner";
import { remove, plus } from "../../../svgs";
import "../css/ProjectManager.css";

const formatTitle = (title) => {
  return title.split(" ").join("-");
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [AddProject, setAddProject] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [projectTitle, setProjectTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { title } = useParams();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const me = await api("/users/me", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCurrentUser(me.data);
        const res = await api(`/projects?owner=${me.data._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProjects(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setError("");
    setProjectTitle(e.target.value);
  };

  const openAddProject = () => {
    setAddProject(true);
  };

  const closeAddProject = () => {
    setAddProject(false);
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("hello");
      const res = await api.post(
        "/projects",
        {
          Title: projectTitle,
          owner: currentUser._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res);
      setProjects([...projects, res.data]);
      setProjectTitle("");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      setLoading(true);
      const res = await api.delete(`/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res);
      setProjects(projects.filter((p) => p._id !== res.data._id));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner cx="20" cy="20" r="20" width="100%" height="100%" />
      ) : (
        <div className="project-manager">
          {title ? (
            <>
              <StateContextProvider>
                <Project title={title} />
              </StateContextProvider>
            </>
          ) : (
            <>
              <h4>Project Manager</h4>
              <div className="projects-manager-body">
                <h5>Projects</h5>
                <div className="projects-container">
                  <div className="projects">
                    {projects.map((project) => {
                      const url_slug = formatTitle(project.Title);
                      return (
                        <div className="project" key={project._id}>
                          <a href={`/dashboard/project-manager/${url_slug}`}>
                            {project.Title}
                          </a>
                          <div
                            id="delete"
                            onClick={async () =>
                              await deleteProject(project._id)
                            }
                          >
                            {remove}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {AddProject ? (
                    <div className="add-project">
                      <form onSubmit={createProject}>
                        <h6>New Project</h6>
                        <input
                          type="text"
                          name="project"
                          id="project"
                          value={projectTitle}
                          placeholder="Project Name"
                          onChange={handleChange}
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
      )}
    </>
  );
};

export default ProjectManager;
