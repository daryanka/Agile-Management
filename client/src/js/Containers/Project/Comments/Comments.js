import React from "react";
import Divider from "../../../Components/Divider";
import SingleComment from "./SingleComment";
import Modal from "../../../Components/Modal";
import AddComment from "./AddComment";

const Comments = () => {
  const addModal = React.useRef();
  const comments = [
    {
      username: "Sara Jane",
      text: "lorem ipsumn asiodjas jdaskdj askldj aslkdj aslkjd",
      id: 123
    },
    {
      username: "John Doe",
      text: "lorem ipsumn asiodjas jdaskdj askldj aslkdj aslkjd",
      id: 22
    },
  ]

  return(
    <div className="comments">
      <Modal ref={addModal}>
        <AddComment />
      </Modal>
      <h4>Comments</h4>
      <button onClick={() => addModal.current.open()} className={"button add-btn"}>Add Comment</button>
      <div className="comments-box">
        {comments.map((com, i) => {
          console.log(i === comments.length - 1)
          return (
            <React.Fragment key={com.id}>
              <SingleComment  username={com.username} text={com.text}/>
              {i === comments.length - 1 ? null : <Divider/>}
            </React.Fragment>
            )
        })}
      </div>
    </div>
  )
}

export default Comments;