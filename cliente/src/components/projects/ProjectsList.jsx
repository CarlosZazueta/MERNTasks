import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Project from "./Project.jsx";
import AlertContext from '../../context/alert/AlertContext.jsx';
import projectContext from "../../context/projects/ProjectContext.jsx";

const ProjectsList = () => {
  // Context
  const projectsContext = useContext(projectContext);
  const { msg, projects, getProjects } = projectsContext;

  const alertContext = useContext(AlertContext);
  const {alert, showAlert} = alertContext;

  // Loading projects as soon as page load
  useEffect(() => {
    // Si hay un error
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    getProjects();
    // eslint-disable-next-line
  }, [msg]);

  // Verifying projects length to show its content
  if (projects.length === 0)
    return <p>No hay projectos, comienza creando uno.</p>;

  return (
    <ul className="listado-proyectos">
      { alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null}
      <TransitionGroup>
        {projects.map(project => (
            <CSSTransition
              key={project._id}
              timeout={200}
              classNames="proyecto" 
            >
                <Project project={project} />
            </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectsList;
