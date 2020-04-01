import React, {FC} from "react";
import Modal, {ModalRef} from "../../Components/Modal";
import AddUserModal from "./AddUserModal";
import { FaUserEdit, FaUserMinus } from "react-icons/fa"
import EditUserModal from "./EditUserModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ContentLoader from "../../Components/ContentLoader";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import {getUsers} from "../../Actions/OrganisationUserActions";

interface userType {
  name: string,
  email: string,
  id: number | string
}

const Users: FC = () => {
  const [edit, setEdit] = React.useState<userType>();
  const [deleteUser, setDeleteUser] = React.useState<number>();
  const addModalRef = React.useRef<ModalRef>(null);
  const editModalRef = React.useRef<ModalRef>(null);
  const deleteModalRef = React.useRef<ModalRef>(null);
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const openEdit = (id: number) => {
    const u = users.users.find(user => user.id === id)
    setEdit(u)
    editModalRef.current!.open()
  }

  const openDelete = (id: number) => {
    setDeleteUser(id);
    deleteModalRef.current!.open()
  }

  const update = () => {
    dispatch(getUsers())
  }


  console.log("users", users)

  return (
    <div className={"users-cont"}>
      <Modal ref={addModalRef}>
        <AddUserModal update={update}/>
      </Modal>
      <Modal ref={editModalRef} >
        <EditUserModal user={edit} update={update}/>
      </Modal>
      <Modal ref={deleteModalRef}>
        <DeleteConfirmModal update={update} id={deleteUser}/>
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
          {users.users.map((user, i) => {
            return(
              <div key={`users-table-${user.id}`} className={"rows"}>
                <div className={"row"}>
                  <div className={"row-item-1"}>
                    <p className={"row-p"} style={{textTransform: "capitalize"}}>
                      <span className={"m"}>Name:</span>
                      {user.name}
                    </p>
                  </div>
                  <div className={"row-item-2"}>
                    <p className={"row-p"}>
                      <span className={"m"}>Email:</span>
                      {user.email}
                    </p>
                  </div>
                  <div className={"row-item-3"}>
                    <span onClick={() => openEdit(user.id)}><FaUserEdit /></span>
                    <span onClick={() => openDelete(user.id)}><FaUserMinus /></span>
                  </div>
                </div>
                {i !== users.users.length - 1 && (
                  <div className={"bar"} />
                )}
              </div>
            )
          })}
        </div>
      </ContentLoader>
    </div>
  )
};

export default Users;