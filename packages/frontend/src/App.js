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
            {isLoggedIn ?(
                <div className="guitars-container">
                    {userGuitars.map((gitara) => (
                        <Link to={`/guitar/${gitara.ownerId}/${gitara.id}`} key={gitara.id}>
                            <div className="guitar-card">
                                <div className="guitar-name">{gitara.guitarName}</div>
                                <div className="guitar-model">{gitara.guitarModel}</div>
                                {gitara.guitarImage && (
                                    <img src={`http://localhost:8000/guitar/image/${gitara.id}`} alt="Guitar" style={{ maxWidth: '400px' }} />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                    <div className="homepage-section">
                        <h2>Trzy uzytecznosci i zalety naszej aplikacji:</h2>
                        <div className="benefit-container">
                            <div className="benefit">
                                <p>Szeroki wybor gitar - Nasza aplikacja oferuje bogata kolekcje gitar roznych marek, modeli i typow. Znajdziesz tu zarowno klasyczne gitary akustyczne, jak i elektryczne.</p>
                            </div>
                        </div>
                        <div className="benefit-container">
                            <div className="benefit">
                                <p>Latwe zarzadzanie kolekcja - Po zalogowaniu mozesz w latwy sposob dodawac, edytowac i usuwac gitare z Twojej kolekcji. Dodatkowo mozesz przegladac szczegolowe informacje o kazdym instrumencie.</p>
                            </div>
                        </div>
                        <div className="benefit-container">
                            <div className="benefit">
                                <p>Wspolnota pasjonatow - Dolacz do naszej rosnacej spolecznosci milosnikow gitar! Podziel sie swoimi wrazeniami z gry na instrumentach, obejrzyj zdjecia kolekcji innych uzytkownikow i znajdz inspiracje.</p>
                            </div>
                        </div>
                        <p>Zaloguj sie lub zarejestruj, aby korzystac z naszej aplikacji i cieszyc sie pelnia jej mozliwosci!</p>
                    </div>
            )}
        </nav>
    );
}
export default App;

