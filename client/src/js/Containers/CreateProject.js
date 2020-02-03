import React from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";

const CreateProject = () => {
  const [data, setData] = React.useState();
  const [links, setLinks] = React.useState([]);

  const handleChange = (val, name) => {
    setData(prevState => {
      return {...prevState, [name]: val}
    })
  };

  const createProject = async () => {
    console.log("here")
  }

  const addLink = () => {
    setLinks(prev => [...prev, {}])
  }

  return(
    <div className={"create-project"}>
      <h1>Create New Project</h1>
      <Form className={"grid"} onSubmit={createProject}>
        <Input
          handleChange={handleChange}
          name={"project_name"}
          placeholder={""}
          wrapperClassName={"col-xs-12 col-m-6"}
          label={"Project Name*"}
        />
        <Input
          handleChange={handleChange}
          name={"description"}
          placeholder={""}
          wrapperClassName={"col-xs-12 col-m-6"}
          label={"Description*"}
        />
        <div className="col-xs-12">
          <button type={"button"} className={"button"} onClick={addLink}>Add Link</button>
        </div>
        {links.map((link, i) => {
          return(
            <React.Fragment key={i}>
              <Input
                handleChange={handleChange}
                name={"link_name"}
                placeholder={""}
                wrapperClassName={"col-xs-6"}
                validation={"required"}
                label={"Link Name*"}
              />
              <Input
                handleChange={handleChange}
                name={"link_url"}
                placeholder={""}
                validation={"required"}
                wrapperClassName={"col-xs-6"}
                label={"URL*"}
              />
            </React.Fragment>
          )
        })}
        <button type={"submit"}>Submit</button>
      </Form>
    </div>
  )
};

export default CreateProject