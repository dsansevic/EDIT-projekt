import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import "./Volunteers.css";
import VolunteerCard from "../../components/VolunteerCard";
import AddNewVolunteer from "./AddNewVolunteer";
import { AdminContext } from "../../contexts/AdminContext";
import FilterVolunteers from "./FilterVolunteers";

function Volunteers() {
    const [volunteers, setVolunteers] = useState([]);
    const {admin} = useContext(AdminContext);

    useEffect(() => {
        axios.get("http://localhost:3001/volunteers")
          .then(res => setVolunteers(res.data))
          .catch(err => console.error(err.message));
      }, []);

    return (
        <div className="container">
            <div className="row justify-content-between">
                {admin ? (
                    <>
                        <div className="col-lg-6">
                            <div className="row">
                                {volunteers.map((volunteer) => (
                                    <VolunteerCard key={volunteer.id} volunteer={volunteer} setVolunteers={setVolunteers} />
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4" style={{ top: 0 }}>
                            <AddNewVolunteer setVolunteers={setVolunteers} volunteers={volunteers} />
                            
                        </div>
                    </>
                ) : (
                    <div className="col-lg-12">
                        <p className="prviRed">Upoznajte naše</p>
                        <h1>Volontere</h1>
                        <p className="treciRed">Njihov nesebičan trud i predanost ne samo što donose pozitivne promjene u našoj zajednici, već i služe kao inspiracija za sve nas. Hvala im što su svjetlo koje osvjetljava put drugima.</p>
                        {/* <FilterVolunteers/> */}
                        <div className="row">
                            {volunteers.map((volunteer) => (
                                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
  }
  
  export default Volunteers;