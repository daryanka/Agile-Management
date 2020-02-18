import React, {useState} from "react";
import ContentEditable from "react-contenteditable";
import {FiEdit3} from "react-icons/Fi"
import LoaderBtn from "../../Components/LoaderBtn";
import {useToasts} from "react-toast-notifications";


const ProjectDescription = (props) => {
  const {addToast} = useToasts();
  const ref = React.useRef();
  const [loading, setLoading] = useState(false)
  const [editable, setEditable] = useState(false)
  const [initalData, setInitialData] = useState();
  const [data, setData] = useState(`
   Lorem ipsum dolor sit amet, consectetur adipiscing elit
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
    id est laborum.`);

  const disableEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  React.useEffect(() => {
    setInitialData(props.description ? props.description : "")
    setData(props.description ? props.description : "")
  }, [])

  const onChange = (e) => {
    setData(e.target.value.replace(/&nbsp;/g, ""))
  }

  const enable = () => {
    setEditable(true)
    setTimeout(() => {
      ref.current.focus()
    }, 0)
  }

  const undoChanges = () => {
    setData(initalData)
    setEditable(false)
  }

  const saveChanges = async () => {
    setLoading(true);

    setTimeout(() => {
      setEditable(false)
      setInitialData(data)
      setLoading(false)
      addToast(`Updated project description.`, {
        appearance: "success",
        autoDismiss: true,
      })
    }, 1000);
    //Make api call
  }

  return(
    <div className={`description ${editable ? "editable": ""}`}>
      <h3>Description </h3>
        <ContentEditable
          html={data}
          disabled={!editable}
          onChange={onChange}
          disabled={!editable}
          tagName={"p"}
          className={"desc"}
          innerRef={ref}
          onKeyDown={disableEnter}
        />
        <p className={"options"}>
          {editable ? (
            <>
              <LoaderBtn disabled={loading} className={"button secondary"} onClick={undoChanges}>Cancel</LoaderBtn>
              <LoaderBtn disabled={loading} loading={loading} className={"button two"} onClick={saveChanges}>Save Changes</LoaderBtn>
            </>
          ) : <FiEdit3 onClick={enable}/>}
        </p>
    </div>
  )
}

export default ProjectDescription;