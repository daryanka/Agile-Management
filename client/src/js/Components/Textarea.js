import React from "react"

const Textarea = props => {
  const handleChange = (val, name) => {
    props.handleChange(val, name)
    props.changedValue(val, name)
  }

  return (
    <div
      className={`col-${props.col}  col-offset-${props.colOffset} ${props.wrapperClassName}`}
    >
      <textarea
        style={{ width: "100%", height: props.height }}
        className={`${props.inputClassName} ${!props.removeBasicStyling &&
          "text-area"}`}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value && props.value}
        onChange={e => handleChange(e.target.value, e.target.name)}
      />
      <p className="error-message">
        {props.errors[props.name] && props.errors[props.name]}
      </p>
    </div>
  )
}

Textarea.defaultProps = {
  name: "name",
  placeholder: "placeholder",
  col: "10",
  colOffset: "1",
  wrapperClassName: "",
  inputClassName: "",
  height: "200px"
}

export default Textarea
