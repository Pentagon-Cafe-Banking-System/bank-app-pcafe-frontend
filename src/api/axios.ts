import axios from "axios";

const env = process.env.NODE_ENV;
const myAxios = axios.create({
    baseURL: env === 'development' ? 'https://localhost:7031/api/' : 'https://bank-app-pcafe-api-stage.herokuapp.com/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default myAxios;