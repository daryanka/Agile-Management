import React from "react";
import Select from "react-select";

const AssignUserModal = () => {
  const [state, setState] = React.useState();

  const onChange = (val) => {
    console.log(val)
  };

  return (
    <>
      <div className="assign-user">
        <h1>Assign To Project</h1>
        <Select className={"select-comp"} name={"select user"} onChange={onChange} options={[
          {
            label: "Daryan Amin",
            value: 23,
          },
          {
            label: "John Smith",
            value: 11,
          },
          {
            label: "Jane Doe",
            value: 122,
          }
        ]}/>
      </div>
      <div className={"modal-buttons-cont"}>
        <div className={"btns"}>
          <button className={"button secondary button-1"}>Cancel</button>
          <button className={"button button-2"}>Confirm</button>
        </div>
      </div>
    </>
  )
}

export default AssignUserModal