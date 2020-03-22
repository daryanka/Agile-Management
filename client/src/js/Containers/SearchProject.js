import React from "react";
import Divider from "../Components/Divider";
import Modal from "../Components/Modal";
import CreateProject from "./CreateProject";

const SearchProject = () => {
  const createModal = React.useRef();

  return(
    <div className={"search-cont"}>
      <Modal ref={createModal}>
        <CreateProject/>
      </Modal>
      <button className={"button"} onClick={() => createModal.current.open()}>Create New Project</button>
      <div className={"search-box"}>
        <div className={"box-head"}>
          <div className={"box-content"}>
            <h4 className={"head-title"}>Search Projects</h4>
            <input className={"search-box"} />
          </div>
        </div>
        <div className={"box-body"}>
          <div className={"body-element"}>
            <h4 className={"element-title"}>React Hooks</h4>
            <h5 className={"element-desc"}>React Hooks</h5>
          </div>

          <Divider width={"95%"} marginAuto />

          <div className={"body-element"}>
            <h4 className={"element-title"}>React Hooks</h4>
            <h5 className={"element-desc"}>React Hooks</h5>
          </div>

          <Divider width={"95%"} marginAuto />

          <div className={"body-element"}>
            <h4 className={"element-title"}>React Hooks</h4>
            <h5 className={"element-desc"}>React Hooks</h5>
          </div>

          <Divider width={"95%"} marginAuto />

          <div className={"body-element"}>
            <h4 className={"element-title"}>React Hooks</h4>
            <h5 className={"element-desc"}>React Hooks</h5>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SearchProject