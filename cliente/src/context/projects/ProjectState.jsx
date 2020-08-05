import React, {useReducer} from 'react';
import projectContext from './ProjectContext.jsx';
import projectReducer from './ProjectReducer.jsx';
import {v4 as uuidv4} from 'uuid';

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types/index.jsx';


const ProjectState = props => {
    const projects = [
        {id: 1, name: 'tienda virtual'  },
        {id: 2, name: 'Internet'        },
        {id: 3, name: 'Proyecto ejemplo'},
        {id: 4, name: 'MERN'            }
    ];
    
    const initialState = {
        projects: [],
        form: false,
        formError: false,
        project: null
    }

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // CRUD Project Functions TODO
    //#region DISPATCH FUNCTIONS
    const showForm = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    // get the projects
    const getProjects = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: projects
        });
    }

    // Add new project
    const addProject = project => {
        project.id = uuidv4();

        // adding the project
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: project
        });
    }

    // validating form against errors
    const showError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    // Select project when user do click
    const currentProject = projectId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: projectId
        });
    }

    // Delete a project
    const deleteProject = idProject => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: idProject
        });
    }
    //#endregion

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                formError: state.formError,
                project: state.project,
                showForm,
                getProjects,
                addProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;
