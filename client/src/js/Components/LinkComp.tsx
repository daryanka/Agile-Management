import React, { useState, useEffect, FC } from "react";
import Input from "./Input";
import {FaTimes} from "react-icons/fa";
import Form from "./Form";
import LoaderBtn from "./LoaderBtn";
import {useToasts} from "react-toast-notifications";
import ContentEditable from "react-contenteditable";
import {FiEdit3} from "react-icons/Fi"
import functions from "../../functions";


interface Props {
  url?: string,
  ProjectID: string,
  isNew?: boolean,
  name?: string,
  cancel?: () => void,
  update: () => void,
  linkID?: number
}

const LinkComp: FC<Props> = (props) => {
  const {addToast} = useToasts();
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitalData] = useState<{
    link_name: string | void,
    link_url: string | void
  }>()

  const [data, setData] = useState<{link_name: string | undefined, link_url: string | undefined}>({
    link_name: "",
    link_url: ""
  })
  const [delLoading, setDelLoading] = useState(false);
  const newWindow = () => {
    if (!editable) {
      window.open(props.url, '_blank');
    }
  }

  const onChange = (val: string, name: string) => {
    setData(prev => ({...prev, [name]: val}))
  }

  const saveNew = async () => {
    setLoading(true)

    const res = await functions.post(`/links/${props.ProjectID}`, {
      link_name: data.link_name,
      link_url: data.link_url,
    })
    setLoading(false)
    addToast(`Added new link.`, {
      appearance: "success",
      autoDismiss: true,
    })
    props.update();
  }

  useEffect(() => {
    if (!props.isNew) {
      setInitalData({
        link_name: props.name,
        link_url: props.url
      })

      setData({
        link_name: props.name,
        link_url: props.url
      })
    }
  }, [])

  const disableEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  const saveChanges = async () => {
    setLoading(true)

    const res = await functions.patch(`/links/${props.linkID}`, {
      link_url: data.link_url!.replace(/&nbsp;/g, ""),
      link_name: data.link_name!.replace(/&nbsp;/g, "")
    })

    setLoading(false)

    if (!functions.apiError(res)) {
      const newData = {
        link_url: data.link_url!.replace(/&nbsp;/g, ""),
        link_name: data.link_name!.replace(/&nbsp;/g, "")
      }
      setData(newData)
      setEditable(false);
      addToast(`Link updated.`, {
        appearance: "success",
        autoDismiss: true,
      })
    }
  }

  const deleteLink = async () => {
    setDelLoading(true)
    const res = await functions.delete(`/links/${props.linkID}`);
    setDelLoading(false)

    if (!functions.apiError(res)) {
      setEditable(false);
      props.update();
      addToast(`Link deleted.`, {
        appearance: "success",
        autoDismiss: true,
      })
    }
  }

  const cancelChanges = () => {
    // @ts-ignore
    setData(initialData)
    setEditable(false);
  }

  if (props.isNew) {
    return (
      <Form className={"new-link-cont"} onSubmit={saveNew}>
        <div className={"input-cont"}>
          <Input
            handleChange={onChange}
            name={`link_name`}
            placeholder={""}
            wrapperClassName={"link-input"}
            validation={"required"}
            label={"Link Name*"}
            value={data.link_name}
          />
          <Input
            handleChange={onChange}
            name={`link_url`}
            placeholder={""}
            validation={"required"}
            wrapperClassName={"link-input link-input-2"}
            value={data.link_url}
            label={"URL*"}
          />
        </div>
        <div className={"btns-cont"}>
          <button disabled={loading} type={"button"} onClick={props.cancel} className={"button secondary"}><FaTimes /></button>
          <LoaderBtn loading={loading} disabled={loading} type={"submit"} className={"button"}>Save</LoaderBtn>
        </div>
      </Form>
   )
  }

  return (
    <div className={`link-comp ${editable ? "editable" : ""}`}>
      <div className={"link-name"}>
        <ContentEditable
          html={data.link_name ? data.link_name : ""}
          onChange={(e) => onChange(e.target.value, "link_name")}
          disabled={!editable}
          tagName={"p"}
          onKeyDown={disableEnter}
        />
      </div>
      <div className={"link-url"}>
        <ContentEditable
          html={data.link_url ? data.link_url : ""}
          onChange={(e) => onChange(e.target.value, "link_url")}
          disabled={!editable}
          tagName={"p"}
          className={"link"}
          onKeyDown={disableEnter}
          onClick={newWindow}
        />
        {!editable && <p className={"edit"} onClick={() => setEditable(true)}>
          <FiEdit3 />
        </p>}
      </div>
      {editable && (
        <div className={"btns"}>
          <button onClick={cancelChanges} disabled={loading || delLoading} className={"button secondary"}>Cancel</button>
          <LoaderBtn onClick={deleteLink} disabled={loading || delLoading} loading={loading} className={"button secondary two"}>Delete</LoaderBtn>
          <LoaderBtn onClick={saveChanges} disabled={loading || delLoading} loading={loading} className={"button two"}>Save</LoaderBtn>
        </div>
      )}
    </div>
  )
}

export default LinkComp