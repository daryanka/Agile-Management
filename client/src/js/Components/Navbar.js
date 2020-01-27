import React, {useState} from "react";
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [hamburger, setHamburger] = useState(false);

  const onHamburgerClick = () => {
    setHamburger(!hamburger)
  };

  const mapNav = () => {
    switch (authenticated) {
      case true:
        return (
          <ul className={"nav-links"}>
            <li><NavLink activeClassName={"active-link"} to={"/users"}>Users</NavLink></li>
            <li><NavLink activeClassName={"active-link"} to={"/tasks"}>Tasks</NavLink></li>
            <li><NavLink activeClassName={"active-link"} to={"/projects/search"}>Projects</NavLink></li>
          </ul>
        );
      case false:
        return (
          <div className={"btn-cont"}>
            <NavLink to={"/login"}><button className={"button secondary"}>Login</button></NavLink>
            <NavLink to={"/register"}><button className={"button"}>Sign In</button></NavLink>
          </div>
        );
      default:
        return
    }
  };


  return (
    <nav className={"nav-bar"}>
      <NavLink to={authenticated ? "/" : "/home"}><h3 className={`brand ${authenticated ? "logged-in" : ""}`}>Agile Management</h3></NavLink>

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