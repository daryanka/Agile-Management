import React from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";

const RegisterPage = () => {
  const [data, setData] = React.useState({});

  const submit = () => {

  };

  const handleChange = (val, name) => {
    setData(prev => {
      return {...prev, [name] : val}
    })
  };

  React.useEffect(() => {
    console.log(data)
  });

  return(
    <div className={"register"}>
      <h2>Sign up now</h2>
      <div className={"form-wrapper"}>
        <Form onSubmit={submit} className={"grid"}>
          <Input wrapperClassName={"col-m-6 col-xs-12"} name={"name"} handleChange={handleChange} validation={"required"} placeholder={""} label={"Name*"} />
          <Input name={"email"} handleChange={handleChange} validation={"required|email"} placeholder={""} label={"Email*"} />
          <Input type={"password"} name={"password"} handleChange={handleChange} validation={"required|min:6"} placeholder={""} label={"Password*"} />
          <Input type={"password"} name={"confirm_password"} handleChange={handleChange} validation={"required|identical:password:Password"} placeholder={""} label={"Confirm Password*"} />
          <Input name={"organisation"} handleChange={handleChange} validation={"required"} placeholder={""} label={"Organisation Name*"} />
          <button type={"submit"} className={"button"}>Sign Up</button>
        </Form>
      </div>
    </div>
  )
};

export default RegisterPage