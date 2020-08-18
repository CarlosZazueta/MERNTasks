import Axios from 'axios';

const axiosClient = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default axiosClient;