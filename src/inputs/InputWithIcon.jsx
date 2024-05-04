import {FontAwesomeIcon,faHandshakeAngle} from "../icons/iconImports"
import { useRef, useEffect } from "react";

function InputWithIcon({ name, value, inputChange, icon }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, []);

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={icon} />
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