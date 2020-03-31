import React, {FC, LegacyRef, RefObject, useRef, useState} from "react";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import fn from "../../../functions";
import {useToasts} from "react-toast-notifications";


interface Props {
  title?: string
  projectID: string
}

const ProjectTitle: FC<Props> = (props) => {
  const {addToast} = useToasts();
  const ref = useRef<ContentEditable>(null);
  const [title, setTitle] = useState<string>();
  const [initialValue, setInitialValue] = useState<string>();

  React.useEffect(() => {
    setInitialValue(props.title)
    setTitle(props.title)

    console.log("here 123");
  }, [])

  const keyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      update(event as unknown as ContentEditable);
      event.preventDefault()
    }
  }

  const update = async (e: ContentEditable) => {
    console.log("title is", ref.current!.el.current.innerText)
    const res = await fn.patch(`/projects/${props.projectID}`, {
      title: ref.current!.el.current.innerText
    });

    if (!fn.apiError(res)) {
      addToast(`Updated project name.`, {
        appearance: "success",
        autoDismiss: true,
      })
    }
  }

  console.log(initialValue);

  const handleChange = (e: ContentEditableEvent) => {
    setTitle(e.target.value);

    console.log(title);
  }

  return(
    <ContentEditable
      // @ts-ignore
      ref={ref}
      html={title ? title : ""}
      className={"title"}
      tagName={"h3"}
      onKeyDown={keyDown}
      value={title}
      onChange={(e) => handleChange(e)}
    />
  )
}

export default ProjectTitle