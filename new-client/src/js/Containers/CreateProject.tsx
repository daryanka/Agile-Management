import React, {useCallback, useState, FC} from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";
import { FaTimes } from "react-icons/all"
import Textarea from "../Components/Textarea";
import Select, {OptionsType, ValueType} from "react-select";
import {useDropzone} from 'react-dropzone'
import _ from "lodash";
import { useToasts } from 'react-toast-notifications'
import constants from "../constants";
import fn from "../../functions";
import LoaderBtn from "../Components/LoaderBtn";
import {useSelector} from "react-redux";
import {RootState} from "../Store";

interface Props {
  close?: () => void
  update: () => void
}

const CreateProject: FC<Props> = (props) => {
  const [data, setData] = useState({
    project_name: "",
    description: ""
  });
  const users = useSelector((state: RootState) => state.users)
  const [links, setLinks] = useState<{link_url: string, link_name: string}[]>([]);
  const [assignees, setAssignees] = useState<{label: string, value: number}>();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts()


  const handleAssignChange = (val: any) => {
    setAssignees(val as { label: string; value: number; })
  }

  const handleChange = (val: string, name: string) => {
    setData(prevState => {
      return {...prevState, [name]: val}
    })
  };

  const boxesHandleChange = (val: string, n: string, i: number) => {
    let name: string;

    const link = /^link_url/;
    if (link.test(n)) {
      name = "link_url"
    } else {
      name = "link_name"
    }

    const prev = [...links];
    // @ts-ignore
    prev[i][name] = val;

    setLinks(prev);
  }

  const createProject = async () => {
    const formData = new FormData();

    formData.append("project_name", data.project_name);
    formData.append("description", data.description);

    for (let i = 0; i < links.length; i++) {
      formData.append(`links[${i}][link_name]`, links[i].link_name);
      formData.append(`links[${i}][link_url]`, links[i].link_url);
    }

    if (assignees?.value) {
      formData.append("assignee", assignees.value.toString());
    }

    for (let i = 0; i < files.length; i++) {
      formData.append(`files[${i}]`,files[i]);
    }

    setLoading(true);
    const res = await fn.post(`/projects`, formData);
    setLoading(false);

    if (!fn.apiError(res)) {
      props.close!()
      props.update();
    }
  }

  const addLink = () => {
    setLinks(prev => [...prev, {
      link_name: "",
      link_url: ""
    }])
  }

  const removeLink = (index: number) => {
    const linksCopy = [...links];
    linksCopy.splice(index, 1);
    setLinks(linksCopy)
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const extension = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);

      if (constants.availableDataTypes.includes(extension)) {
        setFiles(prev => [...prev, file])
      } else {
        //Send Notification
        addToast(`Cannot upload files with extension ${extension}.`, {
          appearance: "error",
          autoDismiss: true,
        })
      }
    })
  }, [])

  const removeFile = (i: number) => {
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
        <Select
          className={"select-comp col-xs-12"}
          name={"select user"}
          onChange={handleAssignChange}
          value={assignees}
          options={users.users.map(user => ({label: user.name, value: user.id}))}
        />
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
          <LoaderBtn loading={loading} disabled={loading} className={"button"} type={"submit"}>Submit</LoaderBtn>
        </div>
      </Form>
    </div>
  )
};

export default CreateProject