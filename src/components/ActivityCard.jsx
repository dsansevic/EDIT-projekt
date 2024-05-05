import { useContext} from "react";
import { AdminContext } from "../contexts/AdminContext";
import { FontAwesomeIcon, faHouseChimney, faMapLocationDot, faClock } from '../icons/iconImports';
import Delete from "./Delete";
import "../pages/Activities/Activities.css"

function ActivityCard({ activities, setActivities, showDetails }) {
    const { admin } = useContext(AdminContext);

    return (
            <div className="row row-cols-1 row-cols-md-4 g-4"> 
                {activities.map((activity, index) => (
                    <div key={activity.id} className="col">
                        <div className="card custom-card-activity border-0 h-100 actCard">
                            <div className="card-body activity_cards d-flex flex-column p-0">
                            <div mb-3 >
                                    <img
                                    src="https://www.cityofnewportrichey.org/wp-content/uploads/2018/04/volunteer.png"
                                    className="img-fluid w-100 actImg"
                                    alt="Slika"
                                    />  
                                </div>
                                <h5 className="card-title mb-3 actTitle">{activity.name}</h5>
                                <div className="d-flex align-items-center actP">
                                    <FontAwesomeIcon icon={faClock} style={{ color: "#9b3a02" }}/>    
                                    <p className="card-text mb-0 flex-grow-1">{activity.date}</p>
                                </div>
                                <div className="d-flex align-items-center actP">
                                    <FontAwesomeIcon icon={faMapLocationDot} style={{ color: "#9b3a02" }}/>      
                                    <p className="card-text mb-0 flex-grow-1">{activity.address}</p>
                                </div>
                                <div className="d-flex align-items-center actP">
                                    <FontAwesomeIcon icon={faHouseChimney} style={{ color: "#9b3a02" }} />
                                    <p className="card-text mb-0 flex-grow-1">{activity.town}</p>
                                </div>
                                    {admin && <Delete url="activities" id={activity.id} updateAll={setActivities} update={setActivities} />}
                            </div>
                            <button className="btn btn btn-outline-* rounded-pill" onClick={() => showDetails(activity)}>Detaljnije</button>
                        </div>
                    </div>
                ))}
            </div>
    )
}

export default ActivityCard;
