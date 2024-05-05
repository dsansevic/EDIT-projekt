import axios from "axios";
import { useEffect, useState } from "react";

function JobSelect({onChange}){
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/jobs")
          .then(res => setJobs(res.data))
          .catch(err => console.error(err.message));
      }, []);
    
      return (
        <div className="checkboxes">
        {jobs.map(job => (
          <div key={job.id} className="listOfCheckboxes">
            <input
              type="checkbox"
              value={job.name}
              onChange={e => onChange(e.target.value, e.target.checked)}
            />
            <label>{job.name}</label>
          </div>
        ))}
      </div>
      );
    }
export default JobSelect;