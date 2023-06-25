import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function LoginForm() {
    const [Email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            Email: Email,
            password: password
        };
        axios.post('http://localhost:8000/auth/login', formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Blad logowania', error);
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
                            value={Email}
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
                </div>
            </div>
        </div>
    );
}
export default LoginForm;