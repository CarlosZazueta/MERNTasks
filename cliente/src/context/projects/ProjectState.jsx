import React, {useReducer} from 'react';
import projectContext from './ProjectContext.jsx';
import projectReducer from './ProjectReducer.jsx';
import axiosClient from  '../../config/axios.js';

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types/index.jsx';


const ProjectState = props => {    
    const initialState = {
        projects: [],
        form: false,
        formError: false,
        project: null,
        msg: null
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
    const getProjects = async () => {
        try {
            const result = await axiosClient.get('api/projects');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: result.data.projects
            });
        } catch (error) {
            const alert = {
                msg: 'Hubo un error!',
                category: 'alerta-error' 
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            });
        }
    }

    // Add new project
    const addProject = async project => {
        try {
            const result = await axiosClient.post('/api/projects', project);
             // adding the project
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: result.data
            });
        } catch (error) {
            const alert = {
                msg: 'Hubo un error!',
                category: 'alerta-error' 
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            });;
        }
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
    const deleteProject = async idProject => {
        try {
            await axiosClient.delete(`api/projects/${idProject}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: idProject
            });
        } catch (error) {
            const alert = {
                msg: 'Hubo un error!',
                category: 'alerta-error' 
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            });
        }
    }
    //#endregion

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                formError: state.formError,
                project: state.project,
                msg: state.msg,
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
