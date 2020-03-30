import React from "react";
import LoaderBtn from "../../Components/LoaderBtn";
import Input from "../../Components/Input";
import Form from "../../Components/Form";
import Textarea from "../../Components/Textarea";

const TimeModal = () => {
  const [state, setState] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const onChange = (val, name) => {
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const submit = () => {
    setLoading(!loading);
    //Split at every space
    const timesArr = state.time.split(" ");
    //Allowed Structures:
    //nnL
    //nL
    //Rules:
    //Letter must be one of w,d,h,n,s
    //Number must be max 2 digits

    let valid = true;
    for (let i = 0; i < timesArr.length; i++) {
      if (timesArr[i].length === 3) {
        const regex = /^[0-9]{2}[wdmh]$/;
        if (!regex.test(timesArr[i])) {
          valid = false;
          break;
        }
      } else if (timesArr[i].length === 2) {
        const regex = /^[0-9][wdmh]$/;
        if (!regex.test(timesArr[i])) {
          valid = false;
          break;
        }
      } else {
        valid = false;
        break;
      }
    }

    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className={"time-estimates"}>
      <h1>Add Time</h1>
      <Form onSubmit={submit} className={"time-estimates-box"}>
        <div className={"left"}>
          <p>Description</p>
          <Textarea handleChange={onChange} name={"description"} className={"text-field"}/>
        </div>
        <div  className={"right"}>
          <p>Time</p>
          <Input validation={"required"} handleChange={onChange} placeholder={"1w 4d 2h 31m"} name={"time"} />
          <p>Time: 0 Minutes</p>
          <div className={"modal-buttons-cont"}>
            <div className={"btns"}>
              <LoaderBtn disabled={loading} loading={loading} type={"submit"} className={"button-loader button-2"}>
                Add Time
              </LoaderBtn>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
};

export default TimeModal;