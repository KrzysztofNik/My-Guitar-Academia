import React, { useState } from 'react';
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
        axios.post('http://localhost:8000/', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Blad logowania', error);
            });
    };
    return (
        <div>
            <h2>Formularz logowania</h2>
            <form onSubmit={handleSubmit}>
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
    );
}
export default LoginForm;