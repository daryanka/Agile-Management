import React from "react";
import Form from "../../../Components/Form";
import Textarea from "../../../Components/Textarea";
import LoaderBtn from "../../../Components/LoaderBtn";

const AddComment = () => {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {

  }

  return(
    <div className={"add-com-modal"}>
      <h1>Add Comment</h1>
      <Form className={"form"} onSubmit={submit}>
        <Textarea validation={"required"} name={"textField"} value={text} handleChange={(val, name) => setText(val)} placeholder={"Comment..."}/>
        <div className={"btns"}>
          <button type={"button"} className={"button secondary"}>Cancel</button>
          <LoaderBtn type={"submit"} loading={loading} disabled={loading}>Confirm</LoaderBtn>
        </div>
      </Form>
    </div>
  )
}

export default AddComment;