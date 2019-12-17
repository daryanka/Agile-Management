import React from "react"
import "../scss/style.scss"
import { Route, Switch } from "react-router-dom"
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={"/"} />
      </Switch>
    </div>
  )
}

export default App