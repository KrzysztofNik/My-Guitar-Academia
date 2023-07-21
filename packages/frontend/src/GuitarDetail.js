import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from './Navbar'

function GuitarDetail() {
	const [userGuitars, setUserGuitars] = useState([]);
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
            setUserGuitars(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGitary();
    }, []);


    const details = userGuitars.find((guitar) => guitar.id === parseInt(guitarId));

    return (
        <div>
            <Navbar />
            {details && (
                <div style={styles.container}>
                    <h1>{details.guitarName}</h1>
                    {details.guitarModel && <p>Model: {details.guitarModel}</p>}
                    {details.bought && <p>Bought: {dateFormat(details.bought)}</p>}
                    {details.year && <p>Year: {dateFormat(details.year)}</p>}
                    {details.price && <p>Price: {details.price}</p>}
                    {details.stringChange && <p>String Change: {dateFormat(details.stringChange)}</p>}
                    {details.stringChange && <p>String Change: {daysFromDate(details.stringChange)}</p>}
                    {details.stringProducer && <p>String Producer: {details.stringProducer}</p>}
                    {details.stringThickness && <p>String Thickness: {details.stringThickness}</p>}
                    {details.lastCleaning && <p>Last Cleaning: {dateFormat(details.lastCleaning)}</p>}
                    {details.lastCleaning && <p>Last Cleaning: {daysFromDate(details.lastCleaning)}</p>}
                </div>
            )}
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