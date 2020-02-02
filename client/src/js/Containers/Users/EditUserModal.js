import React from "react";
import Input from "../../Components/Input";
import Form from "../../Components/Form";

const EditUserModal = () => {
  const [data, setData] = React.useState({});

  const handleOnChange =  (val, name) => {
    setData(prev => ({...prev, [name]: val}))
  }

  const editUser = () => {

  }

  return(
    <div className={"add-user-modal"}>
      <h1>Edit User</h1>
      <Form onSubmit={editUser} className={"grid"}>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required"} handleChange={handleOnChange} name={"name"} label={"Name*"}  placeholder={""}/>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required|email"} handleChange={handleOnChange} name={"email"} label={"Email*"}  placeholder={""}/>
        <button type={"submit"} className={"button"}>Confirm Changes</button>
      </Form>
    </div>
  )
};

export default EditUserModal