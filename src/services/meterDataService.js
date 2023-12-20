import axios from './axios';

const MeterDataService = {

    getAll: (navigate) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.get('meters', { headers });
        } else {
            console.log('JWT token not found in Local Storage');
            return Promise.reject('JWT token not found');
        }
    },

    saveMeter: (meterDataRequest, isNew, navigate) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const { id, meterId, installationDate, accuracy } = meterDataRequest;
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            if(isNew){
                return axios.post('meters', { meterId, installationDate }, { headers });
            }
            else {
                return axios.post( 'meters', { id, meterId, installationDate, accuracy }, { headers });
            }
        } else {
            console.log('JWT token not found in Local Storage');
            return Promise.reject('JWT token not found');
        }
    },

    deleteById: (id, navigate) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.delete('meters/' + id, { headers });
        } else {
            console.log('JWT token not found in Local Storage');
            return Promise.reject('JWT token not found');
        }
    }
};

export default MeterDataService;
