import TownSelect from "../pages/Volunteers/inputs/TownSelect"
import axios from "axios";
import { useState } from "react";

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
        <TownSelect value={formData.town} onChange={inputChange} />
        <input type="text" value={formData.association} name= "association" onChange={inputChange} ></input>
        <input type="text" value={formData.contact_number} name= "contact_number" onChange={inputChange} ></input>
        <button onClick={handleSave}>Save</button>
        <button onClick={()=>setEditModeOn(false)}>Exit</button>
        </>
    )
}

export default EditVolunteer;