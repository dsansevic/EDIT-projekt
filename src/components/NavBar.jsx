import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const navLinks = [
        { to: "/", text: "Početna" },
        { to: "/Activities", text: "Aktivnosti" },
        { to: "/Volunteers", text: "Volonteri" },
        { to: "/Associations", text: "Udruge" }
      ];

    return (
      <nav>
        <ul>
        {navLinks.map(({ to, text }) => (
          <li key={to}>
            <NavLink to={to}>{text}</NavLink>
          </li>
        ))}
        </ul>
      </nav>
    );
  }

export default Navbar;