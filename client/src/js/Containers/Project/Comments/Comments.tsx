import React, {FC, useState} from "react";
import Divider from "../../../Components/Divider";
import SingleComment from "./SingleComment";
import Modal, {ModalRef} from "../../../Components/Modal";
import AddComment from "./AddComment";
import {Comment} from "../Project";
import _ from "lodash";
import ContentLoader from "../../../Components/ContentLoader";
import functions from "../../../../functions";

interface Props {
  comments?: Comment[],
  projectID: string
}

const Comments: FC<Props> = (props) => {
  const addModal = React.useRef<ModalRef>(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  React.useEffect(() => {
    setComments(props.comments ? props.comments : []);
  }, [])

  const update = async () => {
    setLoading(true)
    const res = await functions.get(`/comments/${props.projectID}`)
    setLoading(false)

    if (!functions.apiError(res)) {
      console.log("res.data ", res.data)
      setComments(res.data)
    }
  }

  console.log(comments)

  return(
    <div className="comments">
      <Modal ref={addModal}>
        <AddComment update={update} projectID={props.projectID} />
      </Modal>
      <h4>Comments</h4>
      <button onClick={() => addModal!.current!.open()} className={"button add-btn"}>Add Comment</button>
      <div className="comments-box">
        <ContentLoader loading={loading} data={comments}>
          <>
            {
              comments.map((com, i) => {
                return (
                  <React.Fragment key={com.id}>
                    <SingleComment id={com.id}  username={com.name} text={com.comment_text} update={update}/>
                    {i === comments.length - 1 ? null : <Divider/>}
                  </React.Fragment>
                )
              })
            }
          </>
        </ContentLoader>
      </div>
    </div>
  )
}

export default Comments;