import React, {FC, useRef, useState} from "react";
import Modal, {ModalRef} from "../../Components/Modal";
import AssignUserModal from "./AssignUserModal";
import {AssignedUserType} from "./Project";
import ContentLoader from "../../Components/ContentLoader";
import fn from "../../../functions";

interface Props {
  users?: AssignedUserType[],
  projectID: string
}

const AssignUsers: FC<Props> = (props) => {
  const assignModalRef = useRef<ModalRef>(null)
  const [assignedUsers, setAssignedUsers] = useState<AssignedUserType[]>([]);
  const [loading, setLoading] = useState(false);


  React.useEffect(() => {
    props.users && setAssignedUsers(props.users);
  }, [])

  const update = async () => {
    setLoading(true);
    const res = await fn.get(`/projects/users/${props.projectID}`)
    setLoading(false);

    if (!fn.apiError(res)) {
      setAssignedUsers(res.data);
    }
  }

  return(
    <div className={"assign"}>
      <Modal ref={assignModalRef}>
        <AssignUserModal users={assignedUsers} projectID={props.projectID} update={update}/>
      </Modal>
      <ContentLoader loading={loading} data={assignedUsers} message={"No users assigned to this project."}>
        <h4>Assigned to</h4>
        {assignedUsers.map(user => {
          return <p style={{textTransform: "capitalize"}}>{user.user_name}</p>
        })}
      </ContentLoader>
      <button type={"button"} onClick={() => assignModalRef!.current!.open()} className={"button"}>Add Assignee</button>
    </div>
  )
}

export default AssignUsers;