import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Project from "./Project.jsx";
import projectContext from "../../context/projects/ProjectContext.jsx";

const ProjectsList = () => {
  // Context
  const projectsContext = useContext(projectContext);
  const { projects, getProjects } = projectsContext;

  // Loading projects as soon as page load
  useEffect(() => {
    getProjects();
    // eslint-disable-next-line
  }, []);

  // Verifying projects length to show its content
  if (projects.length === 0)
    return <p>No hay projectos, comienza creando uno.</p>;

  return (
    <ul className="listado-proyectos">
      {
        <TransitionGroup>
          {projects.map(project => (
              <CSSTransition
                key={project.id}
                timeout={200}
                classNames="proyecto" 
              >
                  <Project project={project} />
              </CSSTransition>
          ))}
        </TransitionGroup>
      }
    </ul>
  );
};

export default ProjectsList;
