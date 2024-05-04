import { AssociationName, TownSelect } from "../inputs";
import { useState } from "react";
import axios from "axios";

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
            <AssociationName value={formData.name} inputChange={inputChange} name="name"/>
            <AssociationName value={formData.address} name="address" inputChange={inputChange} />
            <TownSelect value={formData.town} onChange={inputChange} />
            <input type="date" name="date" value={formData.date} onChange={inputChange} />
            <AssociationName value={formData.info} name="info" inputChange={inputChange} />
            <AssociationName value={formData.association} name="association" inputChange={inputChange} />

            <button type="submit">Pošalji</button>
            <button onClick={action}>Odustani</button>
        </form>
    );
}

export default AddNewActivity;
