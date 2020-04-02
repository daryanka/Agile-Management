import React, {FC} from "react";
import {FiEdit3} from "react-icons/Fi";
import Modal, {ModalRef} from "../../../Components/Modal";
import EditModal from "./EditModal";
import { FaTimes } from "react-icons/fa"
import DeleteTime from "./DeleteTime";
import {TimeType} from "../Project";
import functions from "../../../../functions";

interface Props {
  time: TimeType,
  projectID: string,
  update: () => void
}

const Single: FC<Props> = (props) => {
  const editRef = React.useRef<ModalRef>(null);
  const deleteRef = React.useRef<ModalRef>(null);

  return(
    <div className="comment">
      <Modal ref={editRef}>
        <EditModal
          description={props.time.description}
          minutes={props.time.minutes_logged}
          id={props.time.id}
          update={props.update}
        />
      </Modal>
      <Modal ref={deleteRef}>
        <DeleteTime update={props.update} id={props.time.id}/>
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