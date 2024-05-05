import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon, faTrashCan } from '../icons/iconImports';

function DeleteActivityVolunteer({ activity, setActivities, volunteerId }) {
    const [deleteState, setDeleteState] = useState(false);

    const deleteVolunteer = async (volunteerId) => {
        try {
            const volunteerIndex = activity.volunteers.findIndex(volunteer => volunteer.id === volunteerId);
            
            if (volunteerIndex !== -1) {
                const updatedVolunteers = [...activity.volunteers];
                updatedVolunteers.splice(volunteerIndex, 1);
                
                const updatedActivity = { ...activity, volunteers: updatedVolunteers };
                
                await axios.put(`http://localhost:3001/activities/${activity.id}`, updatedActivity);
    
                const updateActivitiesResponse = await axios.get("http://localhost:3001/activities");
                setActivities(updateActivitiesResponse.data);
                setDeleteState(false);
            } else {
                console.error(`Volonter s ID-om ${volunteerId} nije pronađen.`);
            }
        } catch (error) {
            console.error('Greška prilikom brisanja volontera:', error);
        }
    }

    return (
        <>
            {deleteState ? (
                <div>
                    Jeste li sigurni da želite obrisati volotera?
                    <button className="btn btn-light btn-sm mr-2" onClick={() => deleteVolunteer(volunteerId)}>Da</button>
                    <button className="btn btn-danger btn-sm" onClick={() => setDeleteState(false)}>Ne</button>
                </div>
            ) : (
                <button onClick={() => setDeleteState(true)}><FontAwesomeIcon icon={faTrashCan} className="mr-2" /></button>
            )}
        </>
    );
}

export default DeleteActivityVolunteer;
