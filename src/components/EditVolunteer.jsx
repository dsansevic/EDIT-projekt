import Select from "../inputs/Select"
import axios from "axios";
import { useState} from "react";
import { InputWithIcon } from "../inputs";
import { faPhone, faHandHoldingHeart } from "../icons/iconImports";

function EditVolunteer({volunteer, setVolunteers, setEditModeOn, updateAll}){
    const [formData, setFormData] = useState(volunteer); // za pohranu privremenih promjena

    function inputChange(event) {
        const { name, value } = event.target;      
        setFormData({ ...formData, [name]: value });
    }

    async function handleSave() {
        try {
            await axios.put(`http://localhost:3001/volunteers/${formData.id}`, formData);
            const updatedData = await axios.get("http://localhost:3001/volunteers");
            setVolunteers(updatedData.data);
            updateAll(updatedData.data);
        } catch (error) {
            console.error("Error updating data:", error);
        }
        setEditModeOn(false);
    }
    
    return(
        <>
        <Select value={formData.town} onChange={inputChange} url="address" name="town" autoFocus={true}/>
        <InputWithIcon name= "association" value={formData.association} icon ={faHandHoldingHeart} inputChange={inputChange}/>
        <InputWithIcon name= "contact_number" value={formData.contact_number} icon= {faPhone} inputChange={inputChange}/>
        <button className="btn btn-light btn-sm mr-2" style={{ marginRight: '10px' }} onClick={handleSave}>Save</button>
        <button className="btn btn-danger btn-sm" onClick={()=>setEditModeOn(false)}>Exit</button>
        </>
    )
}

export default EditVolunteer;