import React from "react";
import Textarea from "../../../Components/Textarea";
import Form from "../../../Components/Form";
import Input from "../../../Components/Input";
import LoaderBtn from "../../../Components/LoaderBtn";
import Modal from "../../../Components/Modal";

const EditModal = (props) => {
  const [data, setData] = React.useState({
    description: "",
    time: "",
  })



  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setData({
      description: props.description,
      time: props.time
    })
  }, [])

  const submit = () => {
  }

  const onChange = (val, name) => {
    setData(prev => ({...prev, [name]: val}))
  }

  return(
    <div className={"edit-time"}>
      <h1>Edit Time</h1>
      <Form onSubmit={submit}>
        <Textarea label={"Description"} name={"description"} validation={"required"} value={data.description} handleChange={onChange}/>
        <Input label={"Time"} name={"time"} handleChange={onChange} validation={"required"} value={data.time}/>
        <div className={"btns"}>
          <button className="button secondary" type={"button"} onClick={props.close}>Cancel</button>
          <LoaderBtn type={"submit"} className="button" disabled={loading} loading={loading}>Confirm</LoaderBtn>
        </div>
      </Form>
    </div>
  )
};

export default EditModal;