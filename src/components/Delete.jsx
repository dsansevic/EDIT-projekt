import axios from "axios";
import { useState } from "react";
import {FontAwesomeIcon, faTrashCan} from '../icons/iconImports'

function Delete({id, update, updateAll, url, filter})
{
    const [deleteState, setDeleteState] = useState(false);
    async function deleteById() {
        await axios.delete(`http://localhost:3001/${url}/${id}`);   
        const rez = await axios.get(`http://localhost:3001/${url}`);
        setDeleteState(false);
        update(rez.data);
        {filter && updateAll(rez.data);}
    }

    return(
        <>
            {deleteState ? (
                <div>
                    Jeste li sigurni da želite obrisati?
                    <button onClick={deleteById}>Da</button>
                    <button onClick={() => setDeleteState(false)}>Ne</button>
                </div>
            ) : (
                <button onClick={() => setDeleteState(true)}><FontAwesomeIcon icon={faTrashCan} className="mr-2" /></button>
            )}
        </>
    )
}

export default Delete;