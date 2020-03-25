import React, {FC} from "react";
import {FiEdit3} from "react-icons/Fi";
import Modal, {ModalRef} from "../../../Components/Modal";
import EditModal from "./EditModal";
import { FaTimes } from "react-icons/fa"
import DeleteTime from "./DeleteTime";
import {Time} from "../Project";
import functions from "../../../../functions";

interface Props {
  time: Time
}

const Single: FC<Props> = (props) => {
  const editRef = React.useRef<ModalRef>(null);
  const deleteRef = React.useRef<ModalRef>(null);

  return(
    <div className="comment">
      <Modal ref={editRef}>
        <EditModal description={"lorem ipsum"} time={"2w 3d"} id={props.time.id}/>
      </Modal>
      <Modal ref={deleteRef}>
        <DeleteTime id={props.time.id}/>
      </Modal>
      <FaTimes className={"del"} onClick={() => deleteRef!.current!.open()}/>
      <p className="comment-title">{props.time.name} - {functions.minutesToTime(props.time.minutes_logged)} <FiEdit3 onClick={() => editRef!.current!.open()} /></p>
      <p className="comment-text">
        {props.time.description}
      </p>
    </div>
  )
};

export default Single;