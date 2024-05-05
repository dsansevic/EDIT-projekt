import { useState, useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import { FontAwesomeIcon, faHouseChimney, faPenToSquare, faHandHoldingHeart, faPhone } from '../icons/iconImports';
import {Delete, EditVolunteer, VolunteerCommentAndRating } from "./"

function VolunteerCard({ volunteer, setVolunteers, updateAll }) {
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

          {/* <i>{volunteer.jobs.map(job => job).join(", ")}</i> */}
          
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
                <FontAwesomeIcon icon={faHouseChimney} style={{color: "#74C0FC",}} />
                <p className="card-text mb-0 flex-grow-1">{volunteer.town}</p>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faHandHoldingHeart} style={{color: "#74C0FC",}} />
                <p className="card-text mb-0 flex-grow-1">{volunteer.association ? volunteer.association : "Nema podataka"}</p>
              </div>
                <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} style={{color: "#74C0FC",}} />
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

          {/* ovo maknit ako ne napravin do kraja !!!!!   ILI STAVIT KO MODAL!! */}
          <button type="button" className="btn btn-light mt-auto" data-bs-toggle="offcanvas" data-bs-target={`#offcanvas-${volunteer.id}`}>Ocijeni</button>
          </div>
          </div>
          <div className="offcanvas offcanvas-start" tabIndex="-1" id={`offcanvas-${volunteer.id}`}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">{volunteer.name}</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
          {/* <div className="offcanvas-body">          
            <VolunteerCommentAndRating comments={volunteer.comments} averageGrade={volunteer.average_grade} grade_count = {volunteer.grade_count} />
          </div> */}
        </div>
    </div>
  );
}

export default VolunteerCard