import { useEffect, useState } from "react";
import { DetailedActivityCard, ActivityCard } from "../../components";
import AddNewActivity from "../../components/AddNewActivity";
import axios from "axios";

function Activities() {
    const [activities, setActivities] = useState([]);
    const [showDetaljnije, setShowDetaljnije] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showAddActivityForm, setShowAddActivityForm] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3001/activities")
            .then(res => {
                setActivities(res.data);
            })
            .catch(err => console.error(err.message));
    }, []);

    useEffect(() => {
        if (selectedActivity) {
            const foundActivity = activities.find(activity => activity.id === selectedActivity.id);
            setSelectedActivity(foundActivity);
        }
    }, [activities]);

    const showDetails = (activity) => {
        setSelectedActivity(activity);
        setShowDetaljnije(true);
    };

    const hideDetails = () => {
        setShowDetaljnije(false);
    };

    const showAddForm = () => {
        setShowAddActivityForm(true);
    };

    const hideAddForm = () => {
        setShowAddActivityForm(false);
    };

    return (
        <div className="container">
            <h1>Aktivnosti</h1>
            <p className="treciRed">koje provode naše udruge. Prijavi se!</p>
            <div className="d-flex justify-content-center mb-3"> 
                {showAddActivityForm && !showDetaljnije ? (
                    <button className="btn btn-warning" onClick={hideAddForm}>Dodaj novu aktivnost</button>
                ) : !showDetaljnije && (
                    <AddNewActivity action={showAddForm} setActivities={setActivities} />
                )}
            </div>
            {showDetaljnije && selectedActivity && (
                <div>
                    <button className="btn btn-secondary" onClick={hideDetails}>Povratak na stranicu</button>
                    <DetailedActivityCard activity={selectedActivity} setActivities={setActivities} />
                </div>
            )}
            {!showDetaljnije && <ActivityCard activities={activities} setActivities={setActivities} showDetails={showDetails} />}
        </div>
    );
}

export default Activities;
