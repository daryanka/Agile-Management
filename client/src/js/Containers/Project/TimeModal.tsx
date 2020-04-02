import React, {FC, useState} from "react";
import LoaderBtn from "../../Components/LoaderBtn";
import Input from "../../Components/Input";
import Form from "../../Components/Form";
import Textarea from "../../Components/Textarea";
import fn from "../../../functions";

interface Props {
  update: () => void,
  close?: () => void
}

const TimeModal: FC<Props> = () => {
  const [state, setState] = React.useState<{
    description: string,
    time: string
  }>({
    description: "",
    time: ""
  });
  const [t, setT] = useState({
    valid: true,
    str: ""
  });
  const [loading, setLoading] = React.useState(false);

  const onChange = (val: string | number, name: string) => {
    if (name === "time") {
      const t = fn.WDHMToMinutes(val as string);

      if (t.valid) {
        const str = fn.minutesToTime(t.minutes);

        setT({
          valid: t.valid,
          str
        })
      } else {
        setT({
          valid: t.valid,
          str: ""
        })
      }
    }
    setState(prev => ({
      ...prev,
      [name]: val
    }))
  };

  const submit = () => {
    setLoading(!loading);
    //Split at every space
    const timesArr = state.time;
    setLoading(false);
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
          {t.valid ? (
            <p>{t.str}</p>
          ) : (
            <p>Invalid Structure</p>
          )}
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