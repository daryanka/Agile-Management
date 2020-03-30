import React, {FC, useState} from "react";
import Divider from "../../../Components/Divider";
import SingleComment from "./SingleComment";
import Modal, {ModalRef} from "../../../Components/Modal";
import AddComment from "./AddComment";
import {Comment} from "../Project";
import _ from "lodash";

interface Props {
  comments?: Comment[]
}

const Comments: FC<Props> = (props) => {
  const addModal = React.useRef<ModalRef>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  React.useEffect(() => {
    setComments(props.comments ? props.comments : []);
  }, [])

  return(
    <div className="comments">
      <Modal ref={addModal}>
        <AddComment />
      </Modal>
      <h4>Comments</h4>
      <button onClick={() => addModal!.current!.open()} className={"button add-btn"}>Add Comment</button>
      <div className="comments-box">
        {_.isEmpty(comments) ? <p>No Comments found.</p>: comments.map((com, i) => {
            return (
              <React.Fragment key={com.id}>
                <SingleComment  username={com.name} text={com.comment_text}/>
                {i === comments.length - 1 ? null : <Divider/>}
              </React.Fragment>
            )
          })}
      </div>
    </div>
  )
}

export default Comments;