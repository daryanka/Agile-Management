import React from "react";
import Modal from "../../Components/Modal";
import AddUserModal from "./AddUserModal";

const Users = () => {
  const modalRef = React.useRef();
  return (
    <div className={"users-cont"}>
      <Modal ref={modalRef}>
        <AddUserModal/>
      </Modal>
      <button onClick={() => modalRef.current.open()} className={"button add"}>Add New User</button>
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
              <p>Edit Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Users;