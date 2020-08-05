import React from 'react';
import NewProject from '../projects/NewProject.jsx';
import ProjectsList from '../projects/ProjectsList.jsx';


const Sidebar = () => {
    return (
        <aside>
            <h1>
                MERN <span>Tasks</span>
            </h1>

            <NewProject />

            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ProjectsList />
            </div>
        </aside>
    );
}
 
export default Sidebar;