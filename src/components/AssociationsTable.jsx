import { useState, useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import Delete from './Delete';

function AssociationsTable({ associations, setAssociations }){
    const [sortBy, setSortBy] = useState(null);
    const [ascendingOrder, setAscendingOrder] = useState(false);
    const {admin} = useContext(AdminContext);

    const sortAssociations = (property) => {
        if(ascendingOrder) {
            const sortedAssociations = [...associations].sort((a, b) =>
                a[property] < b[property] ? 1 : -1
            );
            setAssociations(sortedAssociations);
            setAscendingOrder(false);
            setSortBy(property);
        }
        else {
            const sortedAssociations = [...associations].sort((a, b) => 
                a[property] > b[property] ? 1 : -1
            );
            setAssociations(sortedAssociations);
            setAscendingOrder(true);
            setSortBy(property);
        }
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col" onClick={() => sortAssociations('name')} style={{cursor: 'pointer'}}>
                    🤝 Naziv {sortBy === 'name' ? (ascendingOrder ? '▼' : '▲') : ''}
                    </th>
                    <th scope="col" onClick={() => sortAssociations('town')} style={{cursor: 'pointer'}}>
                    🌏 Mjesto {sortBy === 'town' ? (ascendingOrder ? '▼' : '▲') : ''}
                    </th>
                    <th scope="col" onClick={() => sortAssociations('address')} style={{cursor: 'pointer'}}>
                    📍 Adresa {sortBy === 'address' ? (ascendingOrder ? '▼' : '▲') : ''}
                    </th>
                    {admin && <th scope="col"></th>}
                </tr>
            </thead>
            <tbody>
                {associations.map((association, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{association.name}</td>
                        <td>{association.town}</td>
                        <td>{association.address}</td>
                        {admin && <td><Delete id={association.id} update={setAssociations} url="associations"/></td>}
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AssociationsTable;
