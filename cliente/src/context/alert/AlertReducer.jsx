import {
    OCULTAR_ALERTA,
    MOSTRAR_ALERTA
} from '../../types/index.jsx';

export default  (state, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                alert: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                alert: null
            }
        default:
            return state;
    }
}