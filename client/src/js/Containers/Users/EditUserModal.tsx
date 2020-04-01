import React, {FC, useState} from "react";
import Input from "../../Components/Input";
import Form from "../../Components/Form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import LoaderBtn from "../../Components/LoaderBtn";
import functions from "../../../functions";
import {getUsers} from "../../Actions/OrganisationUserActions";
import {useToasts} from "react-toast-notifications";
import { Formik} from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  email: Yup.string().email().required("This field is required"),
})

interface Props {
  user?: userType,
  close?: () => void,
  update: () => void
}

interface userType {
  name: string,
  email: string,
  id: number | string
}

const EditUserModal: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const {addToast} = useToasts();
  const users = useSelector((state: RootState) => state.users.users);
  const [data, setData] = React.useState<userType>();
  const [loading, setLoading] = useState(false);

  const editUser = async (d: {name: string, email: string}) => {
    const formData: {name?: string, email?: string} = {};

    if (d.name) { formData.name = d.name }
    if (d.email) { formData.email = d.email }

    setLoading(true)
    const res = await functions.patch(`/users/${props.user?.id}`, formData);
    setLoading(false);

    if (!functions.apiError(res)) {
      addToast(`User updated.`, {
        appearance: "success",
        autoDismiss: true,
      })
      props.update();
      props.close!();
    } else {
      addToast(`Unable to edit user.`, {
        appearance: "error",
        autoDismiss: true,
      })
    }
  }

  React.useEffect(() => {
    setData(props?.user)
  }, [users])


  // p.error-message

  return(
    <div className={"add-user-modal"}>
      <h1>Edit User</h1>
      <Formik
        initialValues={props.user ? props.user : {name: "", email :""}}
        onSubmit={editUser}
        validationSchema={Schema}
      >
        {({handleChange, errors, values, handleSubmit, touched, handleBlur}) => {
          return(
            <form className={"grid"} onSubmit={handleSubmit}>
              <div className={"i-1 col-m-6 col-xs-12"}>
                <div className="input-label-wrapper">
                  <p className="input-label">
                    Name:
                  </p>
                </div>
                <input style={{width: "100%"}} onBlur={handleBlur} placeholder={"Name"} type="text" name={"name"} onChange={handleChange} value={values.name} />
                {errors.name && touched.name && <p className={"error-message"}>{errors.name}</p>}
              </div>

              <div className={"i-1 col-m-6 col-xs-12"}>
                <div className="input-label-wrapper">
                  <p className="input-label">
                    Email:
                  </p>
                </div>
                <input style={{width: "100%"}} placeholder={"Email"} type="text" name={"email"} onChange={handleChange} value={values.email} />
                {errors.email && touched.email && <p className={"error-message"}>{errors.email}</p>}
              </div>
            <div className="btn-wrap">
              <LoaderBtn loading={loading} disabled={loading} type={"submit"} className={"button"}>Confirm Changes</LoaderBtn>
            </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
};

export default EditUserModal