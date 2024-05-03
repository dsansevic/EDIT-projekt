import { useState, useEffect, useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
// import { Offcanvas } from 'bootstrap';
import { FontAwesomeIcon, faHouseChimney, faTrashCan, faPenToSquare, faHandHoldingHeart, faPhone } from '../icons/iconImports';
import {DeleteVolunteer, EditVolunteer, VolunteerCommentAndRating } from "./"

function VolunteerCard({ volunteer, setVolunteers, updateAll }) {

  const [randomImage, setRandomImage] = useState('');
  const {admin} = useContext(AdminContext);
  const [editModeOn, setEditModeOn] = useState(false);

  useEffect(() => {
    //KAsnije ovo prominit i da se sprema slika u korisnika a ne ovako bezveze
    async function fetchRandomImage() {
      try {
        const response = await fetch('https://source.unsplash.com/random/300x200');
        const imageUrl = response.url;
        setRandomImage(imageUrl);
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    }    fetchRandomImage();
  }, []);


  return (
    <div className={`col-lg-${admin ? "6" : "3"} mt-4`}>
      <div className="card h-100 custom-card border-0">
        <div className="card-body d-flex flex-column p-0">
          <div className="avatarImage mb-3 ">
            <img
              src={randomImage}
              className="img-fluid w-100 rounded-top"
              alt="Slika volontera"
            />  
          </div>
          <h5 className="card-title">{volunteer.name}</h5>
          <i>{volunteer.jobs.map(job => job).join(", ")}</i>
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
                  <DeleteVolunteer id={volunteer.id} setVolunteers= {setVolunteers} updateAll={updateAll}></DeleteVolunteer>
                  <FontAwesomeIcon icon={faPenToSquare} onClick={() => setEditModeOn(true)} />
                </div>
              )}
            </>
            )}
          </div>

          {/* ovo maknit ako ne napravin do kraja !!!!!   */}
          <button type="button" className="btn btn-light mt-auto" data-bs-toggle="offcanvas" data-bs-target={`#offcanvas-${volunteer.id}`}>Ocijeni</button>
        </div>
      </div>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id={`offcanvas-${volunteer.id}`}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{volunteer.name}</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">          
        <VolunteerCommentAndRating comments={volunteer.comments} averageGrade={volunteer.average_grade} grade_count = {volunteer.grade_count} />
        </div>
      </div>
    </div>
  );
}

export default VolunteerCard