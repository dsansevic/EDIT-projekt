import { useState, useEffect } from 'react';
import TownSelect from './inputs/TownSelect';
import axios from 'axios';
function FilterVolunteers({  }) {
    const [filterTown, setFilterTown] = useState('');
    const [filterJob, setFilterJob] = useState('');


    const handleValueChange = (e) => {
        setFilterTown(e.target.value);
    };
    const handleValueChange2 = (e) => {
        setFilterJob(e.target.value);
    };

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/jobs")
          .then(res => setJobs(res.data))
          .catch(err => console.error(err.message));
      }, []);



    // const handleApplyFilter = () => {
    //     handleFilter(filterType, filterValue);
    // };

    // const handleClearFilter = () => {
    //     setFilterType('');
    //     setFilterValue('');
    //     handleFilter('', '');
    // };

    return (
        <div>
             <TownSelect value={filterTown.town} onChange={handleValueChange}/>
           

             <select className="form-select"
          name='job'
          value={filterJob}
          onChange={handleValueChange2}
          required
        >
          {jobs.map(job => (
            <option key={job.id} value={job.name}>
              {job.name}
            </option>
          ))}
        </select>

            <button>Primijeni filter</button>
            <button >Ukloni filtere</button>
        </div>
    );
}

export default FilterVolunteers;
