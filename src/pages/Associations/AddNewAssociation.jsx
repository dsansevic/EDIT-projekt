import React, { useState } from "react";
import axios from "axios";
import { AssociationName, AssociationAddress, TownSelect } from "../../inputs";
import "./Associations.css";

function AddNewAssociation({ action }) {
    const [addMode, setAddMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        town: "",
        address: ""
    });

    function inputChange(e) {
        const { name, value } = e.target;      
        setFormData({ ...formData, [name]: value });
    }

    function dataReadyToSend(object) {
        return {
            "name": object.name,
            "town": object.town,
            "address": object.address
        };
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        action(prevState => [...prevState, formData]);
        const dataToSend = dataReadyToSend(formData);

        axios.post('http://localhost:3001/pending_associations', dataToSend)
            .then(res => {
                action(prevState => [...prevState, res.data]);
            })
            .catch(error => {
                console.error("Error: ", error);
            });

        setAddMode(false);
        setTimeout(() => {
            setShowModal(true);
        }, 100);
        
        setTimeout(() => {
            setShowModal(false);
        }, 5000) // makni nakon 5
    };

    return (
        <>
            {addMode ? (
                <div className="container">
                    <form onSubmit={handleFormSubmit}>
                        <AssociationName name="name" value={formData.name} inputChange={inputChange}/>
                        <TownSelect value={formData.town} onChange={inputChange}/>
                        <AssociationAddress value={formData.address} inputChange={inputChange}/>
                        <button type='submit' className="btn btn-light btn-md">Pošalji</button>
                    </form>
                </div>
            ) : (
                <button onClick={() => setAddMode(true)}>Prijavi svoju udrugu</button>
            )}

            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document" style={{ marginTop: 'calc(50vh - 100px)' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Zahtjev poslan</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Vaš zahtjev je uspješno poslan. Udruga će biti dodana u popis nakon odobrenja.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Zatvori</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddNewAssociation;
