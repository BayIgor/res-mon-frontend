import axios from './axios';

const MeasurementsService = {

    getAll: (navigate) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.get('measurements', {headers});
        } else {
            navigate('/account')
        }
    },

    saveMeasurement: (measurementRequest, isNew, navigate) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const {
                id, meterId, measDateTime, hour, timerWorkHour, consumption,
                heatConsumptionQ1, heatConsumptionQ2, coolantFlowV1, coolantFlowV2,
                instantConsumptionG1, instantConsumptionG2, coolantTemperatureT1, coolantTemperatureT2
            } = measurementRequest;
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            if (isNew) {
                return axios.post('measurements', {
                    meterId, measDateTime, hour, timerWorkHour, consumption,
                    heatConsumptionQ1, heatConsumptionQ2, coolantFlowV1, coolantFlowV2,
                    instantConsumptionG1, instantConsumptionG2, coolantTemperatureT1, coolantTemperatureT2
                }, {headers});
            } else {
                return axios.post('measurements', {
                    id, meterId, measDateTime, hour, timerWorkHour, consumption,
                    heatConsumptionQ1, heatConsumptionQ2, coolantFlowV1, coolantFlowV2,
                    instantConsumptionG1, instantConsumptionG2, coolantTemperatureT1, coolantTemperatureT2
                }, {headers});
            }
        } else {
            navigate('/account')
        }
    },

    deleteById: (id, navigate) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.delete('measurements/' + id, {headers});
        } else {
            navigate('/account')
        }
    },

    sendFile: (req, navigate) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.post('measurements/excel', req, {headers});
        } else {
            navigate('/account')
        }
    },

    createReport: (reportRequest, navigate, reportName) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.post(`report/${reportName}`, reportRequest, {responseType: 'blob', headers})
                .then(response => {
                    console.log(response)
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', reportName + '.xlsx'); // Устанавливаем имя файла для скачивания
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(error => {
                    // Обрабатываем возможные ошибки
                    console.error('There was an error!', error);
                });
        } else {
            navigate('/account')
        }
    },
};

export default MeasurementsService;
