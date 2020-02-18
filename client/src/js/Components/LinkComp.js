import React, { useState, useEffect } from "react";
import Input from "./Input";
import {FaTimes} from "react-icons/fa";
import Form from "./Form";
import LoaderBtn from "./LoaderBtn";
import {useToasts} from "react-toast-notifications";
import ContentEditable from "react-contenteditable";


const LinkComp = (props) => {
  const {addToast} = useToasts();
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    link_name: "",
    link_url: ""
  })
  const newWindow = () => {
    window.open(props.url, '_blank');
  }

  const onChange = (val, name) => {
    setData(prev => ({...prev, [name]: val}))
  }

  const saveNew = async () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      addToast(`Added new link.`, {
        appearance: "success",
        autoDismiss: true,
      })
      props.addNew(data.link_name, data.link_url);

    }, 1000);
  }

  useEffect(() => {
    if (!props.isNew) {
      setData({
        link_name: props.name,
        link_url: props.url
      })
    }
  }, [])

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
    <div className={"link-comp"}>
      <ContentEditable
        html={data.name}
        onChange={() => onChange(e.target.value, "name")}
        disabled={!editable}
        tagName={"p"}
        className={"link-name"}
      />
      <ContentEditable
        html={data.url}
        onChange={() => onChange(e.target.value, "url")}
        disabled={!editable}
        tagName={"p"}
        className={"link-url"}
      />
    </div>
  )
}

export default LinkComp