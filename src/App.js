import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignupComponent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';

function App() {
    return (
        <Router>
            <div>
                <Link to="/signup">
                    <button type="button">Signup</button>
                </Link>
                <Link to="/login">
                    <button type="button">Login</button>
                </Link>
            </div>
            <Routes>
                <Route path='/signup' element={<SignupComponent/>} />
                <Route path='/login' element={<LoginComponent/>} />
                <Route path='/dashboard' element={<DashboardComponent/>} />
            </Routes>
        </Router>
    );
}

export default App;