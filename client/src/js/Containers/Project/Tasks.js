import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../../Components/Modal";
import EditTaskModal from "./EditTaskModal";


const Tasks = () => {
  const editRef = useRef();
  const [editId, setEditid] = useState(null);
  const [list, setList] = useState({
    "column-1": {
      id: "column-1",
      title: "Incomplete",
      tasks: [
        {id: "task-1", content: "Make React hooks video 1"},
        {id: "task-2", content: "Make more videos 2"},
        {id: "task-3", content: "React beautiful dnd 3"},
      ]
    },
    "column-2": {
      id: "column-2",
      title: "In-Progress",
      tasks: [
        {id: "task-4", content: "Some task"},
        {id: "task-5", content: "More tasks"},
        {id: "task-6", content: "even more stuff to do"},
      ]
    },
    "column-3": {
      id: "column-3",
      title: "Complete",
      tasks: [
        {id: "task-7", content: "seven"},
        {id: "task-8", content: "eight"},
        {id: "task-9", content: "nine"},
      ]
    }
  })

  const columnorder = ["column-1", "column-2", "column-3"];

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
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
    const tasks = [...list[source.droppableId].tasks]
    const [removed] = tasks.splice(source.index, 1)

    if (source.droppableId === destination.droppableId) {
      // Change index order only
      tasks.splice(destination.index, 0, removed)
      setList({
        ...list,
        [source.droppableId]: {
          ...list[source.droppableId],
          tasks: tasks
        }
      })
    } else {
      // Change column and index order of other column tasks
      const otherTasks = [...list[destination.droppableId].tasks]
      otherTasks.splice(destination.index, 0, removed)

      setList({
        ...list,
        [source.droppableId]: {
          ...list[source.droppableId],
          tasks: tasks
        },
        [destination.droppableId]: {
          ...list[destination.droppableId],
          tasks: otherTasks
        }
      })
    }
  }

  const openEdit = (id) => {
    editRef.current.open();
    setEditid(id)
  }

  return(
    <div className={"tasks"}>
      <Modal ref={editRef}>
        <EditTaskModal id={editId} />
      </Modal>
      <h3>Tasks</h3>
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
    </div>
  )
};

export default Tasks