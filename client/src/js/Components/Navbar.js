import React, {useState} from "react";
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [hamburger, setHamburger] = useState(false);

  const onHamburgerClick = () => {
    setHamburger(!hamburger)
  };

  const mapNav = () => {
    switch (authenticated) {
      case true:
        return (
          <ul className={"nav-links"}>
            <li><NavLink to={"/users"}>Users</NavLink></li>
            <li><NavLink to={"/tasks"}>Tasks</NavLink></li>
            <li><NavLink to={"/projects"}>Projects</NavLink></li>
          </ul>
        );
      case false:
        return (
          <div className={"btn-cont"}>
            <button className={"button secondary"}>Login</button>
            <button className={"button"}>Sign In</button>
          </div>
        );
      default:
        return
    }
  };


  return (
    <nav className={"nav-bar"}>
      <h4>Agile Management</h4>

      <div className={"nav-options"}>
        {mapNav()}

        <button onClick={onHamburgerClick} className={`hamburger hamburger--spin ${hamburger ? "is-active" : ""}`} type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"/>
        </span>
        </button>
      </div>

    </nav>
  )
};

export default Navbar;