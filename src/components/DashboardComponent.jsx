import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

function DashboardComponent() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        hello();
    }, []);

    const hello = () => {
        AuthService.hello()
            .then((response) => {
                console.log(response.data);
                setMessage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default DashboardComponent;
