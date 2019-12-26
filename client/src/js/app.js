import React from "react"
import "../scss/style.scss"
import { Route, Switch } from "react-router-dom"
import Navbar from "./Components/Navbar";
import HomePage from "./Containers/HomePage";
import Footer from "./Components/Footer";
import RegisterPage from "./Containers/RegisterPage";
import LoginPage from "./Containers/LoginPage";

const App = () => {
  return (
    <div id={"content-wrapper"}>
      <Navbar />
      <Switch>
        <Route path={"/home"} component={HomePage} />
        <Route path={"/login"} component={LoginPage} />
        <Route path={"/register"} component={RegisterPage} />
      </Switch>
      <Footer/>
    </div>
  )
}

export default App