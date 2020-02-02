import React from "react";
import Modal from "../../Components/Modal";
import AddUserModal from "./AddUserModal";
import { FaUserEdit, FaUserMinus } from "react-icons/fa"
import EditUserModal from "./EditUserModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const Users = () => {
  const [edit, setEdit] = React.useState(null);
  const [deleteUser, setDeleteUser] = React.useState(null);
  const addModalRef = React.useRef();
  const editModalRef = React.useRef();
  const deleteModalRef = React.useRef();

  const openEdit = (id = null) => {
    setEdit(id)
    editModalRef.current.open()
  }

  const openDelete = (id = null) => {
    setDeleteUser(id);
    deleteModalRef.current.open()
  }

  return (
    <div className={"users-cont"}>
      <Modal ref={addModalRef}>
        <AddUserModal/>
      </Modal>
      <Modal ref={editModalRef}>
        <EditUserModal id={edit}/>
      </Modal>
      <Modal ref={deleteModalRef}>
        <DeleteConfirmModal id={deleteUser}/>
      </Modal>
      <button onClick={() => addModalRef.current.open()} className={"button add"}>Add New User</button>
      <div className={"users-table"}>
        <div className={"header"}>
          <div className={"header-item header-1"}>
            <p>Name</p>
          </div>

          <div className={"header-item header-2"}>
            <p>Email</p>
          </div>

          <div className={"header-item header-3"}>
            <p>Options</p>
          </div>
        </div>
        <div className={"rows"}>
          <div className={"row"}>
            <div className={"row-item-1"}>
              <p>Daryan Amin</p>
            </div>
            <div className={"row-item-2"}>
              <p>Daryan@hotmail.co.uk</p>
            </div>
            <div className={"row-item-3"}>
              <span onClick={() => openEdit(2)}><FaUserEdit /></span>
              <span onClick={() => openDelete(1)}><FaUserMinus /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Users;