import axios from "axios";
import { useEffect, useState, useRef } from "react";

function Select({value, name, onChange, autoFocus, url, placeholder}){
    const [town, setTown] = useState([]);
    const selectRef = useRef(null);

    useEffect(() => {
      if (url) {
        axios.get(`http://localhost:3001/${url}`)
            .then(res => setTown(res.data))
            .catch(err => console.error(err.message));
        }
    }, []);
  
    useEffect(() => {
      if (autoFocus &&selectRef.current) {
        selectRef.current.focus();
    }
  }, [autoFocus]);

  const getIcon = (name) => {
    switch (name) {
      case "town":
        return "🏠";
      case "job":
        return "💼";
      case "association":
        return "🤝";
      default:
        return "";
    }
  };

    return (
      <div className="form-group mb-3" style={{ maxWidth: '300px' }}>
          <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">{getIcon(name)}</span>
              </div>
              <select className="form-select"
                name={name}
                value={value}
                ref={selectRef}
                onChange={onChange}
                required
              >
                <option value="" >{placeholder}</option>
                {town.map(town => (
                  <option key={town.id} value={town.name}>
                    {town.name}
                  </option>
                ))}
              </select>
          </div>
      </div>);
}

export default Select;