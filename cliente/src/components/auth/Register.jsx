import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alert/AlertContext.jsx';
import AuthContext from '../../context/auth/AuthContext.jsx';

const Register = (props) => {
    // Get context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { msg, authenticated, createUser } = authContext;

    //  En caso de que el usuario se haya registrado y autenticado o sea un registro duplicado
    useEffect(() => {
        if (authenticated) {
            props.history.push('/projects');
        }
        if (msg) {
            showAlert(msg.msg, msg.category);
        }
    }, [msg, authenticated, props.history])


    // State para register
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    // Extraer de user
    const {name, email, password, repeatPassword} = user;

    // onChange function para Register
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    // onSubmit register
    const onSubmit = (e) => {
        e.preventDefault();

        // validar que no haya campos vacios
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || repeatPassword.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // password minimo de 6 caracteres
        if (password.length < 6) {
            showAlert('El password debe ser almenos de 6 caracteres', 'alerta-error');
            return;
        }

        // validar las passwords
        if (password !== repeatPassword) {
            showAlert('Los password no son iguales', 'alerta-error');
            return;
        }

        // pasarlo al action
        createUser({
            name,
            email,
            password
        });
    }

    return (
        <div className="form-usuario">
            { alert ? ( 
                <div className={`alerta ${alert.category}`}> {alert.msg} </div> 
            ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Crea tú cuenta</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={name} 
                            placeholder="Tu nombre" 
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="repeatPassword">Confirmar Password</label>
                        <input 
                            type="password" 
                            id="repeatPassword" 
                            name="repeatPassword"
                            value={repeatPassword} 
                            placeholder="Repite tu Password" 
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <button
                            type="submit"
                            className="btn btn-primario btn-block"
                        >Crear Cuenta</button>
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Inicio de Sesión
                </Link>
            </div>
        </div>
    );
}
 
export default Register;