import React from "react";
import Select from "react-select";
import LoaderBtn from "../../Components/LoaderBtn";

const AssignUserModal = () => {
  const [state, setState] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const onChange = (val) => {
    setState(val)
  };

  const toggleLoading = () => {
    console.log("toggle")
    setLoading(!loading);

    setTimeout(() => setLoading(false), 2000)
  }

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
      <p></p>
      <div className={"modal-buttons-cont"}>
        <div className={"btns"}>
          <button className={"button secondary button-1"}>Cancel</button>
          <LoaderBtn disabled={loading} loading={loading} onClick={toggleLoading} className={"button-loader button-2"}>
            Confirm
          </LoaderBtn>
        </div>
      </div>
    </>
  )
}

export default AssignUserModal