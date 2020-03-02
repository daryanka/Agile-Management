import React from "react"
import propTypes from "prop-types";

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

      {props.errors[props.name] && (
        <p className="error-message">
          {props.errors[props.name]}
        </p>
      )}
    </div>
  )
}

Input.defaultProps = {
  type: "text",
  placeholder: "",
  refer: null,
  wrapperClassName: "",
  inputClassName: "",
  style: null,
  isInput: true
}

Input.propTypes = {
  type: propTypes.string,
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  wrapperClassName: propTypes.string,
  inputClassName: propTypes.string,
  style: propTypes.object,
  handleChange: propTypes.func.isRequired
}

export default Input
