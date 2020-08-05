import React, { Fragment, useContext } from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import projectContext from "../../context/projects/ProjectContext.jsx";
import taskContext from "../../context/tasks/TaskContext.jsx";
import Task from "./Task.jsx";

const TasksList = () => {
  // Project Context
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;

  // Task Context
  const tasksContext = useContext(taskContext);
  const {projectTasks} = tasksContext;

  // if there is no project selected
  if (!project) {
      return <h2>Selecciona un proyecto</h2>
  }

  // Array destructuring to extract current project
  const [currentProject] = project;

  //Delete a project
  const onClickDelete = () => {
    deleteProject(currentProject.id);
  }

  return (
    <Fragment>
      <h2>Proyecto: {currentProject.name}</h2>

      <ul className="listado-tareas">
        {projectTasks.length === 0 ? (
          <li className="tarea">No hay tareas</li>
        ) : (
          <TransitionGroup>
            {projectTasks.map((task) => 
              <CSSTransition 
                key={task.id} 
                timeout={200}
                classNames="tarea"
              >
                <Task task={task} />
              </CSSTransition>
            )}
          </TransitionGroup>
        )}
      </ul>
      <button 
        type="button" 
        className="btn btn-primario btn-eliminar"
        onClick={onClickDelete}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default TasksList;
