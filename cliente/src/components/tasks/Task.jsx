import React, { useContext } from "react";
import taskContext from "../../context/tasks/TaskContext.jsx";
import projectContext from "../../context/projects/ProjectContext.jsx";

const Task = ({ task }) => {
  // Getting tasks context
  const tasksContext = useContext(taskContext);
  const { 
    deleteTask, 
    getTasks, 
    changeTaskState, 
    getTaskContent 
  } = tasksContext;

  // Getting project context
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  const [currentProject] = project;

  // Function that delete a task from the list
  const taksDelete = (id) => {
    deleteTask(id);
    getTasks(currentProject.id);
  };

  // Function to change tasks state when is completed
  const changeState = task => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    changeTaskState(task);
  }

  // Editing current task
  const editTask = task => {
    getTaskContent(task);
  }

  return (
    <li className="tarea sombra">
      <p> {task.name} </p>
      <div className="estado">
        {task.state ? (
          <button 
            type="button" 
            className="completo"
            onClick={() => changeState(task)}
          >
            Completado
          </button>
        ) : (
          <button 
            type="button" 
            className="incompleto"
            onClick={() => changeState(task)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button 
          type="button" 
          className="btn btn-primario"
          onClick={() => editTask(task)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => taksDelete(task.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Task;
