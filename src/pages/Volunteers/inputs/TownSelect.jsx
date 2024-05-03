import axios from "axios";
import { useEffect, useState } from "react";

function TownSelect({value, onChange}){
    const [town, setTown] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/address")
          .then(res => setTown(res.data))
          .catch(err => console.error(err.message));
      }, []);
  
    return (
      <div className="form-group">
          <div className="input-group">
              <div className="input-group-prepend">
                  <span className="input-group-text">🏠</span>
              </div>
              <select className="form-select"
                name='town'
                value={value}
                onChange={onChange}
                required
              >
                <option value="" >Odaberi grad</option>
                {town.map(town => (
                  <option key={town.id} value={town.name}>
                    {town.name}
                  </option>
                ))}
              </select>
          </div>
      </div>);
}


export default TownSelect;