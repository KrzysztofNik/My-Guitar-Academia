import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './Register'
import Login from './Login'
import AddGuitar from './AddGuitar'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route,} from 'react-router-dom';
import GuitarDetail from './GuitarDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/auth/login' element={<Login />} />
                <Route path='/auth/register' element={<Register />} />
                <Route path='/guitar/add' element={<AddGuitar />} />
                <Route path='/guitar/:userId/:guitarId' element={ <GuitarDetail/> } />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
