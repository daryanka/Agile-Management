import React, {FC, useState} from "react";
import LoaderBtn from "../../../Components/LoaderBtn";
import fn from "../../../../functions";
import {Formik} from "formik";
import _ from "lodash";

interface Props {
  description: string,
  minutes: number,
  id: number,
  close?: () => void,
  update: () => void
}

const EditModal: FC<Props> = (props) => {
  const [t, setT] = useState("");
  React.useEffect(() => {
   setT(fn.minutesToTime(props.minutes))
    console.log("props are", props)
  }, [])

  const submit = async (values: {time: string, description: string}) => {
    const res = await fn.patch(`/time/${props.id}`, {
      minutes_logged: fn.WDHMToMinutes(values.time).minutes,
      description: values.description
    })

    if (!fn.apiError(res)) {
      props.update();
      props.close!();
    }
  }

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

    console.log("here", values, errors)

    return errors;
  }

  return(
    <div className={"edit-time"}>
      <h1>Edit Time</h1>
      <Formik
        initialValues={{
          description: props.description,
          time: fn.minutesToWDHM(props.minutes)
        }}
        validate={validate}
        validateOnChange
        onSubmit={submit}
      >
        {({errors, handleChange, touched, handleBlur, values, submitForm, isSubmitting}) => {
          return(
            <div>
              <p>Description</p>
              <textarea style={{ width: "100%", height: "200px" }} value={values.description} onBlur={handleBlur} onChange={handleChange} className={"text-field"} name={"description"}/>
              {(errors.description && touched.description) && (
                <p>{errors.description}</p>
              )}
              <p>Time</p>
              <input value={values.time} onBlur={handleBlur} onChange={handleChange} style={{width: "100%"}} type={"text"} className={"text-input"} placeholder={"1w 4d 2h 31m"} name={"time"} />
              {(errors.time && touched.time) ? (
                <p>{errors.time}</p>
              ) : (
                <p>{t}</p>
              )}
              <div className={"btns"}>
                <button className="button secondary" type={"button"} onClick={props.close}>Cancel</button>
                <LoaderBtn type={"button"} onClick={submitForm} className="button" disabled={isSubmitting} loading={isSubmitting}>Confirm</LoaderBtn>
              </div>
            </div>
          )
        }}
      </Formik>
      {/*<Form onSubmit={submit}>*/}
      {/*  <Textarea label={"Description"} name={"description"} validation={"required"} value={data.description} handleChange={onChange}/>*/}
      {/*  <Input label={"Time"} name={"time"} handleChange={onChange} validation={"required"} value={data.time}/>*/}
      {/*  <div className={"btns"}>*/}
      {/*    <button className="button secondary" type={"button"} onClick={props.close}>Cancel</button>*/}
      {/*    <LoaderBtn type={"submit"} className="button" disabled={loading} loading={loading}>Confirm</LoaderBtn>*/}
      {/*  </div>*/}
      {/*</Form>*/}
    </div>
  )
};

export default EditModal;