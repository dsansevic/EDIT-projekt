import axios from "axios";
import { useState, useEffect } from "react";
import { faCheck, FontAwesomeIcon } from "../icons/iconImports";
import Delete from "./Delete";

function PendingAssociationTable({ associations, setAssociations }) {
    const [pendingAssociation, setPendingAssociation] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/pending_associations")
            .then(res => setPendingAssociation(res.data))
            .catch(err => console.error(err.message));
    }, []);

    const approveAssociation = (data) => {
        const updatedPendingAssociations = pendingAssociation.filter(
            (association) => association.address !== data.address
        );
        setPendingAssociation(updatedPendingAssociations);

        setAssociations([
            ...associations,
            { name: data.name, town: data.town, address: data.address },
        ]);

        axios.post("http://localhost:3001/associations", {
                "name": data.name,
                "town": data.town,
                "address": data.address,
            })
            .then((res) => {
                axios.delete(`http://localhost:3001/pending_associations/${data.id}`)
                    .then((res) => console.log("Udruga uspješno izbrisana iz pending_associations"))
                    .catch((error) => console.error("Greška prilikom brisanja udruge iz pending_associations:", error));
            })
            .catch((error) => console.error("Greška prilikom odobravanja udruge:", error));
    };

    return (
        <div className="container">
            <p>Udruge koje čekaju na odobrenje:</p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"> Naziv </th>
                        <th scope="col"> Grad </th>
                        <th scope="col"> Adresa </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {pendingAssociation.map((pen, index) => (
                        <tr key={index}>
                            <td>{pen.name}</td>
                            <td>{pen.town}</td>
                            <td>{pen.address}</td>
                            <td><Delete id={pen.id} update={setPendingAssociation} filter={false} url="pending_associations"/></td>    
                            <td><FontAwesomeIcon icon={faCheck} onClick={() => approveAssociation(pen)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PendingAssociationTable;
