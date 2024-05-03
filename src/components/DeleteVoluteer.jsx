import axios from "axios";
import { useState } from "react";
import {FontAwesomeIcon, faTrashCan} from '../icons/iconImports'

function DeleteVolunteer({id, setVolunteers})
{
    const [deleteState, setDeleteState] = useState(false);
    async function deleteById() {
        await axios.delete(`http://localhost:3001/volunteers/${id}`);   
        const rez = await axios.get("http://localhost:3001/volunteers");
        setVolunteers(rez.data);
    }

    return(
        <>
                {deleteState ? (
                <div>
                    Are you sure you want to delete this voluteer?
                    <button onClick={deleteById}>Yes</button>
                    <button onClick={() => setDeleteState(false)}>No</button>
                </div>
            ) : (
                <button onClick={() => setDeleteState(true)}><FontAwesomeIcon icon={faTrashCan} className="mr-2" /></button>
            )}
        </>
    )
}

export default DeleteVolunteer;