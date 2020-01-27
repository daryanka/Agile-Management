import React from "react";
import Form from "../../Components/Form";
import Input from "../../Components/Input";

const AddUserModal = () => {
  const [data, setData] = React.useState({});

  const handleOnChange =  (val, name) => {
    setData(prev => ({...prev, [name]: val}))
  }

  const addNewUser = () => {

  }

  return(
    <div>
      <h1>Add New User</h1>
      <Form onSubmit={addNewUser}>
        <Input validation={"required"} handleChange={handleOnChange} name={"name"} label={"Name*"}  placeholder={""}/>
        <Input validation={"required|email"} handleChange={handleOnChange} name={"email"} label={"Email*"}  placeholder={""}/>
        <Input validation={"required|min:6|max:255"} handleChange={handleOnChange} name={"password"} label={"Password*"}  placeholder={""}/>
        <Input validation={"required|min:6|max:255|identical:password:Password"} handleChange={handleOnChange} name={"confirm_password"} label={"Confirm Password*"} placeholder={""} />
        <button type={"submit"} className={"button"}>Create</button>
      </Form>
    </div>
  )
};

export default AddUserModal;