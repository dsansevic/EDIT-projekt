import axios from "axios";
import { useEffect, useState, useRef } from "react";

function TownSelect({value, onChange, autoFocus}){
    const [town, setTown] = useState([]);
    const selectRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:3001/address")
          .then(res => setTown(res.data))
          .catch(err => console.error(err.message));
      }, []);
  
    useEffect(() => {
      if (autoFocus &&selectRef.current) {
        selectRef.current.focus();
    }
  }, [autoFocus]);

    return (
      <div className="form-group mb-3">
          <div className="input-group">
              <div className="input-group-prepend">
                  <span className="input-group-text">🏠</span>
              </div>
              <select className="form-select"
                name='town'
                value={value}
                ref={selectRef}
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