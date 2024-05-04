import { useState, useEffect } from 'react';
import { Select } from '../../inputs';
import axios from 'axios';

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
          // town & job filter
          filtered = volunteers.filter((vol) => {
              return vol.town === filterTown && vol.jobs.includes(filterJob);
          });
      } else if (filterTown) {
          // town filter
          filtered = volunteers.filter((vol) => vol.town === filterTown);
      } else if (filterJob) {
          // job filter
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
    }

    return (
        <div>
            <Select value={filterTown.town} url="address" name="town" onChange={handleTownChange}/>
            <Select value={filterJob} url="jobs" name="job" onChange={handleJobChange}/>
            <button onClick={handleApplyFilter}>Primijeni filter</button>
            <button onClick={handleRemoveFilter}>Ukloni filtere</button>
            {noFilteredVolunteers && <p>Nema podataka za prikaz</p>}
        </div>
    );
}

export default FilterVolunteers;
