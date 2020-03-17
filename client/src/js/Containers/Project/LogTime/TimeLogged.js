import React from "react";
import Single from "./Single";
import Modal from "../../../Components/Modal";
import EditModal from "./EditModal";
import Divider from "../../../Components/Divider";

const TimeLogged = () => {
  const editRef = React.useRef();
  const [edit, setEdit] = React.useState(null);

  const editModal = (id) => {
    setEdit(id)
    editRef.current.open()
  }

  return(
    <div className="comments comments-2">
      <Modal ref={editRef}>
        <EditModal id={edit}/>
      </Modal>
      <h4>Logged Time</h4>
      <div className="comments-box">
        <Single id={1} edit={editModal} />
        <Divider/>
        <Single id={2} edit={editModal} />
        <Divider/>
        <Single id={3} edit={editModal} />
      </div>
    </div>
  )
}

export default TimeLogged