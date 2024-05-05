import NameInput from "./NameInput";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function ActivityNameInput({ activity, setActivities }) {
    const [newVolunteer, setNewVolunteer] = useState("");

    const sendData = async () => {
        try {
            const id = uuidv4();
            const activityResponse = await axios.get(`http://localhost:3001/activities/${activity.id}`);
            const Activity = activityResponse.data;
            const dataToSend = {
                "id": id,
                "name": newVolunteer
            };

            if (Activity) {
                Activity.volunteers.push(dataToSend);
          
                const updateResponse = await axios.put(`http://localhost:3001/activities/${activity.id}`, Activity);
                const updateActivities = await axios.get("http://localhost:3001/activities");
                setActivities(updateActivities.data);
            } else {
                console.error(`Aktivnost s ID-om ${activity.id} nije pronađena.`);
            }
        } catch (error) {
            console.error('Greška prilikom slanja zahtjeva:', error);
        }
    }

    return (
        <>
            <p>Za prijavu je potrebno unijeti ime i prezime</p>
            <NameInput value={newVolunteer} onChange={(val) => setNewVolunteer(val)} button={true} handlePosalji={sendData} />
        </>
    );
}

export default ActivityNameInput;
