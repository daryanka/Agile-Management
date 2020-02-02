import React from "react";

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

export default LoaderBtn;