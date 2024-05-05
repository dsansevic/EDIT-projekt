import { useState, useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import { FontAwesomeIcon, faHouseChimney, faPenToSquare, faHandHoldingHeart, faPhone } from '../icons/iconImports';
import {Delete, EditVolunteer, StarRating } from "./"

function VolunteerCard({ volunteer, volunteers, setVolunteers, updateAll }) {
  const {admin} = useContext(AdminContext);
  const [editModeOn, setEditModeOn] = useState(false);

  return (
    <div className={`col-lg-${admin ? "6" : "3"} mt-4`}>
      <div className="card h-100 custom-card border-0">
        <div className="card-body d-flex flex-column p-0">
          <div className="avatarImage mb-3 ">
            <img
              src={volunteer.image}
              className="img-fluid w-100 rounded-top"
              alt="Slika volontera"
            />  
          </div>
          <h5 className="card-title">{volunteer.name}</h5>

          {volunteer.jobs && <i>{volunteer.jobs.map(job => job).join(", ")}</i>}
          
          <div className="p-3">
            
            {(editModeOn && admin) ? (
              <EditVolunteer 
                volunteer={volunteer} 
                setVolunteers={setVolunteers} 
                setEditModeOn={setEditModeOn}
                updateAll={updateAll}
              />
            ) : (
            <>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faHouseChimney} style={{color: "#7B3E12",}} />
                <p className="card-text mb-0 flex-grow-1">{volunteer.town}</p>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faHandHoldingHeart} style={{color: "#7B3E12",}} />
                <p className="card-text mb-0 flex-grow-1">{volunteer.association ? volunteer.association : "Nema podataka"}</p>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} style={{color: "#7B3E12",}} />
              <p className="card-text mb-0 flex-grow-1">+{volunteer.contact_number}</p>
              </div>
          
              {admin && (
                <div className="ikonice">
                  <Delete id={volunteer.id} url="volunteers" update={setVolunteers} updateAll={updateAll} filter={true}></Delete>
                  <FontAwesomeIcon icon={faPenToSquare} className="editIcon" onClick={() => setEditModeOn(true)} />
                </div>
              )}
            </>
            )}
            </div>
            <button type="button" className="btn btn-light mt-auto" data-bs-toggle="modal" data-bs-target={`#modal-${volunteer.id}`}>Ocijeni</button>
  
            <div className="modal fade" id={`modal-${volunteer.id}`} tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{volunteer.name}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <StarRating volunteer={volunteer} volunteers={volunteers} setVolunteers={setVolunteers} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default VolunteerCard