import { InputWithIcon, Select } from "../inputs";
import { useState } from "react";
import {faMapLocationDot, faHandshakeAngle, faCircleInfo, faEarthEurope, faUsers } from "../icons/iconImports";
import {prepareDataForSending, AxiosPost} from "../Utils";

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

    const sendData = (e) => {
        e.preventDefault();
        const dataToSend = prepareDataForSending("activity", formData);

        AxiosPost({
            url: 'activities', 
            update: setActivities,     
            dataToSend: dataToSend,  
            filter: false     
            });  

        action();
    }

    return (
        <div className="add-new-activity-container">
        <form onSubmit={sendData}>
            <div className="row">
                <div className="col">
                    <p>Ispuni podatke:</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputWithIcon value={formData.name} inputChange={inputChange} name="name" icon={faHandshakeAngle} placeholder="Naziv aktivnosti" />
                </div>
                <div className="col">
                    <InputWithIcon value={formData.address} name="address" inputChange={inputChange} icon={faMapLocationDot} placeholder="Adresa" />
                </div>
                <div className="col">
                    <InputWithIcon value={formData.info} name="info" inputChange={inputChange} icon={faCircleInfo} placeholder="Informacije" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputWithIcon value={formData.association} name="association" inputChange={inputChange} icon={faUsers} placeholder="Udruga" />
                </div>
                <div className="col">
                    <Select value={formData.town} onChange={inputChange} name="town" url="address" placeholder="Grad" />
                </div>
                <div className="col">
                    <input className="form-control" type="date" name="date" value={formData.date} onChange={inputChange} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button type="submit" className="btn btn-info">Pošalji</button>
                    <button type="button" className="btn btn-light" onClick={action}>Odustani</button>
                </div>
            </div>
        </form>
        </div>
    );
}

export default AddNewActivity;
