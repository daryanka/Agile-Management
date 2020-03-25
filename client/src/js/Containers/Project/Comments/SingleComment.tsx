import React, {useState, useRef, FC} from "react";
import ContentEditable from "react-contenteditable"
import {FiEdit3} from "react-icons/Fi"
import {FaTimes} from "react-icons/Fa"
import LoaderBtn from "../../../Components/LoaderBtn";
import Modal, {ModalRef} from "../../../Components/Modal";
import {useToasts} from "react-toast-notifications";

interface Props {
  username: string,
  text: string
}

const SingleComment: FC<Props>  = (props) => {
  const {addToast} = useToasts();
  const modalRef= useRef<ModalRef>(null);
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [initialText, setInitialText] = useState("");

  React.useEffect(() => {
    setText(props.text)
    setInitialText(props.text)
  }, [])

  const disableEnter = (e: { key: string; preventDefault: () => void; }) => {
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

    setInitialText(text);
    setEditing(false);
  }

  const undoChanges = () => {
    setEditing(false);
    setText(initialText);
  }

  const deleteComment = async () => {
    //Close modal on success
    modalRef!.current!.close()

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
              <p>Are you sure you  want to delete this comment? This action cannot be reversed.</p>
              <div className={"btns"}>
                <button className={"button secondary"} onClick={() => modalRef!.current!.close()}>Close</button>
                <LoaderBtn disabled={deleteLoading} loading={deleteLoading} className={"button"} onClick={deleteComment}>Save Changes</LoaderBtn>
              </div>
            </div>
          </>
        ))()}
      </Modal>
      <FaTimes className={"del"} onClick={() => modalRef!.current!.open()} />
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
          <button className={"button secondary"} onClick={undoChanges}>Cancel</button>
          <LoaderBtn disabled={loading} loading={loading} className={"button two"} onClick={saveChanges}>Save Changes</LoaderBtn>
        </div>
      ) : <FiEdit3 className={"edit"} onClick={() => setEditing(true)}/>}
    </div>
  )
};

export default SingleComment;