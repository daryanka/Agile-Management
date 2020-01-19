import React, {useState} from "react";

const LinkComp = (props) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const el = document.createElement("textarea")
    el.value = props.url;
    document.body.appendChild(el)
    el.select();
    el.setSelectionRange(0, 99999) /*For mobile devices*/
    document.execCommand("copy")
    document.body.removeChild(el)
    console.log("here")
    setCopied(true);

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className={"link-comp"}>
      <p className={"link-name"}>{props.name}</p>
      <p onClick={copy} className={"link-url"}>
        {props.url}
        <span className={`${copied ? "show" : "hide"} copied`}>Copied to clipboard</span>
      </p>

    </div>
  )
}

export default LinkComp