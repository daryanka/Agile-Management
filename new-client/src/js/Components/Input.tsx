import React, {FC} from "react"
import propTypes from "prop-types";

interface errorType<T> {
  [key: string]: T
}

interface CompProps {
  handleChange: (val: string, name: string) => void,
  changedValue?: (val: string, name: string) => void,
  value?: string,
  name: string,
  style?: any,
  wrapperClassName?: string,
  label?: string,
  removeSemiColon?: boolean,
  tooltip?: boolean,
  tooltipClick?: any
  type?: string,
  placeholder?: string,
  removeBasicStyling?: boolean,
  inputClassName?: string,
  errors?: errorType<string>,
  isInput?: boolean,
  validation?: string
  customErr?: string
}

const Input:FC<CompProps> = props => {
  const handleChange = (val: string, name: string) => {
    props.handleChange(val, name)// Parent Component
    props.changedValue && props.changedValue(val, name)// Form Component
  }

  React.useEffect(() => {
    if (props.changedValue && props.value) {
      props.changedValue(props.value, props.name)
    }
  }, [props.value])

  let err: any = null

  if (props.errors && props.errors[props.name]) {
    err = (
      <p className="error-message">
        {props.errors[props.name]}
      </p>
    )
  }

  if (props.customErr) {
    err = (
      <p className="error-message">
        {props.customErr}
      </p>
    )
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

      {err}
    </div>
  )
}

Input.defaultProps = {
  type: "text",
  placeholder: "",
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
  handleChange: propTypes.func.isRequired,
  label: propTypes.string
}

// @ts-ignore
export default Input
