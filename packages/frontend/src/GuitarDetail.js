import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Navbar from './Navbar'

function GuitarDetail() {
    const [userGuitar, setUserGuitar] = useState([]);
    let { guitarId } = useParams();

    function dateFormat(date) {
        date = new Date(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1);
        const day = String(date.getDate());
        return `${year}-${month}-${day}`;
    }
    function daysFromDate(date) {
        let today = new Date();
        date = new Date(date);
        let days = today - date
        days = Math.floor(days / (1000 * 3600 * 24));
        return days;
    }

    const fetchGitary = async () => {
        try {
            const response = await axios.get('http://localhost:8000/guitar/show', { withCredentials: true });
            const data = response.data;
            const details = data.find((guitar) => guitar.id === parseInt(guitarId));
            setUserGuitar(details);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGitary();
    });


    return (
        <div>
            <Navbar />
            {userGuitar && (
                <div style={styles.container}>
                    <h1>{userGuitar.guitarName}</h1>
                    {userGuitar.guitarModel && <p>Model: {userGuitar.guitarModel}</p>}
                    {userGuitar.guitarImage && (
                        <img src={`http://localhost:8000/guitar/image/${guitarId}`} alt="Guitar" style={{ maxWidth: '400px' }} />
                    )}
                    {userGuitar.bought && <p>Bought: {dateFormat(userGuitar.bought)}</p>}
                    {userGuitar.year && <p>Year: {dateFormat(userGuitar.year)}</p>}
                    {userGuitar.price && <p>Price: {userGuitar.price}zl</p>}
                    {userGuitar.stringChange && <p>String Change: {dateFormat(userGuitar.stringChange)}</p>}
                    {userGuitar.stringChange && <p>String Change: {daysFromDate(userGuitar.stringChange)}</p>}
                    {userGuitar.stringProducer && <p>String Producer: {userGuitar.stringProducer}</p>}
                    {userGuitar.stringThickness && <p>String Thickness: {userGuitar.stringThickness}</p>}
                    {userGuitar.lastCleaning && <p>Last Cleaning: {dateFormat(userGuitar.lastCleaning)}</p>}
                    {userGuitar.lastCleaning && <p>Last Cleaning: {daysFromDate(userGuitar.lastCleaning)}</p>}
                </div>
            )}
            <Link to={`/guitar/${userGuitar.ownerId}/${guitarId}/edit`} key={userGuitar.ownerId}><button>Edit</button></Link>
        </div>
    );

}

export default GuitarDetail;

const styles = {
    container: {
        margin: '20px auto',
        padding: '20px',
        maxWidth: '500px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: '#fff',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    },
};