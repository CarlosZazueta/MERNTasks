import React, { useReducer } from "react";
import TaskContext from "./TaskContext.jsx";
import TaskReducer from "./TaskReducer.jsx";
import {v4 as uuidv4} from 'uuid';

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types/index.jsx";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { id: 1, projectId: 1, name: "Elegir plataforma", state: true },
      { id: 2, projectId: 2, name: "Elegir colores", state: false },
      { id: 3, projectId: 3, name: "Elegir plataforma de pago", state: false },
      { id: 4, projectId: 4, name: "Elegir plataforma hosting", state: true },
      { id: 5, projectId: 2, name: "Cambiar diesño", state: false },
      { id: 6, projectId: 4, name: "Realizar pruebas de despliegue", state: true },
      { id: 7, projectId: 1, name: "Pruebas de caja negra (Informes de Error)", state: false },
      { id: 8, projectId: 2, name: "Desplegar aplicación", state: true },
    ],
    projectTasks: null,
    taskError: false,
    selectedTask: null
  };

  // Create dispatch and state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //#region DISPATCH FRUNTIONS
  // Getting all tasks of the current project
  const getTasks = (projectId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: projectId,
    });
  };

  // Adding a new task
  const addTask = (task) => {
    task.id = uuidv4();
    dispatch({
      type: AGREGAR_TAREA,
      payload: task,
    });
  };

  // Validate and show an error if needed
  const validateTask = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  // Delete task by id
  const deleteTask = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  // Changing state when task completed
  const changeTaskState = (task) => {
    dispatch({
      type: ESTADO_TAREA,
      payload: task,
    });
  };

  // Get a task for edit
  const getTaskContent = (task) => {
      dispatch({
        type: TAREA_ACTUAL,
        payload: task
      });
  }

  // Edit a selected task
  const updateTask = (task) => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: task
    });
  }

  // Clearing selected task
  const clearTask = () => {
    dispatch({
      type: LIMPIAR_TAREA
    });
  }
  //#endregion

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        projectTasks: state.projectTasks,
        taskError: state.taskError,
        selectedTask: state.selectedTask,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        changeTaskState,
        getTaskContent,
        updateTask,
        clearTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
