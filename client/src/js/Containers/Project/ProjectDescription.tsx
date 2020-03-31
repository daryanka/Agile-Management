import React, {FC, useState} from "react";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import {FiEdit3} from "react-icons/Fi"
import LoaderBtn from "../../Components/LoaderBtn";
import {useToasts} from "react-toast-notifications";
import fn from "../../../functions";

interface Props {
  description?: string,
  projectID: string
}

const ProjectDescription:FC<Props> = (props) => {
  const {addToast} = useToasts();
  const ref = React.useRef<HTMLParagraphElement>(null);
  const [loading, setLoading] = useState(false)
  const [editable, setEditable] = useState(false)
  const [initalData, setInitialData] = useState<string>();
  const [data, setData] = useState<string>();

  const disableEnter = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  React.useEffect(() => {
    setInitialData(props.description ? props.description : "")
    setData(props.description ? props.description : "")
  }, [])

  const onChange = (e: ContentEditableEvent) => {
    setData(e.target.value.replace(/&nbsp;/g, ""))
  }

  const enable = () => {
    setEditable(true)
    setTimeout(() => {
      ref!.current!.focus()
    }, 0)
  }

  const undoChanges = () => {
    setData(initalData)
    setEditable(false)
  }

  const saveChanges = async () => {
    setLoading(true);
    setEditable(false)
    setInitialData(data)

    const res = await fn.patch(`/projects/${props.projectID}`, {
      description: data
    })

    setLoading(false)

    if (!fn.apiError(res)) {
      addToast(`Updated project description.`, {
        appearance: "success",
        autoDismiss: true,
      })
    }

    //Make api call
  }

  return(
    <div className={`description ${editable ? "editable": ""}`}>
      <h3>Description </h3>
        <ContentEditable
          html={!!data ? data : ""}
          disabled={!editable}
          onChange={onChange}
          tagName={"p"}
          className={"desc"}
          innerRef={ref}
          onKeyDown={disableEnter}
        />
        <p className={"options"}>
          {editable ? (
            <>
              <button className={"button secondary"} onClick={undoChanges}>Cancel</button>
              <LoaderBtn disabled={loading} loading={loading} className={"button two"} onClick={saveChanges}>Save Changes</LoaderBtn>
            </>
          ) : <FiEdit3 onClick={enable}/>}
        </p>
    </div>
  )
}

export default ProjectDescription;