import React, { useReducer } from 'react';
import alertReducer from './AlertReducer.jsx';
import alertContext from './AlertContext.jsx';
import {
    OCULTAR_ALERTA,
    MOSTRAR_ALERTA
} from '../../types/index.jsx';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Functions
    // Show alert
    const showAlert = (msg, category) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                category
            }
        });
        
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 5000);
    }

    return (
        <alertContext.Provider
            value = {{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;