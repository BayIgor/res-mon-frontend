import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

const AuthService = {

    login: (loginRequest) => {
        return axios.post(BASE_URL + 'authenticate', loginRequest);
    },

    signup: (signupRequest) => {
        return axios.post(BASE_URL + 'signup', signupRequest);
    },

    checkAuth: () => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.get(BASE_URL + 'api/checkAuth', { headers });
        } else {
            console.log('JWT token not found in Local Storage');
            return Promise.reject('JWT token not found');
        }
    },

    forgotPassword: (forgotRequest)=>{
        return axios.post(BASE_URL + 'forgot_password', forgotRequest)
    },

    passwordReset: (resetRequest)=>{
        return axios.post(BASE_URL + 'reset_password', resetRequest)
    }
};

export default AuthService;
