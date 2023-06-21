import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
    const [Name, setname] = useState('');
    const [Surname, setsurname] = useState('');
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Tworzenie obiektu z danymi formularza
        const formData = {
            Name: Name,
            Surname: Surname,
            password: password,
            Email: Email
        };


        axios.post('http://localhost:8000/', formData)
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
                    value={Name}
                    onChange={(e) => setname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nazwisko"
                    value={Surname}
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
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Zarejestruj</button>
            </form>
        </div>
    )};

export default RegistrationForm;