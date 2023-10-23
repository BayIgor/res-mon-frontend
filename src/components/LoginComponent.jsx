import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Если вы используете маршрутизацию
import AuthService from '../services/AuthService'; // Ваши сервисы для аутентификации

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate(); // Если вы используете маршрутизацию

    const login = async () => {
        try {
            const response = await AuthService.login({ email, password });

            if (response.data.jwt) {
                alert(response.data.jwt);
                localStorage.setItem('jwt', response.data.jwt);
                history.push('/dashboard'); // Если вы используете маршрутизацию
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <form>
                <input
                    type="email"
                    placeholder="Enter an Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="button" onClick={login} disabled={!email || !password}>
                    Login
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginComponent;