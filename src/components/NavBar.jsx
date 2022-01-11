import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogoutUser, isLoggedin, getName } from "../services/cache";

function NavBar() {
  let navigate = useNavigate();

  const logOut = (e) => {
    LogoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        {isLoggedin() ? `Hi ${getName()}` : `CSSAA INFO`}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {getName() && (
            <a className="nav-item nav-link" href="#" onClick={(e) => logOut()}>
              Log out
            </a>
          )}
          <NavLink className="nav-item nav-link" to="/roles">
            Roles
          </NavLink>
          <NavLink className="nav-item nav-link" to="/employees">
            Employes
          </NavLink>
          {!getName() && (
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
          )}
          {/* <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
