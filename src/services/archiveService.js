import axios from './axios';

const ArchiveService = {

    getAll: (navigate) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.get('archives', {headers});
        } else {
            navigate('/account')
        }
    },

    createArchive: (archiveRequest, navigate, archiveName) => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.post(`archive/${archiveName}`, archiveRequest, {headers});
        } else {
            navigate('/account')
        }
    },

    downloadArchive: (archive, navigate) =>{
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            return axios.post('downloadArchive', archive,{ responseType: 'blob', headers })
                .then((response) => {
                    console.log(response)
                    const url = window.URL.createObjectURL(new Blob([response.data]));

                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'archive.zip'); // Установка имени файла для скачивания
                    document.body.appendChild(link);

                    link.click();

                    link.parentNode.removeChild(link);
                })
                .catch((error) => {
                    console.error('Произошла ошибка при скачивании файла:', error);
                });
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
            return axios.delete('deleteArchive/' + id, {headers});
        } else {
            navigate('/account')
        }
    },
};

export default ArchiveService;
