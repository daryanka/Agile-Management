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
    setLoading(!loading);

    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className={"time-estimates"}>
      <h1>Add Time</h1>
      <div className={"time-estimates-box"}>
        <div className={"left"}>
          <p>Description</p>
          <textarea className={"text-field"}/>
        </div>
        <Form className={"right"}>
          <p>Time</p>
          <Input handleChange={onChange} placeholder={"1w 4d 2h 31m"} name={"time"} />
          <p>Time: 0 Minutes</p>
          <div className={"modal-buttons-cont"}>
            <div className={"btns"}>
              <LoaderBtn disabled={loading} loading={loading} onClick={toggleLoading} className={"button-loader button-2"}>
                Add Time
              </LoaderBtn>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
};

export default TimeModal;