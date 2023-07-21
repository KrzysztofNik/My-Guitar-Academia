import './App.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from './Navbar'
import { Link } from "react-router-dom";


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


    useEffect(() => {
        fetchGitary();
        checkLoggedIn();
    }, []);


    return (
        <nav>
            <Navbar />
            {isLoggedIn &&
                <div className="guitars-container">
                    {userGuitars.map((gitara) => (
                        <Link to={`/guitar/${gitara.ownerId}/${gitara.id}`} key={gitara.id}>
                            <div className="guitar-card">
                                <div className="guitar-name">{gitara.guitarName}</div>
                                <div className="guitar-model">{gitara.guitarModel}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </nav>
    );
}
export default App;

