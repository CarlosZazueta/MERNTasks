import React,  {useContext} from "react";
import projectContext from "../../context/projects/ProjectContext.jsx";
import taskContext from "../../context/tasks/TaskContext.jsx";

const Project = ({ project }) => {
  // Getting form state
  const projectsContext = useContext(projectContext);
  const { currentProject } = projectsContext;

  // Calling getTasks function
  const tasksContext = useContext(taskContext);
  const {getTasks} = tasksContext;

  // Funtion to add new task(s)
  const selectProject = id => {
    currentProject(id); // Getting current project
    getTasks(id); // Filtering current project task(s)
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProject(project._id)}
      > {project.name} </button>
    </li>
  );
};

export default Project;
