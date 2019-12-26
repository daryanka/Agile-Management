import React, {useState} from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";
import AuthImage from "../../images/authImg.svg"

const LoginPage = () => {
  const [data, setData] = useState({});

  const handleChange = (val, name) => {
    setData(prevState => {
      return {...prevState, [name]: val}
    })
  };

  return(
    <div className={"login-page"}>
      <img className={"auth-image"} src={AuthImage} />
      <div className={"form-section"}>
        <h1>Login</h1>
        <h4 className={"sub-heading"}>Wecome back, login below to access your dashboard</h4>
        <Form id={"register-form"}>
          <Input wrapperClassName={"col-xs-12 input-wrapper"} name={"email"} handleChange={handleChange} validation={"required"} placeholder={""} label={"Email*"} />
          <Input wrapperClassName={"col-xs-12 input-wrapper"} name={"password"} handleChange={handleChange} validation={"required"} placeholder={""} label={"Password*"} />
        </Form>
        <button className={"button"} type={"submit"} form={"register-form"}>Login</button>
      </div>
    </div>
  )
};

export default LoginPage;