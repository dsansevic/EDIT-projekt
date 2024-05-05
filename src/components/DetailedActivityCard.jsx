import ActivityNameInput from "../inputs/ActivityNameInput";
import DeleteActivityVolunteer from "./DeleteActivityVolunteer";
import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";

function DetailedActivityCard({activity, setActivities}){
    const { admin } = useContext(AdminContext);

    return (
        <div >
                <p>{activity.info}</p>
                <p><strong>Organizator: </strong>{activity.association}</p>
                <ol>
                {activity.volunteers.map((volunteer, index) => (
                    <li key={index}>{volunteer.name} 
                    {admin && 
                    <DeleteActivityVolunteer activity={activity} setActivities={setActivities} volunteerId={volunteer.id}/> }
                    </li>
                ))}
                </ol>
                <ActivityNameInput activity={activity} setActivities={setActivities}/>
        </div>
    )
}

export default DetailedActivityCard;