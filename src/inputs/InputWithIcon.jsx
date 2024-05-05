import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InputWithIcon({ name, value, inputChange, icon, autoFocus }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus &&inputRef.current) {
            inputRef.current.focus();
      }
    }, [autoFocus]);

    return (
        <div className="input-group mb-3" style={{ maxWidth: '300px' }}>
            <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={icon} style={{ color: "#9b3a02" }} />
            </span>
            <input
                type="text"
                className="form-control"
                name={name}
                placeholder={name}
                value={value}
                onChange={inputChange}
                ref={inputRef}
                required
                aria-label="name"
                aria-describedby="basic-addon1"
            />
        </div>
    );
}

export default InputWithIcon;