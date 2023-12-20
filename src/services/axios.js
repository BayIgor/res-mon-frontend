import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
})

instance.interceptors.response.use(response => response,
    error => {
        if (error.response && error.response.status === 403) {
            console.log('Ошибка: Доступ запрещен');
            window.localStorage.removeItem("jwt");
        }
        return Promise.reject(error);
    }
);

export default instance