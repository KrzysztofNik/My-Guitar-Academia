import './App.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from './Navbar'



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
            <Navbar/>
            {isLoggedIn &&
                <div>
                    <h2>Wszystkie gitary</h2>
                    <ul>
                        {userGuitars.map((gitara) => (
                            <li key={gitara.id}>
                                <ul>
                                    {gitara.guitarName && <li>{gitara.guitarName}</li>}
                                    {gitara.guitarModel && <li>{gitara.guitarModel}</li>}
                               </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </nav>
    );
}
export default App;
