import React from "react"
import "../scss/style.scss"
import { Route, Switch } from "react-router-dom"
import Navbar from "./Components/Navbar";
import HomePage from "./Containers/HomePage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={"/home"} component={HomePage} />
      </Switch>
    </div>
  )
}

export default App