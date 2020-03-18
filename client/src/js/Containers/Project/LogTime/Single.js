import React from "react";
import {FiEdit3} from "react-icons/Fi";
import Modal from "../../../Components/Modal";
import EditModal from "./EditModal";
import { FaTimes } from "react-icons/fa"
import DeleteTime from "./DeleteTime";


const Single = (props) => {
  const editRef = React.useRef();
  const deleteRef = React.useRef();

  return(
    <div className="comment">
      <Modal ref={editRef}>
        <EditModal description={"lorem ipsum"} time={"2w 3d"} id={props.id}/>
      </Modal>
      <Modal ref={deleteRef}>
        <DeleteTime id={props.id}/>
      </Modal>
      <FaTimes className={"del"} onClick={() => deleteRef.current.open()}/>
      <p className="comment-title">Daryan Amin - 12 Hours <FiEdit3 onClick={() => editRef.current.open()} /></p>
      <p className="comment-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  )
};

export default Single;