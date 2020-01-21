import React from "react"
import "../scss/style.scss"
import { Route, Switch, Redirect } from "react-router-dom"
import Navbar from "./Components/Navbar";
import HomePage from "./Containers/HomePage";
import Footer from "./Components/Footer";
import RegisterPage from "./Containers/RegisterPage";
import LoginPage from "./Containers/LoginPage";
import SearchProject from "./Containers/SearchProject";
import Project from "./Containers/Project/Project";

const App = () => {
  return (
    <div id={"content-wrapper"}>
      <Navbar />
      <Switch>
        <Route path={"/home"} component={HomePage} />
        <Route path={"/login"} component={LoginPage} />
        <Route path={"/register"} component={RegisterPage} />
        {/* Routes below need to be private */}
        <Route path={"/projects/search"} component={SearchProject} />
        <Route path={"/projects/:id"} component={Project} />
        <Redirect to={"/home"} />
      </Switch>
      <Footer/>
    </div>
  )
}

export default App