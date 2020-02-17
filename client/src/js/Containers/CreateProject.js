import React from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";
import { FaTimes } from "react-icons/fa"
import Textarea from "../Components/Textarea";

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

  const removeLink = (index) => {
    const linksCopy = [...links];
    linksCopy.splice(index, 1);
    setLinks(linksCopy)
  }

  return(
    <div className={"create-project"}>
      <h1>Create New Project</h1>
      <Form className={"grid"} onSubmit={createProject}>
        <Input
          handleChange={handleChange}
          name={"project_name"}
          placeholder={""}
          wrapperClassName={"col-xs-12"}
          label={"Project Name*"}
          validation={"required"}
        />
        <Textarea
          handleChange={handleChange}
          name={"description"}
          placeholder={""}
          wrapperClassName={"col-xs-12 textarea-c"}
          label={"Description*"}
          validation={"required"}
        />
        <div className="col-xs-12">
          <button type={"button"} className={"button add-link"} onClick={addLink}>Add Link</button>
        </div>
        {links.map((link, i) => {
          return(
            <div className={"col-xs-12 link-cont"} key={`key-${i}`}>
              <Input
                handleChange={handleChange}
                name={`link_name-${i}`}
                placeholder={""}
                wrapperClassName={"link-input"}
                validation={"required"}
                label={"Link Name*"}
              />
              <Input
                handleChange={handleChange}
                name={`link_url-${i}`}
                placeholder={""}
                validation={"required"}
                wrapperClassName={"link-input"}
                label={"URL*"}
              />
              <button type={"button"} onClick={() => removeLink(i)} className={"button secondary"}><FaTimes /></button>
            </div>
          )
        })}
        <div className="col-xs-12">
          <button className={"button"} type={"submit"}>Submit</button>
        </div>
      </Form>
    </div>
  )
};

export default CreateProject