import React, {FC, useState} from "react";
import Input from "../../Components/Input";
import Form from "../../Components/Form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import LoaderBtn from "../../Components/LoaderBtn";
import functions from "../../../functions";
import {getUsers} from "../../Actions/OrganisationUserActions";

interface Props {
  id?: string | number,
  close?: () => void
}

interface userType {
  name: string,
  email: string,
  id: number | string
}

const EditUserModal: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [data, setData] = React.useState<userType>({
    name: "",
    email: "",
    id: ""
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange =  (val: string, name: string) => {
    setData(prev => ({...prev, [name]: val}))
  }

  const editUser = async () => {
    setLoading(true)
    const res = await functions.patch(`/users/`, {});
    setLoading(false);

    if (!functions.apiError(res)) {
      dispatch(getUsers())
      props.close!()
    }
  }

  React.useEffect(() => {
    const u = users.find(user => user.id == props.id)
    if (u) {
      setData({
        name: u.name,
        email: u.email,
        id: u.id,
      })
    }
  }, [users])

  return(
    <div className={"add-user-modal"}>
      <h1>Edit User</h1>
      <Form onSubmit={editUser} className={"grid"}>
        <Input wrapperClassName={"col-l-6 col-xs-12"} validation={"required"} handleChange={handleOnChange} label={"Name*"}  placeholder={""} name={"name"} value={data.name}/>
        <Input style={{marginTop: "10px"}} wrapperClassName={"col-l-6 col-xs-12"} validation={"required|email"} handleChange={handleOnChange} name={"email"} label={"Email*"} value={data.email}  placeholder={""}/>
        <div className="btns">
          <LoaderBtn loading={loading} disabled={loading} type={"submit"} className={"button"}>Confirm Changes</LoaderBtn>
        </div>
      </Form>
    </div>
  )
};

export default EditUserModal