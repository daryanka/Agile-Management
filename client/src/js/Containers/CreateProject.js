import React from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";
import { FaTimes } from "react-icons/fa"
import Textarea from "../Components/Textarea";
import Select from "react-select";

const CreateProject = () => {
  const [data, setData] = React.useState({
    project_name: "",
    description: ""
  });
  const [links, setLinks] = React.useState([]);
  const [assignees, setAssignees] = React.useState([]);

  const handleAssignChange = (val) => {
    setAssignees(val)
  }

  const handleChange = (val, name) => {
    setData(prevState => {
      return {...prevState, [name]: val}
    })
  };

  const boxesHandleChange = (val, name, i) => {
    const prev = [...links];
    prev[i][name.slice(0, -2)] = val;

    setLinks(prev);
  }

  const createProject = async () => {

  }

  const addLink = () => {
    setLinks(prev => [...prev, {}])
  }

  const removeLink = (index) => {
    const linksCopy = [...links];
    linksCopy.splice(index, 1);
    setLinks(linksCopy)
  }

  console.log("links", links)

  return(
    <div className={"create-project"}>
      <h1>Create New Project</h1>
      <Form className={"grid"} onSubmit={createProject}>
        <Input
          handleChange={handleChange}
          name={"project_name"}
          placeholder={""}
          wrapperClassName={"col-xs-12"}
          value={data.project_name}
          label={"Project Name*"}
          validation={"required"}
        />
        <Textarea
          handleChange={handleChange}
          name={"description"}
          placeholder={""}
          wrapperClassName={"col-xs-12 textarea-c"}
          label={"Description*"}
          value={data.description}
          validation={"required"}
        />
        <Select isMulti className={"select-comp col-xs-12"} name={"select user"} onChange={handleAssignChange} options={[
          {
            label: "Daryan Amin",
            value: 23,
          },
          {
            label: "John Smith",
            value: 11,
          },
          {
            label: "Jane Doe",
            value: 122,
          }
        ]}/>
        <div className="col-xs-12">
          <button type={"button"} className={"button add-link"} onClick={addLink}>Add Link</button>
        </div>
        {links.map((link, i) => {
          return(
            <div className={"col-xs-12 link-cont"} key={`key-${i}`}>
              <Input
                handleChange={(val, name) => boxesHandleChange(val, name, i)}
                name={`link_name-${i}`}
                placeholder={""}
                wrapperClassName={"link-input"}
                validation={"required"}
                label={"Link Name*"}
              />
              <Input
                handleChange={(val, name) => boxesHandleChange(val, name, i)}
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