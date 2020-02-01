import React from "react";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import { FaUserEdit } from "react-icons/fa";


const AddUserModal = () => {
  const [data, setData] = React.useState({});

  const handleOnChange =  (val, name) => {
    setData(prev => ({...prev, [name]: val}))
  }

  const addNewUser = () => {

  }

  return(
    <div className={"add-user-modal"}>
      <h1>Add New User</h1>
      <Form onSubmit={addNewUser} className={"grid"}>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required"} handleChange={handleOnChange} name={"name"} label={"Name*"}  placeholder={""}/>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required|email"} handleChange={handleOnChange} name={"email"} label={"Email*"}  placeholder={""}/>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required|min:6|max:255"} handleChange={handleOnChange} name={"password"} label={"Password*"}  placeholder={""}/>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required|min:6|max:255|identical:password:Password"} handleChange={handleOnChange} name={"confirm_password"} label={"Confirm Password*"} placeholder={""} />
        <button type={"submit"} className={"button"}>Create</button>
      </Form>
    </div>
  )
};

export default AddUserModal;