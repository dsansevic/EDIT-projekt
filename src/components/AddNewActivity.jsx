import { InputWithIcon, Select } from "../inputs";
import { useState } from "react";
import axios from "axios";
import {faMapLocationDot, faHandshakeAngle, faCircleInfo, faEarthEurope, faUsers } from "../icons/iconImports"

function AddNewActivity({ setActivities, action }) {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        info: "",
        address: "",
        town: ""
    });

    function inputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function dataReadyToSend(object) {
        return {
            name: object.name,
            date: object.date,
            address: object.address,
            town: object.town,
            association: object.association,
            info: object.info,
            volunteers: []
        };
    }

    const sendData = (e) => {
        e.preventDefault();

        const dataToSend = dataReadyToSend(formData);

        axios.post('http://localhost:3001/activities', dataToSend)
            .then(res => {
                setActivities(prevState => [...prevState, res.data]);
            })
            .catch(error => {
                console.error("Error adding new activity: ", error);
            });

        action();
    }

    return (
        <form onSubmit={sendData}>
            <InputWithIcon value={formData.name} inputChange={inputChange} name="name" icon={faHandshakeAngle}/>
            <InputWithIcon value={formData.address} name="address" inputChange={inputChange} icon={faMapLocationDot} />
            <InputWithIcon value={formData.info} name="info" inputChange={inputChange} icon={faCircleInfo} />
            <InputWithIcon value={formData.association} name="association" inputChange={inputChange} icon={faUsers}/>
            <Select value={formData.town} onChange={inputChange} name="town" url="address"/>
            <input type="date" name="date" value={formData.date} onChange={inputChange} />

            <button type="submit">Pošalji</button>
            <button onClick={action}>Odustani</button>
        </form>
    );
}

export default AddNewActivity;
