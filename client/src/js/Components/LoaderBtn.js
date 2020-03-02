import React from "react";
import propTypes from "prop-types";

const LoaderBtn = (props) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick} type={props.type} className={`button-loader ${props.className}`}>
      <span className={"btn-placeholder"}>{props.children}</span>
      <span id={"loader-text"} className={`text ${props.loading ? "active" : ""}`}>
        {props.children}
      </span>

      <span className={`loading ${props.loading ? "active" : ""}`} />
    </button>
  )
};

LoaderBtn.defaultProps = {
  type: "button",
  className: "",
  loading: false,
  disabled: false
}

LoaderBtn.propTypes = {
  type: propTypes.string,
  className: propTypes.string,
  loading: propTypes.bool,
  disabled: propTypes.bool
}

export default LoaderBtn;