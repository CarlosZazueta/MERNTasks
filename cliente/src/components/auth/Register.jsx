import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Register = () => {

    // State para register
    const [usuario, setUsuario] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    // Extraer de usuario
    const {name, email, password, repeatPassword} = usuario;

    // onChange function para Register
    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    // onSubmit register
    const onSubmit = (e) => {
        e.preventDefault();

        // validar que no haya campos vacios

        // password minimo de 6 caracteres

        // validar las passwords

        // pasarlo al action
    }

    return (
        <div className="form-usuario">
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