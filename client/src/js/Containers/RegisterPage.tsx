import React, {FC} from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";
import fn from "../../functions"

const RegisterPage: FC = () => {
  const [data, setData] = React.useState({});
  const [err, setErr] = React.useState<string>()

  const submit = async () => {
    setErr(undefined)
    const res = await fn.post("/auth/register", {
      ...data,
    })

    if (!fn.apiError(res)) {
      fn.pushTo("/login")
    } else {
      setErr("This email is already associated to an account.")
    }
  };

  const handleChange = (val: string, name: string) => {
    setData(prev => {
      return {...prev, [name]: val}
    })
  };


  return (
    <div className={"register"}>
      <h2>Sign up now</h2>
      <div className={"form-wrapper"}>
        <Form id={"register-form"} onSubmit={submit} className={"grid"}>
          <Input wrapperClassName={"col-m-6 col-xs-12 input-wrapper"} name={"name"} handleChange={handleChange}
                 validation={"required"} placeholder={""} label={"Name*"}/>
          <Input wrapperClassName={"col-m-6 col-xs-12 input-wrapper"} name={"email"} handleChange={handleChange}
                 validation={"required|email"} placeholder={""} label={"Email*"} customErr={err}/>
          <Input wrapperClassName={"col-m-6 col-xs-12 input-wrapper"} type={"password"} name={"password"}
                 handleChange={handleChange} validation={"required|min:6"} placeholder={""} label={"Password*"}/>
          <Input wrapperClassName={"col-m-6 col-xs-12 input-wrapper"} type={"password"} name={"confirm_password"}
                 handleChange={handleChange} validation={"required|identical:password:Password"} placeholder={""}
                 label={"Confirm Password*"}/>
          <Input wrapperClassName={"col-m-6 col-xs-12 input-wrapper"} name={"organisation_name"}
                 handleChange={handleChange}
                 validation={"required"} placeholder={""} label={"Organisation Name*"}/>
        </Form>
        <button type={"submit"} form={"register-form"} className={"button"}>Sign Up</button>
      </div>
    </div>
  )
};

export default RegisterPage