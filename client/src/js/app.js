import React from "react"
import "../scss/style.scss"
import { Route, Switch } from "react-router-dom"
import Navbar from "./Components/Navbar";
import HomePage from "./Containers/HomePage";
import Footer from "./Components/Footer";
import LoginPage from "./Containers/LoginPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={"/home"} component={HomePage} />
        <Route path={"/login"} component={LoginPage} />
        <Route path={"/register"} component={LoginPage} />
      </Switch>
      <Footer/>
    </div>
  )
}

export default App