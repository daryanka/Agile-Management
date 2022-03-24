import React, {FC} from "react";
import LoaderBtn from "../../../Components/LoaderBtn";
import fn from "../../../../functions";

interface Props {
  close?: () => void,
  update: () => void,
  id: number
}

const DeleteTime: FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const confirm = async () => {
    setLoading(true);
    const res = await fn.delete(`/time/${props.id}`)
    setLoading(false);

    if (!fn.apiError(res)) {
      props.update();
      props.close!();
    }
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