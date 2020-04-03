import React from "react";
import "../scss/style.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Containers/HomePage";
import Footer from "./Components/Footer";
import RegisterPage from "./Containers/RegisterPage";
import LoginPage from "./Containers/LoginPage";
import SearchProject from "./Containers/SearchProject";
import Project from "./Containers/Project/Project";
import Users from "./Containers/Users/Users";
import {ToastProvider} from "react-toast-notifications";
import cookie from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {userMe} from "./Actions/UserActions";
import {getUsers} from "./Actions/OrganisationUserActions";
import {RootState} from "./Store";
import MyTasks from "./Containers/MyTasks/MyTasks";


const App = () => {
  const authId = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (cookie.get("token")) {
      dispatch(userMe())
      dispatch(getUsers())
    }
  }, [])
  React.useEffect(() => {dispatch(getUsers())}, [authId])

  return (
    <ToastProvider>
      <div id={"content-wrapper"}>
        <Navbar />
        <Switch>
          <Route path={"/home"} component={HomePage} />
          <Route path={"/login"} component={LoginPage} />
          <Route path={"/register"} component={RegisterPage} />
          {/* Routes below need to be private */}
          <Route path={"/projects/search"} component={SearchProject} />
          <Route path={"/projects/:id"} component={Project} />
          <Route path={"/users"} component={Users} />
          <Route path={"/my-tasks"} component={MyTasks} />
          <Redirect to={"/home"} />
        </Switch>
        <Footer/>
      </div>
    </ToastProvider>
  )
}

export default App