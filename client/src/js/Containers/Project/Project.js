import React, { useState, useRef } from "react";
import LinkComp from "../../Components/LinkComp";
import Divider from "../../Components/Divider";
import { FaFileDownload } from "react-icons/fa"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../../Components/Modal";
import AssignUserModal from "./AssignUserModal";
import TimeModal from "./TimeModal";

const Project = (props) => {
  const assignModalRef = useRef()
  const addTimeModalRef = useRef()
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

  console.log(assignModalRef)

  return (
    <div className={"project-cont"}>
      <div className={"project-box"}>
        <div className={"box-header"}>
          <h3 className={"title"}>{props.match.params.id}</h3>
        </div>

        <div className={"box-content"}>
          <div className={"section-1 section"}>
            <div className={"left"}>
              <div className={"description"}>
                <h3>Description</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                  id est laborum.
                </p>
              </div>

              <Divider/>

              <div className={"links"}>
                <h3>Links</h3>
                <LinkComp name={"github"} url={"github.com"} />
                <LinkComp name={"invision"} url={"invision.com"} />
                <LinkComp name={"github"} url={"github.com"} />
              </div>
            </div>

            <div className={"right"}>

              <Divider/>

              <div className={"assign"}>
                <h4>Assigned to</h4>
                <p>John Doe</p>
                <p>John Doe</p>
                <p>John Doe</p>
                <p>John Doe</p>
                <p>Jane Smith</p>
                <Modal ref={assignModalRef}>
                  <AssignUserModal/>
                </Modal>
                <button type={"button"} onClick={() => assignModalRef.current.open()} className={"button"}>Add Assignee</button>
              </div>

              <Divider/>

              <div className={"time"}>
                <h4>Time Estimates</h4>
                <p><strong>Estimated Time:</strong> 4d 12h 0m</p>
                <p><strong>Time Spent:</strong> 4d 12h 0m</p>
                <Modal ref={addTimeModalRef}>
                  <TimeModal/>
                </Modal>
                <button onClick={() => addTimeModalRef.current.open()} className={"button"}>Add Time</button>
              </div>
            </div>
          </div>
          <div className="section-2 section">
            <Divider/>
            <div className={"files"}>
              <h3>Files</h3>
              <div className={"files-box"}>
                <button className={"button"}>Wireframe.png <FaFileDownload/></button>
                <button className={"button"}>Downloadable File.png <FaFileDownload/></button>
              </div>
            </div>

            <Divider/>

            <div className={"tasks"}>
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

            <Divider/>

            <div className="comments">
              <h4>Comments</h4>
              <div className="comments-box">
                <div className="comment">
                  <p className="comment-title">Daryan Amin</p>
                  <p className="comment-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <Divider/>

                <div className="comment">
                  <p className="comment-title">Daryan Amin</p>
                  <p className="comment-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>

            <Divider/>

            <div className="comments comments-2">
              <h4>Logged Time</h4>
              <div className="comments-box">
                <div className="comment">
                  <p className="comment-title">Daryan Amin - 12 Hours</p>
                  <p className="comment-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Project