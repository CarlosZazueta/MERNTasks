import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    // State para login
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    // Extraer de usuario
    const {email, password} = usuario;

    // onChange function para Login
    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    // onSubmit login
    const onSubmit = (e) => {
        e.preventDefault();

        // validar que no haya campos vacios

        // pasarlo al action
    }
    return (
        <div className="form-usuario">
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
                        <button
                            type="submit"
                            className="btn btn-primario btn-block"
                        >Iniciar Sesión</button>
                    </div>
                </form>
                <Link to={'/register'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}
 
export default Login;