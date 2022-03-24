import React, {FC, useState} from "react";
import LoaderBtn from "../../Components/LoaderBtn";
import fn from "../../../functions";
import {useToasts} from "react-toast-notifications";

interface Props {
  update:() => void,
  close?: () => void,
  id?: number
}

const DeleteConfirmModal: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const {addToast} = useToasts();


  const deleteUser = async () => {
    setLoading(true);
    const res = await fn.delete(`/users/${props.id}`)
    setLoading(false);

    if (!fn.apiError(res)) {
      addToast(`User deleted.`, {
        appearance: "success",
        autoDismiss: true
      })
      props.update()
      props.close!()
    } else {
      addToast(`Unable to delete user.`, {
        appearance: "success",
        autoDismiss: true
      })
    }
  }

  return(
    <div className={"delete-confirm"}>
      <h1>Are you sure you want to delete this user?</h1>
      <p>This action cannot be reversed, if you confirm the user is deleted permanently.</p>
      <div className="buttons-wrapper">
        <button onClick={() => props.close!()} className={"button secondary"}>Cancel</button>
        <LoaderBtn disabled={loading} loading={loading} onClick={deleteUser} className={"button"}>Confirm</LoaderBtn>
      </div>
    </div>
  )
}

export default DeleteConfirmModal;