import { useState } from "react";
import { InputWithIcon, Select } from "../../inputs";
import { faHandHoldingHeart, faMapLocationDot} from "../../icons/iconImports"
import "./Associations.css";
import AxiosPost from "../../Utils/AxiosPost";

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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        action(prevState => [...prevState, formData]);

        AxiosPost({
            url: 'pending_associations', 
            update: action,     
            dataToSend: formData,  
            filter: false     
            });   

        setAddMode(false);
        setTimeout(() => {
            setShowModal(true);
        }, 100);
        
        setTimeout(() => {
            setShowModal(false);
        }, 5000) // makni nakon 5
    };

    const handleCancel = () => {
        setFormData({
            name: "",
            town: "",
            address: ""
        });
        setAddMode(false);
    };

    return (
        <>
            {addMode ? (
                <div className="d-flex justify-content-center mb-3">
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col">
                            <p>Ispuni: </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <InputWithIcon name="name" value={formData.name} icon={faHandHoldingHeart} inputChange={inputChange} autoFocus={true} placeholder="Naziv"/>
                        </div>
                        <div className="col">    
                            <InputWithIcon name="address" value={formData.address} icon={faMapLocationDot} inputChange={inputChange} placeholder="Adresa"/>
                        </div>
                        <div className="col">
                            <Select value={formData.town} url="address" name="town" onChange={inputChange} placeholder="Odaberi grad"/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-2 d-flex justify-content-end">
                            <button type='submit' className="btn btn-info btn-md">Pošalji</button>
                        </div>
                        <div className="col-2 d-flex justify-content-start">
                            <button type='button' className="btn btn-light btn-md" onClick={handleCancel}>Odustani</button>
                        </div>
                    </div>
                </form>
            </div>
            
            ) : (
                <button className="btn btn-warning btn-LG" onClick={() => setAddMode(true)}>Prijavi svoju udrugu</button>
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
