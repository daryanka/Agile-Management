import React, {FC, useState} from "react";
import ContentEditable from "react-contenteditable"
import Select, {ValueType} from "react-select";
import LoaderBtn from "../../Components/LoaderBtn";
import {Task} from "./Project";
import {useSelector} from "react-redux";
import {RootState} from "../../Store";
import fn from "../../../functions";
import ContentLoader from "../../Components/ContentLoader";

interface Props {
  id?: number,
  updateTasks: () => void,
  close?: () => void
}

interface KeyboardPress extends React.KeyboardEvent<HTMLElement>{
  target: HTMLDivElement & {className: string}
}

const EditTaskModal: FC<Props> = (props) => {
  const users = useSelector((state :RootState) => state.users.users);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const [selectOpen ,setSelectOpen] = useState(false)
  const descRef = React.useRef<HTMLParagraphElement>(null);
  const [data, setData] = useState<{title: string, desc?: string}>({title: "", desc: ""})
  const [selectData, setSelectData] = useState<{label: string, value: number}>();
  const [delLoading, setDelLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loadingData , setLoadingData] = useState(false);


  React.useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    setLoadingData(true)
    const res = await fn.get(`/tasks/${props.id}`);
    setLoadingData(false)

    if (!fn.apiError(res)) {
      setData({
        title: res.data.title ? res.data.title : "",
        desc: res.data.description ? res.data.description : ""
      })

        const u = users.find(x => x.id === res?.data?.user_id)

        if (u) {
          setSelectData({
            label: u.name,
            value: u.id
          })
        }
    }
  }

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

  const selectChange = (val: any) => {
    setSelectData(val as {label: string, value: number})
  }

  const deleteTask = async () => {
    //Delete Task
    setDelLoading(true)
    const res = await fn.delete(`/tasks/${props.id}`);
    setDelLoading(false)

    if (!fn.apiError(res)) {
      props.updateTasks();
      props.close!();
    }
  }

  const update = async () => {
    setUpdateLoading(true);

    const res = await fn.patch(`/tasks/${props.id}`, {
      title: data.title,
      description: data.desc,
      user_id: selectData?.value ? selectData.value : null,
    })

    setUpdateLoading(false);
    if (!fn.apiError(res)) {
      //Update Tasks
      props.updateTasks()
      props!.close!()
    } else {
      //Handle Error
    }
  }

  return(
    <div className={`edit-task-modal ${selectOpen ? "open" : ""}`}>
      <ContentLoader loading={loadingData} data={data}>
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
          value={selectData}
          options={users.map(user => ({
            label: user.name,
            value: user.id
          }))}
          onChange={selectChange}
          isClearable
        />
        <div className="btns-wrapper">
          <LoaderBtn className={"button secondary"} onClick={deleteTask} disabled={delLoading || updateLoading} loading={delLoading}>Delete Task</LoaderBtn>
          <LoaderBtn className={"button"} onClick={update} disabled={delLoading || updateLoading} loading={updateLoading}>Update Task</LoaderBtn>
        </div>
      </ContentLoader>
    </div>
  )
}

export default EditTaskModal