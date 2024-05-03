import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
    const {admin, setAdmin} = useContext(AdminContext);

    const navLinks = [
        { to: "/", text: "Početna" },
        { to: "/Activities", text: "Aktivnosti" },
        { to: "/Volunteers", text: "Volonteri" },
        { to: "/Associations", text: "Udruge" }
      ];

    const handleCheckboxChange = (event) => {
      setAdmin(event.target.checked);
    };
      
    return (
        <nav className="navbar navbar-expand-lg fixed-top border-bottom border-body"  style={{backgroundColor: "#ADD8E6"}}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navLinks.map(({ to, text }) => (
                            <li key={to} className="nav-item">
                                <NavLink className="nav-link px-3" activeClassName="active" to={to}>{text}</NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="form-check form-switch">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="adminCheckbox"
                            checked={admin}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="adminCheckbox">Admin</label>
                    </div>
                </div>
            </div>
        </nav>
    );
  }

export default Navbar;