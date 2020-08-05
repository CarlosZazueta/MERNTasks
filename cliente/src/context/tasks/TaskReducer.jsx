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

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        projectTasks: state.tasks.filter(
          (task) => task.projectId === action.payload
        ),
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        taskError: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        taskError: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case ACTUALIZAR_TAREA:
    case ESTADO_TAREA:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case LIMPIAR_TAREA:
        return {
            ...state,
            selectedTask: null
        }
    default:
      return state;
  }
};
