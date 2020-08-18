import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext.jsx";

const Header = () => {
  // Extraer la informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { user, getAuthenticatedUser, logout } = authContext;

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Hola <span> {user.name} </span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
            className="btn btn-blank cerrar-sesion"
            onClick={() => logout()}
        >Cerrar Sesion</button>
      </nav>
    </header>
  );
};

export default Header;
