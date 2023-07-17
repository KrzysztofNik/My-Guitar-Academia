import './Navbar.css';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoggedIn = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/isLoggedin', { withCredentials: true });
            setIsLoggedIn(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogout = () => {

        axios.get('http://localhost:8000/auth/logout', { withCredentials: true })
            .then(response => {
                console.log(response);
                setIsLoggedIn(false);
                window.location.reload();
            })
            .catch(error => {
                console.error('B³¹d:', error);
            });
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Logo</Link>
            </div>
            <ul className="nav-links">
                {isLoggedIn ? (
                    <>
                        <li><button className='logout' onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to='/auth/login'>Login</Link></li>
                        <li><Link to='/auth/register'>Register</Link></li>
                    </>
                )}
                {isLoggedIn &&
                    <li><Link to='/guitar/add'>Dodaj gitare</Link></li>
                }
            </ul>
        </nav>
    );

}
export default Navbar;