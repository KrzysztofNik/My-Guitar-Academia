import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: email,
            password: password
        };
        axios.post('http://localhost:8000/auth/login', formData, {withCredentials: true})
            .then(response => {
                console.log(response);
                navigate('/');
            })
            .catch(error => {
                console.error('Blad logowania', error);
                setErrorMessage('Nieprawidlowy login lub haslo.');
            });
    };
    return (
        <div className="Login">
            <h2 className='LoginHeader'>Panel logowania</h2>
            <div className="LoginFormContainer">
                <div className="MiddleSection">
                    <form onSubmit={handleSubmit} className="LoginForm">
                        <input
                            type="email"
                            placeholder="Adres e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Haslo"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <button type="submit">Zaloguj</button>
                    </form>
                    {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}
export default LoginForm;