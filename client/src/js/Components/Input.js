import React from "react"

const Input = props => {
  if (props.validation) {
    const list = props.validation.split("|")
    list.forEach(el => {})
  }

  const handleChange = (val, name) => {
    props.changedValue(val, name)
    props.handleChange(val, name)
  }

  return (
    <div
      style={props.style}
      className={`${props.wrapperClassName}`}
    >
      {props.label ? (
        <div className="input-label-wrapper">
          <p className="input-label">
            {props.label}
            {!props.removeSemiColon && ":"}
          </p>
          {props.tooltip && (
            <div onClick={props.tooltipClick} className="tooltip-wrapper">
              <p className="label-tooltip">?</p>
            </div>
          )}
        </div>
      ) : null}
      <input
        style={{ width: "100%" }}
        onChange={e => handleChange(e.target.value, e.target.name)}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        className={`${!props.removeBasicStyling && "text-input"} ${
          props.inputClassName
        } `}
        value={props.value}
      />
      <p className="error-message">
        {props.errors[props.name] && props.errors[props.name]}
      </p>
    </div>
  )
}

Input.defaultProps = {
  type: "text",
  name: "name",
  placeholder: "Placeholder",
  refer: null,
  wrapperClassName: "",
  inputClassName: "",
  style: null
}

export default Input