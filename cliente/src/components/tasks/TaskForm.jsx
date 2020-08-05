import React, { useContext, useState, useEffect } from "react";
import projectContext from "../../context/projects/ProjectContext.jsx";
import taskContext from "../../context/tasks/TaskContext.jsx";

const TaskForm = () => {
  // Context
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  // Calling addTask function
  const tasksContext = useContext(taskContext);
  const {
    selectedTask,
    taskError,
    addTask,
    validateTask,
    getTasks,
    updateTask,
    clearTask
  } = tasksContext;

  useEffect(() => {
    if (selectedTask !== null) {
      setTask(selectedTask);
    } else {
      setTask({
        name: "",
      });
    }
  }, [selectedTask]);

  // Form state
  const [task, setTask] = useState({
    name: "",
  });

  // Getting project name
  const { name } = task;

  // show form when a project is selected
  // if there is no project selected
  if (!project) {
    return null;
  }

  // Array destructuring to extract current project
  const [currentProject] = project;

  // Read form value
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // validate
    if (name.trim() === "") {
      validateTask();
      return;
    }

    // Check if it is a new task or an edit
    if (selectedTask === null) {
      // pass validation
      // add a new task to taskState
      task.projectId = currentProject.id;
      task.state = false;
      addTask(task);
    } else {
      // Updating selected task
      updateTask(task);

      // Clear selected Task
      clearTask();
    }

    // Get and filter project's tasks
    getTasks(currentProject.id);

    // reset form
    setTask({
      name: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <button
            type="submit"
            className="btn btn-primario btn-submit btn-block"
          >
            {selectedTask ? "Editar Tarea" : "Agregar Tarea"}
          </button>
        </div>
      </form>
      {taskError ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default TaskForm;
