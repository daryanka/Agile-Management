import React, {FC, useState} from "react";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Select from "react-select";
import LoaderBtn from "../../Components/LoaderBtn";
import {useSelector} from "react-redux";
import {RootState} from "../../Store";
import fn from "../../../functions";

interface Props {
  projectID: string,
  updateTasks: () => void,
  close?: () => void
}

const AddTaskModal: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({title: "", description: ""})
  const [selectVal, setSelectVal] = useState<{label: string, value: string | number}>()
  const users = useSelector((state: RootState) => state.users.users);

  const addTask = async () => {
    setLoading(true);

    const res = await fn.post(`/tasks/${props.projectID}`, {
      title: data.title,
      description: data.description,
      user_id: selectVal?.value ? selectVal.value : null
    });

    setLoading(false);
    if (!fn.apiError(res)) {
      props.updateTasks();
      props.close!()
    }
  }

  const handleChange = (val: string, name: string) => {
    setData(prev => ({
      ...prev,
      [name]: val,
    }))
  }

  return(
    <div className={"add-task-modal"}>
      <h1>Add New Task</h1>
      <Form onSubmit={addTask}>
        <Input wrapperClassName={"title"} label={"Title"} validation={"required"} handleChange={handleChange} name={"title"} placeholder={"Task title..."}/>
        <Textarea wrapperClassName={"desc"} label={"Description"} validation={"required"} handleChange={handleChange} name={"description"} placeholder={"Task description..."}/>
        <Select options={users.map(user => ({label: user.name, value: user.id}))} className={"select"} onChange={(val) => setSelectVal(val as {label: string, value: string | number})} />
        <div className={"btn-wrap"}>
          <LoaderBtn loading={loading} className={"btn"} disabled={loading} type={"submit"}>Create Task</LoaderBtn>
        </div>
      </Form>
    </div>
  )
};

export default AddTaskModal