import React, { Fragment, useState, useContext } from "react";
import projectContext from "../../context/projects/ProjectContext.jsx";

const NewProject = () => {
  // Getting form state
  const projectsContext = useContext(projectContext);
  const { form, formError, showForm, addProject, showError } = projectsContext;

  // States
  const [project, setProject] = useState({
    name: "",
  });

  // Destructuring project
  const { name } = project;

  // Reading input data
  const onChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // Submit and validations
  const onSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (name.trim() === "") {
      showError();
      return;
    }

    // setProject
    addProject(project);

    // Reset from
    setProject({ name: "" });
  };

  // Show form
  const handleClick = () => {
    showForm();
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={handleClick}
      >
        Nuevo Proyecto
      </button>

      {form ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="name"
            value={name}
            onChange={onChange}
          />

          <button type="submit" className="btn btn-primario btn-block">
            Agregar Proyecto
          </button>
        </form>
      ) : null}
      {formError ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NewProject;
