import React, { useState } from 'react';
import axios from 'axios';

function GuitarAddForm() {
    const [guitarName, setname] = useState('');
    const [guitarImage, setimage] = useState('');
    const [guitarModel, setmodel] = useState('');
    const [bought, setbought] = useState('');
    const [year, setyear] = useState('');
    const [price, setprice] = useState('');
    const [stringChange, setchange] = useState('');
    const [stringProducer, setproducer] = useState('');
    const [stringThickness, setthickness] = useState('');
    const [lastCleaning, setcleaning] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            guitarName: guitarName,
            guitarImage: guitarImage,
            guitarModel: guitarModel,
            bought: bought,
            year: year,
            price: price,
            stringChange: stringChange,
            stringProducer: stringProducer,
            stringThickness: stringThickness,
            lastCleaning: lastCleaning
        };


        axios.post('http://localhost:8000/guitar/add', formData, {withCredentials:true})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('B³¹d:', error);
            });
    };

    return (
        <div>
            <h2>Formularz dodawanaia gitar</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Guitar Name:
                    <input
                        type="text"
                        value={guitarName}
                        onChange={(e) => setname(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Guitar Image:
                    <input
                        type="file"
                        value={guitarImage}
                        onChange={(e) => setimage(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Guitar Model:
                    <input
                        type="text"
                        value={guitarModel}
                        onChange={(e) => setmodel(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Bought:
                    <input
                        type="date"
                        value={bought}
                        onChange={(e) => setbought(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Year:
                    <input
                        type="date"
                        value={year}
                        onChange={(e) => setyear(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    String Change:
                    <input
                        type="date"
                        value={stringChange}
                        onChange={(e) => setchange(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    String Producer:
                    <input
                        type="text"
                        value={stringProducer}
                        onChange={(e) => setproducer(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    String Thickness:
                    <input
                        type="text"
                        value={stringThickness}
                        onChange={(e) => setthickness(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Last Cleaning:
                    <input
                        type="date"
                        value={lastCleaning}
                        onChange={(e) => setcleaning(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default GuitarAddForm;