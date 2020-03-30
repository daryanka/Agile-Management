import React from "react";
import ReactDOM from "react-dom";

export interface ModalRef {
  open: () => void,
  close: () => void
}

interface Props {
  children: JSX.Element | React.ReactNode | string | any,
  className?: string,
  closeBtn?: boolean
}

const Modal = React.forwardRef<ModalRef, Props>((props, ref) => {
  const [show, setShow] = React.useState(false);

  React.useImperativeHandle(ref, (): ModalRef => ({
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

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.key === "Escape") {
      close();
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    const el = document.getElementById("modal-root") as Element;
    return ReactDOM.createPortal(content(), el)
  }
  return null;
})

Modal.defaultProps = {
  closeBtn: true
}

export default Modal;