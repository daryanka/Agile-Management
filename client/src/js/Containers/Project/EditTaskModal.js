import React, {useState} from "react";
import ContentEditable from "react-contenteditable"
import Select from "react-select";
import LoaderBtn from "../../Components/LoaderBtn";

const EditTaskModal = (props) => {
  const titleRef = React.useRef();
  const [selectOpen ,setSelectOpen] = useState(false)
  const descRef = React.useRef();
  const [data, setData] = useState({})
  const [selectData, setSelectData] = useState();
  const [delLoading, setDelLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);

  React.useEffect(() => {
    setData({
      title: props.title ? props.title : "",
      desc: props.description ? props.description : ""
    })

    setSelectData();
  }, []);

  const disableEnter = (e) => {
    if (e.key === "Enter") {
      if (e.target.className === "title") {
        //Unfocus title and make api request
        titleRef.current.blur()
        //Make edit request
      }
      if (e.target.className === "desc") {
        //Unfocus title and make api request
        descRef.current.blur()
        //Make edit request
      }
      e.preventDefault()
    }
  }

  const selectChange = (val) => {
    setSelectData(val)
  }

  const deleteTask = async () => {
    //Delete Task
  }

  return(
    <div className={`edit-task-modal ${selectOpen ? "open" : ""}`}>
      <ContentEditable
        innerRef={titleRef}
        onChange={(e) => setData(prev => ({...prev, title: e.target.value}))}
        html={data.title}
        tagName={"h1"}
        className={"title"}
        onKeyDown={disableEnter}
      />
      <h6>Description:</h6>
      <ContentEditable
        onChange={(e) => setData(prev => ({...prev, desc: e.target.value}))}
        innerRef={descRef}
        html={data.desc}
        className={"desc"}
        onKeyDown={disableEnter}
        tagName={"p"}
      />
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
      <LoaderBtn className={"button"} onClick={deleteTask} disabled={delLoading} loading={delLoading}>Delete Task</LoaderBtn>
    </div>
  )
}

export default EditTaskModal