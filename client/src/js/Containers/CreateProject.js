import React from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";

const CreateProject = () => {
  const [data, setData] = React.useState();

  const handleChange = (val, name) => {
    setData(prevState => {
      return {...prevState, [name]: val}
    })
  };

  const createProject = async () => {

  }

  return(
    <div className={"create-project"}>
      <h1>Create New Project</h1>
      <Form onSubmit={createProject}>
        <Input
          handleChange={handleChange}
          name={"project_name"}
          placeholder={""}
          label={"Project Name*"}
        />
        <Input
          handleChange={handleChange}
          name={"project_name"}
          placeholder={""}
          label={"Project Name*"}
        />
      </Form>
    </div>
  )
};

export default CreateProject