import './App.css';
import React, { useEffect, useState } from 'react'
import { Link,redirect } from 'react-router-dom'
import axios from "axios"



function App() {

    const [userGuitars, setUserGuitars] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchGitary = async () => {
        try {
            const response = await axios.get('http://localhost:8000/guitar/show', { withCredentials: true });
            const data = response.data;
            setUserGuitars(data);
        } catch (error) {
            console.error(error);
        }
    };
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
            })
            .catch(error => {
                console.error('B³¹d:', error);
            });
        setIsLoggedIn(false);
    };


    useEffect(() => {
        fetchGitary();
        checkLoggedIn();
    }, []);

    return (
        <nav>
            <h4>Main page</h4>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><button onClick={handleLogout}>Logout</button></li>
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
            {isLoggedIn &&
                <div>
                    <h2>Wszystkie gitary</h2>
                    <ul>
                        {userGuitars.map((gitara) => (
                            <li key={gitara.id}>{gitara.guitarName}</li>
                        ))}
                    </ul>
                </div>
            }
        </nav>
    );
}
export default App;
