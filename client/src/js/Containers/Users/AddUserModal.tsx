import React, {FC} from "react";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import { FaUserEdit } from "react-icons/fa";
import fn from "../../../functions";
import LoaderBtn from "../../Components/LoaderBtn";
import { useToasts } from 'react-toast-notifications'


interface Props {
  close?: () => void,
  update: () => void
}

const AddUserModal: FC<Props> = (props) => {
  const {addToast} = useToasts();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleOnChange =  (val: string, name: string) => {
    setData(prev => ({...prev, [name]: val}))
  }

  const addNewUser = async () => {
    setLoading(true);
    const res = await fn.post(`/users`, {
      ...data
    })
    setLoading(false);

    if (!fn.apiError(res)) {
      addToast(`Successfully added user.`, {
        appearance: "success",
        autoDismiss: true
      })
      props.update();
      props.close!();
    } else {
      addToast(`Unable to add user.`, {
        appearance: "error",
        autoDismiss: true
      })
    }
  }

  return(
    <div className={"add-user-modal"}>
      <h1>Add New User</h1>
      <Form onSubmit={addNewUser} className={"grid"}>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required"} handleChange={handleOnChange} name={"name"} label={"Name*"}  placeholder={""}/>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required|email"} handleChange={handleOnChange} name={"email"} label={"Email*"}  placeholder={""}/>
        <Input type={"password"} wrapperClassName={"col-l-6 col-xs-12"} validation={"required|min:6|max:255"} handleChange={handleOnChange} name={"password"} label={"Password*"}  placeholder={""}/>
        <Input type={"password"} wrapperClassName={"col-l-6 col-xs-12"} validation={"required|min:6|max:255|identical:password:Password"} handleChange={handleOnChange} name={"confirm_password"} label={"Confirm Password*"} placeholder={""} />

        <div className="btn-wrap">
          <LoaderBtn disabled={loading} loading={loading} type={"submit"} className={"button"}>Create</LoaderBtn>
        </div>
      </Form>
    </div>
  )
};

export default AddUserModal;