import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";



function GuitarEditForm() {
    const [guitarName, setname] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [guitarModel, setmodel] = useState("");
    const [bought, setbought] = useState("");
    const [year, setyear] = useState("");
    const [price, setprice] = useState("");
    const [stringChange, setchange] = useState("");
    const [stringsProducer, setproducer] = useState("");
    const [stringThickness, setthickness] = useState("");
    const [lastCleaning, setcleaning] = useState("");
    const [image, setimage] = useState("");
    const navigate = useNavigate();
    let { userId,guitarId } = useParams();

    const fetchGuitarDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8000/guitar/show', { withCredentials: true });
            const data = response.data;
            const details = data.find((guitar) => guitar.id === parseInt(guitarId));
            setname(details.guitarName);
            setimage(details.guitarImage);
            setmodel(details.guitarModel);
            setbought(details.bought);
            setyear(details.year);
            setprice(details.price);
            setchange(details.stringChange);
            setthickness(details.stringThickness);
            setproducer(details.stringsProducer);
            setcleaning(details.lastCleaning);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGuitarDetails();
    },[]);

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

        const formData = new FormData();
        formData.append('guitarName', guitarName);
        formData.append('guitarImage', selectedImage);
        formData.append('guitarModel', guitarModel);
        formData.append('bought', bought);
        formData.append('year', year);
        formData.append('price', price);
        formData.append('stringChange', stringChange);
        formData.append('stringsProducer', stringsProducer);
        formData.append('stringThickness', stringThickness);
        formData.append('lastCleaning', lastCleaning);



        axios.put(`http://localhost:8000/guitar/${userId}/${guitarId}/edit`, formData, { withCredentials: true, })
            .then(response => {
;                console.log(response);
                navigate('/');
            })
            .catch(error => {
                console.error('B��d:', error);
            });
    };

    return (
        <div className='form-container' >
            <h2>Formularz edytowania gitary</h2>
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
                    {image && (
                        <img src={`http://localhost:8000/guitar/image/${guitarId}`} alt="Guitar" style={{ maxWidth: '400px' }} />
                    )}
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
                        value={stringsProducer}
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


export default GuitarEditForm;