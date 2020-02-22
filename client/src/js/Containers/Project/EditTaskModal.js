import React from "react";
import ContentEditable from "react-contenteditable"

const EditTaskModal = (props) => {
  console.log("props are", props)
  return(
    <div className={"edit-task-modal"}>
      <ContentEditable
        html={"Task Name"}
        tagName={"h1"}
      />
      <h6>Description:</h6>
      <ContentEditable
        html={"test"}
        tagName={"p"}
      />
    </div>
  )
}

export default EditTaskModal