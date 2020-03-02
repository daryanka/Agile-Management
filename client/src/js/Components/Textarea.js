import React from "react"
import propTypes from "prop-types";
import Input from "./Input";

const Textarea = props => {
  const handleChange = (val, name) => {
    props.handleChange(val, name)
    props.changedValue(val, name)
  }

  return (
    <div
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
  placeholder: "",
  wrapperClassName: "",
  inputClassName: "",
  height: "200px",
  isInput: true
}

Input.propTypes = {
  type: propTypes.string,
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  wrapperClassName: propTypes.string,
  inputClassName: propTypes.string,
  style: propTypes.object,
  handleChange: propTypes.func.isRequired,
  label: propTypes.string,
  height: propTypes.string
}

export default Textarea
