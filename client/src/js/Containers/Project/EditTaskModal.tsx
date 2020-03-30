import React, {FC, useState} from "react";
import ContentEditable from "react-contenteditable"
import Select, {ValueType} from "react-select";
import LoaderBtn from "../../Components/LoaderBtn";
import {Task} from "./Project";

interface Props {
  tasks?: Task[]
  id?: number
}

interface KeyboardPress extends React.KeyboardEvent<HTMLElement>{
  target: HTMLDivElement & {className: string}
}

const EditTaskModal: FC<Props> = (props) => {
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const [selectOpen ,setSelectOpen] = useState(false)
  const descRef = React.useRef<HTMLParagraphElement>(null);
  const [data, setData] = useState<{title: string, desc?: string}>({title: "", desc: ""})
  const [selectData, setSelectData] = useState<ValueType<{label: string, value: number}>>();
  const [delLoading, setDelLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);


  React.useEffect(() => {
    console.log("props are", props)
    if (props.id) {
      const t = props.tasks?.find((el) => el.id === props.id);

      setData({
        title: t!.title ? t!.title : "",
        desc: t!.description ? t!.description : ""
      })
    }


    // setSelectData();
  }, []);

  const disableEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    const e = event as KeyboardPress;
    if (e.key === "Enter") {
      if (e.target.className === "title") {
        //Unfocus title and make api request
        titleRef!.current!.blur()
        //Make edit request
      }
      if (e.target.className === "desc") {
        //Unfocus title and make api request
        descRef!.current!.blur()
        //Make edit request
      }
      e.preventDefault()
    }
  }

  const selectChange = (val: ValueType<{label: string, value: number}>) => {
    console.log("selected val", val);
    setSelectData(val)
  }

  const deleteTask = async () => {
    //Delete Task
  }

  const update = async () => {

  }

  return(
    <div className={`edit-task-modal ${selectOpen ? "open" : ""}`}>
      <ContentEditable
        innerRef={titleRef}
        onChange={(e) => setData(prev => ({...prev, title: e.target.value}))}
        html={data?.title}
        tagName={"h1"}
        className={"title"}
        onKeyDown={disableEnter}
      />
      <h6>Description:</h6>
      <ContentEditable
        onChange={(e) => setData(prev => ({...prev, desc: e.target.value}))}
        innerRef={descRef}
        html={data.desc ? data.desc : ""}
        className={"desc"}
        onKeyDown={disableEnter}
        tagName={"p"}
      />
      <h6>Assigned To:</h6>
      <Select
        onMenuOpen={() => setSelectOpen(true)}
        onMenuClose={() => setSelectOpen(false)}
        isLoading={selectLoading}
        options={[
          {
            label: "Daryan Amin",
            value: 23,
          },
          {
            label: "John Smith",
            value: 11,
          },
          {
            label: "Jane Doe",
            value: 122,
          }
        ]}
        onChange={selectChange}
      />
      <div className="btns-wrapper">
        <LoaderBtn className={"button secondary"} onClick={deleteTask} disabled={delLoading} loading={delLoading}>Delete Task</LoaderBtn>
        <LoaderBtn className={"button"} onClick={update} disabled={delLoading} loading={delLoading}>Update Task</LoaderBtn>
      </div>
    </div>
  )
}

export default EditTaskModal