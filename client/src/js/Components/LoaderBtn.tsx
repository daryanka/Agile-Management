import React, {FC} from "react";
import propTypes from "prop-types";

interface Props {
  disabled: boolean,
  onClick?: () => void;
  type: "submit" | "button",
  className?: string,
  loading: boolean,
  form?: string
}

const LoaderBtn:FC<Props> = (props) => {
  return (
    <button form={props.form && props.form} disabled={props.disabled} onClick={props.onClick} type={props.type} className={`button-loader ${props.className}`}>
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
  className: propTypes.string,
  loading: propTypes.bool.isRequired,
  disabled: propTypes.bool.isRequired
}

export default LoaderBtn;