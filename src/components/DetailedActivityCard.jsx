import ActivityNameInput from "../inputs/ActivityNameInput";
import DeleteActivityVolunteer from "./DeleteActivityVolunteer";
import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import Hands from "../assets/img.webp";

function DetailedActivityCard({ activity, setActivities }) {
  const { admin } = useContext(AdminContext);

  return (
    <div className="container detaljnije">
      <Row>
        <Col md={6}>
          <h2 className="activityName">{activity.name}</h2>
          <p className="activityInfo">{activity.info}</p>
          <p>Popis prijavljenih volontera:</p>
          {activity.volunteers.length === 0 ? (
            <p>Nema prijavljenih volontera.</p>
          ) : (
            <div className="acivityVol">
              {activity.volunteers.map((volunteer, index) => (
                <span key={index}>
                  {volunteer.name}
                  {admin && (
                    <DeleteActivityVolunteer
                      activity={activity}
                      setActivities={setActivities}
                      volunteerId={volunteer.id}
                    />
                  )}
                  {index < activity.volunteers.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
          <ActivityNameInput activity={activity} setActivities={setActivities} />
        </Col>
        <Col md={6}>
          <img src={Hands} className="obicnaSlika" alt="Slika aktivnosti" />
        </Col>
      </Row>
    </div>
  );
}

export default DetailedActivityCard;
