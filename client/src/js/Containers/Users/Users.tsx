import React, {FC} from "react";
import Modal, {ModalRef} from "../../Components/Modal";
import AddUserModal from "./AddUserModal";
import { FaUserEdit, FaUserMinus } from "react-icons/fa"
import EditUserModal from "./EditUserModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ContentLoader from "../../Components/ContentLoader";
import {useSelector} from "react-redux";
import {RootState} from "../../Store";

const Users: FC = () => {
  const [edit, setEdit] = React.useState<number>();
  const [deleteUser, setDeleteUser] = React.useState<number>();
  const addModalRef = React.useRef<ModalRef>(null);
  const editModalRef = React.useRef<ModalRef>(null);
  const deleteModalRef = React.useRef<ModalRef>(null);
  const users = useSelector((state: RootState) => state.users);

  const openEdit = (id: number) => {
    setEdit(id)
    editModalRef.current!.open()
  }

  const openDelete = (id: number) => {
    setDeleteUser(id);
    deleteModalRef.current!.open()
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
      <button onClick={() => addModalRef.current!.open()} className={"button add"}>Add New User</button>
      <ContentLoader loading={users.loading} data={users}>
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
          {users.users.map((user) => {
            return(
              <div key={`users-table-${user.id}`} className={"rows"}>
                <div className={"row"}>
                  <div className={"row-item-1"}>
                    <p style={{textTransform: "capitalize"}}>{user.name}</p>
                  </div>
                  <div className={"row-item-2"}>
                    <p>{user.email}</p>
                  </div>
                  <div className={"row-item-3"}>
                    <span onClick={() => openEdit(user.id)}><FaUserEdit /></span>
                    <span onClick={() => openDelete(user.id)}><FaUserMinus /></span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ContentLoader>
    </div>
  )
};

export default Users;