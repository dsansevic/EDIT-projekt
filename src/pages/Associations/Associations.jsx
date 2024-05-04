import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import AddNewAssociation from './AddNewAssociation';
import {AssociationsTable, PendingAssociationTable} from "../../components"
import { AdminContext } from '../../contexts/AdminContext';

function Associations() {
    const [associations, setAssociations] = useState([]);
    const [associationsPendingApproval, setAssociationsPendingApproval] = useState([]);
    const { admin } = useContext(AdminContext);

    useEffect(() => {
        axios.get("http://localhost:3001/associations")
            .then(res => {
                setAssociations(res.data);
            })
            .catch(err => console.error(err.message));
    }, []);

    return (
        <div className='container'>
            <p className="prviRed">Popis svih</p>
            <h1>udruga</h1>
            <p className="treciRed">koje djeluju u našoj županiji</p>
            <AddNewAssociation action={setAssociationsPendingApproval} />
            <AssociationsTable associations={associations} setAssociations={setAssociations} />
            {admin && <PendingAssociationTable associations={associations} setAssociations={setAssociations} />}
        </div>
    );
}

export default Associations;
