import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const nav = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8000/auth/logout', { withCredentials: true });
            nav('/');
        } catch (error) {
            console.error('B³¹d wylogowania', error);
        }
    };
    return (
        <div>
            <button onClick={handleLogout}>Wyloguj</button>
        </div>
    );
}

export default Logout;