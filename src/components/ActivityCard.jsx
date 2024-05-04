import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import Delete from "./Delete";

function ActivityCard({ activities, setActivities, showDetails }){
    const { admin } = useContext(AdminContext);

    return(
        <div className="row">
            {activities.map(activity => (
            <div key={activity.id} className="col-lg-12">
                <div className="activity-card-bg rounded-0">
                    <div className="card-body-bg bg-light card text-info d-flex flex-column p-0 rounded-0">
                        <div className="row">
                            <div className="col-lg-8">
                                <h5 className="card-title">{activity.name}</h5>
                                <p>{activity.date}, {activity.address} {activity.town}</p>
                                {admin && <Delete url="activities" id={activity.id} updateAll={setActivities} update={setActivities}/>}
                                <button className="btn btn-secondary" onClick={() => showDetails(activity)}>Detaljnije</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default ActivityCard;
