import React from "react";
import LoaderBtn from "../../Components/LoaderBtn";
import Input from "../../Components/Input";
import Form from "../../Components/Form";

const TimeModal = () => {
  const [state, setState] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const onChange = (val, name) => {
  };

  const toggleLoading = () => {
    console.log("toggle")
    setLoading(!loading);

    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className={"time-estimates"}>
      <h1>Add Time</h1>
      <div className={"time-estimates-box"}>
        <div className={"left"}>
          <p>Description</p>
          <textarea className={"text-field"}></textarea>
        </div>
        <Form className={"right"}>
          <p>Time</p>
          <Input handleChange={onChange} placeholder={"1w 4d 2h 31m"} name={"time"} />
          <p>Time: 0 Minutes</p>
          <div className={"modal-buttons-cont"}>
            <div className={"btns"}>
              <button className={"button secondary button-1"}>Cancel</button>
              <LoaderBtn disabled={loading} loading={loading} onClick={toggleLoading} className={"button-loader button-2"}>
                Confirm
              </LoaderBtn>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
};

export default TimeModal;