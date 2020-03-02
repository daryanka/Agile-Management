import React, {useState} from "react";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Select from "react-select";

const AddTaskModal = () => {
  const [data, setData] = useState({})
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
        <Input validation={"required"} handleChange={handleChange} name={"title"} placeholder={"Task title..."}/>
        <Textarea validation={"required"} handleChange={handleChange} name={"description"} placeholder={"Task description..."}/>
        <Select/>
      </Form>
    </div>
  )
};

export default AddTaskModal