import React, {useState} from "react";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Select from "react-select";
import LoaderBtn from "../../Components/LoaderBtn";

const AddTaskModal = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({})
  const [selectVal, setSelectVal] = useState()

  const addTask = async () => {

  }

  const handleChange = (val, name) => {
    setData(prev => ({
      ...prev,
      [name]: val,
    }))
  }

  return(
    <div className={"add-task-modal"}>
      <h1>Add New Task</h1>
      <Form onSubmit={addTask}>
        <Input label={"Title"} validation={"required"} handleChange={handleChange} name={"title"} placeholder={"Task title..."}/>
        <Textarea label={"Description"} validation={"required"} handleChange={handleChange} name={"description"} placeholder={"Task description..."}/>
        <Select onChange={(val) => setSelectVal(val)} />
        <LoaderBtn loading={loading} disabled={loading} type={"submit"}>Create Task</LoaderBtn>
      </Form>
    </div>
  )
};

export default AddTaskModal