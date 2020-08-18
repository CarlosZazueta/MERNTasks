import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext.jsx";
import AuthContext from "../../context/auth/AuthContext.jsx";
import { Link } from "react-router-dom";

const Login = (props) => {
  // Get context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { msg, authenticated, login } = authContext;

  //  En caso de que el email o password no existan
  useEffect(() => {
    if (authenticated) {
      props.history.push("/projects");
    }
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
  }, [msg, authenticated, props.history]);

  // State para login
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  // Extraer de usuario
  const { email, password } = usuario;

  // onChange function para Login
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // onSubmit login
  const onSubmit = (e) => {
    e.preventDefault();

    // validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error");
    }

    // pasarlo al action
    login({ email, password });
  };
  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}> {alert.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="email@.com"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <Link to={"/register"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
