import React from "react";

const Divider = (props) => {
  const style = {
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    height: props.height,
    width: props.width,
  };

  if (props.marginAuto) {
    style.marginLeft = "auto";
    style.marginRight = "auto";
  }

  return(
    <div style={style} className={"divider-comp"} />
  )
};

Divider.defaultProps = {
  marginTop: 20,
  marginBottom: 20,
  height: 2,
  width: "100%",
  marginAuto: false
};

export default Divider