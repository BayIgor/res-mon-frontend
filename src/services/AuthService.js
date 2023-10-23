import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

const AuthService = {
    signup: (signupRequest) => {
        return axios.post(BASE_URL + 'signup', signupRequest);
    },

    login: (loginRequest) => {
        return axios.post(BASE_URL + 'authenticate', loginRequest);
    },

    hello: () => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.get(BASE_URL + 'api/hello', { headers });
        } else {
            console.log('JWT token not found in Local Storage');
            return Promise.reject('JWT token not found');
        }
    },
};

export default AuthService;
