import React, {useCallback, useState} from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";
import { FaTimes } from "react-icons/fa"
import Textarea from "../Components/Textarea";
import Select from "react-select";
import {useDropzone} from 'react-dropzone'
import _ from "lodash";
import { useToasts } from 'react-toast-notifications'
import constants from "../constants";

const CreateProject = () => {
  const [data, setData] = useState({
    project_name: "",
    description: ""
  });
  const [links, setLinks] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [files, setFiles] = useState([]);
  const { addToast } = useToasts()


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

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const extension = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);

      if (constants.availableDataTypes.includes(extension)) {
        setFiles(prev => [...prev, file])
      } else {
        //Send Notification
        addToast(`Cannot upload files with extension ${extension}.`, {
          appearance: "error",
          autoDismiss: true,
          transitionState: "entered"
        })
      }
    })
  }, [])

  const removeFile = (i) => {
    const copy = [...files];
    copy.splice(i, 1);
    setFiles(copy);
  }


  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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
        <div className={`drop-zone ${isDragActive ? "active" : ""}`} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drop files here, or click to select files (optional) <span>Allowed file types: {constants.availableDataTypes.map((fileType, i) => {
            if (i === constants.availableDataTypes.length - 1) {
              return `${fileType}`
            }
            return `${fileType}, `
          })}</span></p>

        </div>
        {!_.isEmpty(files) && (
          <div className={"files-list"}>
            {files.map((file, i) => {
              return <p key={`file-${i}`} className={"single-file"}>{file.name} <FaTimes onClick={() => removeFile(i)}/></p>
            })}
          </div>
        )}
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