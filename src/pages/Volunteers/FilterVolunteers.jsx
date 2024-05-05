import { useState, useEffect } from 'react';
import { Select } from '../../inputs';

function FilterVolunteers({ volunteers, setFilteredVolunteers }) {
    const [filterTown, setFilterTown] = useState('');
    const [filterJob, setFilterJob] = useState('');
    const [noFilteredVolunteers, setNoFilteredVolunteers] = useState(false);

    const handleTownChange = (e) => {
        setFilterTown(e.target.value);
        // console.log(filterTown)
    };
    const handleJobChange = (e) => {
        setFilterJob(e.target.value);
    };

    const handleApplyFilter = () => {
      console.log(filterTown, filterJob);
  
      let filtered = volunteers;
  
      if (filterTown && filterJob) {
          filtered = volunteers.filter((vol) => {
              return vol.town === filterTown && vol.jobs.includes(filterJob);
          });
      } else if (filterTown) {
          filtered = volunteers.filter((vol) => vol.town === filterTown);

      } else if (filterJob) {
          filtered = volunteers.filter((vol) => vol.jobs.includes(filterJob));
      }
      
      setFilteredVolunteers(filtered);
      setNoFilteredVolunteers(false);
      if (filtered.length === 0) {
        setNoFilteredVolunteers(true);}  
    }
    
    const handleRemoveFilter = () => {
      setFilteredVolunteers(volunteers)
      setFilterJob("");
      setFilterTown("");
      setNoFilteredVolunteers(false);
    }

    return (
        <>
            <div className="col-lg-11 d-flex align-items-center justify-content-between">
                <p>Filtriraj po jednom ili oba parametra</p>
                <Select value={filterTown} url="address" name="town" onChange={handleTownChange} placeholder="Grad" autoFocus={true}/>
                <Select value={filterJob} url="jobs" name="job" onChange={handleJobChange} placeholder="Mjesto"/>
                <button className="btn btn-info btn-md" onClick={handleApplyFilter}>Primijeni filter</button>
                <button className="btn btn-warning btn-md" onClick={handleRemoveFilter}>Ukloni filtere</button>
            </div>
            {noFilteredVolunteers && <h2 id="noData">Nema podataka za prikaz...</h2>}
        </>
    );
}

export default FilterVolunteers;
