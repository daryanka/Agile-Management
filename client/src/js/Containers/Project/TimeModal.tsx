import React, {FC, useState} from "react";
import LoaderBtn from "../../Components/LoaderBtn";
import Input from "../../Components/Input";
import Form from "../../Components/Form";
import Textarea from "../../Components/Textarea";
import fn from "../../../functions";
import _ from "lodash";
import { Formik } from "formik";

interface Props {
  update: () => void,
  close?: () => void,
  projectID: string
}

const TimeModal: FC<Props> = (props) => {
  const [t, setT] = useState("");
  const [loading, setLoading] = React.useState(false);

  const validate = (values: {description: string, time: string}) => {
    type errType = {
      description?: null | string,
      time?: null | string
    }
    const errors: errType = {}

    if (!_.isEmpty(values.time)) {
      const t = fn.WDHMToMinutes(values.time as string);
      if (t.valid) {
        const str = fn.minutesToTime(t.minutes);
        setT(str);
      } else {
        errors.time = "Invalid time format"
      }
    } else {
      errors.time = "This field is required";
    }

    if (_.isEmpty(values.description)) {
      errors.description = "This field is required"
    }

    return errors;
  }

  const submit = async (values: {time: string, description: string}) => {
    const {minutes} = fn.WDHMToMinutes(values.time);

    const res = await fn.post(`/time/${props.projectID}`, {
      minutes_logged: minutes,
      description: values.description
    })

    if (!fn.apiError(res)) {
      props.update()
      props.close!()
    }
  }

  return (
    <div className={"time-estimates"}>
      <h1>Add Time</h1>
        <Formik
          initialValues={{
            description: '',
            time: ''
          }}
          onSubmit={submit}
          validate={validate}
        >
          {({handleChange, errors, touched, handleBlur, values, submitForm, isSubmitting}) => {
            return(
              <div className={"time-estimates-box"}>
                <div className={"left"}>
                  <p>Description</p>
                  <textarea value={values.description} onBlur={handleBlur} onChange={handleChange} className={"text-field"} name={"description"}/>
                  {(errors.description && touched.description) && (
                    <p>{errors.description}</p>
                  )}
                </div>
                <div  className={"right"}>
                  <p>Time</p>
                  <input value={values.time} onBlur={handleBlur} onChange={handleChange} style={{width: "100%"}} type={"text"} className={"text-input"} placeholder={"1w 4d 2h 31m"} name={"time"} />
                  {(errors.time && touched.time) ? (
                    <p>{errors.time}</p>
                  ) : (
                    <p>{t}</p>
                  )}
                  <div className={"modal-buttons-cont"}>
                    <div className={"btns"}>
                      <LoaderBtn onClick={submitForm} disabled={isSubmitting} loading={isSubmitting} type={"button"} className={"button-loader button-2"}>
                        Add Time
                      </LoaderBtn>
                    </div>
                  </div>
                </div>
              </div>
            )
          }}
        </Formik>
    </div>
  )
};

export default TimeModal;