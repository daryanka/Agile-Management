import React, {FC, useState} from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";
import AuthImage from "../../images/authImg.svg"
import LoaderBtn from "../Components/LoaderBtn";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../Actions/UserActions";
import {RootState} from "../Store";

const LoginPage: FC = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (val: string, name: string) => {
    setData(prevState => {
      return {...prevState, [name]: val}
    })
  };

  const handleSubmit = () => {
    dispatch(getUser(data.email, data.password))
  }

  return(
    <div className={"login-page"}>
      <img className={"auth-image"} src={AuthImage} />
      <div className={"form-section"}>
        <h1>Login</h1>
        <h4 className={"sub-heading"}>Wecome back, login below to access your dashboard</h4>
        <Form id={"register-form"} onSubmit={handleSubmit}>
          <Input wrapperClassName={"col-xs-12 input-wrapper"} name={"email"} handleChange={handleChange} validation={"required|email"} placeholder={""} label={"Email*"} />
          <Input type={"password"} wrapperClassName={"col-xs-12 input-wrapper"} name={"password"} handleChange={handleChange} validation={"required"} placeholder={""} label={"Password*"} />
        </Form>
        {!!authState.message && (
          <p style={{fontSize: "18px", marginTop: "15px"}}>{authState.message}</p>
        )}
        <LoaderBtn disabled={authState.loading} loading={authState.loading} className={"button"} type={"submit"} form={"register-form"}>Login</LoaderBtn>
      </div>
    </div>
  )
};

export default LoginPage;