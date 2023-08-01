import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './AddGuitar.css';

function GuitarAddForm() {
    const [guitarName, setname] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [guitarModel, setmodel] = useState("");
    const [bought, setbought] = useState("");
    const [year, setyear] = useState("");
    const [price, setprice] = useState("");
    const [stringChange, setchange] = useState("");
    const [stringProducer, setproducer] = useState("");
    const [ThicknessE, setE] = useState("");
    const [ThicknessA, setA] = useState("");
    const [ThicknessD, setD] = useState("");
    const [ThicknessG, setG] = useState("");
    const [ThicknessB, setB] = useState("");
    const [Thicknesse, sete] = useState("");
    const [lastCleaning, setcleaning] = useState("");
    const navigate = useNavigate();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();


        let stringThickness = ThicknessE + " " + ThicknessA + " " + ThicknessD + " " + ThicknessG + " " + ThicknessB + " " + Thicknesse;
        if (stringThickness.trim().length === 0) {
            stringThickness = "";
        }
        else if (ThicknessE !== "" && ThicknessA !== "" && ThicknessD !== "" && ThicknessG !== "" && ThicknessB !== "" && Thicknesse !== "") {

        }
        else {
            alert('Put all string thickness values or none');
            return;
        }

        const formData = new FormData();
        formData.append('guitarName', guitarName);
        formData.append('guitarImage', selectedImage);
        formData.append('guitarModel', guitarModel);
        formData.append('bought', bought);
        formData.append('year', year);
        formData.append('price', price);
        formData.append('stringChange', stringChange);
        formData.append('stringProducer', stringProducer);
        formData.append('stringThickness', stringThickness);
        formData.append('lastCleaning', lastCleaning);



        axios.post('http://localhost:8000/guitar/add', formData, { withCredentials: true, })
            .then(response => {
;                console.log(response);
                navigate('/');
            })
            .catch(error => {
                console.error('B³¹d:', error);
            });
    };

    return (
        <div className='form-container' >
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
                        onChange={handleImageChange}
                        accept='image/*'
                    />
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                    )}
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
                        type="number"
                        min='0'
                        step='0.01'
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
                    String E Thickness:
                    <input
                        type="text"
                        value={ThicknessE}
                        onChange={(e) => setE(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    String A Thickness:
                    <input
                        type="text"
                        value={ThicknessA}
                        onChange={(e) => setA(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    String D Thickness:
                    <input
                        type="text"
                        value={ThicknessD}
                        onChange={(e) => setD(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    String G Thickness:
                    <input
                        type="text"
                        value={ThicknessG}
                        onChange={(e) => setG(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    String B Thickness:
                    <input
                        type="text"
                        value={ThicknessB}
                        onChange={(e) => setB(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    String e Thickness:
                    <input
                        type="text"
                        value={Thicknesse}
                        onChange={(e) => sete(e.target.value)}
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