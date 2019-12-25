import React from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";

const LoginPage = () => {
  return(
    <div>
      <h2>Sign up now</h2>
      <div>
        <Form>
          <Input placeholder={""} label={"Name*"} />
          <Input />
        </Form>
      </div>
    </div>
  )
};

export default LoginPage