import React, {useState, useRef} from "react";
import ContentEditable from "react-contenteditable"
import {FiEdit3} from "react-icons/Fi"
import {FaTimes} from "react-icons/Fa"
import LoaderBtn from "../../../Components/LoaderBtn";
import Modal from "../../../Components/Modal";
import {useToasts} from "react-toast-notifications";


const SingleComment = (props) => {
  const {addToast} = useToasts();
  const modalRef= useRef();
  const ref = useRef();
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [initalText, setInitalText] = useState("");

  React.useEffect(() => {
    setText(props.text)
    setInitalText(props.text)
  }, [])

  const disableEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  const saveChanges = async () => {
    //Make api request
    addToast(`Successfully edited comment.`, {
      appearance: "success",
      autoDismiss: true
    })

    setInitalText(text);
    setEditing(false);
  }

  const undoChanges = () => {
    setEditing(false);
    console.log("here")
    setText(initalText);
  }

  const deleteComment = async () => {
    //Close modal on success
    modalRef.current.close()

    //On success close and send notification
    addToast(`Successfully deleted comment.`, {
      appearance: "success",
      autoDismiss: true
    })
  }

  return (
    <div className="comment">
      <Modal ref={modalRef}>
        {(() => (
          <>
            <div className={"delete-com-modal"}>
              <h1>Delete Comment</h1>
              <p>Are you sure you want to delete this comment? This action cannot be reversed?</p>
              <div className={"btns"}>
                <button className={"button secondary"} onClick={() => modalRef.current.close()}>Close</button>
                <LoaderBtn disabled={deleteLoading} loading={deleteLoading} className={"button"} onClick={deleteComment}>Save Changes</LoaderBtn>
              </div>
            </div>
          </>
        ))()}
      </Modal>
      <FaTimes className={"del"} onClick={() => modalRef.current.open()} />
      <p className="comment-title">{props.username}</p>
      <ContentEditable
        html={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!editing}
        tagName={"p"}
        onKeyDown={disableEnter}
        className={`comment-text ${editing ? "editing" : ""}`}
        innerRef={ref}
      />
      {editing ? (
        <div className={"btns"}>
          <LoaderBtn disabled={loading} className={"button secondary"} onClick={undoChanges}>Cancel</LoaderBtn>
          <LoaderBtn disabled={loading} loading={loading} className={"button two"} onClick={saveChanges}>Save Changes</LoaderBtn>
        </div>
      ) : <FiEdit3 className={"edit"} onClick={() => setEditing(true)}/>}
    </div>
  )
};

export default SingleComment;