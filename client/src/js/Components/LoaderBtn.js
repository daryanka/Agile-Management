import React from "react";

const LoaderBtn = (props) => {
  const [styles, setStyles] = React.useState();
  //Calculate width of btn

  React.useEffect(() => {
    console.log(document.getElementById("loader-text").offsetWidth)
  }, [])

  return (
    <button type={props.type} className={props.className}>
      <span className={"btn-placeholder"}>{props.children}</span>
      <span id={"loader-text"} className={"text"}>
        {props.children}
      </span>

      <span id={"loading"} />
    </button>
  )
};

LoaderBtn.defaultProps = {
  type: "button",
  className: ""
}

export default LoaderBtn;