import React, {useState} from "react";
import { NavLink } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store"
import {LOGIN_LOGOUT_USER} from "../types/userDispatchTypes";
import functions from "../../functions";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth)
  const isAuthenticated =  auth.isAuthenticated
  const [hamburger, setHamburger] = useState(false);

  const onHamburgerClick = () => {
    setHamburger(!hamburger)
  };

  const logout = () => {
    dispatch({
      type: LOGIN_LOGOUT_USER
    })
    functions.pushTo("/login")
  }

  const mapNav = () => {
    switch (isAuthenticated) {
      case true:
        return (
          <ul className={"nav-links"}>
            {auth.role === "admin" && <li><NavLink activeClassName={"active-link"} to={"/users"}>Users</NavLink></li>}
            <li><NavLink activeClassName={"active-link"} to={"/my-tasks"}>My Tasks</NavLink></li>
            <li><NavLink activeClassName={"active-link"} to={"/projects/search"}>Projects</NavLink></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        );
      case false:
        return (
          <div className={"btn-cont"}>
            <NavLink to={"/login"}><button className={"button secondary"}>Login</button></NavLink>
            <NavLink to={"/register"}><button className={"button"}>Register</button></NavLink>
          </div>
        );
      default:
        return
    }
  };

  return (
    <nav className={"nav-bar"}>
      <NavLink to={isAuthenticated ? "/" : "/home"}><h3 className={`brand ${isAuthenticated ? "logged-in" : ""}`}>Agile Management</h3></NavLink>

      <div className={"nav-options"}>
        {mapNav()}

        {/*<button onClick={onHamburgerClick} className={`hamburger hamburger--spin ${hamburger ? "is-active" : ""}`} type="button">*/}
        {/*<span className="hamburger-box">*/}
        {/*  <span className="hamburger-inner"/>*/}
        {/*</span>*/}
        {/*</button>*/}
      </div>

    </nav>
  )
};

export default Navbar;