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
  placeholder: "placeholder",
  col: "10",
  colOffset: "1",
  wrapperClassName: "",
  inputClassName: "",
  height: "200px",
  isInput: true
}

export default Textarea
