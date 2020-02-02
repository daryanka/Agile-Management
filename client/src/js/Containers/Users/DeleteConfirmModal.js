import React from "react";
import LoaderBtn from "../../Components/LoaderBtn";

const DeleteConfirmModal = () => {
  return(
    <div className={"delete-confirm"}>
      <h1>Are you sure you want to delete this user?</h1>
      <p>This action cannot be reversed, if you confirm the user is deleted permanently.</p>
      <div className="buttons-wrapper">
        <LoaderBtn className={"button secondary"}>Cancel</LoaderBtn>
        <LoaderBtn className={"button"}>Confirm</LoaderBtn>
      </div>
    </div>
  )
}

export default DeleteConfirmModal;