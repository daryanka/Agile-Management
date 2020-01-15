import React from "react";

const Project = (props) => {
  return (
    <div className={"project-cont"}>
      <div className={"project-box"}>
        <div className={"box-header"}>
          <h3 className={"title"}>{props.match.params.id}</h3>
        </div>

        <div className={"box-content"}>
        
        </div>
      </div>
    </div>
  )
};

export default Project