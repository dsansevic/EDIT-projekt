import { useState, useEffect } from 'react';
import TownSelect from '../../inputs/TownSelect';
import axios from 'axios';
function FilterVolunteers({ volunteers, setFilteredVolunteers }) {
    const [filterTown, setFilterTown] = useState('');
    const [filterJob, setFilterJob] = useState('');
    const [jobs, setJobs] = useState([]);
    const [noFilteredVolunteers, setNoFilteredVolunteers] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/jobs")
          .then(res => setJobs(res.data))
          .catch(err => console.error(err.message));
      }, []);

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
        setNoFilteredVolunteers(true);
    }
      
    }
    
    const handleRemoveFilter = () => {
      setFilteredVolunteers(volunteers)
      setFilterJob("");
      setFilterTown("");
    }

    return (
        <div>
             <TownSelect value={filterTown.town} onChange={handleTownChange}/>
             <select className="form-select"
                name='job'
                value={filterJob}
                onChange={handleJobChange}
                required> 
              <option value="" >Odaberi posao</option>
              {jobs.map(job => (
                <option key={job.id} value={job.name}>
                  {job.name}
                </option>
              ))}
            </select>
            <button onClick={handleApplyFilter}>Primijeni filter</button>
            <button onClick={handleRemoveFilter}>Ukloni filtere</button>
            {noFilteredVolunteers && <p>Nema podataka za prikaz</p>}
        </div>
    );
}

export default FilterVolunteers;
