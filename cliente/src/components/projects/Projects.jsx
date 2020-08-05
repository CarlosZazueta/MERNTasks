import React from 'react';
import Sidebar from '../layouts/Sidebar.jsx';
import Header from '../layouts/Header.jsx';
import TaskForm from '../tasks/TaskForm.jsx';
import TasksList from '../tasks/TasksList.jsx';

const Projects = () => {
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