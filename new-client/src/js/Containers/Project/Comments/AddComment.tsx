import React, {FC} from "react";
import Form from "../../../Components/Form";
import Textarea from "../../../Components/Textarea";
import LoaderBtn from "../../../Components/LoaderBtn";
import {useToasts} from "react-toast-notifications";
import fn from "../../../../functions";

interface Props {
  update: () => void,
  projectID: string,
  close?: () => void;
}

const AddComment: FC<Props> = (props) => {
  const {addToast} = useToasts();
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true)
    const res = await fn.post(`/comments/${props.projectID}`, {
      comment_text: text
    })

    setLoading(false)

    if (!fn.apiError(res)) {
      addToast(`Comment added.`, {
        appearance: "success",
        autoDismiss: true,
      })
      props.update();
      props.close!()
    } else {
      addToast(`Unable to added comment.`, {
        appearance: "error",
        autoDismiss: true,
      })
    }
  }

  return(
    <div className={"add-com-modal"}>
      <h1>Add Comment</h1>
      <Form className={"form"} onSubmit={submit}>
        <Textarea validation={"required"} name={"textField"} value={text} handleChange={(val: string, name:string) => setText(val)} placeholder={"Comment..."}/>
        <div className={"btns"}>
          <button onClick={() => props.close!()} type={"button"} className={"button secondary"}>Cancel</button>
          <LoaderBtn type={"submit"} loading={loading} disabled={loading}>Confirm</LoaderBtn>
        </div>
      </Form>
    </div>
  )
}

export default AddComment;