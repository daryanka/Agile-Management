import React from "react";
import ReactDOM from "react-dom";

const Modal = React.forwardRef((props, ref) => {
  const [show, setShow] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    open: () => open(),
    close: () => close()
  }))

  const open = () => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
  }

  const children = React.cloneElement(props.children, {
    close: () => close()
  })

  const content = () => {
    return (
      <div className={`modal-cont ${props.className ? props.className : ""}`}>
        <div onClick={() => close()} className="modal-backdrop" />
        <div className="modal-box">
          {props.closeBtn ? (
            <div className={"close-modal"}>
              <div onClick={close} className={"cross"} />
            </div>
          ) : null}
          {children}
        </div>
      </div>
    )
  }

  if (show) {
    return ReactDOM.createPortal(content(), document.getElementById("modal-root"))
  }
  return null;
})

Modal.defaultProps = {
  closeBtn: true
}

export default Modal;