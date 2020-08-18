import React, { useContext, useEffect } from 'react';
import Sidebar from '../layouts/Sidebar.jsx';
import Header from '../layouts/Header.jsx';
import TaskForm from '../tasks/TaskForm.jsx';
import TasksList from '../tasks/TasksList.jsx';
import AuthContext from '../../context/auth/AuthContext.jsx';

const Projects = () => {

    // Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { getAuthenticatedUser } = authContext;

    useEffect(() => {
        getAuthenticatedUser();
    }, [])

    return (
        <div className="contenedor-app">
            <Sidebar />
            
            <div className="seccion-principal">
                <Header />
                <main>
                    <TaskForm />

                    <div className="contenedor-tareas">
                        <TasksList />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Projects;