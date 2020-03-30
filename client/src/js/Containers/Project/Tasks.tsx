import React, {useState, useRef, FC} from "react";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import Modal, {ModalRef} from "../../Components/Modal";
import EditTaskModal from "./EditTaskModal";
import AddTaskModal from "./AddTaskModal";
import {Task} from "./Project";
import fn from "../../../functions";
import ContentLoader from "../../Components/ContentLoader";

interface Props {
  tasks?: Task[]
}

type columnKeys = "column-1" | "column-2" | "column-3";

interface ListType {
  "column-1": ColumnType,
  "column-2": ColumnType,
  "column-3": ColumnType
}

interface ColumnType {
  id: "column-1" | "column-2" | "column-3",
  title: "Incomplete" | "In-Progress" | "Complete",
  tasks: {id: string, content: string}[]
}

const Tasks: FC<Props> = (props) => {
  const editRef = useRef<ModalRef>(null);
  const addRef = useRef<ModalRef>(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditid] = useState<number>();
  const [list, setList] = useState<ListType>({
    "column-1": {
      id: "column-1",
      title: "Incomplete",
      tasks: []
    },
    "column-2": {
      id: "column-2",
      title: "In-Progress",
      tasks: []
    },
    "column-3": {
      id: "column-3",
      title: "Complete",
      tasks: []
    }
  })

  React.useEffect(() => {
    //map props to list
    const tempList: ListType = {
      "column-1": {
        id: "column-1",
        title: "Incomplete",
        tasks: []
      },
      "column-2": {
        id: "column-2",
        title: "In-Progress",
        tasks: []
      },
      "column-3": {
        id: "column-3",
        title: "Complete",
        tasks: []
      }
    };

    const incomplete: {id: string, content: string}[] = [];
    const inprogress: {id: string, content: string}[] = [];
    const complete: {id: string, content: string}[] = [];

    props.tasks?.forEach((t) => {
      switch (t.status) {
        case 0:
          //Incomplete
          incomplete.push({
            id: t.id.toString(),
            content: t.title
          })
          break;
        case 1:
          //In-Progress
          inprogress.push({
            id: t.id.toString(),
            content: t.title
          })
          break;
        case 2:
          //Complete
          complete.push({
            id: t.id.toString(),
            content: t.title
          })
      }
    })

    tempList["column-1"].tasks = incomplete;
    tempList["column-2"].tasks = inprogress;
    tempList["column-3"].tasks = complete;

    setList(tempList);
  }, []);

  const updateTasks = async () => {
    setLoading(true);
    const res = await fn.get("");

    if (!fn.apiError(res)) {
      //map props to list
      const tempList: any = {
        "column-1": {
          id: "column-1",
          title: "Incomplete"
        },
        "column-2": {
          id: "column-2",
          title: "In-Progress"
        },
        "column-3": {
          id: "column-3",
          title: "Complete"
        }
      };

      const incomplete: {id: string, content: string}[] = [];
      const inprogress: {id: string, content: string}[] = [];
      const complete: {id: string, content: string}[] = [];

      res.data.project.tasks.forEach((t: Task) => {
        switch (t.status) {
          case 0:
            //Incomplete
            incomplete.push({
              id: t.id.toString(),
              content: t.title
            })
            break;
          case 1:
            //In-Progress
            inprogress.push({
              id: t.id.toString(),
              content: t.title
            })
            break;
          case 2:
            //Complete
            complete.push({
              id: t.id.toString(),
              content: t.title
            })
        }
      })

      tempList["column-1"]["tasks"] = incomplete;
      tempList["column-2"]["tasks"] = inprogress;
      tempList["column-3"]["tasks"] = complete;

      setList(tempList);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  const columnorder: columnKeys[] = ["column-1", "column-2", "column-3"];

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //remove from column and tasks, column = source.droppableId, task = draggableId, index = source.index
    //add to destination column and tasks, column = destination.droppableId, index = destination.index
    const tasks = [...list[source.droppableId as columnKeys].tasks]
    const [removed] = tasks.splice(source.index, 1)

    if (source.droppableId === destination.droppableId) {
      // Change index order only
      tasks.splice(destination.index, 0, removed)
      setList({
        ...list,
        [source.droppableId]: {
          ...list[source.droppableId as columnKeys],
          tasks: tasks
        }
      })
    } else {
      // Change column and index order of other column tasks
      const otherTasks = [...list[destination.droppableId as columnKeys].tasks]
      otherTasks.splice(destination.index, 0, removed)

      console.log(destination.droppableId)
      console.log(removed);

      setList({
        ...list,
        [source.droppableId]: {
          ...list[source.droppableId as columnKeys],
          tasks: tasks
        },
        [destination.droppableId]: {
          ...list[destination.droppableId as columnKeys],
          tasks: otherTasks
        }
      })

      //Change status of item
      let status: number;
      switch (destination.droppableId) {
        case "column-1":
          status = 0;
          break;
        case "column-2":
          status = 1;
          break;
        case "column-3":
          status = 2;
          break;
        default:
          status = 0;
          break;
      }

      const id = removed.id;

      const res = await fn.patch(`/tasks/${id}`, {status: status});

      if (fn.apiError(res)) {
        //Handle Error
      }
    }
  }

  const openEdit = (id: string) => {
    setEditid(parseInt(id))
    editRef!.current!.open();
  }

  const addTaskOpen = () => {
    addRef!.current!.open();
  }

  return(
    <div className={"tasks"}>
      <Modal ref={editRef}>
        <EditTaskModal id={editId} tasks={props.tasks} />
      </Modal>
      <Modal ref={addRef}>
        <AddTaskModal/>
      </Modal>
      <h3>Tasks</h3>
      <button className={"button add-task"} onClick={addTaskOpen}>Create New Task</button>
      <ContentLoader loading={loading} data={list}>
        <div className={"tasks-cont"}>
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            {columnorder.map((colName, index) => {
              const column = list[colName];
              const colId = colName;
              return (
                <Droppable
                  key={colId}
                  droppableId={colId}
                >
                  {(provided) => {
                    return (
                      <div className={"col-wrapper"}>
                        <h5>{column.title}</h5>
                        <div className={"column"} {...provided.droppableProps} ref={provided.innerRef}>
                          {column.tasks.map((item, index) => {
                            return (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      onClick={() => openEdit(item.id)}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`single-task ${snapshot.isDragging ? "dragging" : ""}`}
                                    >
                                      <p>{item.content}</p>
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      </div>
                    )
                  }}
                </Droppable>
              )
            })}
          </DragDropContext>
        </div>
      </ContentLoader>
    </div>
  )
};

export default Tasks