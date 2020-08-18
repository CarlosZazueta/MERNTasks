import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types/index.jsx';

export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                form: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                projects: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                formError: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                formError: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                msg: action.payload
            }
        default: 
            return state;
    }
}