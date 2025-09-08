import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand row " to="/">
          <img
            src={logo}
            alt="logo"
            height="75px"
            width="75px"
            className="col"
          />
          <h4 className="col mt-4">Unified Health File</h4>
        </Link>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item home">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item ms-4">
              <Link className="nav-link" to="/admin/users">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
