import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
    const [name, setname] = useState('');
    const [surname, setsurname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            surname: surname,
            password: password,
            email: email
        };


        axios.post('http://localhost:8000/auth/register', formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('B³¹d:', error);
            });
    };

    return (
        <div>
            <h2>Formularz rejestracji</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Imie"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nazwisko"
                    value={surname}
                    onChange={(e) => setsurname(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Haslo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Adres e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Zarejestruj</button>
            </form>
        </div>
    )};

export default RegistrationForm;