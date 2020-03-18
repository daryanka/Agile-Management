import React from "react";
import LoaderBtn from "../../../Components/LoaderBtn";

const DeleteTime = (props) => {
  const [loading, setLoading] = React.useState(false);
  const confirm = () => {

  }

  return(
    <div className={"delete-time"}>
      <h1>Delete Logged Time?</h1>
      <p>Are you sure you want to delete the logged time? This action cannot be reversed.</p>
      <div className={"btns"}>
        <button className={"button secondary"} onClick={props.close}>Cancel</button>
        <LoaderBtn loading={loading} disabled={loading} onClick={confirm}>Confirm</LoaderBtn>
      </div>
    </div>
  )
}

export default DeleteTime;