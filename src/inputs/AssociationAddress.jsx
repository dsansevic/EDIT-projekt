import { faMapLocationDot, FontAwesomeIcon } from "../icons/iconImports"

function AssociationAddress({ value, inputChange }) {
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={faMapLocationDot} />
            </span>
            <input
                type="text"
                className="form-control"
                name="address"
                placeholder="adresa"
                value={value}
                onChange={inputChange}
                required
                aria-label="name"
                aria-describedby="basic-addon1"
                important
            />
        </div>
    );
}

export default AssociationAddress;
