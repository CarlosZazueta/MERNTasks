import React, { useReducer } from 'react'
import AuthContext from './AuthContext.jsx';
import authReducer from './AuthReducer.jsx';
import axiosClient from '../../config/axios.js';
import authToken from '../../config/authToken.js';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index.jsx';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        msg: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Functions
    const createUser = async (data) => {
        try {
            const res = await axiosClient.post('/api/users', data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: res.data
            });

            // Obtener usuario
            getAuthenticatedUser();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alert
            });
        }
    }

    const getAuthenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            // TODO: function para enviar token por headers
            authToken(token);
        }

        try {
            const res = await axiosClient.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
            });
        }
    }

    const login = async (data) => {
        try {
            const res = await axiosClient.post('/api/auth', data);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: res.data
            });

            getAuthenticatedUser();
        } catch (error) {
            console.log(error.response.data);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alert  
            });
        }
    }

    const logout = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return (
        <AuthContext.Provider
            value = {{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                createUser,
                login,
                getAuthenticatedUser,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;