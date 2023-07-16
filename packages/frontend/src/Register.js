import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
    const [name, setname] = useState('');
    const [surname, setsurname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

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
                navigate('/');
            })
            .catch(error => {
                console.error('B³¹d:', error);
            });
    };

    return (
        <div className="RegistrationForm">
            <h2>Formularz rejestracji</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Imie"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="RegistrationFormInput"
                />
                <input
                    type="text"
                    placeholder="Nazwisko"
                    value={surname}
                    onChange={(e) => setsurname(e.target.value)}
                    className="RegistrationFormInput"
                />
                <input
                    type="password"
                    placeholder="Haslo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="RegistrationFormInput"
                />
                <input
                    type="email"
                    placeholder="Adres e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="RegistrationFormInput"
                />
                <button type="submit" className="RegistrationFormButton">Zarejestruj</button>
            </form>
        </div>
    );
};

export default RegistrationForm;